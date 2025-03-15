from flask import Flask, request, jsonify, render_template_string
from agentx.seo import analyze_seo, get_keyword_suggestions, optimize_metadata
from agentx.scraper import scrape_website
import logging

app = Flask(__name__)

# Enable detailed logging
logging.basicConfig(level=logging.INFO)

@app.route('/scrape', methods=["GET"])
def scrape():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    try:
        result = scrape_website(url)
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error during scraping: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/seo', methods=["GET"])
def seo():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "URL parameter is required"}), 400

    try:
        # Run all SEO analyses
        seo_report = analyze_seo(url)
        keyword_data = get_keyword_suggestions(url)

        # Placeholder HTML for optimization
        current_html = "<html><head><title>Example</title></head><body></body></html>"
        optimized_html = optimize_metadata(current_html)

        # Create a nicely formatted HTML response
        html_template = """
        <html>
            <head><title>SEO Analysis</title></head>
            <body>
                <h1>SEO Analysis for {{ url }}</h1>

                <h2>SEO Report</h2>
                <ul>
                    {% for key, value in seo_report.items() %}
                        <li><strong>{{ key }}:</strong> {{ value }}</li>
                    {% endfor %}
                </ul>

                <h2>Keyword Suggestions</h2>
                <ul>
                    {% for keyword in keyword_data %}
                        <li>{{ keyword }}</li>
                    {% endfor %}
                </ul>

                <h2>Optimized Metadata</h2>
                <pre>{{ optimized_html }}</pre>
            </body>
        </html>
        """
        
        return render_template_string(html_template, url=url, seo_report=seo_report, keyword_data=keyword_data, optimized_html=optimized_html)
    except Exception as e:
        app.logger.error(f"Error during SEO analysis: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
