import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from './components/LandingNavbar';
import LandingFooter from './components/LandingFooter';

const LandingLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <LandingNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <LandingFooter />
  </div>
);

export default LandingLayout;
