import CareerPlansPage from './CareerPlansPage';
import First90DaysPage from './first-90-days/First90DaysPage';

// Stub pages for plans not yet fully implemented
import React from 'react';

const stub = (label: string): React.FC =>
  () => React.createElement('div', {
    className: 'flex items-center justify-center h-full min-h-[60vh] text-gray-400 text-lg font-medium'
  }, label + ' — Coming Soon');

const CustomCareerPlanPage  = stub('Custom Career Plan');
const PathToPromotionPage   = stub('Path to Promotion');

export {
  CareerPlansPage,
  First90DaysPage,
  CustomCareerPlanPage,
  PathToPromotionPage,
};

export default CareerPlansPage;
