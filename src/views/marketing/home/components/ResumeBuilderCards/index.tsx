// ResumeBuilderCards/index.tsx
import React from 'react';
import type { ResumeBuilderCardsProps } from '../../types/home.types';
import FeatureCard from './FeatureCard';

// Icons defined here (card-specific, not shared)
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3v4M9 17v4M3 10h4M17 10h4M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 13.5l2.5-2.5M15 5l2.5 2.5" />
    <path d="M12 10.5l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2z" />
  </svg>
);
const APlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9 16V8l3 8 3-8v8" /><path d="M15 10h3M16.5 8.5v3" />
  </svg>
);
const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><path d="M22 2L14 10M18 2h4v4" />
  </svg>
);
const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v8M14.5 9.5c0-1-1-1.5-2.5-1.5s-2.5.5-2.5 1.5 1 1.5 2.5 1.5c1.5 0 2.5.5 2.5 1.5s-1 1.5-2.5 1.5-2.5-.5-2.5-1.5" />
  </svg>
);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkle: SparkleIcon, aplus: APlusIcon, target: TargetIcon, dollar: DollarIcon,
};

const DEFAULT_CARDS_DATA = [
  { key: 'sparkle', title: 'A draft in 10 mins', description: 'The AI builder is 10 x faster than doing on your own.' },
  { key: 'aplus', title: 'Zero mistakes', description: "Don't stress over typos; you'll sound great!" },
  { key: 'target', title: 'ATS templates', description: 'Your resume will be 100% compliant. Recruiters will see you.' },
  { key: 'dollar', title: 'Get paid 7% more', description: 'We can help you negotiate a higher starting salary...' },
];

const ResumeBuilderCards: React.FC<ResumeBuilderCardsProps> = ({ cardsData = DEFAULT_CARDS_DATA }) => (
  <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardsData.map((d, i) => (
        <FeatureCard key={i} icon={ICON_MAP[d.key]} title={d.title} description={d.description} />
      ))}
    </div>
  </div>
);

export default ResumeBuilderCards;
