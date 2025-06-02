import requests
import json

def writer_agent(data: dict) -> dict:
    """
    Writer agent for AutoResearcher using local LLM via LM Studio.

    Input:
        data: dict with
            - research_notes: list of dicts with keys "source", "text", "url"
            - topic: str
    Output:
        data: dict enriched with
            - draft_report: string (well-structured research summary)
    """
    research_notes = data.get("research_notes", [])
    topic = data.get("topic", "N/A")

    if not research_notes:
        data["draft_report"] = "No research notes available to write the report."
        return data

    # Compose a prompt for the LLM
    prompt = compose_prompt(topic, research_notes)

    # Call the local LLM API
    report = call_local_llm(prompt)

    # Store generated report
    data["draft_report"] = report.strip()

    return data


def compose_prompt(topic: str, research_notes: list) -> str:
    """
    Build a prompt string for the LLM to generate a structured mini research report.
    """
    intro = (
        f"You are an expert researcher. Write a concise, structured, "
        f"human-readable 1-page research report on the following topic:\n\n"
        f"Topic: {topic}\n\n"
        "Use the following facts as your references. Summarize key points clearly and professionally.\n\n"
    )

    facts_texts = []
    for i, fact in enumerate(research_notes, 1):
        source = fact.get("source", "Unknown Source")
        text = fact.get("text", "").strip()
        if text:
            facts_texts.append(f"{i}. ({source}) {text}")

    facts_block = "\n".join(facts_texts)

    prompt = intro + facts_block + "\n\nReport:\n"
    return prompt


def call_local_llm(prompt: str) -> str:
    """
    Send prompt to local LM Studio API and get generated text.
    Assumes model 'deepseek-r1-distill-qwen-7b' is running at localhost:1234.
    """
    url = "http://127.0.0.1:1234/v1/chat/completions"
    headers = {"Content-Type": "application/json"}

    payload = {
        "model": "meta-llama-3.1-8b-instruct",
        "messages": [
            {"role": "system", "content": "You are an expert research editor."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 1500,
        "temperature": 0.7,
        "top_p": 0.9
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    result = response.json()

    # Extract generated text - adjust depending on API output format
    generated_text = result["choices"][0]["message"]["content"]

    return generated_text.strip()
