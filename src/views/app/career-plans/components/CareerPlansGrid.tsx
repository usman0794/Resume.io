import React from 'react';
import { useNavigate } from 'react-router-dom';
import CareerPlanCard from './CareerPlanCard';
import { ROUTES } from '@/routes/routePaths';

/**
 * Component: CareerPlansGrid
 *
 * Purpose:
 * Renders the responsive grid of career plan cards using the static
 * CAREER_PLANS_DATA config.
 *
 * Responsibilities:
 * - Map plan data to CareerPlanCard instances
 * - Handle navigation to individual plan pages
 * - Apply responsive grid layout
 *
 * Design Intent:
 * 4-column grid on large desktop, 2-col on tablet, 1-col on mobile.
 * Gap 20px. Cards equal height in each row.
 *
 * Layout Role:
 * Main content block of CareerPlansPage, between the page header and
 * the "New career plans" CTA section.
 *
 * Responsive Behavior:
 * - Mobile (<640px): 1 column, full-width cards
 * - Tablet (640–1023px): 2 columns
 * - Desktop (≥1024px): 4 columns
 */

interface PlanData {
  id:          string;
  title:       string;
  description: string;
  imageUrl:    string;
  isNew:       boolean;
  route:       string;
}

const CAREER_PLANS_DATA: PlanData[] = [
  {
    id:          'job-search-plan',
    title:       'Job Search Plan',
    description: 'Follow a step-by-step strategy for a better job search and faster results',
    imageUrl:    '/assets/images/misc/career-plan-get-started.svg',
    isNew:       true,
    route:       ROUTES.CUSTOM_CAREER_PLAN,   // stub route — update when dedicated route created
  },
  {
    id:          'first-90-days',
    title:       'First 90 Days Plan',
    description: 'Your expert guide to achieving success in your first 90 days of a new job',
    imageUrl:    '/assets/images/misc/career-plan-first-90-days.svg',
    isNew:       true,
    route:       ROUTES.FIRST_90_DAYS_PLAN,
  },
  {
    id:          'pathway-to-promotion',
    title:       'Pathway to Promotion',
    description: 'A customized plan to put you on a pathway to promotion',
    imageUrl:    '/assets/images/misc/career-plan-path-to-promotion.svg',
    isNew:       true,
    route:       ROUTES.PATH_TO_PROMOTION_PLAN,
  },
  {
    id:          'custom-plan',
    title:       'Custom Plan',
    description: 'Following our personal plan, you will be able to get your dream job',
    imageUrl:    '/assets/images/misc/career-plan-custom.svg',
    isNew:       true,
    route:       ROUTES.CUSTOM_CAREER_PLAN,
  },
];

const CareerPlansGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cpl-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {CAREER_PLANS_DATA.map((plan) => (
        <CareerPlanCard
          key={plan.id}
          title={plan.title}
          description={plan.description}
          imageUrl={plan.imageUrl}
          isNew={plan.isNew}
          onClick={() => navigate(plan.route)}
        />
      ))}
    </div>
  );
};

export { CAREER_PLANS_DATA };
export default CareerPlansGrid;
