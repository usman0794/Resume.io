import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Component: DocumentsPageHeader
 *
 * Purpose:
 * Renders the top section of the Resumes & Cover Letters page containing
 * the page title and the \"+ Create New\" action button.
 *
 * Responsibilities:
 * - Render \"Resumes & Cover Letters\" H1 heading (left-aligned)
 * - Render blue \"+ Create New\" button (right-aligned, desktop/tablet only)
 * - Fire onCreateNew callback on button click
 *
 * Props:
 *   onCreateNew — callback triggered by Create New button
 *
 * Design Intent:
 * Flex row: heading left, button right. Heading ~28px bold dark gray.
 * Button: blue bg #1e8cff (#3B82F6), white text, rounded-lg, \"+ Create New\".
 * On mobile the button is hidden here (shown below tabs as full-width btn).
 *
 * Layout Role:
 * Top of ResumesPage content area, above the tab bar.
 *
 * Responsive Behavior:
 * - Mobile (<768px): heading only, button hidden (rendered separately below tabs)
 * - Tablet/Desktop (≥768px): heading + button on same row
 */

interface DocumentsPageHeaderProps {
  onCreateNew?: () => void;
}

const DocumentsPageHeader: React.FC<DocumentsPageHeaderProps> = ({ onCreateNew }) => (
  <div className="cl-header flex items-start justify-between mb-4">
    <h1 className="cl-header__title text-[26px] md:text-[28px] font-bold text-gray-900 leading-tight">
      Resumes &amp; Cover Letters
    </h1>

    {/* Desktop/Tablet Create New button — hidden on mobile */}
    <button
      type="button"
      onClick={onCreateNew}
      className="cl-header__create-btn hidden md:inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-[14px] px-4 py-2 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <Plus size={16} strokeWidth={2.5} />
      Create New
    </button>
  </div>
);

export default DocumentsPageHeader;
