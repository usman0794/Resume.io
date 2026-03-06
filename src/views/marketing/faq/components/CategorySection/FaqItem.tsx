// FaqItem.tsx — Single article card (list item)
import React from 'react';
import { FileText } from 'lucide-react';
import type { FaqArticle } from '../../types/faq.types';

interface FaqItemProps {
  article: FaqArticle;
}

const FaqItem: React.FC<FaqItemProps> = ({ article }) => (
  <div className="group cursor-pointer bg-[#f3f4f6] hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-[2px]">
    <div className="mt-0.5 flex-shrink-0">
      <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#1a91f0] transition-colors" />
    </div>
    <div className="flex flex-col gap-0.5 w-full min-w-0">
      {/* Desktop: title left, updatedAt right */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-800 group-hover:text-[#1a91f0] transition-colors leading-snug">
          {article.title}
        </h3>
        {article.updatedAt && (
          <span className="hidden md:block text-[13px] text-slate-400 whitespace-nowrap flex-shrink-0 mt-0.5">
            {article.updatedAt}
          </span>
        )}
      </div>
      {/* Mobile: updatedAt below title */}
      {article.updatedAt && (
        <span className="md:hidden text-[12px] text-slate-400">{article.updatedAt}</span>
      )}
      <p className="text-[14px] text-slate-500 truncate max-w-[95%] mt-0.5">
        {article.description}
      </p>
    </div>
  </div>
);

export default FaqItem;
