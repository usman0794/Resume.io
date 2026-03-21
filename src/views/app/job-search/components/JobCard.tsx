/**
 * Component: JobCard
 *
 * Purpose:
 *   Renders a single job listing row in the job-search results list.
 *   Matches resume.io card style: white card, 1px border, hover shadow.
 *
 * Responsibilities:
 *   - Company logo placeholder (initials fallback)
 *   - Job title (clickable), company name, location, job type badge
 *   - Salary range (if provided)
 *   - Posted date / closing date
 *   - Heart save / unsave toggle
 *   - Quick-apply button (if autoApply enabled)
 *
 * Responsive Behavior:
 *   - Full width card, flex row
 *   - On mobile: compact stacked meta info
 *
 * Design Intent:
 *   16px card radius, 20px padding, white bg, border #e5e7eb.
 *   Hover: subtle lift shadow.
 */

import React, { useState } from 'react';
import { Heart, MapPin, Clock, Zap } from 'lucide-react';
import type { Job } from '@/types/job.types';

interface JobCardProps {
  job: Job;
  onOpen?: (job: Job) => void;
  onSave?: (job: Job, saved: boolean) => void;
  onApply?: (job: Job) => void;
  isSaved?: boolean;
}

/** Derive 1–2 letter initials from company name for logo fallback */
const getInitials = (name = ''): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

/** Palette of brand-ish bg colors for initials avatars */
const AVATAR_COLORS = [
  '#dbeafe', '#e0f2fe', '#dcfce7', '#fef9c3',
  '#fce7f3', '#ede9fe', '#ffedd5',
];
const pickColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

/** Relative time label */
const relativeTime = (dateStr?: string): string => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const JOB_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'remote': 'Remote',
  'contract': 'Contract',
};

const JobCard: React.FC<JobCardProps> = ({
  job, onOpen, onSave, onApply, isSaved = false,
}) => {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    onSave?.(job, next);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply?.(job);
  };

  const initials = getInitials(job.company_name);
  const avatarBg = pickColor(job.company_name);
  const typeLabel = job.job_type ? (JOB_TYPE_LABELS[job.job_type] ?? job.job_type) : null;

  return (
    <article
      className="jc-card"
      onClick={() => onOpen?.(job)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen?.(job)}
      aria-label={`${job.title} at ${job.company_name}`}
    >
      {/* ── Logo ── */}
      <div
        className="jc-logo"
        style={{ backgroundColor: avatarBg }}
        aria-hidden="true"
      >
        <span className="jc-logo-initials">{initials || '?'}</span>
      </div>

      {/* ── Body ── */}
      <div className="jc-body">
        {/* Title row */}
        <div className="jc-title-row">
          <h3 className="jc-title">{job.title}</h3>
          <button
            className={`jc-heart${saved ? ' jc-heart-saved' : ''}`}
            onClick={handleSave}
            aria-label={saved ? 'Unsave job' : 'Save job'}
            title={saved ? 'Unsave' : 'Save'}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={saved ? '#ef4444' : 'none'}
              color={saved ? '#ef4444' : '#9ca3af'}
            />
          </button>
        </div>

        {/* Company */}
        {job.company_name && (
          <p className="jc-company">{job.company_name}</p>
        )}

        {/* Meta chips */}
        <div className="jc-meta">
          {job.company_address && (
            <span className="jc-meta-item">
              <MapPin size={13} color="#9ca3af" strokeWidth={2} />
              {job.company_address}
            </span>
          )}
          {typeLabel && (
            <span className="jc-badge">{typeLabel}</span>
          )}
          {job.salary_range && (
            <span className="jc-salary">{job.salary_range}</span>
          )}
        </div>

        {/* Footer row */}
        <div className="jc-footer">
          {job.created_at && (
            <span className="jc-date">
              <Clock size={12} color="#9ca3af" strokeWidth={2} />
              {relativeTime(job.created_at)}
            </span>
          )}

          {onApply && (
            <button className="jc-apply-btn" onClick={handleApply}>
              <Zap size={13} strokeWidth={2.5} />
              Easy Apply
            </button>
          )}
        </div>

        {/* Excerpt */}
        {job.excerpt && (
          <p className="jc-excerpt">{job.excerpt}</p>
        )}
      </div>
    </article>
  );
};

export default JobCard;

/*
 * NOTE: JobCard uses style={{ backgroundColor: avatarBg }} which is a
 * DATA-DRIVEN dynamic value (computed from company name hash). Intentionally kept as style=.
 */
