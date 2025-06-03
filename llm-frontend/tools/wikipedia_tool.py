# tools/wikipedia_tool.py

import wikipedia

def wikipedia_summary(query: str, sentences: int = 3):
    """Fetch a concise Wikipedia summary."""
    try:
        summary = wikipedia.summary(query, sentences=sentences)
        return {
            "source": "Wikipedia",
            "summary": summary,
            "url": f"https://en.wikipedia.org/wiki/{query.replace(' ', '_')}"
        }
    except wikipedia.exceptions.DisambiguationError as e:
        return {
            "source": "Wikipedia",
            "error": f"Disambiguation error: {e.options[:5]}"
        }
    except wikipedia.exceptions.PageError:
        return {
            "source": "Wikipedia",
            "error": "No matching Wikipedia page found."
        }
