import React from 'react';
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const JobSearchBar: React.FC<Props> = ({ value, onChange }) => (
  <div className="max-w-md mx-auto relative">
    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search jobs, companies, skills…"
      className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent shadow-sm"
    />
  </div>
);

export default JobSearchBar;
