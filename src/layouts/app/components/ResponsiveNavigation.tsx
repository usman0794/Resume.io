import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Lucide used only for chevrons / X (stroke-style utility icons)
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
// HeroIcons v2 Solid — all genuinely filled/solid
import {
  Squares2X2Icon as LayoutDashboard,       // Dashboard
  DocumentTextIcon as FileText,             // Documents
  BriefcaseIcon as Briefcase,               // Jobs
  ClipboardDocumentCheckIcon as CheckSquare,// Job Tracker
  PaperAirplaneIcon as Send,               // Auto Apply / Resume Distribution
  PresentationChartBarIcon as Presentation, // Interview Prep
  CurrencyDollarIcon as CircleDollarSign,  // Salary Analyzer
  AcademicCapIcon as GraduationCap,        // Unlimited Learning
  MapIcon as Compass,                      // Job Search Method
  PhoneIcon as Headphones,                 // Coaching  (closest solid icon)
  EllipsisHorizontalIcon as MoreHorizontal,// Other
  MapPinIcon as MapPin,                    // Explore Careers
  BoltIcon as Target,                      // Master Plan / Custom Career
  BookOpenIcon as BookOpen,                // Cover Letters / Close Deal
  ArrowTrendingUpIcon as TrendingUp,       // Brand Yourself / Get Promotion
  CalendarDaysIcon as Calendar,            // Get More Meetings / First 90 Days
  ArrowTopRightOnSquareIcon as ExternalLink,// External links
} from '@heroicons/react/24/solid';
import { ROUTES } from '@/routes/routePaths';

/**
 * Component: ResponsiveNavigation
 *
 * 3 responsive modes:
 *   1. Desktop  (≥1024px): 260px fixed sidebar with labels + user profile
 *   2. Tablet  (640–1023px): 68px icon-only sidebar with expand arrow
 *   3. Mobile   (<640px): 68px fixed bottom bar + "More Services" sheet
 *
 * All nav items wired to react-router-dom useNavigate.
 * hasArrow items show a hover flyout submenu.
 * All icons are FILLED/SOLID using @heroicons/react/24/solid.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubItem {
  id: string;
  name: string;
  icon: React.ElementType;
  route: string;
  external?: boolean;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  route?: string;
  badge?: string;
  hasArrow?: boolean;
  children?: SubItem[];
}

// ─── Navigation Data ──────────────────────────────────────────────────────────

const DESKTOP_NAV: NavItem[] = [
  {
    id: 'Dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    route: ROUTES.APP_DASHBOARD,
  },
  {
    id: 'Documents',
    name: 'Documents',
    icon: FileText,
    hasArrow: true,
    children: [
      { id: 'MyResumes', name: 'My Resumes', icon: FileText, route: ROUTES.APP_RESUMES },
    ],
  },
  {
    id: 'Jobs',
    name: 'Jobs',
    icon: Briefcase,
    route: ROUTES.APP_JOB_SEARCH,
  },
  {
    id: 'JobTracker',
    name: 'Job Tracker',
    icon: CheckSquare,
    route: ROUTES.APP_JOB_TRACKING,
  },
  {
    id: 'AutoApply',
    name: 'Auto Apply',
    icon: Send,
    route: ROUTES.APP_AUTO_APPLY,
  },
  {
    id: 'JobSearchMethod',
    name: 'Job Search Method',
    icon: Compass,
    hasArrow: true,
    children: [
      { id: 'TheMasterPlan', name: 'The Master Plan', icon: Target, route: ROUTES.APP_CAREER_PLANS },
      { id: 'BrandYourself', name: 'Brand Yourself', icon: TrendingUp, route: ROUTES.CUSTOM_CAREER_PLAN },
      { id: 'GetMoreMeetings', name: 'Get More Meetings', icon: Calendar, route: ROUTES.CAREER_PATH },
      { id: 'InterviewAndWin', name: 'Interview and Win', icon: Presentation, route: ROUTES.EXPLORE_CAREERS },
      { id: 'CloseTheDeal', name: 'Close the Deal', icon: BookOpen, route: ROUTES.FIRST_90_DAYS_PLAN },
    ],
  },
  {
    id: 'Other',
    name: 'Other',
    icon: MoreHorizontal,
    hasArrow: true,
    children: [
      { id: 'CustomCareerPlan2', name: 'Custom Career Plan', icon: Target, route: ROUTES.CUSTOM_CAREER_PLAN },
      { id: 'CareerAdviceBlog2', name: 'Career Advice Blog', icon: ExternalLink, route: ROUTES.BLOG, external: true },
      { id: 'CareerPathways2', name: 'Career Pathways', icon: TrendingUp, route: ROUTES.CAREER_PATH },
      { id: 'ExploreCareers2', name: 'Explore Careers', icon: MapPin, route: ROUTES.EXPLORE_CAREERS },
    ],
  },
];

// ─── Icon helper ──────────────────────────────────────────────────────────────
// HeroIcons /24/solid are natively filled — just set size + color.

interface FilledIconProps {
  icon: React.ElementType;
  size?: number;
  color: string;
  className?: string;
}

const FilledIcon: React.FC<FilledIconProps> = ({ icon: Icon, size = 22, color, className }) => (
  <Icon
    style={{ width: size, height: size, color, flexShrink: 0 }}
    className={className}
    aria-hidden="true"
  />
);

// ─── Flyout Submenu ───────────────────────────────────────────────────────────

interface FlyoutProps {
  items: SubItem[];
  onSelect: (route: string, external?: boolean) => void;
  activeRoute: string;
  position: { top: number; left: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const FlyoutMenu: React.FC<FlyoutProps> = ({
  items, onSelect, activeRoute, position, onMouseEnter, onMouseLeave,
}) => (
  <div
    className="al-flyout-menu al-flyout-shadow"
    style={{ top: position.top, left: position.left }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {items.map((item) => {
      const isActive = activeRoute === item.route;
      return (
        <button
          key={item.id}
          onClick={() => onSelect(item.route, item.external)}
          className="flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left"
        >
          <span className={`font-medium ${isActive ? 'text-[#1A91F0]' : 'text-gray-700'}`}>
            {item.name}
          </span>
          {item.external && (
            <FilledIcon
              icon={ExternalLink}
              size={12}
              color="#9ca3af"
            />
          )}
        </button>
      );
    })}
  </div>
);

// ─── Sub-component: NavRow ────────────────────────────────────────────────────

interface NavRowProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  onNavigate: (route: string, external?: boolean) => void;
  activeRoute: string;
  iconOnly?: boolean;
}

const NavRow: React.FC<NavRowProps> = ({
  item, isActive, onClick, onNavigate, activeRoute, iconOnly = false,
}) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });
  const rowRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    if (!item.children) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setFlyoutOpen(false), 120);
  };

  const updateFlyoutPosition = () => {
    const row = rowRef.current;
    if (!row || !item.children) return;

    const rect = row.getBoundingClientRect();
    const menuWidth = 240;
    const menuHeight = Math.max(48, item.children.length * 42 + 8);
    const viewportGap = 8;
    const maxTop = window.innerHeight - menuHeight - viewportGap;
    const top = Math.max(viewportGap, Math.min(rect.top, maxTop));
    const preferredLeft = rect.right + 6;
    const fallbackLeft = rect.left - menuWidth - 6;
    const left =
      preferredLeft + menuWidth > window.innerWidth - viewportGap
        ? Math.max(viewportGap, fallbackLeft)
        : preferredLeft;

    setFlyoutPosition({ top, left });
  };

  const openFlyout = () => {
    if (!item.children) return;
    updateFlyoutPosition();
    setFlyoutOpen(true);
  };

  const handleClick = () => {
    if (item.children) {
      updateFlyoutPosition();
      setFlyoutOpen((v) => !v);
    } else {
      onClick();
      if (item.route) onNavigate(item.route);
    }
  };

  // Active: blue (#1A91F0) | Inactive: gray (#9ca3af)
  const iconColor = isActive ? '#1A91F0' : '#9ca3af';

  return (
    <div
      ref={rowRef}
      className="relative"
      onMouseEnter={() => { cancelClose(); openFlyout(); }}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={handleClick}
        className={`al-nav-btn${isActive ? ' al-nav-active' : ''}${iconOnly ? ' al-nav-btn-icon' : ''}`}
        title={iconOnly ? item.name : undefined}
      >
        <span className={`flex items-center ${iconOnly ? '' : 'gap-[14px]'}`}>
          {/* FILLED icon */}
          <FilledIcon icon={item.icon} size={22} color={iconColor} />

          {!iconOnly && (
            <span className={`text-md ${isActive ? 'al-nav-active-txt' : 'al-nav-inactive-txt'}`}>
              {item.name}
            </span>
          )}
        </span>

        {!iconOnly && (
          <span className="flex items-center gap-1.5">
            {item.badge && <span className="al-badge">{item.badge}</span>}
            {item.hasArrow && (
              // ChevronRight stays stroke-style via FilledIcon logic
              <FilledIcon icon={ChevronRight} size={18} color={iconColor} />
            )}
          </span>
        )}
        {iconOnly && item.badge && <span className="al-badge-dot" />}
      </button>

      {/* Flyout submenu */}
      {item.children && flyoutOpen && !iconOnly && (
        <FlyoutMenu
          items={item.children}
          activeRoute={activeRoute}
          position={flyoutPosition}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onSelect={(route, external) => {
            setFlyoutOpen(false);
            onNavigate(route, external);
          }}
        />
      )}
    </div>
  );
};

// ─── Avatar Sub-component ─────────────────────────────────────────────────────

const SidebarAvatar: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className="relative flex-shrink-0">
    <div className={`al-avatar-ring ${compact ? 'al-avatar-ring-sm' : 'al-avatar-ring-lg'}`}>
      <div className="al-avatar-inner">
        <svg
          width={compact ? 20 : 26}
          height={compact ? 20 : 26}
          fill="#d1d5db"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
    <div className={`al-score-badge ${compact ? 'al-score-badge-sm' : 'al-score-badge-lg'}`}>
      45%
    </div>
  </div>
);

// ─── AI Spinner Tab ───────────────────────────────────────────────────────────

const AISpinnerTab: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button className="al-tab-btn" onClick={onClick}>
    <div className="al-ai-spinner" />
  </button>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const ResponsiveNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname;

  const [moreOpen, setMoreOpen] = useState<boolean>(false);
  const [tabExpanded, setTabExpanded] = useState<boolean>(false);

  // Derive active nav item from current route
  const activeId =
    DESKTOP_NAV.find((item) => {
      if (item.route && activeRoute.startsWith(item.route)) return true;
      if (item.children?.some((c) => activeRoute.startsWith(c.route))) return true;
      return false;
    })?.id ?? 'Dashboard';

  const handleNavigate = (route: string, external?: boolean) => {
    setMoreOpen(false);
    if (external) {
      window.open(route, '_blank', 'noopener');
    } else {
      navigate(route);
    }
  };

  const handleSelect = (item: NavItem) => {
    if (!item.children && item.route) {
      handleNavigate(item.route);
    }
    setMoreOpen(false);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          DESKTOP SIDEBAR  ≥1024px
          ═══════════════════════════════════════════════════════════════════════ */}
      <aside className="al-sidebar al-sidebar-shell">
        {/* Header */}
        <div className="al-sidebar-header">
          {/* Brand */}
          <div className="flex items-center gap-[10px] mb-4">
            <div className="al-brand-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="2.5" rx="1.25" fill="white" opacity="0.95" />
                <rect x="2" y="7.5" width="14" height="2" rx="1" fill="white" opacity="0.75" />
                <rect x="2" y="12" width="9" height="2" rx="1" fill="white" opacity="0.55" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="al-brand-name">resume.io</span>
              <span className="al-brand-sub">by Muhammad Nabeel Ijaz</span>
            </div>
          </div>

          {/* User row */}
          <div className="flex items-center gap-[14px]">
            <SidebarAvatar />
            <div className="overflow-hidden">
              <p className="al-user-name leading-snug truncate m-0">
                User
              </p>
              <p className="al-user-role truncate">Set your target role</p>
            </div>
          </div>
        </div>

        {/* Nav list */}
        <div className="al-nav-scroll al-nav-pad flex-1 overflow-y-auto">
          {DESKTOP_NAV.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              activeRoute={activeRoute}
              onClick={() => handleSelect(item)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="al-sidebar-footer">
          <button className="al-footer-cta">
            <div className="al-chrome-icon">
              <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="10" stroke="#e5e7eb" strokeWidth="1" />
                <path d="M11 11 L11 4 A7 7 0 0 1 17.06 7.5 Z" fill="#EA4335" />
                <path d="M11 11 L17.06 7.5 A7 7 0 0 1 17.06 14.5 Z" fill="#FBBC05" />
                <path d="M11 11 L17.06 14.5 A7 7 0 0 1 4.94 14.5 Z" fill="#34A853" />
                <path d="M11 11 L4.94 14.5 A7 7 0 0 1 4.94 7.5 Z" fill="#4285F4" />
                <path d="M11 11 L11 4 A7 7 0 0 0 4.94 7.5 Z" fill="#4285F4" />
                <circle cx="11" cy="11" r="3.5" fill="white" />
              </svg>
            </div>
            <span className="truncate al-footer-cta-label">Get Auto Apply Extension</span>
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════
          TABLET ICON SIDEBAR  640–1023px
          ═══════════════════════════════════════════════════════════════════════ */}
      <aside
        className="al-tablet-sidebar"
        style={{ width: tabExpanded ? 260 : 68 }}
      >
        {/* Avatar top */}
        <div className="al-tablet-avatar-header">
          <SidebarAvatar compact />
        </div>

        {/* Nav icons */}
        <div
          className={`al-nav-scroll ${tabExpanded ? 'al-nav-pad' : 'al-nav-pad-sm'} flex-1 overflow-y-auto`}
        >
          {DESKTOP_NAV.map((item) => (
            <NavRow
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              activeRoute={activeRoute}
              onClick={() => handleSelect(item)}
              onNavigate={handleNavigate}
              iconOnly={!tabExpanded}
            />
          ))}
        </div>

        {/* Expand / Collapse arrow */}
        <button
          className="al-expand-btn"
          onClick={() => setTabExpanded((v) => !v)}
          aria-label={tabExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {tabExpanded ? (
            <ChevronLeft size={12} color="#6b7280" />
          ) : (
            <ChevronRight size={12} color="#6b7280" />
          )}
        </button>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE BOTTOM BAR  <640px
          ═══════════════════════════════════════════════════════════════════════ */}
      <nav className="al-bottom-bar al-bottom-shell al-safe-bottom">
        {/* Dashboard tab */}
        {(() => {
          const isActive = activeId === 'Dashboard';
          const tabColor = isActive ? '#1A91F0' : '#374151';
          return (
            <button
              className="al-tab-btn"
              onClick={() => handleNavigate(ROUTES.APP_DASHBOARD)}
            >
              <FilledIcon icon={LayoutDashboard} size={22} color={tabColor} />
              <span className={`text-[10px] ${isActive ? 'al-tab-label-active' : 'al-tab-label-inactive'}`}>
                Dashboard
              </span>
            </button>
          );
        })()}

        {/* Documents tab */}
        {(() => {
          const isActive = activeId === 'Documents';
          const tabColor = isActive ? '#1A91F0' : '#374151';
          return (
            <button
              className="al-tab-btn"
              onClick={() => handleNavigate(ROUTES.APP_RESUMES)}
            >
              <FilledIcon icon={FileText} size={22} color={tabColor} />
              <span className={`text-[10px] ${isActive ? 'al-tab-label-active' : 'al-tab-label-inactive'}`}>
                Documents
              </span>
            </button>
          );
        })()}

        {/* Center AI Spinner */}
        <AISpinnerTab />

        {/* Jobs tab */}
        {(() => {
          const isActive = activeId === 'Jobs';
          const tabColor = isActive ? '#1A91F0' : '#374151';
          return (
            <button
              className="al-tab-btn"
              onClick={() => handleNavigate(ROUTES.APP_JOB_SEARCH)}
            >
              <FilledIcon icon={Briefcase} size={22} color={tabColor} />
              <span className={`text-[10px] ${isActive ? 'al-tab-label-active' : 'al-tab-label-inactive'}`}>
                Jobs
              </span>
            </button>
          );
        })()}

        {/* More tab */}
        {(() => {
          const isActive = moreOpen;
          const tabColor = isActive ? '#1A91F0' : '#374151';
          return (
            <button
              className="al-tab-btn"
              onClick={() => setMoreOpen((v) => !v)}
            >
              <FilledIcon icon={MoreHorizontal} size={22} color={tabColor} />
              <span className={`text-[10px] ${isActive ? 'al-tab-label-active' : 'al-tab-label-inactive'}`}>
                More
              </span>
            </button>
          );
        })()}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE "MORE SERVICES" SHEET
          ═══════════════════════════════════════════════════════════════════════ */}
      {moreOpen && (
        <>
          <div className="al-backdrop" onClick={() => setMoreOpen(false)} />
          <div className="al-slide-up al-sheet-scroll al-more-sheet">
            {/* Sheet header */}
            <div className="al-sheet-header flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">More Services</span>
              <button
                onClick={() => setMoreOpen(false)}
                className="flex items-center justify-center p-1 border-none bg-transparent cursor-pointer"
              >
                {/* X stays stroke-only via FilledIcon logic */}
                <X size={20} color="#6b7280" />
              </button>
            </div>

            {/* Items */}
            <div className="al-sheet-items">
              {DESKTOP_NAV.map((item) => {
                const isActive = activeId === item.id;
                const sheetIconColor = isActive ? '#1A91F0' : '#9ca3af';
                return (
                  <button
                    key={item.id}
                    className="al-sheet-btn"
                    onClick={() => {
                      if (!item.children && item.route) handleNavigate(item.route);
                    }}
                  >
                    <span className="flex items-center gap-3.5">
                      {/* FILLED icon in sheet */}
                      <FilledIcon icon={item.icon} size={18} color={sheetIconColor} />
                      <span
                        className={`text-[15px] font-medium ${isActive ? 'al-sheet-item-active' : 'al-sheet-item-inactive'
                          }`}
                      >
                        {item.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {item.badge && <span className="al-badge">{item.badge}</span>}
                      <ChevronRight size={16} color="#d1d5db" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResponsiveNavigation;