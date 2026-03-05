import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { ROUTES } from '@/routes/routePaths';
import type { Job } from '@/types/job.types';

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'full-time': { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-100',  dot: 'bg-indigo-400' },
  'part-time': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   dot: 'bg-amber-400' },
  'contract':  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-100',  dot: 'bg-orange-400' },
  'remote':    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-400' },
};

interface Props {
  jobId: number;
  onClose: () => void;
  savedJobIds?: number[];
  onSaveToggle?: (jobId: number, saved: boolean) => void;
}

const JobDetailModal: React.FC<Props> = ({ jobId, onClose, savedJobIds = [], onSaveToggle }) => {
  const navigate = useNavigate();
  const user = useAppSelector(s => s.userReducer.user);

  const [job, setJob]       = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(() => savedJobIds.some(id => id === jobId));
  const [toast, setToast]   = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (mounted) {
        setJob({ id: jobId, title: 'Senior React Developer', company_name: 'TechCorp', company_address: 'Remote', salary_range: '$140k - $160k', job_type: 'Full-time', description: 'React expert needed.' });
        setLoading(false);
      }
    }, 500);
    return () => { mounted = false; };
  }, [jobId]);

  useEffect(() => {
    setIsSaved(savedJobIds.some(id => id === jobId));
  }, [savedJobIds, jobId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSaveToggle = async () => {
    if (!user) { navigate(ROUTES.LOGIN); return; }
    if (saving) return;
    setSaving(true);
    try {
      await new Promise(r => setTimeout(r, 300));
      const next = !isSaved;
      setIsSaved(next);
      setToast(next ? 'Job saved to your dashboard!' : 'Job removed from saved');
      onSaveToggle?.(jobId, next);
    } catch {
      setToast('Something went wrong. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const typeStyles = job ? (TYPE_STYLES[job.job_type ?? ''] ?? { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', dot: 'bg-slate-400' }) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto flex flex-col relative"
        style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
        onClick={e => e.stopPropagation()}
      >
        {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[12px] font-bold px-4 py-2 rounded-full z-10 whitespace-nowrap shadow-xl animate-fade-in-down">
            {toast}
          </div>
        )}

        <div className="sticky top-0 bg-white border-b border-slate-100 flex items-center justify-between px-6 py-4 z-10 rounded-t-2xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Details</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all ${
                isSaved ? 'bg-indigo-600 text-white border border-indigo-600 shadow-md shadow-indigo-100' : 'border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
              } ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSaved
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              }
              {saving ? 'Processing…' : isSaved ? 'Saved' : 'Save Job'}
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors text-lg font-bold">×</button>
          </div>
        </div>

        <div className="px-6 py-7 flex-1">
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
              <div style={{ height: 24, borderRadius: 6, width: '75%', background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
              <div style={{ height: 16, borderRadius: 5, width: '50%', background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <div style={{ height: 24, borderRadius: 12, width: 80, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
                <div style={{ height: 24, borderRadius: 12, width: 96, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ height: 12, borderRadius: 5, width: i % 4 === 3 ? '60%' : '85%', background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium mb-4">{error}</p>
              <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold transition-colors">Close</button>
            </div>
          )}

          {!loading && !error && job && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 leading-snug mb-2">{job.title}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-slate-700">{job.company_name}</span>
                  {job.company_address && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.company_address}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {typeStyles && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {job.job_type && (
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full capitalize border ${typeStyles.bg} ${typeStyles.text} ${typeStyles.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${typeStyles.dot}`} />{job.job_type}
                    </span>
                  )}
                  {job.salary_range && (
                    <span className="text-[12px] font-medium px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full border border-slate-100">{job.salary_range}</span>
                  )}
                  {job.closing_date && (
                    <span className={`text-[12px] font-medium px-3 py-1.5 rounded-full border ${job.is_expired ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                      {job.is_expired ? 'Expired' : `Closes ${job.closing_date}`}
                    </span>
                  )}
                </div>
              )}

              <div className="h-px bg-slate-100 mb-6" />

              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Job Description</p>
                <div className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</div>
              </div>

              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    const params = new URLSearchParams({ mode: 'ai', jd: job.description ?? '', jobTitle: job.title, company: job.company_name ?? '' });
                    onClose();
                    navigate(`${ROUTES.RESUME_BUILDER}?${params.toString()}`);
                  }}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl transition-colors text-sm shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Tailor My Resume for This Job
                </button>
                {!user && (
                  <button onClick={() => navigate(ROUTES.LOGIN)} className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm hover:border-indigo-300 hover:text-indigo-600">
                    Login to Save This Job
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
