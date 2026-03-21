import React from 'react';

/**
 * ExploreCareersIllustration
 * Decorative SVG illustration shown at the top of the Explore Careers page.
 */
const ExploreCareersIllustration: React.FC = () => (
  <div className="ec-illustration" aria-hidden="true">
    <svg
      width="220"
      height="160"
      viewBox="0 0 220 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="110" cy="80" r="72" fill="#EEF6FF" />

      {/* Magnifying glass body */}
      <circle cx="95" cy="68" r="30" stroke="#1A91F0" strokeWidth="8" fill="white" />

      {/* Magnifying glass handle */}
      <line x1="117" y1="90" x2="145" y2="118" stroke="#1A91F0" strokeWidth="8" strokeLinecap="round" />

      {/* Small sparkle dots */}
      <circle cx="60" cy="42" r="5" fill="#93C5FD" />
      <circle cx="150" cy="38" r="4" fill="#BFDBFE" />
      <circle cx="160" cy="110" r="6" fill="#DBEAFE" />
      <circle cx="48" cy="115" r="4" fill="#93C5FD" />

      {/* Resume lines inside glass */}
      <line x1="81" y1="62" x2="108" y2="62" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <line x1="81" y1="70" x2="108" y2="70" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
      <line x1="81" y1="78" x2="100" y2="78" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

export default ExploreCareersIllustration;
