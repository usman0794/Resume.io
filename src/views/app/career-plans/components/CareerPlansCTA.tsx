import React from 'react';

/**
 * Component: CareerPlansCTA
 *
 * Purpose:
 * Renders the bottom CTA section encouraging users to suggest new career plans.
 *
 * Responsibilities:
 * - Render "New career plans are on the way" heading
 * - Render "What other plans would you like?" subtext
 * - Render "Suggest a plan" outlined button
 * - Handle onClick for suggest action
 *
 * Props:
 *   onSuggest — optional callback for the suggest button
 *
 * Design Intent:
 * Centred text, separated from grid by a full-width horizontal rule.
 * Heading 16px semibold, desc 14px gray. Button: white bg, gray border, rounded-md.
 * Matches the reference bottom section exactly.
 *
 * Layout Role:
 * Below the plan cards grid, after a <hr /> divider.
 *
 * Responsive Behavior:
 * Centred on all breakpoints.
 */

interface CareerPlansCTAProps {
  onSuggest?: () => void;
}

const CareerPlansCTA: React.FC<CareerPlansCTAProps> = ({ onSuggest }) => (
  <section className="cpl-cta text-center pt-10 mt-6">
    <hr className="cpl-cta__divider border-gray-200 mb-10" />
    <h2 className="cpl-cta__heading text-[16px] font-semibold text-gray-900 mb-1">
      New career plans are on the way
    </h2>
    <p className="cpl-cta__sub text-[14px] text-gray-400 mb-6">
      What other plans would you like?
    </p>
    <button
      type="button"
      onClick={onSuggest}
      className="cpl-cta__btn inline-flex items-center justify-center px-7 py-2.5 rounded-md border border-gray-300 bg-white text-[14px] font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      Suggest a plan
    </button>
  </section>
);

export default CareerPlansCTA;
