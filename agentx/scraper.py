import json
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

def scrape_website(url: str) -> str:
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
    
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
            try:
             
                page.wait_for_load_state("networkidle", timeout=10000)
            except Exception as e:
                print("Warning: Network idle not reached within timeout, proceeding...")
            html = page.content()
            browser.close()

            soup = BeautifulSoup(html, "html.parser")
           
            elements = soup.find_all(['h1','h2','h3','h4','h5','h6','p'])
            sections = []
            current_section = None
            section_count = 0

            for element in elements:
                if element.name in ['h1','h2','h3','h4','h5','h6']:
         
                    if current_section:
                        sections.append(current_section)
                    section_count += 1
                  
                    current_section = {
                        "id": f"section_{section_count}",
                        "content": element.get_text(" ", strip=True),
                        "links": []
                    }
              
                    for a in element.find_all("a", href=True):
                        current_section["links"].append({
                            "href": a.get("href"),
                            "content": a.get_text(strip=True)
                        })
                elif element.name == "p":
                 
                    if current_section is None:
                        section_count += 1
                        current_section = {
                            "id": f"section_{section_count}",
                            "content": "",
                            "links": []
                        }
                
                    current_section["content"] += " " + element.get_text(" ", strip=True)
  
                    for a in element.find_all("a", href=True):
                        current_section["links"].append({
                            "href": a.get("href"),
                            "content": a.get_text(strip=True)
                        })
 
            if current_section:
                sections.append(current_section)

            return json.dumps(sections, indent=4)
    except Exception as e:
        return json.dumps({"error": str(e)})
