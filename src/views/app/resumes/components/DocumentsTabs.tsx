import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';

/**
 * Component: DocumentsTabs
 *
 * Purpose:
 * Tab navigation bar shared between Resumes and Cover Letters pages.
 * Shows \"Resumes\" and \"Cover Letters\" tabs with underline active indicator.
 *
 * Responsibilities:
 * - Render two tabs: Resumes, Cover Letters
 * - Highlight the active tab with dark underline + bold/semibold text
 * - Navigate to respective routes on tab click
 *
 * Props:
 *   activeTab — 'resumes' | 'cover-letters'
 *
 * Design Intent:
 * Tabs sit directly below the page heading. No background, just text.
 * Active tab: near-black text + 2px solid bottom border (black/dark).
 * Inactive tab: gray text (#9ca3af), no underline border.
 * Gap ~24px (mr-6) between tabs.
 * Full-width border-bottom line under the tab bar area.
 *
 * Layout Role:
 * Below DocumentsPageHeader, above the promo banner and content.
 *
 * Responsive Behavior:
 * Full-width border-bottom. Tabs left-aligned. Same on all breakpoints.
 */

type ActiveTab = 'resumes' | 'cover-letters';

interface DocumentsTabsProps {
  activeTab: ActiveTab;
}

const DocumentsTabs: React.FC<DocumentsTabsProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="cl-tabs flex items-end border-b border-gray-200 mb-4">

      {/* Resumes tab */}
      <button
        type="button"
        onClick={() => navigate(ROUTES.APP_RESUMES)}
        className={`cl-tab pb-2.5 mr-6 text-[15px] font-medium border-b-2 -mb-px transition-colors duration-150 focus:outline-none
          ${activeTab === 'resumes'
            ? 'cl-tab--active border-gray-900 text-gray-900 font-semibold'
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
      >
        Resumes
      </button>

      {/* Cover Letters tab */}
      <button
        type="button"
        onClick={() => navigate(ROUTES.APP_RESUMES)}
        className={`cl-tab pb-2.5 text-[15px] font-medium border-b-2 -mb-px transition-colors duration-150 focus:outline-none
          ${activeTab === 'cover-letters'
            ? 'cl-tab--active border-gray-900 text-gray-900 font-semibold'
            : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
      >
        Cover Letters
      </button>
    </div>
  );
};

export type { ActiveTab };
export default DocumentsTabs;
