/**
 * Module: src/layouts/app/index.ts
 *
 * Purpose:
 * Barrel export for the App layout module. Centralises all public exports
 * from the layouts/app directory so consumers import from one location.
 *
 * Usage:
 * ```tsx
 * import AppLayout from '@/layouts/app';
 * // or named:
 * import { AppLayout, ResponsiveNavigation, AppTopBar, AppMobileHeader } from '@/layouts/app';
 * ```
 */

export { default } from './AppLayout';
export { default as AppLayout } from './AppLayout';
export { default as ResponsiveNavigation } from './components/ResponsiveNavigation';
export { default as AppTopBar } from './components/AppTopBar';
export { default as AppMobileHeader } from './components/AppMobileHeader';
