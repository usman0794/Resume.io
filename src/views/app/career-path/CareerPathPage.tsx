import React from 'react';
import CareerPathIllustration from './components/CareerPathIllustration';
import CareerPathHero from './components/CareerPathHero';
import CareerPathSearchForm from './components/CareerPathSearchForm';
import './career-path.css';

/**
 * Component: CareerPathPage
 *
 * Purpose:
 * Full-page view for the "Career Path" feature — lets users enter a
 * starting job title and location to explore branching career options.
 *
 * Responsibilities:
 * - Compose all sub-components in correct visual order
 * - Handle search submission (stub — extend with API call)
 * - Own the .cp-page layout wrapper
 *
 * Design Intent:
 * Clean white centred layout. Top: branching-paths illustration. Middle:
 * bold heading. Bottom: card search form + blue Search button. Matches
 * the resume.io career-path screen pixel-for-pixel.
 *
 * Layout Role:
 * Rendered inside AppLayout's <main> scrollable column.
 *
 * Responsive Behavior:
 * - Mobile/tablet: illustration 300px, stacked card inputs, full-width button
 * - Desktop: illustration 340px, single-row card inputs side-by-side
 */

const CareerPathPage: React.FC = () => {
  const handleSearch = (params: { jobTitle: string; location: string }) => {
    // TODO: wire to career-path API
    console.log('[CareerPathPage] search:', params);
  };

  return (
    <div className="cp-page">
      <CareerPathIllustration />
      <CareerPathHero />
      <CareerPathSearchForm onSearch={handleSearch} />
    </div>
  );
};

export { CareerPathPage };
export default CareerPathPage;
