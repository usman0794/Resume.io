// FaqSection.tsx — Category detail view (breadcrumb + title + article list)
import React from 'react';
import { ChevronRight } from 'lucide-react';
import FaqItem from './FaqItem';
import type { FaqCategory } from '../../types/faq.types';

interface FaqSectionProps {
  category: FaqCategory;
  onBack: () => void;
}

const FaqSection: React.FC<FaqSectionProps> = ({ category, onBack }) => (
  <div className="w-full max-w-3xl mx-auto px-4 pb-20">
    {/* Breadcrumb */}
    <nav className="flex items-center text-[13px] text-slate-500 mb-5">
      <button
        onClick={onBack}
        className="hover:text-slate-800 transition-colors"
      >
        Home
      </button>
      <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400" />
      <span className="text-slate-800 font-medium">{category.title}</span>
    </nav>

    {/* Category title */}
    <h2 className="text-[26px] md:text-[30px] font-bold text-slate-900 mb-7 tracking-tight">
      {category.title}
    </h2>

    {/* Article list */}
    <div className="flex flex-col gap-3">
      {category.articles.map((article) => (
        <FaqItem key={article.id} article={article} />
      ))}
    </div>
  </div>
);

export default FaqSection;
