import React from 'react';
import '@/styles/client/careers.css';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import type { Job } from '@/types/job.types';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import JobSearchBar from './components/JobSearchBar';
import JobDetailModal from './components/JobDetailModal';

interface JobMeta {
  total: number;
  last_page: number;
  current_page: number;
}

const SK = { background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' } as React.CSSProperties;

const SkeletonCard: React.FC = () => (
  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
    <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 16, borderRadius: 6, width: '75%', ...SK }} />
      <div style={{ height: 12, borderRadius: 5, width: '50%', ...SK }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 12, borderRadius: 5, width: '100%', ...SK }} />
      <div style={{ height: 12, borderRadius: 5, width: '80%', ...SK }} />
    </div>
    <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #f8fafc' }}>
      <div style={{ height: 20, borderRadius: 10, width: 80, ...SK }} />
      <div style={{ height: 20, borderRadius: 10, width: 112, ...SK }} />
    </div>
  </div>
);

const CareersPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs]         = useState<Job[]>([]);
  const [meta, setMeta]         = useState<JobMeta | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [typeFilter, setType]   = useState('all');
  const [page, setPage]         = useState(1);
  const [selectedId, setSelected] = useState<number | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await new Promise(r => setTimeout(r, 500));
      const mockJobs: Job[] = [
        { id: 1, title: 'Senior React Developer', company_name: 'TechCorp', company_address: 'Remote', salary_range: '$140k - $160k', job_type: 'Full-time', description: 'React expert needed.' },
        { id: 2, title: 'Frontend Engineer', company_name: 'StartupInc', company_address: 'San Francisco, CA', salary_range: '$100k - $120k', job_type: 'Contract', description: 'UI/UX focus.' },
        { id: 3, title: 'Fullstack Developer', company_name: 'BigTech', company_address: 'New York, NY', salary_range: 'Competitive', job_type: 'Full-time', description: 'Fullstack experience.' },
      ];
      setJobs(mockJobs);
      setMeta({ total: 3, current_page: 1, last_page: 1 });
    } catch {
      setError('Could not load job listings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, page]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);
  useEffect(() => { setPage(1); }, [search, typeFilter]);

  return (
    <div style={{ fontFamily: "'Inter','system-ui',sans-serif" }} className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">We're hiring</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-5">
            Find Your Next<br />Opportunity
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
            Browse the latest job listings and tailor your resume to land the interview.
          </p>
          <JobSearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <JobFilters active={typeFilter} total={meta?.total} onChange={setType} />

        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4 font-medium">{error}</p>
            <button onClick={fetchJobs} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
              Try again
            </button>
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
              : jobs.length === 0
              ? (
                <div className="col-span-3 flex flex-col items-center justify-center py-28 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-1">No jobs found</h3>
                  <p className="text-sm text-slate-400">Try a different search term or filter</p>
                </div>
              )
              : jobs.map(job => <JobCard key={job.id} job={job} onOpen={setSelected} />)
            }
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-sm">
              ← Prev
            </button>
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${p === page ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-300 hover:shadow-sm'}`}>
                {p}
              </button>
            ))}
            <button disabled={page === meta.last_page} onClick={() => setPage(p => p + 1)} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-sm">
              Next →
            </button>
          </div>
        )}

        <div className="mt-16 bg-indigo-600 rounded-2xl p-10 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">Get an edge</p>
          <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Ready to apply?</h2>
          <p className="text-indigo-200 mb-8 text-sm max-w-sm mx-auto">Tailor your resume to the job description in minutes with our AI builder.</p>
          <button onClick={() => navigate(ROUTES.RESUME_BUILDER)} className="px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-sm inline-flex items-center gap-2">
            Build My Resume
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {selectedId !== null && (
        <JobDetailModal jobId={selectedId} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default CareersPage;
