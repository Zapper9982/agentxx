import requests
# from agentx.config import LIGHTHOUSE_API_URL, SEM_RUSH_API_KEY, GEMINI_API_KEY
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini API with your key
genai.configure(api_key="GOOGLE_API_KEY")

def analyze_seo(url: str) -> dict:
    """Analyze page performance and SEO metrics using Lighthouse API."""
    response = os.getenv(f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key={LIGHTHOUSE_API_URL}&url={url}")
    return response.json() if response.status_code == 200 else {"error": "Failed to retrieve SEO data"}

def get_keyword_suggestions(url: str) -> dict:
    """Fetch keyword suggestions from the Semrush API."""
    semrush_url = f"https://api.semrush.com/?key={SEM_RUSH_API_KEY}&url={url}"
    response = requests.get(semrush_url)
    return response.json() if response.status_code == 200 else {"error": "Failed to retrieve keyword suggestions"}

def optimize_metadata(html: str) -> str:
    """Optimize HTML metadata using Gemini API."""
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = f"Optimize the following HTML metadata for SEO:\n\n{html}"

    try:
        response = model.generate_content([prompt])
        return response.text.strip()
    except Exception as e:
        return f"Gemini API error: {e}"
