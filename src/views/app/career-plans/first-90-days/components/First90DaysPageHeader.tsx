import React from 'react';

/**
 * Component: First90DaysPageHeader
 *
 * Purpose:
 * Renders the top heading block for the First 90 Days career plan detail page.
 *
 * Responsibilities:
 * - Render "First 90 Days" H1 page title (bold, ~32px desktop / ~26px mobile)
 * - Render supporting subtitle paragraph beneath
 *
 * Design Intent:
 * Left-aligned header matching resume.io reference exactly.
 * Title: ~32px bold dark gray (#111827) on desktop, ~26px on mobile.
 * Subtitle: ~15px text-gray-500, normal weight, left-aligned.
 * No decorative elements — clean typographic hierarchy.
 *
 * Layout Role:
 * Topmost element of First90DaysPage content area, above the two-column grid.
 *
 * Responsive Behavior:
 * - Mobile (<768px): 26px title, subtitle wraps naturally
 * - Desktop (≥768px): 32px title, single-line subtitle where possible
 */
const First90DaysPageHeader: React.FC = () => (
  <header className="f90-header mb-6">
    <h1 className="f90-header__title text-[26px] md:text-[32px] font-bold text-gray-900 leading-tight mb-1.5">
      First 90 Days
    </h1>
    <p className="f90-header__subtitle text-[14px] md:text-[15px] text-gray-500 leading-relaxed">
      Ensure you start your new job with confidence and stellar performance.
    </p>
  </header>
);

export default First90DaysPageHeader;
