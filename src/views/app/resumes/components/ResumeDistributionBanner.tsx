import React from 'react';

/**
 * Component: ResumeDistributionBanner
 *
 * Purpose:
 * Promotional banner below the tab bar prompting users to distribute their
 * resume to recruiters via the Resume Distribution feature.
 *
 * Responsibilities:
 * - Render envelope + smiley face SVG illustration (left)
 * - Render headline + body copy text (centre/flex-1)
 * - Render \"Start Now\" outlined button (right)
 * - Fire onStartNow on button click
 *
 * Props:
 *   onStartNow — callback for Start Now button
 *
 * Design Intent:
 * Light gray/white card (bg-gray-50), border border-gray-200, rounded-xl.
 * Three-part flex row on desktop: icon | text | button.
 * On mobile: icon + text wrap together, button sits to right on same line.
 * Envelope: amber/yellow body with smiley face overlay (inline SVG).
 * Headline: ~14px semibold dark. Body: ~13px gray-500.
 * Button: white bg, gray-300 border, gray-800 text, rounded-lg.
 *
 * Layout Role:
 * Directly below the tabs, above the resume card grid.
 *
 * Responsive Behavior:
 * - Mobile: icon + text flex-1, button self-center right
 * - Desktop: single flex row, all items centred vertically
 */

interface ResumeDistributionBannerProps {
  onStartNow?: () => void;
}

const ResumeDistributionBanner: React.FC<ResumeDistributionBannerProps> = ({ onStartNow }) => (
  <div className="cl-promo-banner flex items-start md:items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 mb-6">

    {/* Envelope + smiley icon */}
    <div className="cl-promo-banner__icon flex-shrink-0 w-11 h-11 flex items-center justify-center">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Envelope body */}
        <rect x="4" y="10" width="36" height="26" rx="4" fill="#F59E0B" />
        {/* Envelope flap crease */}
        <path d="M4 14l18 11 18-11" stroke="#D97706" strokeWidth="1.5" fill="none" />
        {/* Smiley face circle */}
        <circle cx="22" cy="20" r="7" fill="#FDE68A" />
        {/* Eyes */}
        <circle cx="19.5" cy="19" r="1" fill="#374151" />
        <circle cx="24.5" cy="19" r="1" fill="#374151" />
        {/* Smile */}
        <path
          d="M19.5 22.5 Q22 24.5 24.5 22.5"
          stroke="#374151"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {/* Text block */}
    <div className="cl-promo-banner__text flex-1 min-w-0">
      <p className="cl-promo-banner__heading text-[13px] md:text-[14px] font-semibold text-gray-900 leading-snug mb-0.5">
        Ready to give your job search a boost and get more exposure?
      </p>
      <p className="cl-promo-banner__desc text-[12px] md:text-[13px] text-gray-500 leading-snug">
        Choose your resume and we'll send it to hundreds of recruiters in your field in just a few clicks
      </p>
    </div>

    {/* Start Now button */}
    <button
      type="button"
      onClick={onStartNow}
      className="cl-promo-banner__btn flex-shrink-0 self-center mt-0 border border-gray-300 bg-white text-[13px] font-semibold text-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-200 whitespace-nowrap"
    >
      Start Now
    </button>
  </div>
);

export default ResumeDistributionBanner;
