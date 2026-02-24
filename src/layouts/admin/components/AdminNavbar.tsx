import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import type { User } from '@/types/user.types';

interface Props {
  user:        User | null;
  onLogout:    () => void;
  topbarMode?: boolean;   // true = rendered inside mobile topbar (no wrapper header)
}

const AdminNavbar = ({ user, onLogout, topbarMode = false }: Props) => {
  const [dropOpen, setDropOpen]   = useState(false);
  const dropRef                   = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    if (dropOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen]);

  const initials = user?.name?.[0]?.toUpperCase() ?? 'A';

  const dropdown = (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button
        className="topbar-user-btn"
        onClick={() => setDropOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={dropOpen}
        aria-label="User menu"
      >
        <div className="avatar" style={{ width: 28, height: 28, fontSize: '0.68rem' }}>
          {initials}
        </div>
        <svg
          width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{
            color: 'var(--clr-text-faint)',
            transform: dropOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropOpen && (
        <div className="topbar-dropdown">
          <div className="topbar-dropdown__header">
            <p className="topbar-dropdown__name">{user?.name ?? 'Admin'}</p>
            <p className="topbar-dropdown__email">{user?.email ?? ''}</p>
          </div>
          <div className="topbar-dropdown__body">
            <Link
              to={ROUTES.HOME}
              className="topbar-dropdown__item"
              onClick={() => setDropOpen(false)}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to site
            </Link>
            <button
              className="topbar-dropdown__item topbar-dropdown__item--danger"
              onClick={() => { setDropOpen(false); onLogout(); }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // In topbarMode we only render the user dropdown pill (layout handled by AdminLayout)
  if (topbarMode) return dropdown;

  // Standalone desktop navbar (unused currently — AdminLayout uses topbarMode)
  return (
    <header style={{
      display: 'flex', background: 'var(--clr-surface)',
      borderBottom: '1px solid var(--clr-border)',
      height: 'var(--topbar-height)',
      alignItems: 'center', justifyContent: 'flex-end',
      padding: '0 24px', boxShadow: 'var(--shadow-navbar)', flexShrink: 0,
    }}>
      {dropdown}
    </header>
  );
};

export default AdminNavbar;
