# tools/arxiv_tool.py

import feedparser
import urllib.parse
import requests

def arxiv_search(query: str, max_results: int = 3):
    """Search arXiv for relevant papers."""
    base_url = "http://export.arxiv.org/api/query?"
    encoded_query = urllib.parse.quote_plus(query)
    search_query = f"search_query=all:{encoded_query}&start=0&max_results={max_results}"
    url = base_url + search_query
    response = requests.get(url, timeout=10)
    feed = feedparser.parse(response.content)
    results = []
    for entry in feed.entries:
        results.append({
            "title": entry.title,
            "summary": entry.summary,
            "authors": [author.name for author in entry.authors],
            "published": entry.published,
            "link": entry.link
        })
    return results
