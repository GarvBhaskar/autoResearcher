'use client';

import { useState } from 'react';
import ReportForm from '../components/ReportForm';
import ReportViewer from '../components/ReportViewer';

export default function HomePage() {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async ({ query, category }: { query: string; category: string }) => {
    setLoading(true);
    setReport('');
    setError('');

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, category }),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const data = await response.json();
      setReport(data.report);
    } catch (err) {
      setError('Something went wrong while generating the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          LLM Auto Report Generator
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Generate AI-powered research reports by entering a topic and category.
        </p>
        <ReportForm onGenerate={generateReport} />
      </section>

      {loading && (
        <div className="text-center text-blue-600 text-sm my-4">
          Generating report...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm my-4">
          {error}
        </div>
      )}

      {report && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Generated Report
          </h2>
          <ReportViewer content={report} />
        </section>
      )}
    </main>
  );
}
