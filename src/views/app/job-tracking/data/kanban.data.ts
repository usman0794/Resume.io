/**
 * Data: kanban.data.ts
 *
 * Static column definitions for the Job Tracker board.
 * Matches resume.io column order: Shortlist → Auto Apply → Applied → Interview → Offer → Rejected
 */

import type { KanbanColumn } from '../job-tracking.types';

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'shortlist',
    label: 'Shortlist',
    iconType: 'heart',
    accent: '#1A91F0',
    bgClass: 'jtk-col-shortlist',
    showApplyAll: true,
  },
  {
    id: 'auto_apply',
    label: 'Auto Apply',
    iconType: 'auto',
    accent: '#8b5cf6',
    bgClass: 'jtk-col-auto',
  },
  {
    id: 'applied',
    label: 'Applied',
    iconType: 'briefcase',
    accent: '#f59e0b',
    bgClass: 'jtk-col-applied',
  },
  {
    id: 'interview',
    label: 'Interview',
    iconType: 'interview',
    accent: '#3b82f6',
    bgClass: 'jtk-col-interview',
  },
  {
    id: 'offer',
    label: 'Offer',
    iconType: 'offer',
    accent: '#10b981',
    bgClass: 'jtk-col-offer',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    iconType: 'reject',
    accent: '#ef4444',
    bgClass: 'jtk-col-rejected',
  },
];
