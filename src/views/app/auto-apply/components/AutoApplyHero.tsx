/**
 * Component: AutoApplyHero
 *
 * Purpose:
 *   The central promotional card on the Auto Apply welcome page.
 *   Three visually distinct sections stacked vertically inside one
 *   rounded light-blue card:
 *     1. Illustration area — animated sparkle/stars SVG on a slightly
 *        deeper blue-gray background (matches the top panel in reference)
 *     2. Copy area — headline + body text centered
 *     3. CTA area — full-width blue "Configure Auto Apply" button
 *
 * Responsibilities:
 *   - Render the sparkle illustration (inline SVG, no external assets)
 *   - Display headline "Save time and let us apply for you"
 *   - Display supporting paragraph
 *   - Render "+ Configure Auto Apply" CTA button
 *   - Fire onConfigure callback on button click
 *
 * Responsive Behavior:
 *   - Desktop: max-width ~860px, centered, 3 internal rows
 *   - Tablet: full-width within content area
 *   - Mobile: full-width, taller illustration zone
 *
 * Design Intent:
 *   Card bg: #f0f4ff (light blue-gray). Illustration zone: same bg with
 *   more vertical padding. Sparkles icon: dark navy + lavender, ~48px.
 *   Headline: 20px 700. Body: 14px #374151 centered, max-width 420px.
 *   CTA: #1A91F0, 15px 600, 13px radius, full-width inside card padding.
 */

import React from 'react';

interface AutoApplyHeroProps {
  onConfigure?: () => void;
}

const SparkleIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Large 4-point star */}
    <path
      d="M22 4 C22 4 23 14 26 18 C29 22 38 22 38 22 C38 22 29 23 26 27 C23 31 22 40 22 40 C22 40 21 31 18 27 C15 23 6 22 6 22 C6 22 15 22 18 18 C21 14 22 4 22 4Z"
      fill="#312e81"
    />
    {/* Small 4-point star top-right */}
    <path
      d="M38 8 C38 8 38.6 12 40 13.5 C41.4 15 45 15 45 15 C45 15 41.4 15.5 40 17 C38.6 18.5 38 22 38 22 C38 22 37.4 18.5 36 17 C34.6 15.5 31 15 31 15 C31 15 34.6 15 36 13.5 C37.4 12 38 8 38 8Z"
      fill="#818cf8"
    />
  </svg>
);

const AutoApplyHero: React.FC<AutoApplyHeroProps> = ({ onConfigure }) => (
  <div className="aah-card">
    {/* ── Illustration zone ── */}
    <div className="aah-illo">
      <SparkleIcon />
    </div>

    {/* ── Copy zone ── */}
    <div className="aah-copy">
      <h2 className="aah-headline">Save time and let us apply for you</h2>
      <p className="aah-body">
        Get personalized job recommendations, choose the roles you want, and
        we'll submit tailored applications for you.
      </p>
    </div>

    {/* ── CTA zone ── */}
    <div className="aah-cta-zone">
      <button className="aah-cta-btn" onClick={onConfigure}>
        + Configure Auto Apply
      </button>
    </div>
  </div>
);

export default AutoApplyHero;
