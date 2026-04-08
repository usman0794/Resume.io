import React from 'react';
import ExploreCareersIllustration from './components/ExploreCareersIllustration';
import ExploreCareersHero from './components/ExploreCareersHero';
import ExploreCareersSearchForm from './components/ExploreCareersSearchForm';
import './explore-careers.css';

/**
 * Component: ExploreCareersPage
 *
 * Purpose:
 * Full-page view for the "Explore Careers" feature. Lets users search
 * for a job title to discover career info, salary data, and role details.
 *
 * Responsibilities:
 * - Compose illustration + heading + search form
 * - Handle search submission (stub — extend with API)
 *
 * Design Intent:
 * Centred white layout. Illustration top, bold heading, search card below.
 * Identical structural pattern to CareerPathPage but with distinct
 * illustration, heading text, and desktop inline search button layout.
 * Matches resume.io /app/explore-careers pixel-for-pixel.
 *
 * Layout Role:
 * Rendered inside AppLayout <main> at route /app/explore-careers.
 *
 * Responsive Behavior:
 * - Mobile: stacked card inputs + separate Search btn
 * - Desktop: single-row card with inline Search btn on right
 */

const ExploreCareersPage: React.FC = () => {
  const handleSearch = (params: { jobTitle: string; location: string }) => {
    // TODO: wire to explore-careers API
    console.log('[ExploreCareersPage] search:', params);
  };

  return (
    <div className="ec-page">
      <ExploreCareersIllustration />
      <ExploreCareersHero />
      <ExploreCareersSearchForm onSearch={handleSearch} />
    </div>
  );
};

export { ExploreCareersPage };
export default ExploreCareersPage;
