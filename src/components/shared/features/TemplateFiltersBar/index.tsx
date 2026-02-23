import React, { useState } from 'react';

// Options for the filter tabs
const FILTER_OPTIONS = [
  { id: 'all', label: 'All templates' },
  { id: 'simple', label: 'Simple' },
  { id: 'word', label: 'Word' },
  { id: 'picture', label: 'Picture' },
  { id: 'ats', label: 'ATS' },
  { id: 'two-column', label: 'Two-column' },
  { id: 'google-docs', label: 'Google Docs' },
];

const TemplateFiltersBar: React.FC = () => {
  // Local state to manage the active pill
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="w-full mb-4 lg:mb-8 sticky top-0 bg-white/90 backdrop-blur-md z-20  py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Scrollable Container */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 ease-in-out border
                  ${isActive
                    ? 'bg-[#f3f8ff] border-[#1a73e8] text-[#1a73e8]'
                    : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300 hover:bg-gray-50 hover:text-slate-900'
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TemplateFiltersBar;
