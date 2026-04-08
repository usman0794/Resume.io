/**
 * Component: BoardHeader
 *
 * Purpose:
 *   Top bar of the Job Tracker board view.
 *   Shows "Board" tab with active underline + filter icon on the right.
 *
 * Responsibilities:
 *   - "Board" tab label with blue active underline
 *   - Filter/sliders icon button (right side)
 *   - Extensible for future "List" view tab
 *
 * Design Intent:
 *   Matches resume.io: "Board" 16px bold, 2px blue underline, 
 *   sliders icon (#6b7280) at far right. Bottom border separator.
 *   Consistent 20px horizontal padding.
 */

import React from 'react';
import { LayoutDashboard, SlidersHorizontal } from 'lucide-react';

interface BoardHeaderProps {
  onFilterClick?: () => void;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ onFilterClick }) => (
  <div className="jtkh-bar">
    {/* Left: Board tab */}
    <div className="jtkh-tabs">
      <button className="jtkh-tab jtkh-tab-active">
        <LayoutDashboard size={15} strokeWidth={2} color="#111827" />
        <span>Board</span>
      </button>
    </div>

    {/* Right: Filter icon */}
    <button
      className="jtkh-filter-btn"
      onClick={onFilterClick}
      aria-label="Filter board"
    >
      <SlidersHorizontal size={18} color="#6b7280" strokeWidth={2} />
    </button>
  </div>
);

export default BoardHeader;
