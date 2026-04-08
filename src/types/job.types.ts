export interface Job {
  id: number;
  title: string;
  company_name?: string;
  company_address?: string;
  excerpt?: string;
  description?: string;
  job_type?: 'full-time' | 'part-time' | 'remote' | 'contract' | string;
  salary_range?: string;
  closing_date?: string;
  is_expired?: boolean;
  is_active?: boolean;
  created_at?: string;
}

export interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}
