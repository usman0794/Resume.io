/**
 * Component: FeaturesGrid
 *
 * Purpose:
 *   Renders the 4 benefit tiles beneath the AutoApplyHero card.
 *   Tiles: Tailored resume, Accurate applications, Reclaim time, 3x jobs.
 *
 * Responsibilities:
 *   - Holds static feature data array
 *   - Renders a responsive 4-column (desktop) / 2-column (mobile) grid
 *   - Each tile rendered via FeatureCard
 *
 * Responsive Behavior:
 *   - Desktop (≥1024px): 4 columns, top border on each cell
 *   - Tablet (640–1023px): 2 columns
 *   - Mobile (<640px): 2 columns, compact padding
 *
 * Design Intent:
 *   No outer card wrapper — cells sit directly on page white bg.
 *   Top border #e5e7eb on each cell. 32px top padding on desktop.
 *   Matching bottom padding before footer/tab-bar.
 */

import React from 'react';
import FeatureCard, { type FeatureCardData } from './FeatureCard';

/* ── Inline SVG illustrations (approximate emoji-style) ─────────────────── */

const PuzzleIcon: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2"  y="2"  width="15" height="15" rx="3" fill="#f97316" opacity="0.9"/>
    <rect x="21" y="2"  width="15" height="15" rx="3" fill="#a78bfa" opacity="0.9"/>
    <rect x="2"  y="21" width="15" height="15" rx="3" fill="#a78bfa" opacity="0.7"/>
    <rect x="21" y="21" width="15" height="15" rx="3" fill="#f97316" opacity="0.7"/>
    {/* puzzle connector knobs */}
    <rect x="14" y="8"  width="10" height="6"  rx="3" fill="#fff" opacity="0.7"/>
    <rect x="8"  y="14" width="6"  height="10" rx="3" fill="#fff" opacity="0.7"/>
  </svg>
);

const PeopleIcon: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* back person */}
    <circle cx="24" cy="11" r="6" fill="#f59e0b"/>
    <path d="M14 32 C14 24 34 24 34 32" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none"/>
    {/* front person */}
    <circle cx="14" cy="13" r="7" fill="#6366f1"/>
    <path d="M2 34 C2 25 26 25 26 34" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

const HourglassIcon: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="3" width="22" height="4" rx="2" fill="#9ca3af"/>
    <rect x="8" y="31" width="22" height="4" rx="2" fill="#9ca3af"/>
    {/* top half */}
    <path d="M10 7 L19 19 L28 7 Z" fill="#f97316" opacity="0.85"/>
    {/* bottom half fill */}
    <path d="M10 31 L19 19 L28 31 Z" fill="#fcd34d" opacity="0.85"/>
    {/* bottom sand */}
    <ellipse cx="19" cy="29" rx="5" ry="2.5" fill="#f97316" opacity="0.7"/>
  </svg>
);

const RocketIcon: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* sun/starburst bg */}
    <circle cx="20" cy="14" r="9" fill="#fcd34d" opacity="0.9"/>
    {/* rocket body */}
    <path d="M18 28 L14 36 L19 32 L24 36 Z" fill="#ef4444" opacity="0.8"/>
    <path d="M14 20 Q19 8 24 20 L24 30 L14 30 Z" fill="#6366f1"/>
    <circle cx="19" cy="20" r="3" fill="#fff" opacity="0.9"/>
    {/* arrows */}
    <path d="M28 22 L32 18 M30 25 L34 21" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const FEATURES: FeatureCardData[] = [
  {
    id         : 'tailored',
    iconEmoji  : '🧩',
    iconElement: <PuzzleIcon />,
    title      : 'Tailored resume for each job',
    body       : 'Your resume is customized with job-specific keywords to match every role you apply to.',
  },
  {
    id         : 'accurate',
    iconEmoji  : '👥',
    iconElement: <PeopleIcon />,
    title      : 'Accurate applications',
    body       : 'Applications are automatically prepared and checked for completeness before submission.',
  },
  {
    id         : 'time',
    iconEmoji  : '⏳',
    iconElement: <HourglassIcon />,
    title      : 'Reclaim your time',
    body       : 'Stop spending hours on applications — focus on what matters: preparing for interviews.',
  },
  {
    id         : 'more',
    iconEmoji  : '🚀',
    iconElement: <RocketIcon />,
    title      : 'Apply to 3x more jobs',
    body       : 'Reach more opportunities with less effort, all tracked in one place.',
  },
];

const FeaturesGrid: React.FC = () => (
  <div className="aafg-grid" role="list">
    {FEATURES.map((feat) => (
      <div key={feat.id} role="listitem">
        <FeatureCard feature={feat} />
      </div>
    ))}
  </div>
);

export default FeaturesGrid;
