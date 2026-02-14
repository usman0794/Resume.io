import { useState, useEffect, useCallback } from 'react';

const PER_PAGE = 6;

export interface DashboardStats {
  total_resumes: number;
  ai_tailored:   number;
  saved_jobs:    number;
  member_since:  string;
  [key: string]: unknown;
}

export interface DashboardResume {
  id:          number;
  name:        string;
  job_title:   string;
  source:      string;
  has_download:boolean;
  pdf_url:     string | null;
  created_at:  string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface DashboardSavedJob {
  id:              number;
  title:           string;
  company_name:    string;
  company_address: string;
  job_type:        string;
  salary_range:    string | null;
  source_url:      string | null;
  is_expired:      boolean;
  [key: string]: unknown;
}

interface PaginationMeta {
  current_page: number;
  last_page:    number;
  total:        number;
}

interface DashboardData {
  stats:         DashboardStats | null;
  resumes:       DashboardResume[];
  savedJobs:     DashboardSavedJob[];
  resumeMeta:    PaginationMeta | null;
  jobMeta:       PaginationMeta | null;
  loading:       boolean;
  error:         string;
  resumePage:    number;
  jobPage:       number;
  setResumePage: (page: number) => void;
  setJobPage:    (page: number) => void;
  deleteResume:  (id: string | number) => Promise<void>;
  unsaveJob:     (jobId: number) => Promise<void>;
  refresh:       () => void;
}

// --- DUMMY DATA ---
const MOCK_STATS: DashboardStats = {
  total_resumes: 2,
  ai_tailored: 1,
  saved_jobs: 3,
  member_since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
};

let MOCK_RESUMES: DashboardResume[] = [
  { id: 1, name: 'Untitled Resume', job_title: 'Software Engineer', source: 'manual', has_download: false, pdf_url: null, created_at: new Date().toISOString() },
  { id: 2, name: 'Tech Lead Resume', job_title: 'Tech Lead', source: 'ai', has_download: true, pdf_url: '#', created_at: new Date().toISOString() }
];

let MOCK_JOBS: DashboardSavedJob[] = [
  { id: 101, title: 'Senior React Developer', company_name: 'TechCorp', company_address: 'San Francisco, CA', job_type: 'Full-time', salary_range: '$140k - $160k', source_url: '#', is_expired: false },
  { id: 102, title: 'Frontend Engineer', company_name: 'StartupInc', company_address: 'Remote', job_type: 'Contract', salary_range: '$100k - $120k', source_url: '#', is_expired: false },
  { id: 103, title: 'Fullstack Developer', company_name: 'BigTech', company_address: 'New York, NY', job_type: 'Full-time', salary_range: null, source_url: '#', is_expired: true }
];

export function useDashboardData(): DashboardData {
  const [stats,       setStats]       = useState<DashboardStats | null>(null);
  const [resumes,     setResumes]     = useState<DashboardResume[]>([]);
  const [savedJobs,   setSavedJobs]   = useState<DashboardSavedJob[]>([]);
  const [resumeMeta,  setResumeMeta]  = useState<PaginationMeta | null>(null);
  const [jobMeta,     setJobMeta]     = useState<PaginationMeta | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [resumePage,  setResumePage]  = useState(1);
  const [jobPage,     setJobPage]     = useState(1);
  const [refreshTick, setRefreshTick] = useState(0);

  const loadStats = useCallback(async () => {
    setStats(MOCK_STATS);
  }, []);

  const loadResumes = useCallback(async (page: number) => {
    // Simulate pagination locally
    const start = (page - 1) * PER_PAGE;
    const paginated = MOCK_RESUMES.slice(start, start + PER_PAGE);
    setResumes(paginated);
    setResumeMeta({ current_page: page, last_page: Math.ceil(MOCK_RESUMES.length / PER_PAGE), total: MOCK_RESUMES.length });
  }, []);

  const loadSavedJobs = useCallback(async (page: number) => {
    const start = (page - 1) * PER_PAGE;
    const paginated = MOCK_JOBS.slice(start, start + PER_PAGE);
    setSavedJobs(paginated);
    setJobMeta({ current_page: page, last_page: Math.ceil(MOCK_JOBS.length / PER_PAGE), total: MOCK_JOBS.length });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      Promise.all([loadStats(), loadResumes(resumePage), loadSavedJobs(jobPage)])
        .catch(() => setError('Failed to load dashboard data.'))
        .finally(() => setLoading(false));
    }, 500); // Simulate network delay
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTick]);

  useEffect(() => { loadResumes(resumePage); }, [resumePage, loadResumes]);
  useEffect(() => { loadSavedJobs(jobPage);  }, [jobPage,    loadSavedJobs]);

  const deleteResume = async (id: string | number) => {
    MOCK_RESUMES = MOCK_RESUMES.filter(r => r.id !== Number(id));
    await Promise.all([loadStats(), loadResumes(resumePage)]);
  };

  const unsaveJob = async (jobId: number) => {
    MOCK_JOBS = MOCK_JOBS.filter(j => j.id !== jobId);
    await Promise.all([loadStats(), loadSavedJobs(jobPage)]);
  };

  const refresh = () => setRefreshTick((t) => t + 1);

  return {
    stats, resumes, savedJobs, resumeMeta, jobMeta,
    loading, error,
    resumePage, jobPage,
    setResumePage, setJobPage,
    deleteResume, unsaveJob, refresh,
  };
}

export default useDashboardData;
