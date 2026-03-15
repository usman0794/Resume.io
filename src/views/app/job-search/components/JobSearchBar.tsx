/**
 * Component: JobSearchBar
 *
 * Purpose:
 *   Top search widget with two inputs (Job title/company + Location) and
 *   a "Find jobs" CTA button. Matches the resume.io reference exactly.
 *
 * Responsibilities:
 *   - Controlled inputs for query & location
 *   - Fires onSearch callback on button click or Enter key
 *   - Renders inside a white card with a subtle border/shadow
 *
 * Responsive Behavior:
 *   - Mobile: stacked layout, full-width inputs
 *   - Desktop: single-row layout with inputs inline and button at the end
 *
 * Design Intent:
 *   White card, light border, 12px radius, 24px padding.
 *   Blue "Find jobs" button (#1A91F0). Icon prefix on each input.
 */

import React, { useState, type KeyboardEvent } from 'react';
import { Search, MapPin } from 'lucide-react';

interface JobSearchBarProps {
  onSearch: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({
  onSearch,
  initialQuery = '',
  initialLocation = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSearch = () => onSearch(query, location);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="jsb-card">
      {/* ── Job title / company ── */}
      <div className="jsb-field">
        <Search size={18} color="#9ca3af" strokeWidth={2} />
        <input
          type="text"
          className="jsb-input"
          placeholder="Job title or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Job title or company"
        />
      </div>

      {/* ── Divider (visible on desktop) ── */}
      <div className="jsb-divider" />

      {/* ── Location ── */}
      <div className="jsb-field">
        <MapPin size={18} color="#9ca3af" strokeWidth={2} />
        <input
          type="text"
          className="jsb-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Location"
        />
      </div>

      {/* ── CTA Button ── */}
      <button
        className="jsb-btn"
        onClick={handleSearch}
        aria-label="Find jobs"
      >
        Find jobs
      </button>
    </div>
  );
};

export default JobSearchBar;
