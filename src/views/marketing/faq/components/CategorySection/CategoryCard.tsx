// CategoryCard.tsx — Single clickable category card for Help Center grid
import React from 'react';
import { FileText, Folder } from 'lucide-react';
import type { FaqCategory } from '../../types/faq.types';

interface CategoryCardProps {
    category: FaqCategory;
    onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
        <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-5">
            <Folder className="w-8 h-8 text-[#1a91f0]" fill="#1a91f0" strokeWidth={0} />
        </div>
        <h3 className="text-[17px] font-semibold text-slate-800 mb-2">{category.title}</h3>
        <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
            <FileText className="w-3.5 h-3.5" />
            <span>{category.articleCount} articles</span>
        </div>
    </button>
);

export default CategoryCard;
