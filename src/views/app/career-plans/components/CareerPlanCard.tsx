import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Component: CareerPlanCard
 *
 * Purpose:
 * Renders a single career plan card with a "New" badge, illustration image,
 * plan title, short description, and a chevron arrow navigate button.
 *
 * Responsibilities:
 * - Display plan illustration (remote CDN image)
 * - Show optional "New" badge (green, top-left)
 * - Render title and description text
 * - Fire onClick when card or arrow button is pressed
 *
 * Props:
 *   title        — plan name
 *   description  — short subtitle
 *   imageUrl     — CDN URL of the plan illustration SVG
 *   isNew        — whether to show the green "New" badge
 *   onClick      — navigation callback
 *
 * Design Intent:
 * Light-green tinted card (#f0fdf4 / #dcfce7 range), rounded 16px, no hard border.
 * Illustration centred in an airy upper section. Title 18px bold. Desc 13px gray.
 * Arrow button bottom-right, circular gray bg.
 * Desktop: 4-column grid. Mobile: full-width vertical stack.
 *
 * Layout Role:
 * Grid child inside CareerPlansGrid.
 *
 * Responsive Behavior:
 * Fixed aspect on desktop; auto height on mobile (stacked).
 */

interface CareerPlanCardProps {
  title:       string;
  description: string;
  imageUrl:    string;
  isNew?:      boolean;
  onClick?:    () => void;
}

const CareerPlanCard: React.FC<CareerPlanCardProps> = ({
  title,
  description,
  imageUrl,
  isNew = false,
  onClick,
}) => (
  <article
    className="cpl-card relative bg-[#f0fdf4] rounded-2xl overflow-hidden cursor-pointer group transition-shadow duration-200 hover:shadow-md"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    aria-label={`${title} career plan`}
  >
    {/* New badge */}
    {isNew && (
      <span className="cpl-card__badge absolute top-4 left-4 z-10 bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
        New
      </span>
    )}

    {/* Illustration area */}
    <div className="cpl-card__illustration flex items-center justify-center pt-10 pb-6 px-6 min-h-[180px]">
      <img
        src={imageUrl}
        alt={title}
        className="cpl-card__img max-h-[130px] w-auto object-contain"
        loading="lazy"
      />
    </div>

    {/* Content + arrow */}
    <div className="cpl-card__content flex items-end justify-between px-5 pb-5 gap-3">
      <div className="cpl-card__text flex-1 min-w-0">
        <h3 className="cpl-card__title text-[17px] font-bold text-gray-900 leading-snug mb-1">
          {title}
        </h3>
        <p className="cpl-card__desc text-[13px] text-gray-500 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      {/* Arrow button */}
      <button
        type="button"
        className="cpl-card__arrow flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-gray-50 transition-colors"
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        aria-label={`Go to ${title}`}
      >
        <ChevronRight size={16} className="text-gray-500" />
      </button>
    </div>
  </article>
);

export default CareerPlanCard;
