/**
 * Component: TrackerJobCard
 *
 * Purpose:
 *   A single job card rendered inside a kanban column.
 *   Shows company name, job title, date added, and a remove button.
 *
 * Design Intent:
 *   White card, 8px radius, subtle shadow, blue accent on left border.
 *   Matches resume.io tracker card style.
 */

import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { TrackerJob } from '../job-tracking.types';

interface TrackerJobCardProps {
  job: TrackerJob;
  onRemove: (id: string) => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

const TrackerJobCard: React.FC<TrackerJobCardProps> = ({ job, onRemove }) => (
  <div className="tjc-card">
    {/* Top row: title + remove */}
    <div className="tjc-top">
      <span className="tjc-title">{job.title || 'Untitled Position'}</span>
      <button
        className="tjc-remove"
        onClick={() => onRemove(job.id)}
        aria-label={`Remove ${job.company}`}
      >
        <X size={13} strokeWidth={2.5} />
      </button>
    </div>

    {/* Company */}
    <p className="tjc-company">{job.company}</p>

    {/* Footer row: date + optional link */}
    <div className="tjc-footer">
      <span className="tjc-date">{formatDate(job.addedAt)}</span>
      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tjc-link"
          aria-label="Open job posting"
        >
          <ExternalLink size={12} strokeWidth={2} />
        </a>
      )}
    </div>
  </div>
);

export default TrackerJobCard;
