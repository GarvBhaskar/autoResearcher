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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">📄 LLM Auto Report Generator</h1>
      <ReportForm onGenerate={generateReport} />
      {loading && <p className="text-center mt-4 text-blue-600">Generating report...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      <ReportViewer content={report} />
    </main>
  );
}
