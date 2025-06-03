import requests
import json

def critic_agent(data: dict) -> dict:
    """
    Critic agent for AutoResearcher using local LLM via LM Studio.

    Input:
        data: dict with
            - draft_report: string (initial research report)
            - topic: str
    Output:
        data: dict enriched with
            - final_report: string (improved, accessible, readable report)
    """
    draft = data.get("draft_report", "")
    topic = data.get("topic", "N/A")

    if not draft.strip():
        data["final_report"] = "No draft report available to improve."
        return data

    prompt = compose_critic_prompt(topic, draft)

    improved_report = call_local_llm(prompt)

    data["final_report"] = improved_report.strip()

    return data


def compose_critic_prompt(topic: str, draft: str) -> str:
    """
    Build a prompt string to instruct the LLM to improve the draft report.
    """
    prompt = (
        f"You are an expert editor. Improve the following research report on the topic '{topic}'. "
        "Make it more accessible, readable, and human-like, "
        "while preserving accuracy and key points. "
        "Enhance clarity and flow.\n\n"
        f"Original Draft:\n{draft}\n\n"
        "Improved Report:\n"
    )
    return prompt


def call_local_llm(prompt: str) -> str:
    """
    Send prompt to local LM Studio API and get generated text.
    Assumes model 'deepseek-r1-distill-qwen-7b' is running at localhost:1234.
    """
    url = "http://localhost:1234/v1/chat/completions"
    headers = {"Content-Type": "application/json"}

    payload = {
        "model": "meta-llama-3.1-8b-instruct",
        "messages": [
            {"role": "system", "content": "You are an expert research report editor."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 1000,
        "temperature": 0.7,
        "top_p": 0.9,
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    result = response.json()

    improved_text = result["choices"][0]["message"]["content"]

    return improved_text
