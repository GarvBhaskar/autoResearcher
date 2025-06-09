'use client';

import { useState } from 'react';

export default function ReportForm({ onGenerate }: { onGenerate: Function }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ query });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Research Topic</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="E.g. Electric vehicle adoption trends in 2024"
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Generate Report
      </button>
    </form>
  );
}
