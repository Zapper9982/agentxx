from flask import Flask, request, jsonify
from agentx.scraper import scrape_website
from agentx.rag_utils import vec_store, retrieval
from agentx.content_update import process_update
from agentx.content_addition import process_add
import json 

app = Flask(__name__)
 
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
     
@app.route('/update', methods=["GET"])
def update():
   url = "https://api-docs.deepseek.com/"
   if not url:
      return jsonify({"error": "URL parameter is required"}), 400

   try:
        scraped = scrape_website(url)
        if isinstance(scraped, str):
         scraped = json.loads(scraped)
        suggestions = process_update(scraped)
        return jsonify(suggestions)
   except Exception as e:
      return jsonify({"error": str(e)}), 500


@app.route('/add', methods=["GET"])
def add():
   url = "https://api-docs.deepseek.com/"
   if not url:
      return jsonify({"error": "URL parameter is required"}), 400

   try:
        scraped = scrape_website(url)
        if isinstance(scraped, str):
         scraped = json.loads(scraped)
        suggestions = process_add(scraped)
        return jsonify(suggestions)
   except Exception as e:
      return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)

    