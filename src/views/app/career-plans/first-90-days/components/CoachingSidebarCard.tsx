import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Component: CoachingSidebarCard
 *
 * Purpose:
 * Renders the coaching promotion card shown alongside the video card.
 * On desktop it appears as a fixed-width sidebar card (right column).
 * On tablet it appears as a full-width card below the main card.
 * On mobile it appears as a collapsible row with coach avatars + "Find a coach" label.
 *
 * Responsibilities:
 * - Desktop: render white card with heading, subtext, "Book a Coach" button
 * - Tablet: same layout as desktop card but full-width
 * - Mobile: collapsible accordion row. Closed state: avatars + "Find a coach" + chevron.
 *           Expanded state: full card content revealed.
 * - Handle expand/collapse toggle on mobile
 * - Handle "Book a Coach" click (fires onBookCoach prop)
 *
 * Props:
 *   onBookCoach — optional callback when "Book a Coach" button pressed
 *
 * Design Intent:
 * Desktop card: white bg, border border-gray-200, rounded-xl, padding 20px.
 * Heading: "You are 78% more likely to achieve your goals working with a coach"
 *   ~15px font-bold text-gray-900, leading-snug.
 * Subtext: "Engage a professional coach and get results!" ~13px text-gray-500.
 * "Book a Coach" button: bg-[#1A91F0] blue, white text, rounded-md, 13px font-semibold.
 * No illustration — text + button only in desktop card.
 *
 * Mobile collapsed state: white card-like row, border, rounded-xl.
 *   Left: three overlapping coach avatar circles (real resume.io coach photo CDN or colored circles).
 *   Right of avatars: "Find a coach" 15px font-semibold gray-800.
 *   Far right: ChevronDown icon (rotates 180° when expanded).
 *
 * Layout Role:
 * - Desktop (≥1024px): right column in 2-col grid alongside CareerPlanVideoCard
 * - Tablet (768–1023px): full-width below CareerPlanVideoCard
 * - Mobile (<768px): collapsible row at bottom of content
 *
 * Responsive Behavior:
 * - Mobile (<768px): collapsed accordion, expand on tap
 * - Tablet (768–1023px): full card, no accordion
 * - Desktop (≥1024px): fixed right column card, no accordion
 */

interface CoachingSidebarCardProps {
  onBookCoach?: () => void;
}

/* ── Avatar colours for placeholder circles ── */
const AVATAR_COLORS = ['#f59e0b', '#10b981', '#6366f1'];

const CoachAvatars: React.FC = () => (
  <div className="f90-coaching__avatars flex items-center">
    {AVATAR_COLORS.map((color, i) => (
      <div
        key={i}
        className="f90-coaching__avatar w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{
          backgroundColor: color,
          marginLeft: i > 0 ? -10 : 0,
          zIndex: AVATAR_COLORS.length - i,
        }}
      >
        {/* Generic person silhouette */}
        <svg width="16" height="16" viewBox="0 0 20 20" fill="white" aria-hidden="true">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </div>
    ))}
  </div>
);

/* ── Shared card content (shown in all non-mobile states + mobile expanded) ── */
const CardContent: React.FC<{ onBookCoach?: () => void }> = ({ onBookCoach }) => (
  <div className="f90-coaching__content">
    <p className="f90-coaching__heading text-[15px] font-bold text-gray-900 leading-snug mb-2">
      You are 78% more likely to achieve your goals working with a coach
    </p>
    <p className="f90-coaching__sub text-[13px] text-gray-500 mb-4 leading-relaxed">
      Engage a professional coach and get results!
    </p>
    <button
      type="button"
      onClick={onBookCoach}
      className="f90-coaching__btn bg-[#1A91F0] hover:bg-[#1580d6] active:bg-[#1270c0] text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 border-none cursor-pointer"
    >
      Book a Coach
    </button>
  </div>
);

const CoachingSidebarCard: React.FC<CoachingSidebarCardProps> = ({ onBookCoach }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <>
      {/* ── Desktop & Tablet: standard card (hidden on mobile) ── */}
      <aside className="f90-coaching-card hidden md:block bg-white border border-gray-200 rounded-xl p-5 self-start">
        <CardContent onBookCoach={onBookCoach} />
      </aside>

      {/* ── Mobile: collapsible accordion row (hidden on md+) ── */}
      <div className="f90-coaching-mobile md:hidden bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* Collapsed header row (always visible on mobile) */}
        <button
          type="button"
          className="f90-coaching-mobile__toggle w-full flex items-center justify-between px-4 py-4 bg-transparent border-none cursor-pointer focus:outline-none"
          onClick={() => setMobileExpanded((v) => !v)}
          aria-expanded={mobileExpanded}
          aria-label={mobileExpanded ? 'Collapse coaching info' : 'Expand coaching info'}
        >
          <div className="flex items-center gap-3">
            <CoachAvatars />
            <span className="text-[15px] font-semibold text-gray-800 text-left">
              Find a coach
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 flex-shrink-0 f90-coaching-chevron ${mobileExpanded ? 'f90-coaching-chevron--open' : 'f90-coaching-chevron--closed'}`}
          />
        </button>

        {/* Expanded content */}
        {mobileExpanded && (
          <div className="f90-coaching-mobile__body px-4 pb-4 border-t border-gray-100 pt-3">
            <CardContent onBookCoach={onBookCoach} />
          </div>
        )}
      </div>
    </>
  );
};

export default CoachingSidebarCard;
