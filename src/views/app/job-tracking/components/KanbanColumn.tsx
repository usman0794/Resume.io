/**
 * Component: KanbanColumn
 *
 * Purpose:
 *   A single column on the Job Tracker kanban board.
 *   Displays the column header (icon + label + count), job cards,
 *   and an "+ Add Job" button that reveals the AddJobInput inline form.
 *
 * Design Intent:
 *   Colored top border accent, light background, scrollable card list.
 *   Matches resume.io tracker column style.
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { KanbanColumn as KanbanColumnType, TrackerJob } from '../job-tracking.types';
import ColumnIcon from './ColumnIcon';
import TrackerJobCard from './TrackerJobCard';
import AddJobInput from './AddJobInput';

interface KanbanColumnProps {
  column: KanbanColumnType;
  jobs: TrackerJob[];
  onAddJob: (stage: string, company: string) => void;
  onRemove: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, jobs, onAddJob, onRemove }) => {
  const [adding, setAdding] = useState(false);

  const handleConfirm = (company: string) => {
    onAddJob(column.id, company);
    setAdding(false);
  };

  return (
    <div
      className={`jtk-column ${column.bgClass}`}
      style={{ borderTop: `3px solid ${column.accent}` }}
    >
      {/* Column header */}
      <div className="jtk-col-header">
        <div className="jtk-col-title">
          <ColumnIcon type={column.iconType} size={15} color={column.accent} />
          <span className="jtk-col-label">{column.label}</span>
          <span className="jtk-col-count">{jobs.length}</span>
        </div>
      </div>

      {/* Job cards */}
      <div className="jtk-col-cards">
        {jobs.map(job => (
          <TrackerJobCard key={job.id} job={job} onRemove={onRemove} />
        ))}

        {jobs.length === 0 && !adding && (
          <p className="jtk-col-empty">No jobs here yet</p>
        )}

        {/* Inline add form */}
        {adding && (
          <AddJobInput
            onConfirm={handleConfirm}
            onCancel={() => setAdding(false)}
          />
        )}
      </div>

      {/* Add Job button */}
      {!adding && (
        <button
          className="jtk-add-btn"
          onClick={() => setAdding(true)}
          aria-label={`Add job to ${column.label}`}
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Add Job</span>
        </button>
      )}
    </div>
  );
};

export default KanbanColumn;
