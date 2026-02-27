import React from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveNavigation from './components/ResponsiveNavigation';
import AppTopBar from './components/AppTopBar';
import AppMobileHeader from './components/AppMobileHeader';

/**
 * Layout: AppLayout
 *
 * Authenticated shell composing sidebar, top bar, mobile header, and
 * the scrollable content column.
 *
 * Styling: all layout tokens live in src/styles/app-layout.css (.al-*).
 * No inline style= props — Tailwind + CSS classes only.
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

const PAGE_NAMES: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/resumes': 'Documents',
  '/app/cover-letters': 'Documents',
  '/app/job-search': 'Jobs',
  '/app/job-tracking': 'Job Tracker',
  '/app/auto-apply': 'Auto Apply',

  '/app/resume-distribution/edit': 'Resume Distribution',
  '/app/learning': 'Learning',
  '/app/career-coaching': 'Coaching',
  '/app/career-plans': 'Career Plans',
  '/app/career-path': 'Career Path',
  '/app/explore-careers': 'Explore Careers',
  '/app/account': 'Account Settings',
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] ?? 'Dashboard';

  return (
    <div className="al-root min-h-screen relative">
      <ResponsiveNavigation />

      <div className="al-content-col flex flex-col min-h-screen">
        <AppMobileHeader
          pageName={pageName}
          onMenuClick={() => undefined}
        />

        <AppTopBar />

        <main className="al-scroll flex-1 overflow-y-hidden overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
