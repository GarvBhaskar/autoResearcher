'use client';

import { useState } from 'react';

export default function ReportForm({ onGenerate }: { onGenerate: Function }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ query });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black border border-blue-500 shadow-[0_0_20px_#00f0ff66] rounded-xl p-6 space-y-6"
    >
      <div>
        <label className="block mb-2 text-sm font-semibold text-[#00f0ff] drop-shadow-[0_0_5px_#00f0ff]">
          Research Topic
        </label>
        <textarea
          className="w-full p-3 border border-[#00f0ff] rounded-md resize-none bg-[#0a0a0a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00f0ff] shadow-inner shadow-[#00f0ff22]"
          placeholder="E.g. Electric vehicle adoption trends in 2024"
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#00f0ff] hover:bg-[#00d0ff] text-black font-bold py-2 px-4 rounded-md transition-all duration-300 shadow-[0_0_10px_#00f0ff80]"
      >
        Generate Report
      </button>
    </form>
  );
}
