import React from 'react';
import First90DaysPageHeader from './components/First90DaysPageHeader';
import CareerPlanVideoCard from './components/CareerPlanVideoCard';
import CoachingSidebarCard from './components/CoachingSidebarCard';
import './first-90-days.css';

/**
 * Page: First90DaysPage
 *
 * Purpose:
 * Full authenticated detail page for the "First 90 Days" career plan,
 * rendered at route /career-plans/first-90-days. Matches resume.io reference exactly.
 *
 * Responsibilities:
 * - Compose First90DaysPageHeader, CareerPlanVideoCard, CoachingSidebarCard
 * - Provide responsive 2-column layout on desktop, single column on tablet/mobile
 * - Handle "Book a Coach" callback (stub — wire to coaching flow)
 * - Handle "onDismiss" for the video card (optional — hides the card)
 *
 * Layout Architecture:
 * ┌─────────────────────────────────────────┐
 * │  First90DaysPageHeader (full width)     │
 * ├────────────────────────┬────────────────┤
 * │  CareerPlanVideoCard   │ CoachingSidebar│  ← desktop: 2-col grid
 * │  (main, ~640px wide)   │ (~260px wide)  │
 * └────────────────────────┴────────────────┘
 *
 * Tablet (768–1023px): single column, CoachingSidebarCard below video card.
 * Mobile (<768px): single column, CoachingSidebarCard renders as collapsible row.
 *
 * Design Intent:
 * White page background. Max-width content area. Left-aligned header.
 * Main 2-col grid: left column takes flex-1, right column fixed ~260px.
 * Gap between columns ~24px.
 *
 * Layout Role:
 * Rendered inside AppLayout <main> at route /career-plans/first-90-days.
 *
 * Responsive Behavior:
 * - Mobile (<768px): 1-col stack, mobile collapsible coaching card
 * - Tablet (768–1023px): 1-col stack, full coaching card below
 * - Desktop (≥1024px): 2-col grid (video left, coaching sidebar right)
 */
const First90DaysPage: React.FC = () => {
  const handleBookCoach = () => {
    // TODO: navigate to coaching booking flow
    console.log('[First90DaysPage] book a coach');
  };

  const handleDismiss = () => {
    // TODO: persist dismissal state (e.g. localStorage or user prefs)
    console.log('[First90DaysPage] dismissed video card');
  };

  return (
    <div className="f90-page">

      {/* ── Page heading ── */}
      <First90DaysPageHeader />

      {/* ── Content grid: main card + sidebar ── */}
      <div className="f90-layout">

        {/* Left / main column */}
        <div className="f90-layout__main">
          <CareerPlanVideoCard onDismiss={handleDismiss} />
        </div>

        {/* Right / sidebar column — desktop only (tablet renders inline below) */}
        <div className="f90-layout__sidebar">
          <CoachingSidebarCard onBookCoach={handleBookCoach} />
        </div>

      </div>
    </div>
  );
};

export default First90DaysPage;
