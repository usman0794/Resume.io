/**
 * Component: RecruitersPanel
 *
 * Purpose:
 *   Desktop-only right column panel showing a promotional card about
 *   what resume distribution offers. Visible only at ≥1024px.
 *
 * Responsibilities:
 *   - Render lavender/light-blue panel background
 *   - Render white card with heading and 4 bullet benefit items (2×2 grid)
 *   - Each benefit has a blue checkmark + text
 *
 * Responsive Behavior:
 *   - Desktop (≥1024px): visible, fixed right column ~40%
 *   - Below 1024px: hidden
 *
 * Design Intent:
 *   Panel bg: #eef0f9. Card: white, border-radius 14px, padding 28px 24px.
 *   Card heading: 16px 700 #111827, centered.
 *   Benefits: 2-column grid, each item = blue ✓ + 13px #374151 text.
 *   Check icon: #1a91f0.
 */

import React from 'react';

const CheckIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a91f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const BENEFITS = [
  'Recruiters come to us with \'urgent\' roles',
  'You check your email for interviews',
  'We use your resume to match you with 50 a week',
  'Access our private database of 100k \'desparate\' recruiter',
];

const RecruitersPanel: React.FC = () => (
  <div className="rdc-panel" aria-label="Recruiters info">
    <div className="rdc-panel-card">
      <h3 className="rdc-panel-heading">These recruiters have jobs you want.</h3>
      <div className="rdc-panel-benefits">
        {BENEFITS.map((b, i) => (
          <div key={i} className="rdc-panel-benefit">
            <span className="rdc-panel-check"><CheckIcon /></span>
            <span className="rdc-panel-benefit-text">{b}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RecruitersPanel;
