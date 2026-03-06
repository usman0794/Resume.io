import React from 'react';
import type { Job } from '@/types/job.types';

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'full-time': { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-100',  dot: 'bg-indigo-400' },
  'part-time': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   dot: 'bg-amber-400' },
  'contract':  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-100',  dot: 'bg-orange-400' },
  'remote':    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-400' },
};
const DEFAULT_STYLE = { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', dot: 'bg-slate-400' };

interface Props {
  job: Job;
  onOpen: (id: number) => void;
}

const JobCard: React.FC<Props> = ({ job, onOpen }) => {
  const styles = TYPE_STYLES[job.job_type ?? ''] ?? DEFAULT_STYLE;
  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col gap-4"
      onClick={() => onOpen(job.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-700">{job.company_name}</span>
            {job.company_address && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.company_address}
                </span>
              </>
            )}
          </div>
        </div>
        <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {job.excerpt && (
        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{job.excerpt}</p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 flex-wrap">
          {job.job_type && (
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full capitalize border ${styles.bg} ${styles.text} ${styles.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
              {job.job_type}
            </span>
          )}
          {job.salary_range && (
            <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
              {job.salary_range}
            </span>
          )}
        </div>
        {job.closing_date && (
          <span className={`text-[11px] font-medium ${job.is_expired ? 'text-red-400' : 'text-slate-400'}`}>
            {job.is_expired ? '⚠ Expired' : `Closes ${job.closing_date}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
