import React from 'react';

/**
 * Component: ExploreCareersHero
 *
 * Purpose:
 * Renders the centred heading "Enter the job title you want to know about"
 * for the Explore Careers page.
 *
 * Responsibilities:
 * - Render primary H1 heading text
 *
 * Design Intent:
 * ~24–28px bold, dark gray, centred, wraps to 2 lines on mobile.
 * Max width ~480px to keep natural line breaks matching reference.
 *
 * Layout Role:
 * Between illustration and search form.
 *
 * Responsive Behavior:
 * Centred on all breakpoints. Line break after "to" on mobile.
 */

const ExploreCareersHero: React.FC = () => (
  <div className="ec-hero text-center mb-8 px-4">
    <h1 className="ec-hero__heading text-[24px] md:text-[26px] font-bold text-gray-900 leading-snug max-w-[420px] mx-auto">
      Enter the job title you want to know about
    </h1>
  </div>
);

export default ExploreCareersHero;
