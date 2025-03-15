import json
import requests
from urllib.parse import urlparse, urljoin

def check_broken_links(scraped_data, base_url=None) -> list:
    if isinstance(scraped_data, str):
        scraped_data = json.loads(scraped_data)
    
    broken_links = []
    
    for section in scraped_data:
        if not isinstance(section, dict):  
            continue  # Skip invalid sections

        for link in section.get("links", []):
            if not isinstance(link, dict):  
                continue  # Skip invalid links

            href = link.get("href")
            if not href:
                continue  # Skip empty links

            # Convert relative URLs to absolute URLs
            if base_url and not urlparse(href).netloc:
                href = urljoin(base_url, href)

            try:
                response = requests.head(href, allow_redirects=True, timeout=5)
                if response.status_code >= 400:
                    broken_links.append(href)
            except requests.RequestException:
                broken_links.append(href)

    return broken_links
