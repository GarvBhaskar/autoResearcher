from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langgraph_build import build_autoresearcher_graph
from markdown import markdown
from weasyprint import HTML
import os

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
        html_content = markdown(final_report)
        full_html = f"""<html>
<head>
  <style>
    body {{
      font-family: 'Segoe UI', sans-serif;
      margin: 40px;
      line-height: 1.6;
      color: #111;
      text-align: center; /* Center the body content */
    }}
    h1, h2, h3 {{
      color: #2563eb;
    }}
    code {{
      background-color: #f3f4f6;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
    }}
    .container {{
      max-width: 800px; /* Set a max-width for better readability */
      margin: 0 auto; /* Center the container */
      text-align: left; /* Align text within the container to the left */
    }}
  </style>
</head>
<body>
  <div class="container">
    <h1>Research Report on {topic}</h1>
    {html_content}
  </div>
</body>
</html>"""

        pdf_filename = f"research_report_{topic.replace(' ', '_')}.pdf"
        HTML(string=full_html).write_pdf(pdf_filename)

        return {"report": final_report, "pdf_filename": pdf_filename}

    except Exception as e:
        print(f"Error: {e}")
        return {"error": "Failed to generate report."}
@app.get("/{filename}")
async def get_file(filename: str):
    file_path = os.path.join(".", filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename, media_type='application/pdf')
    return {"error": "File not found"}

