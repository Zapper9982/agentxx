from flask import Flask, request, jsonify
from agentx.scraper import scrape_website
import json 

app = Flask(__name__)


# the api where the json is exposed. 
@app.route('/scrape',methods=["GET"])
def scrape():
     url = request.args.get("url")
     if not url:
        return jsonify({"error": "URL parameter is required"}), 400

     result = scrape_website(url)

     try:
        data = json.loads(result)
        return jsonify(data)
     except Exception as e:
        return jsonify({"error": str(e)}), 500
     
if __name__ == "__main__":
    app.run(debug=True)

    