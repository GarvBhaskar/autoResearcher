'use client';

import { useState } from 'react';

export default function ReportForm({ onGenerate }: { onGenerate: Function }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Cars');
  const [customCategory, setCustomCategory] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = useCustom && customCategory.trim() !== '' ? customCategory : category;
    onGenerate({ query, category: finalCategory });
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

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
        <div className="flex flex-col space-y-2">
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            disabled={useCustom}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Cars">Cars</option>
            <option value="Laptops">Laptops</option>
            <option value="Healthcare">Healthcare</option>
            <option value="AI Tools">AI Tools</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              id="custom-category-checkbox"
            />
            <label htmlFor="custom-category-checkbox" className="text-sm text-gray-600">
              Use custom category
            </label>
          </div>

          {useCustom && (
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>
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
