'use client';

import { useState } from 'react';
import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

export default function HomePage() {
  const [report, setReport] = useState('');
  const [pdfFilename, setPdfFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async ({ query }: { query: string }) => {
    setLoading(true);
    setReport('');
    setError('');
    setPdfFilename('');
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const data = await response.json();
      setPdfFilename(data.pdf_filename);
      setReport(data.report);
    } catch (err) {
      setError('Something went wrong while generating the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 text-[--foreground]" >
      <section className="bg-[--muted] p-6 rounded-lg shadow-md border border-[--border] mb-6">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-[--accent] drop-shadow-[0_0_5px_var(--accent)]">
          ⚡ LLM Auto Report Generator
        </h1>
        <p className="text-center text-sm text-[--foreground] opacity-70 mb-6">
          Generate AI-powered research reports by entering a topic and category.
        </p>
        <ReportForm onGenerate={generateReport} />
      </section>

      {loading && (
        <div className="flex items-center justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[--accent] border-t-transparent"></div>
          <span className="ml-3 text-[--accent] text-sm">Generating report...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm my-4">
          {error}
        </div>
      )}

      {report && (
        <section className="bg-[--muted] p-6 rounded-lg shadow-md border border-[--border]">
          <h2 className="text-xl font-bold mb-4 text-[--accent] drop-shadow-[0_0_4px_var(--accent)]">
            📝 Generated Report
          </h2>
          <ReportViewer content={report} />
        </section>
      )}
    </main>
  );
}
