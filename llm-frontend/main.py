from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langgraph_build import build_autoresearcher_graph

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update if deploying to Vercel/etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class GenerateRequest(BaseModel):
    query: str
    category: str  # Optional: if you want to switch logic based on this

@app.post("/generate")
async def generate_report(data: GenerateRequest):
    topic = data.query.strip()
    if not topic:
        return {"error": "Query is required."}

    try:
        graph = build_autoresearcher_graph()
        app_graph = graph.compile()

        print(f"Running AutoResearcher pipeline for topic: {topic}")
        result = app_graph.invoke({"topic": topic})

        final_report = result.get("final_report", "No final report generated.")
        
        # Save to file
        filename = f"research_report_{topic.replace(' ', '_')}.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(final_report)

        return {"report": final_report}

    except Exception as e:
        print(f"Error: {e}")
        return {"error": "Failed to generate report."}
