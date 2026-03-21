/**
 * Component: JobDetailPanel
 *
 * Purpose:
 *   Slide-in side panel (desktop) or full-screen sheet (mobile) that shows
 *   the full job description when a JobCard is clicked.
 *
 * Responsibilities:
 *   - Renders job title, company, meta info, full description
 *   - Apply Now CTA + Save heart button
 *   - Close (X) button
 *   - Backdrop click to close on mobile
 *
 * Responsive Behavior:
 *   - Desktop (≥1024px): 420px fixed right panel inside content area
 *   - Mobile (<1024px): bottom sheet sliding up
 *
 * Design Intent:
 *   White panel, left border #e5e7eb on desktop, top-rounded on mobile.
 *   Apply button: brand blue, full-width on mobile.
 */

import React from 'react';
import { X, MapPin, Clock, Briefcase, DollarSign, Heart } from 'lucide-react';
import type { Job } from '@/types/job.types';

interface JobDetailPanelProps {
  job     : Job;
  onClose : () => void;
  onApply?: (job: Job) => void;
  onSave? : (job: Job) => void;
  isSaved?: boolean;
}

const JobDetailPanel: React.FC<JobDetailPanelProps> = ({
  job, onClose, onApply, onSave, isSaved = false,
}) => {
  const [saved, setSaved] = React.useState(isSaved);

  return (
    <>
      {/* Mobile backdrop */}
      <div className="jdp-backdrop" onClick={onClose} aria-hidden="true" />

      <aside className="jdp-panel" role="complementary" aria-label="Job details">
        {/* ── Header ── */}
        <div className="jdp-header">
          <button
            className="jdp-close"
            onClick={onClose}
            aria-label="Close job details"
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="jdp-scroll">
          {/* Title block */}
          <div className="jdp-title-block">
            <h2 className="jdp-title">{job.title}</h2>
            {job.company_name && (
              <p className="jdp-company">{job.company_name}</p>
            )}
          </div>

          {/* Meta */}
          <div className="jdp-meta">
            {job.company_address && (
              <div className="jdp-meta-row">
                <MapPin size={15} color="#6b7280" strokeWidth={2} />
                <span>{job.company_address}</span>
              </div>
            )}
            {job.job_type && (
              <div className="jdp-meta-row">
                <Briefcase size={15} color="#6b7280" strokeWidth={2} />
                <span className="capitalize">{job.job_type}</span>
              </div>
            )}
            {job.salary_range && (
              <div className="jdp-meta-row">
                <DollarSign size={15} color="#6b7280" strokeWidth={2} />
                <span>{job.salary_range}</span>
              </div>
            )}
            {job.closing_date && (
              <div className="jdp-meta-row">
                <Clock size={15} color="#6b7280" strokeWidth={2} />
                <span>Closes: {new Date(job.closing_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="jdp-actions">
            <button
              className="jdp-apply-btn"
              onClick={() => onApply?.(job)}
            >
              Apply Now
            </button>
            <button
              className={`jdp-save-btn${saved ? ' jdp-save-btn-active' : ''}`}
              onClick={() => { setSaved((v) => !v); onSave?.(job); }}
              aria-label={saved ? 'Unsave job' : 'Save job'}
            >
              <Heart
                size={18}
                fill={saved ? '#ef4444' : 'none'}
                color={saved ? '#ef4444' : '#6b7280'}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Description */}
          {job.description && (
            <div className="jdp-description">
              <h3 className="jdp-section-title">Job Description</h3>
              <div
                className="jdp-desc-body"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default JobDetailPanel;
