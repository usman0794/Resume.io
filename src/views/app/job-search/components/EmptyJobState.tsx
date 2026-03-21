/**
 * Component: EmptyJobState
 *
 * Purpose:
 *   Full-height centered empty state rendered when no target role is set
 *   and there are no recommended jobs to display.
 *
 * Responsibilities:
 *   - Renders the flag-runner illustration (inline SVG)
 *   - Heading "Which role are you going for?"
 *   - Sub-text description
 *   - Blue "Continue" CTA that opens the target-role onboarding flow
 *
 * Responsive Behavior:
 *   - Centers content vertically and horizontally on all screen sizes
 *   - Illustration shrinks on very small screens
 *
 * Design Intent:
 *   Matches resume.io's exact empty-state illustration style.
 *   Illustration width ~160px, heading 20px bold, body 14px gray,
 *   Continue button: blue (#1A91F0), 120px wide, 44px tall, 8px radius.
 */

import React from 'react';

interface EmptyJobStateProps {
  onContinue?: () => void;
}

const EmptyJobState: React.FC<EmptyJobStateProps> = ({ onContinue }) => (
  <div className="ejs-wrap">
    {/* ── Illustration ── */}
    <div className="ejs-illo" aria-hidden="true">
      <svg
        width="160"
        height="140"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground arc */}
        <ellipse cx="80" cy="125" rx="55" ry="6" fill="#f3f4f6" />

        {/* Flag pole */}
        <line x1="62" y1="30" x2="62" y2="120" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />

        {/* Flag wave — main */}
        <path
          d="M62 32 C75 28, 85 35, 100 30 C115 25, 118 38, 108 42 C95 47, 78 40, 62 50 Z"
          fill="#818cf8"
          opacity="0.9"
        />
        {/* Flag wave — secondary (small) */}
        <path
          d="M88 48 C96 44, 104 50, 110 46 C116 42, 116 52, 110 54 C102 57, 94 52, 88 56 Z"
          fill="#a5b4fc"
          opacity="0.8"
        />

        {/* Runner body */}
        <g transform="translate(40,88)">
          {/* Head */}
          <circle cx="15" cy="6" r="5.5" fill="#1f2937" />
          {/* Torso */}
          <path d="M12 11 Q15 20 14 26" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Left arm — reaching to pole */}
          <path d="M14 15 Q20 12 24 16" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Right arm — back */}
          <path d="M14 15 Q8 17 5 14" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Front leg */}
          <path d="M14 26 Q18 30 22 35" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Back leg */}
          <path d="M14 26 Q10 31 7 35" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>

        {/* Ground lines suggesting motion */}
        <line x1="20" y1="118" x2="38" y2="118" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="123" x2="26" y2="123" stroke="#e5e7eb" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>

    {/* ── Text ── */}
    <h2 className="ejs-heading">Which role are you going for?</h2>
    <p className="ejs-body">
      If you tell us where your headed, we can show you how to get there.
    </p>

    {/* ── CTA ── */}
    <button className="ejs-btn" onClick={onContinue}>
      Continue
    </button>
  </div>
);

export default EmptyJobState;
