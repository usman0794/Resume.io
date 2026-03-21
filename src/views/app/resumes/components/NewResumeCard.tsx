import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Component: NewResumeCard
 *
 * Purpose:
 * Renders the "New Resume" creation card that sits alongside existing resume
 * cards in the ResumeGrid. Clicking it triggers the new resume creation flow.
 *
 * Responsibilities:
 * - Render a white dashed-border placeholder card with a centred gray "+" circle
 * - Render "New Resume" title (gray, lighter than real resume title)
 * - Render description text: "Create a tailored resume for each job application..."
 * - Fire onCreate callback on click (keyboard: Enter)
 * - Show hover state: blue tint on "+" circle and border
 *
 * Props:
 *   onCreate — callback to start new resume flow
 *
 * Design Intent:
 * Same two-column flex layout as ResumeCard — left placeholder card,
 * right text column.
 * Left card: dashed border (border-dashed border-gray-200), bg-white, rounded-lg.
 * "+" circle: w-11 h-11, border-2 border-gray-300, gray-400 Plus icon (20px).
 * Hover: border-blue-300 on card, border-blue-400 on circle, blue-400 on icon.
 * Title: text-[16–18px] font-semibold text-gray-400 (lighter than ResumeCard).
 * Description: text-[13px] text-gray-400, max-w-[200px], leading-relaxed.
 *
 * Layout Role:
 * Final item in ResumeGrid — always appended after existing ResumeCards.
 *
 * Responsive Behavior:
 * - Mobile (<768px): placeholder card 120px wide, min-height 160px
 * - Desktop/Tablet (≥768px): placeholder card 172px wide, min-height 220px
 */

interface NewResumeCardProps {
  onCreate?: () => void;
}

const NewResumeCard: React.FC<NewResumeCardProps> = ({ onCreate }) => (
  <div
    className="nrc-card flex gap-5 md:gap-6 py-2 cursor-pointer group"
    onClick={onCreate}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onCreate?.()}
    aria-label="Create a new resume"
  >
    {/* ── Placeholder card ─────────────────────────────────── */}
    <div className="nrc-placeholder flex-shrink-0 w-[120px] md:w-[172px] rounded-lg border border-dashed border-gray-200 bg-white flex items-center justify-center self-start min-h-[160px] md:min-h-[220px] group-hover:border-blue-300 transition-colors">
      <div className="nrc-plus w-11 h-11 rounded-full border-2 border-gray-300 group-hover:border-blue-400 flex items-center justify-center transition-colors">
        <Plus
          size={20}
          className="text-gray-400 group-hover:text-blue-400 transition-colors"
        />
      </div>
    </div>

    {/* ── Text column ──────────────────────────────────────── */}
    <div className="nrc-text flex flex-col pt-2">
      <h3 className="nrc-title text-[16px] md:text-[18px] font-semibold text-gray-400 group-hover:text-gray-500 leading-snug mb-1.5 transition-colors">
        New Resume
      </h3>
      <p className="nrc-desc text-[13px] text-gray-400 leading-relaxed max-w-[200px]">
        Create a tailored resume for each job application. Double your chances of getting hired!
      </p>
    </div>
  </div>
);

export default NewResumeCard;
