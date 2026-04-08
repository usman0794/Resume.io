import React from 'react';

export interface ResumeExample {
    title: string;
    href?: string;
    imageUrl?: string;
}

interface IndustryCardProps {
    example: ResumeExample;
    isPrimary?: boolean;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ example, isPrimary: _isPrimary = false }) => {
    return (
        <a
            href={example.href || '#'}
            className="flex flex-col bg-[#f8f9fa] hover:bg-[#f1f3f5] rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-slate-200 w-full h-full min-h-[300px]"
        >
            {/* Title */}
            <span className="text-[15px] font-semibold text-slate-800 text-left w-full mb-3 leading-snug">
                {example.title}
            </span>

            {/* Image or Placeholder */}
            <div className="mt-auto relative w-full pt-[125%] bg-white rounded-md shadow-sm overflow-hidden border border-slate-100">
                {example.imageUrl ? (
                    <img
                        src={example.imageUrl}
                        alt={`${example.title} Example`}
                        className="absolute top-0 left-0 w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                ) : (
                    /* Skeleton placeholder when no image */
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col gap-2 p-4">
                        <div className="h-3 bg-slate-200 rounded w-3/4" />
                        <div className="h-2 bg-slate-200 rounded w-full" />
                        <div className="h-2 bg-slate-200 rounded w-5/6" />
                        <div className="h-2 bg-slate-200 rounded w-full" />
                        <div className="mt-2 h-2 bg-slate-200 rounded w-2/3" />
                        <div className="h-2 bg-slate-200 rounded w-full" />
                        <div className="h-2 bg-slate-200 rounded w-4/5" />
                    </div>
                )}
            </div>
        </a>
    );
};

export default IndustryCard;
