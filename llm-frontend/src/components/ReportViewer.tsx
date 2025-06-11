'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReportViewerProps {
  content: string;
  pdfFilename?: string;
}

export default function ReportViewer({ content, pdfFilename }: ReportViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePdfDownload = () => {
    if (!pdfFilename) return;
    const link = document.createElement('a');
    link.href = `http://localhost:8000/${pdfFilename}`;
    link.download = pdfFilename;
    link.click();
  };

  return (
    <div className="bg-black border border-blue-500 mt-8 p-6 rounded-xl shadow-[0_0_20px_#00f0ff66] relative">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-semibold text-[#00f0ff] drop-shadow-[0_0_5px_#00f0ff]">
          Generated Report
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="bg-transparent border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black px-4 py-1 rounded-md text-sm transition-all duration-300 shadow-[0_0_10px_#00f0ff80]"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleTextDownload}
            className="bg-[#00f0ff] hover:bg-[#00d0ff] text-black font-semibold px-4 py-1 rounded-md text-sm transition-all duration-300 shadow-[0_0_10px_#00f0ff]"
          >
            Download .txt
          </button>
          {pdfFilename && (
            <button
              onClick={handlePdfDownload}
              className="bg-[#00f0ff] hover:bg-[#00d0ff] text-black font-semibold px-4 py-1 rounded-md text-sm transition-all duration-300 shadow-[0_0_10px_#00f0ff]"
            >
              Download .pdf
            </button>
          )}
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto border-t border-[#00f0ff44] pt-4 px-2">
        <article className="prose prose-invert prose-sm sm:prose-base prose-pre:bg-[#111] prose-code:text-pink-400 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
