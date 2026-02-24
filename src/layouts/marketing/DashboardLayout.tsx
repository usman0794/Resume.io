import React from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from '@/layouts/app/AppLayout';

/**
 * DashboardLayout
 *
 * Route-level layout wrapper for all protected user dashboard routes.
 * Composes the AppLayout shell (sidebar, topbar, mobile header) with
 * react-router's <Outlet /> so nested routes render inside the shell.
 */
const DashboardLayout: React.FC = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export default DashboardLayout;
