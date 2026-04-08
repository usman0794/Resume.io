/**
 * Component: ResumeCard
 *
 * Purpose:
 *   Shows the currently selected resume with title, last-updated timestamp,
 *   a document thumbnail illustration, and two action buttons.
 *
 * Responsibilities:
 *   - Render resume name ("Untitled") and update timestamp
 *   - Render SVG document thumbnail on the right
 *   - Render "Preview" button (eye icon) and "Change Resume" button
 *   - Fire onPreview / onChangeResume callbacks
 *
 * Responsive Behavior:
 *   - All breakpoints: full-width card, buttons inline-flex
 *   - Mobile: "Change Resume" label shortened to "Change"
 *
 * Design Intent:
 *   Card: white bg, border 1px #e5e7eb, border-radius 10px, padding 16px.
 *   Resume title: 15px 600 #111827. Timestamp: 12px #9ca3af.
 *   Preview btn: border 1px #d1d5db, bg white, 13px 500 #374151, radius 6px, h 34px.
 *   Change Resume btn: same style but no border on tablet variant shown as "Change".
 *   Thumbnail: gray lines SVG on right, ~80px wide.
 */

import React from 'react';

interface ResumeCardProps {
  title      : string;
  updatedAt  : string;
  onPreview     ?: () => void;
  onChangeResume?: () => void;
}

const EyeIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const DocThumbnail: React.FC = () => (
  <svg width="70" height="88" viewBox="0 0 70 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="70" height="88" rx="4" fill="#f9fafb"/>
    {/* lines */}
    <rect x="10" y="14" width="50" height="4" rx="2" fill="#d1d5db"/>
    <rect x="10" y="24" width="40" height="3" rx="1.5" fill="#e5e7eb"/>
    <rect x="10" y="33" width="50" height="2.5" rx="1.25" fill="#e5e7eb"/>
    <rect x="10" y="40" width="45" height="2.5" rx="1.25" fill="#e5e7eb"/>
    <rect x="10" y="47" width="50" height="2.5" rx="1.25" fill="#e5e7eb"/>
    <rect x="10" y="56" width="30" height="3" rx="1.5" fill="#d1d5db"/>
    <rect x="10" y="64" width="50" height="2.5" rx="1.25" fill="#e5e7eb"/>
    <rect x="10" y="71" width="44" height="2.5" rx="1.25" fill="#e5e7eb"/>
    <rect x="10" y="78" width="50" height="2.5" rx="1.25" fill="#e5e7eb"/>
  </svg>
);

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  updatedAt,
  onPreview,
  onChangeResume,
}) => (
  <div className="rdc-card">
    <div className="rdc-card-left">
      <div className="rdc-card-info">
        <span className="rdc-card-title">{title}</span>
        <span className="rdc-card-updated">{updatedAt}</span>
      </div>
      <div className="rdc-card-actions">
        <button className="rdc-btn-outline" onClick={onPreview} type="button">
          <EyeIcon />
          <span>Preview</span>
        </button>
        <button className="rdc-btn-outline" onClick={onChangeResume} type="button">
          <span className="rdc-change-long">Change Resume</span>
          <span className="rdc-change-short">Change</span>
        </button>
      </div>
    </div>
    <div className="rdc-card-thumb" aria-hidden="true">
      <DocThumbnail />
    </div>
  </div>
);

export default ResumeCard;
