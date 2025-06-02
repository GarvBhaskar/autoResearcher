from typing import TypedDict
from langgraph.graph import StateGraph

from agents.research_agent import research_agent
from agents.writer_agent import writer_agent
from agents.critic_agent import critic_agent

# Define the state schema
class AutoResearcherState(TypedDict, total=False):
    topic: str
    research_notes: list
    citations: list
    draft_report: str
    final_report: str

def build_autoresearcher_graph() -> StateGraph:
    """
    Build and return a LangGraph StateGraph for AutoResearcher pipeline:
    research -> writing -> critiquing
    """

    graph = StateGraph(AutoResearcherState)

    # Add nodes: functions that accept the state dict and return partial updates
    graph.add_node("research_agent", research_agent)
    graph.add_node("writer_agent", writer_agent)
    graph.add_node("critic_agent", critic_agent)

    # Connect nodes to define flow: research -> writer -> critic
    graph.add_edge("research_agent", "writer_agent")
    graph.add_edge("writer_agent", "critic_agent")

    # Set entry point of the graph
    graph.set_entry_point("research_agent")

    return graph


if __name__ == "__main__":
    graph = build_autoresearcher_graph()
    print(graph)
