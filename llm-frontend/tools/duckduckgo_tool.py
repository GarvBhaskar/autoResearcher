# tools/duckduckgo_tool.py

from duckduckgo_search import DDGS

def duckduckgo_search(query: str, max_results: int = 5):
    """Search DuckDuckGo and return brief summaries + URLs."""
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, region="wt-wt", safesearch="moderate", max_results=max_results):
            results.append({
                "title": r.get("title"),
                "snippet": r.get("body"),
                "url": r.get("href")
            })
    return results
