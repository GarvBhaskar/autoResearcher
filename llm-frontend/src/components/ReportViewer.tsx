'use client';

import { useState } from 'react';

export default function ReportViewer({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border mt-8 p-6 rounded-xl shadow-md relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Generated Report</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleCopy}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
          >
            Download
          </button>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto border-t pt-4">
        <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed font-mono">
          {content}
        </pre>
      </div>
    </div>
  );
}
