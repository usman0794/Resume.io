import React from 'react';

/**
 * Component: CareerPathHero
 *
 * Purpose:
 * Renders the centred heading block for the Career Path page.
 *
 * Responsibilities:
 * - Render primary heading "Add your starting role to build your career path"
 *
 * Design Intent:
 * Bold ~24-28px heading, centred, dark (#1a1a2e or near-black), no subheading.
 * Matches reference screenshot typography exactly.
 *
 * Layout Role:
 * Placed between the illustration and the search form.
 *
 * Responsive Behavior:
 * Heading wraps naturally on mobile (~2 lines), single line on wide desktop.
 */

const CareerPathHero: React.FC = () => (
  <div className="cp-hero text-center mb-8 px-4">
    <h1 className="cp-hero__heading text-[26px] md:text-[28px] font-bold text-gray-900 leading-tight max-w-sm mx-auto md:max-w-md">
      Add your starting role to build your career path
    </h1>
  </div>
);

export default CareerPathHero;
