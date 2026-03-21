/**
 * Component: JobSearchTabs
 *
 * Purpose:
 *   Horizontal tab bar that switches between "Recommended Jobs" and
 *   "Search (count)" views plus a saved-jobs heart counter on the right.
 *
 * Responsibilities:
 *   - Renders two tabs with active blue underline indicator
 *   - Shows total search-result count next to "Search" label
 *   - Emits onTabChange when user switches tabs
 *   - Saved-jobs heart button with count badge
 *
 * Responsive Behavior:
 *   - Full-width, scrollable on small screens
 *   - Heart + filter icons collapse label on very small screens
 *
 * Design Intent:
 *   Clean white tab row; 2px brand-blue bottom border on active tab.
 *   Gray text for inactive, dark text + bold for active.
 */

import React from 'react';
import { Heart, SlidersHorizontal } from 'lucide-react';

export type JobTab = 'recommended' | 'search';

interface JobSearchTabsProps {
  activeTab     : JobTab;
  onTabChange   : (tab: JobTab) => void;
  searchCount?  : number;
  savedCount?   : number;
  showFilters?  : boolean;
  onFiltersClick?: () => void;
  onSavedClick? : () => void;
}

const JobSearchTabs: React.FC<JobSearchTabsProps> = ({
  activeTab,
  onTabChange,
  searchCount    = 12525995,
  savedCount     = 0,
  showFilters    = true,
  onFiltersClick,
  onSavedClick,
}) => {
  const fmtCount = (n: number) =>
    n >= 1_000_000
      ? `${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
        ? `${(n / 1_000).toFixed(0)}k`
        : n.toString();

  return (
    <div className="jst-bar">
      {/* ── Tabs ── */}
      <div className="jst-tabs">
        <button
          className={`jst-tab${activeTab === 'recommended' ? ' jst-tab-active' : ''}`}
          onClick={() => onTabChange('recommended')}
        >
          Recommended Jobs
        </button>

        <button
          className={`jst-tab${activeTab === 'search' ? ' jst-tab-active' : ''}`}
          onClick={() => onTabChange('search')}
        >
          Search&nbsp;
          <span className="jst-tab-count">({fmtCount(searchCount)})</span>
        </button>
      </div>

      {/* ── Right actions ── */}
      <div className="jst-actions">
        {showFilters && (
          <button
            className="jst-icon-btn"
            onClick={onFiltersClick}
            aria-label="Filters"
          >
            <SlidersHorizontal size={18} color="#6b7280" strokeWidth={2} />
          </button>
        )}

        <button
          className="jst-saved-btn"
          onClick={onSavedClick}
          aria-label={`Saved jobs: ${savedCount}`}
        >
          <Heart size={18} color="#6b7280" strokeWidth={2} />
          <span className="jst-saved-label">
            {savedCount > 0 ? savedCount : '0'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default JobSearchTabs;
