import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/actions/userActions';
import { ROUTES } from '@/routes/routePaths';

/**
 * Component: AppTopBar
 *
 * Purpose:
 * Desktop-only sticky top-right action bar.
 *
 * Responsibilities:
 * - "Upgrade Now" CTA button (dark pill)
 * - "Unlimited learning" secondary button
 * - Settings gear icon → dropdown menu:
 *     • User name (bold) + email (gray)
 *     • Divider
 *     • Account Settings → /app/account
 *     • FAQ → /faq
 *     • Log Out → dispatch logout + navigate /
 *
 * Responsive Behavior:
 * - Hidden on mobile/tablet (<1024px) — AppMobileHeader handles that breakpoint
 * - Shown only ≥1024px via .al-topbar class
 *
 * Styling: src/styles/app-layout.css (.al-topbar, .al-topbar-shell)
 */

const AppTopBar: React.FC = () => {
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate(ROUTES.HOME);
    setOpen(false);
  };

  return (
    <header className="al-topbar al-topbar-shell flex-shrink-0 w-full">
      {/* Upgrade Now */}
      <button className="al-upgrade-btn">
        <Sparkles size={16} color="#60a5fa" />
        Upgrade Now
      </button>

      {/* Unlimited learning */}
      <button className="al-secondary-btn">
        <GraduationCap size={16} color="#4b5563" />
        Unlimited learning
      </button>

      {/* Settings gear + dropdown */}
      <div ref={ref} className="relative">
        <button
          className={`al-icon-btn ${open ? 'bg-gray-100 border-gray-300' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Settings"
        >
          <Settings size={18} color={open ? '#374151' : '#9ca3af'} />
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-2 w-[260px] bg-white border border-gray-100 rounded-2xl z-50 overflow-hidden al-dropdown-shadow"
            
          >
            {/* User info */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-100">
              <p className="text-[15px] font-bold text-gray-900 leading-snug">
                {user?.name ?? 'User'}
              </p>
              <p className="text-sm text-gray-400 mt-0.5 truncate">
                {user?.email ?? ''}
              </p>
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              <DropItem
                icon={<Settings size={16} color="#9ca3af" />}
                label="Account Settings"
                onClick={() => { navigate(ROUTES.APP_ACCOUNT); setOpen(false); }}
              />
              <DropItem
                icon={<HelpCircle size={16} color="#9ca3af" />}
                label="FAQ"
                onClick={() => { navigate(ROUTES.FAQ); setOpen(false); }}
              />
              <DropItem
                icon={<LogOut size={16} color="#9ca3af" />}
                label="Log Out"
                onClick={handleLogout}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* ── Dropdown menu item ─────────────────────────────────────────────────────── */
interface DropItemProps {
  icon   : React.ReactNode;
  label  : string;
  onClick: () => void;
}
const DropItem: React.FC<DropItemProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AppTopBar;
