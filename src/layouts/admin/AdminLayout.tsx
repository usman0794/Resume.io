import { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { logoutUser } from '@/store/actions/userActions';
import { ROUTES } from '@/routes/routePaths';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';
import AdminFooter from './components/AdminFooter';
import '@/styles/admin/index.css';

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(s => s.userReducer.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [sidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser());
    navigate(ROUTES.LOGIN, { replace: true });
  }, [dispatch, navigate]);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Access denied (belt-and-suspenders; RoleGuard handles first)
  const loading = useAppSelector(s => s.userReducer.loading);
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  if (hasToken && !user && loading) {
    return null;
  }
  if (user && user.role !== 'admin') {
    return (
      <div className="admin-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', maxWidth: 340, padding: '0 24px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'var(--clr-danger-bg)', color: 'var(--clr-danger)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--clr-text-dark)', margin: '0 0 8px' }}>
            Access Denied
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--clr-text-muted)', margin: 0, lineHeight: 1.6 }}>
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root admin-layout">
      {/* ── Sidebar ── */}
      <AdminSidebar
        user={user}
        open={sidebarOpen}
        onClose={closeSidebar}
        onLogout={handleLogout}
      />

      {/* ── Mobile overlay ── */}
      <div
        className={`admin-overlay${sidebarOpen ? ' admin-overlay--visible' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* ── Main column ── */}
      <div className="admin-main">
        {/* Mobile topbar — hidden on desktop via CSS */}
        <div className="admin-topbar">
          <div className="admin-topbar__left">
            <button
              className="hamburger-btn"
              onClick={openSidebar}
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--clr-text-fiord)', letterSpacing: '-0.02em' }}>
              resume.io
            </span>
          </div>
          <div className="admin-topbar__right">
            <AdminNavbar user={user} onLogout={handleLogout} topbarMode />
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
