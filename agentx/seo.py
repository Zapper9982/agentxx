import requests
from agentx.config import LIGHTHOUSE_API_URL, SEM_RUSH_API_KEY, DEEPSEEK_API_KEY
from openai import OpenAI

def analyze_seo(url: str) -> dict:
    """
    Analyze page performance and SEO metrics using the Lighthouse API.
    """
    response = requests.get(f"{LIGHTHOUSE_API_URL}?url={url}")
    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": "Failed to retrieve SEO data",
            "status_code": response.status_code
        }

def get_keyword_suggestions(url: str) -> dict:
    """
    Fetch keyword suggestions from the Semrush API.
    Improves the page ranking.
    (This is a placeholder: update the request parameters as required by Semrush.)
    """
    semrush_url = f"https://api.semrush.com/?key={SEM_RUSH_API_KEY}&url={url}"
    response = requests.get(semrush_url)
    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": "Failed to retrieve keyword suggestions",
            "status_code": response.status_code
        }

def optimize_metadata(html: str) -> str:
    """
    Optimize HTML metadata using DeepSeek API.
    Generates a prompt to update SEO metadata based on the provided HTML.
    """
    prompt = f"Optimize the following HTML metadata for SEO:\n\n{html}"
    client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": prompt},
            ],
            stream=False
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"DeepSeek API error: {e}")
        return html
