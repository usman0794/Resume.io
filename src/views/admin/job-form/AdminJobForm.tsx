import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch } from '@/store';
import { createJob, fetchJobById, updateJob } from '@/store/actions/jobActions';
import { ROUTES } from '@/routes/routePaths';
import JobFormFields, { type JobFormData } from './components/JobFormFields';
import JobStatusToggle from './components/JobStatusToggle';

interface AdminJobFormProps {
  mode?: 'create' | 'edit';
}

const INITIAL: JobFormData = {
  title: '',
  company_name: '',
  company_address: '',
  job_type: 'full-time',
  salary_range: '',
  closing_date: '',
  source: '',
  source_url: '',
  description: '',
};

const AdminJobForm = ({ mode = 'create' }: AdminJobFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<JobFormData>(INITIAL);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      setFetching(true);
      (dispatch(fetchJobById(id)) as Promise<{ success: boolean; data?: Record<string, string>; message?: string }>).then((result) => {
        if (result.success && result.data) {
          const j = result.data;
          setForm({
            title: j.title ?? '',
            company_name: j.company_name ?? '',
            company_address: j.company_address ?? '',
            job_type: j.job_type ?? 'full-time',
            salary_range: j.salary_range ?? '',
            closing_date: j.closing_date ?? '',
            source: j.source ?? '',
            source_url: j.source_url ?? '',
            description: j.description ?? '',
          });
          setIsActive(j.is_active === undefined ? true : String(j.is_active) !== 'false');
        } else {
          setError(result.message ?? 'Failed to load job.');
        }
        setFetching(false);
      });
    }
  }, [mode, id, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = { ...form, is_active: isActive };
      const result: { success: boolean; message?: string; errors?: Record<string, string[]> } =
        mode === 'create'
          ? await dispatch(createJob(payload))
          : await dispatch(updateJob(id!, payload));

      if (result.success) {
        setSuccess(result.message ?? `Job ${mode === 'create' ? 'published' : 'updated'} successfully!`);
        setTimeout(() => navigate(ROUTES.ADMIN_JOBS), 1400);
      } else {
        const msgs = result.errors
          ? Object.values(result.errors).flat().join(' ')
          : (result.message ?? 'Something went wrong.');
        setError(msgs);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="admin-form-page">
        <div className="form-loading">
          <div className="form-spin" />
          <p className="form-loading__text">Loading job…</p>
        </div>
      </div>
    );

  return (
    <div className="admin-form-page">
      {/* Header */}
      <div className="form-page-header">
        <button
          type="button"
          className="form-page-header__back"
          onClick={() => navigate(ROUTES.ADMIN_JOBS)}
          aria-label="Go back"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="form-page-header__eyebrow">
            {mode === 'create' ? 'New Listing' : 'Edit Listing'}
          </span>
          <h1 className="form-page-header__title">
            {mode === 'create' ? 'Add Job Listing' : 'Edit Job Listing'}
          </h1>
          <p className="form-page-header__sub">
            {mode === 'create'
              ? 'Fill in the details below to publish a new job listing.'
              : 'Update the job details below.'}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="form-alert form-alert--error">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="form-alert form-alert--success">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-two-col">
          {/* Main column */}
          <div>
            <div className="form-card">
              <p className="form-card__title">Job Details</p>
              <JobFormFields
                form={form}
                onChange={handleChange}
                onSalaryChange={(v) => setForm((p) => ({ ...p, salary_range: v }))}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="form-sidebar-card">
              <p className="form-sidebar-card__title">Publish</p>
              <JobStatusToggle isActive={isActive} onChange={setIsActive} />
              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="form-btn form-btn--success form-btn--full"
                >
                  {loading && <span className="btn-spinner" />}
                  {loading
                    ? (mode === 'create' ? 'Publishing…' : 'Saving…')
                    : mode === 'create' ? 'Publish Job' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.ADMIN_JOBS)}
                  className="form-btn form-btn--ghost form-btn--full"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="form-tips-card">
              <p className="form-tips-card__title">Tips</p>
              <ul className="form-tips-card__list">
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Add a clear salary range to attract more applicants
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Include a closing date so candidates apply on time
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Link the source URL for candidates to apply directly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminJobForm;
