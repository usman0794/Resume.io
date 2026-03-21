/**
 * Page: JobTrackingPage
 *
 * Purpose:
 *   Full-page Job Tracker kanban board.
 *   Users can add jobs to columns (shortlist → applied → interview → offer / rejected).
 *
 * Architecture:
 *   - All board state is local (useState) — no Redux needed for the tracker.
 *   - KANBAN_COLUMNS drives column order and appearance.
 *   - Jobs are stored in a flat array; stage field determines which column they appear in.
 */

import React, { useState, useCallback } from 'react';
import type { TrackerJob, TrackerStage } from './job-tracking.types';
import { KANBAN_COLUMNS } from './data/kanban.data';
import BoardHeader from './components/BoardHeader';
import KanbanColumn from './components/KanbanColumn';
import '@/styles/client/job-tracking.css';

let _nextId = 1;
const uid = () => `job-${Date.now()}-${_nextId++}`;

const JobTrackingPage: React.FC = () => {
  const [jobs, setJobs] = useState<TrackerJob[]>([]);

  const handleAddJob = useCallback((stage: string, company: string) => {
    const newJob: TrackerJob = {
      id      : uid(),
      title   : '',
      company,
      stage   : stage as TrackerStage,
      addedAt : new Date().toISOString(),
    };
    setJobs(prev => [...prev, newJob]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  }, []);

  return (
    <div className="jtk-page">
      {/* Top bar */}
      <BoardHeader />

      {/* Kanban board */}
      <div className="jtk-board">
        {KANBAN_COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            jobs={jobs.filter(j => j.stage === col.id)}
            onAddJob={handleAddJob}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default JobTrackingPage;
