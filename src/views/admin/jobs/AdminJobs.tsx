import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { fetchJobs, deleteJob } from '@/store/actions/jobActions';
import { ROUTES } from '@/routes/routePaths';
import { Button, Modal, Alert, Spinner, EmptyState } from '@/components/ui';
import JobTable from './components/JobTable';

const AdminJobs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((s: RootState) => s.jobReducer);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError,   setDeleteError]   = useState('');

  useEffect(() => { dispatch(fetchJobs()); }, [dispatch]);

  const handleDelete = async (jobId: number) => {
    setDeleteLoading(true);
    setDeleteError('');
    try {
      await dispatch(deleteJob(jobId));
      setDeleteConfirm(null);
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : 'Failed to delete job.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Job Listings</h1>
          <p className="page-header__sub">{jobs.length} listing{jobs.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button variant="success" to={ROUTES.ADMIN_JOB_CREATE}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </Button>
      </div>

      {(error || deleteError) && <Alert variant="danger">{error || deleteError}</Alert>}

      {loading ? (
        <Spinner color="green" text="Loading jobs…" />
      ) : jobs.length > 0 ? (
        <JobTable jobs={jobs} searchTerm={searchTerm} onSearch={setSearchTerm} onDelete={setDeleteConfirm} />
      ) : (
        <div className="card">
          <EmptyState
            icon={<svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            iconBg="var(--clr-success-bg)" iconColor="var(--clr-success)"
            title="No job listings yet"
            sub="Add your first job listing and it will appear here."
            ctaLabel="+ Add first job"
            ctaTo={ROUTES.ADMIN_JOB_CREATE}
            ctaVariant="success"
          />
        </div>
      )}

      {deleteConfirm !== null && (
        <Modal
          title="Delete job listing?"
          body="This action cannot be undone. The listing will be permanently removed."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => { setDeleteConfirm(null); setDeleteError(''); }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminJobs;
