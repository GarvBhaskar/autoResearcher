# main.py

from langgraph_build import build_autoresearcher_graph

def main():
    topic = input("Enter research topic: ").strip()
    if not topic:
        print("Please provide a valid topic.")
        return

    graph = build_autoresearcher_graph()
    app=graph.compile()

    print("\nRunning AutoResearcher pipeline...\n")
    result = app.invoke({"topic": topic})

    final_report = result.get("final_report", "No final report generated.")
    print("\n=== Final Research Report ===\n")
    print(final_report)
    print("\n=============================\n")

    # Save report to file
    filename = f"research_report_{topic.replace(' ', '_')}.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(final_report)
    print(f"Report saved to file: {filename}")


if __name__ == "__main__":
    main()
