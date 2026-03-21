/**
 * JobMatchesSection
 * Replaces the blurred JobMatchesOverlay placeholder.
 * Shows dummy jobs mimicking the job match feature.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ExternalLink } from 'lucide-react';

interface JobMatch {
  id: number;
  title?: string;
  company_name?: string;
  job_type?: string;
  company_address?: string;
  source_url?: string | null;
  salary_range?: string;
}

const MOCK_JOBS: JobMatch[] = [
  { id: 1, title: 'Senior React Developer', company_name: 'TechCorp', company_address: 'Remote', salary_range: '$140k - $160k', job_type: 'Full-time' },
  { id: 2, title: 'Frontend Engineer', company_name: 'StartupInc', company_address: 'San Francisco, CA', salary_range: '$100k - $120k', job_type: 'Contract' },
  { id: 3, title: 'Fullstack Developer', company_name: 'BigTech', company_address: 'New York, NY', salary_range: 'Competitive', job_type: 'Full-time' },
];

export function JobMatchesSection() {
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMatches(MOCK_JOBS);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading matches...</div>;
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[220px] py-10 text-center">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Bookmark size={24} className="text-blue-400" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">No saved jobs yet</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Browse jobs and save the ones you like — they'll appear here.
        </p>
        <Link
          to="/app/job-search"
          className="mt-4 inline-flex items-center gap-2 bg-[#1A91F0] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {matches.slice(0, 5).map((job) => (
        <div
          key={job.id}
          className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 hover:border-blue-200 hover:shadow-sm transition-all"
        >
          {/* Company logo placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shrink-0 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">
              {(job.company_name ?? 'C').charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {job.title ?? 'Untitled Position'}
            </h4>
            <p className="text-xs text-gray-500 truncate">
              {job.company_name ?? '—'}
              {job.company_address ? ` · ${job.company_address}` : ''}
            </p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {job.job_type && (
               <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full capitalize">
                 {job.job_type}
               </span>
              )}
              {job.salary_range && (
               <span className="text-[10px] font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                 {job.salary_range}
               </span>
              )}
            </div>
          </div>

          {/* External link */}
          {job.source_url && (
            <a
              href={job.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-gray-400 hover:text-blue-500 transition-colors self-start mt-0.5"
              title="View original posting"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      ))}

      {matches.length > 5 && (
        <p className="text-center text-xs text-gray-400 pt-1">
          +{matches.length - 5} more saved jobs
        </p>
      )}
    </div>
  );
}

export default JobMatchesSection;
