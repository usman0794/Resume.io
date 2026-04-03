import { ROUTES } from '@/routes/routePaths';
import type { Job } from '@/types/job.types';
import { Badge, IconButton } from '@/components/ui';

interface JobTableRowProps {
  job:      Job;
  isLast:   boolean;
  onDelete: (id: number) => void;
}

const TYPE_BADGE: Record<string, 'primary' | 'warning' | 'danger' | 'success' | 'purple' | 'neutral'> = {
  'full-time':  'primary',
  'part-time':  'warning',
  'contract':   'danger',
  'remote':     'success',
  'internship': 'purple',
};

const JobTableRow = ({ job, isLast, onDelete }: JobTableRowProps) => {
  const isExpired = job.closing_date ? new Date(job.closing_date) < new Date() : false;
  const editPath  = ROUTES.ADMIN_JOB_EDIT.replace(':id', String(job.id));
  const badgeVariant = TYPE_BADGE[job.job_type ?? ''] ?? 'neutral';

  return (
    <tr style={{ borderBottom: isLast ? 'none' : undefined }}>
      <td>
        <p className="cell-title" style={{ maxWidth: 260 }}>{job.title}</p>
        <p className="cell-sub">
          {job.company_name}{job.company_address ? ` · ${job.company_address}` : ''}
        </p>
      </td>

      <td>
        {job.job_type && (
          <Badge variant={badgeVariant}>
            {job.job_type}
          </Badge>
        )}
      </td>

      <td className="cell-date">{job.salary_range ?? '—'}</td>

      <td>
        {job.closing_date
          ? <span className={isExpired ? 'cell-date cell-date--expired' : 'cell-date'}>{job.closing_date}</span>
          : <span className="cell-date">—</span>}
      </td>

      <td>
        <div className="cell-actions">
          <IconButton to={editPath} title="Edit job">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </IconButton>
          <IconButton variant="danger" onClick={() => onDelete(job.id)} title="Delete job">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default JobTableRow;
