import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Component: AppMobileHeader
 *
 * Sticky top header for mobile/tablet (<1024px).
 * Layout: [logo left] [page name ▼ center] [avatar+badge right]
 *
 * Styling: src/styles/app-layout.css (.al-mob-header, .al-mob-shell, etc.)
 * No inline style= props.
 */
interface AppMobileHeaderProps {
  pageName?: string;
  onMenuClick?: () => void;
}

const AppMobileHeader: React.FC<AppMobileHeaderProps> = ({
  pageName = 'Dashboard',
  onMenuClick,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <header className="al-mob-header al-mob-shell flex-shrink-0 w-full">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-1.5">
        <div className="al-mob-brand-icon">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="3" width="10" height="2" rx="1" fill="white" opacity="0.9" />
            <rect x="3" y="7" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7" />
            <rect x="3" y="10.5" width="7" height="1.5" rx="0.75" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="al-mob-brand-name">resume.io</span>
          <span className="al-mob-brand-sub">by Muhammad Nabeel Ijaz</span>
        </div>
      </div>

      {/* CENTER: Page name dropdown */}
      <button
        className="al-page-dropdown"
        onClick={() => { setDropOpen((v) => !v); onMenuClick?.(); }}
        aria-expanded={dropOpen}
        aria-haspopup="true"
      >
        <span className="text-base font-bold text-gray-900">{pageName}</span>
        <ChevronDown
          size={14}
          color="#374151"
          className={`al-chevron ${dropOpen ? 'al-chevron-open' : 'al-chevron-closed'}`}
        />
      </button>

      {/* RIGHT: Avatar with orange ring + score badge */}
      <div className="relative flex-shrink-0">
        <div className="al-avatar-ring al-avatar-ring-mob">
          <div className="al-avatar-inner">
            <svg width="26" height="26" fill="#d1d5db" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="al-score-badge al-score-badge-mob">45%</div>
      </div>
    </header>
  );
};

export default AppMobileHeader;
