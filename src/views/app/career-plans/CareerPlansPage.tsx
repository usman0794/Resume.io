import React from 'react';
import CareerPlansHeader from './components/CareerPlansHeader';
import CareerPlansGrid from './components/CareerPlansGrid';
import CareerPlansCTA from './components/CareerPlansCTA';
import './career-plans.css';

/**
 * Component: CareerPlansPage
 *
 * Purpose:
 * Full listing page for all available career plans. Shows a header,
 * a grid of 4 plan cards, and a "suggest a plan" CTA section below.
 *
 * Responsibilities:
 * - Compose CareerPlansHeader + CareerPlansGrid + CareerPlansCTA
 * - Own page padding via .cpl-page
 * - Handle the "Suggest a plan" action (stub)
 *
 * Design Intent:
 * Clean white page with left-aligned header. Cards in a 4-column
 * green-tinted grid. Bottom centred CTA. Matches resume.io
 * career-plans screen exactly.
 *
 * Layout Role:
 * Rendered inside AppLayout's <main> column, accessed via
 * /career-plans route.
 *
 * Responsive Behavior:
 * - Mobile: 1-col grid, padded page
 * - Tablet: 2-col grid
 * - Desktop: 4-col grid, wider padding
 */

const CareerPlansPage: React.FC = () => {
  const handleSuggest = () => {
    // TODO: open suggest-a-plan modal / feedback flow
    console.log('[CareerPlansPage] suggest a plan');
  };

  return (
    <div className="cpl-page">
      <CareerPlansHeader />
      <CareerPlansGrid />
      <CareerPlansCTA onSuggest={handleSuggest} />
    </div>
  );
};

export default CareerPlansPage;
