/**
 * Types: job-tracking.types.ts
 *
 * All TypeScript interfaces for the Job Tracker kanban board.
 * Separate from the global Job type — tracker jobs have extra stage/meta fields.
 */

/** Kanban column stages matching resume.io reference */
export type TrackerStage =
  | 'shortlist'
  | 'auto_apply'
  | 'applied'
  | 'interview'
  | 'offer'
  | 'rejected';

/** A job card on the kanban board */
export interface TrackerJob {
  id: string;
  title: string;
  company: string;
  stage: TrackerStage;
  addedAt: string; // ISO date string
  appliedAt?: string;
  notes?: string;
  url?: string;
}

/** A single kanban column definition */
export interface KanbanColumn {
  id: TrackerStage;
  label: string;
  iconType: 'heart' | 'auto' | 'briefcase' | 'interview' | 'offer' | 'reject';
  accent: string;  // border-top color
  bgClass: string;  // column background CSS class
  showApplyAll?: boolean;
}
