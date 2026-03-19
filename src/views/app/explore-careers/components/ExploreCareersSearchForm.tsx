import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface ExploreCareersSearchFormProps {
  onSearch: (params: { jobTitle: string; location: string }) => void;
}

const ExploreCareersSearchForm: React.FC<ExploreCareersSearchFormProps> = ({ onSearch }) => {
  const [jobTitle, setJobTitle]   = useState('');
  const [location, setLocation]   = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ jobTitle: jobTitle.trim(), location: location.trim() });
  };

  return (
    <form className="ec-search-form" onSubmit={handleSubmit}>
      <div className="ec-search-card">
        {/* Job Title field */}
        <div className="ec-search-field">
          <Search size={18} className="ec-search-field__icon" />
          <input
            type="text"
            className="ec-search-field__input"
            placeholder="Job title or keyword"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            aria-label="Job title or keyword"
          />
        </div>

        <div className="ec-search-divider" aria-hidden="true" />

        {/* Location field */}
        <div className="ec-search-field">
          <MapPin size={18} className="ec-search-field__icon" />
          <input
            type="text"
            className="ec-search-field__input"
            placeholder="City, state, or country"
            value={location}
            onChange={e => setLocation(e.target.value)}
            aria-label="Location"
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="ec-search-btn"
          disabled={!jobTitle.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default ExploreCareersSearchForm;
