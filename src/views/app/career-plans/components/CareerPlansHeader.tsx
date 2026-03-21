import React from 'react';

/**
 * Component: CareerPlansHeader
 *
 * Purpose:
 * Renders the page-level heading block for the Career Plans listing page.
 *
 * Responsibilities:
 * - Render "Career Plans" H1 heading
 * - Render supporting description paragraph
 *
 * Design Intent:
 * Left-aligned on desktop (matching reference). Heading ~28-32px bold,
 * dark gray. Description ~15px regular gray beneath. Matches
 * resume.io career-plans screen exactly.
 *
 * Layout Role:
 * Top of the CareerPlansPage content area, above the grid.
 *
 * Responsive Behavior:
 * Left-aligned on all breakpoints.
 */

const CareerPlansHeader: React.FC = () => (
  <header className="cpl-header mb-8">
    <h1 className="cpl-header__title text-[28px] md:text-[32px] font-bold text-gray-900 leading-tight mb-2">
      Career Plans
    </h1>
    <p className="cpl-header__desc text-[15px] text-gray-500 leading-relaxed max-w-2xl">
      Here are career plans that contain videos, educational materials, as well as checklists
      with tasks that will help you advance your career or find a new job.
    </p>
  </header>
);

export default CareerPlansHeader;
