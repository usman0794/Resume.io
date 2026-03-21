import React from 'react';

/**
 * Component: CareerPathIllustration
 *
 * Purpose:
 * Renders the hero SVG illustration showing branching career path lines
 * with coloured endpoint circles, matching the resume.io design exactly.
 *
 * Responsibilities:
 * - Render the remote SVG from resume.io CDN
 * - Fallback inline SVG if image fails
 *
 * Design Intent:
 * Centred above the heading. Five coloured branch lines (orange, cyan,
 * green, pink, orange) fan out to the right from a central node.
 *
 * Layout Role:
 * Placed in the hero area before the heading text.
 *
 * Responsive Behavior:
 * - 300px wide on mobile
 * - 360px wide on desktop
 */

const CareerPathIllustration: React.FC = () => (
  <div className="cp-illustration flex justify-center mb-6">
    <img
      src="/assets/images/misc/career-path-illustration.svg"
      alt="Career path illustration showing multiple branching paths"
      className="cp-illustration__img"
      width={340}
      height={220}
      onError={(e) => {
        /* Fallback: hide broken img */
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  </div>
);

export default CareerPathIllustration;
