import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

/**
 * Component: CareerPathSearchForm
 *
 * Purpose:
 * Renders the search form for entering a starting role (Job Title + Location)
 * to initiate career path exploration.
 *
 * Responsibilities:
 * - Render Job Title input with search icon
 * - Render Location input with pin icon
 * - Render Search button
 * - Call onSearch prop with { jobTitle, location } on submit
 *
 * Design Intent:
 * White card with two stacked input rows separated by a thin divider.
 * Rounded corners (12px), subtle shadow. Below it a full-width blue Search button.
 * On desktop the Search button is inline on the same row as the inputs.
 *
 * Layout Role:
 * Centred below the heading. Max width ~640px.
 *
 * Responsive Behavior:
 * - Mobile: stacked card inputs + separate Search button below
 * - Desktop (≥768px): Job Title | Location | Search all on one row, no card border
 */

interface CareerPathSearchFormProps {
  onSearch?: (params: { jobTitle: string; location: string }) => void;
}

const CareerPathSearchForm: React.FC<CareerPathSearchFormProps> = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({ jobTitle, location });
  };

  return (
    <form onSubmit={handleSubmit} className="cp-search-form w-full max-w-xl mx-auto">

      {/* ── Card: stacked inputs ── */}
      <div className="cp-search-card bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 md:hidden">
        {/* Job Title */}
        <div className="cp-search-row flex items-center px-4 py-3">
          <Search size={18} className="cp-search-icon text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="cp-search-input flex-1 text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
            aria-label="Job Title"
          />
        </div>

        {/* Divider */}
        <div className="cp-search-divider border-t border-gray-100 mx-4" />

        {/* Location */}
        <div className="cp-search-row flex items-center px-4 py-3">
          <MapPin size={18} className="cp-search-icon text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="cp-search-input flex-1 text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
            aria-label="Location"
          />
        </div>
      </div>

      {/* ── Desktop: single-row card ── */}
      <div className="cp-search-card-desktop hidden md:flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
        {/* Job Title */}
        <div className="cp-search-row flex items-center px-4 py-3 flex-1">
          <Search size={18} className="cp-search-icon text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="cp-search-input flex-1 text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
            aria-label="Job Title"
          />
        </div>

        {/* Vertical divider */}
        <div className="cp-search-vdivider w-px bg-gray-200 self-stretch" />

        {/* Location */}
        <div className="cp-search-row flex items-center px-4 py-3 flex-1">
          <MapPin size={18} className="cp-search-icon text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="cp-search-input flex-1 text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
            aria-label="Location"
          />
        </div>
      </div>

      {/* ── Search button (full-width) ── */}
      <button
        type="submit"
        className="cp-search-btn w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-base py-4 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
};

export default CareerPathSearchForm;
