# agents/research_agent.py

from tools.tool_wrapper import run_all_tools

def research_agent(data: dict) -> dict:
    """
    Research agent for AutoResearcher.
    
    Input:
        data: dict with at least {"topic": <str>}
    Output:
        data: dict enriched with
            - research_notes: list of facts {"source", "text", "url"}
            - citations: list of URLs extracted from facts
    """
    topic = data.get("topic", "").strip()
    if not topic:
        raise ValueError("No topic provided to Research Agent.")
    
    # Call tool wrapper to get normalized research facts
    research_facts = run_all_tools(topic)

    # Store research notes (list of dicts)
    data["research_notes"] = research_facts
    
    # Extract citations (URLs) for downstream
    citations = [fact.get("url") for fact in research_facts if fact.get("url")]
    data["citations"] = citations

    return data
