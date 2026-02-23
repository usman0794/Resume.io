import React from 'react';
import type { IndustryCategory } from '@/views/marketing/resume/types/resume.types';
import IndustryHeader from './IndustryHeader';
import IndustryCard from './IndustryCard';

interface IndustrySectionProps {
  data: IndustryCategory;
  /** Base URL prefix for example links, e.g. "/resume-examples" */
  baseUrl?: string;
}

const IndustrySection: React.FC<IndustrySectionProps> = ({ data, baseUrl = '/resume-examples' }) => {
  const { id, iconName, title, count, description, primaryExamples, secondaryExamples } = data;

  return (
    <section
      id={id}
      className="w-full py-14 border-b border-slate-100 last:border-b-0"
    >
      <IndustryHeader
        iconName={iconName}
        title={title}
        count={count}
        description={description}
      />

      {/* Primary examples — image cards */}
      {primaryExamples.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {primaryExamples.map((example, i) => (
            <IndustryCard
              key={i}
              isPrimary
              example={{
                ...example,
                href: example.href ?? `${baseUrl}/${example.title.toLowerCase().replace(/\s+/g, '-')}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Secondary examples — text link list */}
      {secondaryExamples.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
          {secondaryExamples.map((example, i) => (
            <a
              key={i}
              href={example.href ?? `${baseUrl}/${example.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[15px] text-[#1a88ff] hover:underline font-medium py-1 leading-snug truncate"
            >
              {example.title}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default IndustrySection;
