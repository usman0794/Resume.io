import type { Job } from '@/types/job.types';
import JobTableRow from './JobTableRow';
import JobFilters from './JobFilters';

interface JobTableProps {
  jobs:      Job[];
  searchTerm: string;
  onSearch:  (v: string) => void;
  onDelete:  (id: number) => void;
}

const JobTable = ({ jobs, searchTerm, onSearch, onDelete }: JobTableProps) => {
  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (j.company_name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <JobFilters searchTerm={searchTerm} onSearch={onSearch}
        resultCount={filtered.length} showCount={jobs.length > 0} />
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Closes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job, i) => (
              <JobTableRow key={job.id} job={job} isLast={i === filtered.length - 1} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && searchTerm && (
          <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '0.875rem', color: 'var(--clr-text-faint)' }}>
            No jobs match &ldquo;{searchTerm}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTable;
