const API_BASE_URL = 'http://127.0.0.1:5000';

export async function analyzeSEO(url) {
  const res = await fetch(`${API_BASE_URL}/seo?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  return data;
}

export async function scrapeWebsite(url) {
  const res = await fetch(`${API_BASE_URL}/scrape?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  return data;
}

export async function updateContent(url) {
  const res = await fetch(`${API_BASE_URL}/update`);
  const data = await res.json();
  return data;
}

export async function addContent(url) {
  const res = await fetch(`${API_BASE_URL}/add`);
  const data = await res.json();
  return data;
}

export async function getErrorLinks(url) {
  const res = await fetch(`${API_BASE_URL}/errorlink`);
  const data = await res.json();
  return data;
}
