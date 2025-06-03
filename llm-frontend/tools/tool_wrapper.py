# tools/tool_wrapper.py

from tools.duckduckgo_tool import duckduckgo_search
from tools.wikipedia_tool import wikipedia_summary
from tools.arxiv_tool import arxiv_search

def run_all_tools(topic: str):
    facts = []

    # Wikipedia
    wiki = wikipedia_summary(topic)
    if "summary" in wiki:
        facts.append({
            "source": "Wikipedia",
            "text": wiki["summary"],
            "url": wiki["url"]
        })

    # DuckDuckGo
    duck_results = duckduckgo_search(topic)
    for item in duck_results:
        facts.append({
            "source": "DuckDuckGo",
            "text": item.get("snippet", ""),
            "url": item.get("url", "")
        })

    # arXiv
    arxiv_results = arxiv_search(topic)
    for paper in arxiv_results:
        summary = paper.get("summary", "").replace("\n", " ").strip()
        facts.append({
            "source": "arXiv",
            "text": f"{paper['title']} — {summary}",
            "url": paper.get("link", "")
        })

    return facts
