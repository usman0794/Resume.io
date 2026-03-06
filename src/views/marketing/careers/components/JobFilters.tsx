import React from 'react';
const JOB_TYPES = ['all', 'full-time', 'part-time', 'contract', 'remote'] as const;

interface Props {
  active: string;
  total?: number;
  onChange: (type: string) => void;
}

const JobFilters: React.FC<Props> = ({ active, total, onChange }) => (
  <div className="flex items-center gap-2 flex-wrap mb-8">
    {JOB_TYPES.map(t => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
          active === t
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
            : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
        }`}
      >
        {t === 'all' ? 'All Jobs' : t}
      </button>
    ))}
    {total !== undefined && (
      <span className="ml-auto text-sm text-slate-400 font-medium">
        {total} listing{total !== 1 ? 's' : ''} found
      </span>
    )}
  </div>
);

export default JobFilters;
