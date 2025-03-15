import json
import requests
import os
import faiss
import numpy as np
import re
from dotenv import load_dotenv
from datetime import datetime
from sentence_transformers import SentenceTransformer

import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))



embedding_model = SentenceTransformer('all-MiniLM-l6-v2')

def load_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
    
def vec_store(sdata):
    texts = [item["content"] for item in sdata]
    embeddings = embedding_model.encode(texts, convert_to_numpy=True)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index, embeddings, texts

def retrieval(index, embeddings, texts, query_text, top=3):
    query_embedding = embedding_model.encode([query_text])
    distances, indices = index.search(query_embedding, top)
    retrieved = [texts[idx] for idx in indices[0]]
    return "\n\n".join(retrieved)



def gen_prompt(text, links, context):
    link_str = "\n".join([f"- {l['content']} ({l['href']})" for l in links]) if links else "None"
    return f"""You are an assistant that reviews and updates web content.

    Context from related documents:
    \"\"\"{context}\"\"\"

    Links referenced in the content:
    {link_str}

    Main content to analyze:
    \"\"\"{text}\"\"\"

    Please output your response ONLY in this JSON format:
    {{
    "outdated": true or false,
    "reason": "Explanation of why it's outdated or not.",
    "suggestion": "Suggested updated version (if outdated)."
    }}
    """



def query_gemini(prompt):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        content = response.text.strip()

        json_matches = re.findall(r'{[\s\S]*?}', content)
        for match in json_matches:
            try:
                return json.loads(match)
            except json.JSONDecodeError:
                continue
        return {
            "outdated": False,
            "error": "No valid JSON object found in Gemini response"
        }
        
    except Exception as e:
        return json.dumps({
            "outdated": False,
            "error": str(e)
        })


def process(sdata):
    index, embeddings, texts = vec_store(sdata)
    result = []


    for item in sdata:
        try:
            context = retrieval(index, embeddings, texts, item["content"], top=3)
            prompt = gen_prompt(item["content"], item.get("links", []), context)
            sugesstion_json = query_gemini(prompt)
            sugesstion = sugesstion_json
        except Exception as e:
            sugesstion = {
                "outdated": False,
                "error": str(e)
            }

        result.append({
            "id": item["id"],
            "orignal_content": item["content"],
            "links": item.get("links", []),
            "analysis": sugesstion
        })
    return result



def save(sugesstion, out="suggested.json"):
    with open(out, "w", encoding="utf-8") as f:
        json.dump(sugesstion, f, indent=2, ensure_ascii=False)
    
    print(f"Sugesstions saved")


def main():
    input = "testscrape.json"
    output= f"sugesstion_output.json"

    sdata = load_data(input)
    sugesstions = process(sdata)
    save(sugesstions, output)

if __name__ == "__main__":
    main()