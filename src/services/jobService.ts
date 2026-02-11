import type { Job } from '@/types/job.types';

let mockJobs: Job[] = [
  { id: 1, title: 'Senior React Developer', company_name: 'TechCorp', company_address: 'Remote', salary_range: '$140k - $160k', job_type: 'Full-time', description: 'React expert needed.' },
  { id: 2, title: 'Frontend Engineer', company_name: 'StartupInc', company_address: 'San Francisco, CA', salary_range: '$100k - $120k', job_type: 'Contract', description: 'UI/UX focus.' },
  { id: 3, title: 'Fullstack Developer', company_name: 'BigTech', company_address: 'New York, NY', salary_range: 'Competitive', job_type: 'Full-time', description: 'Fullstack experience.' },
];

const nextId = () => (mockJobs.length ? Math.max(...mockJobs.map(j => j.id)) + 1 : 1);

const jobService = {
  /** Public — no auth needed */
  async getJobs(params?: { search?: string; type?: string; page?: number }): Promise<Job[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockJobs;
  },

  /** Public — single job */
  async getJobById(id: number | string): Promise<Job> {
    await new Promise(r => setTimeout(r, 500));
    return mockJobs.find(j => j.id === Number(id)) ?? mockJobs[0];
  },

  /** Admin — create job (stored in-memory; resets on page reload) */
  async createJob(jobData: Partial<Job>): Promise<{ message: string; data: Job }> {
    await new Promise(r => setTimeout(r, 500));
    const newJob: Job = {
      id: nextId(),
      title: '',
      created_at: new Date().toISOString(),
      is_active: true,
      ...jobData,
    };
    mockJobs = [newJob, ...mockJobs];
    return { message: 'Job created successfully.', data: newJob };
  },

  /** Admin — update job */
  async updateJob(id: number | string, jobData: Partial<Job>): Promise<{ message: string; data: Job }> {
    await new Promise(r => setTimeout(r, 500));
    const idx = mockJobs.findIndex(j => j.id === Number(id));
    const updated: Job = idx !== -1
      ? { ...mockJobs[idx], ...jobData, id: mockJobs[idx].id }
      : { id: Number(id), title: '', ...jobData };
    if (idx !== -1) mockJobs[idx] = updated;
    return { message: 'Job updated successfully.', data: updated };
  },

  /** Admin — delete job */
  async deleteJob(id: number | string): Promise<{ message: string }> {
    await new Promise(r => setTimeout(r, 500));
    mockJobs = mockJobs.filter(j => j.id !== Number(id));
    return { message: 'Job deleted successfully.' };
  },
};

export default jobService;
