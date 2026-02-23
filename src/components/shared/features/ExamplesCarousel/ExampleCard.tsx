import React from 'react';
import type { ExampleItem } from '@/types/page-templates.types';

interface StarIconProps { active: boolean; }

const StarIcon: React.FC<StarIconProps> = ({ active }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] ${active ? 'fill-[#FF8C00]' : 'fill-[#3d428a]'}`}
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

interface ExampleCardProps {
    example: ExampleItem;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ example }) => (
    <div className="w-[280px] md:w-[310px] flex-shrink-0 snap-center md:snap-start flex flex-col group cursor-pointer">
        <div className="mb-4 flex flex-col h-[60px] justify-end">
            <h3 className="text-white font-bold text-[18px] md:text-[20px] mb-2 truncate tracking-wide">
                {example.title}
            </h3>
            <div className="flex items-center gap-3">
                <div className="flex gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} active={i < example.rating} />
                    ))}
                </div>
                <span className="text-[#a5aacb] text-[14px] md:text-[15px] font-medium">
                    {example.reviews} reviews
                </span>
            </div>
        </div>

        <div className="bg-white rounded-[4px] p-0 shadow-[0_8px_30px_rgb(0,0,0,0.25)] aspect-[1/1.414] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 border border-transparent">
            <div className="w-full h-full bg-[#f8f9fa] flex items-center justify-center">
                <img
                    src={example.imageUrl}
                    alt={`${example.title} Resume Example`}
                    className="w-full h-full object-cover origin-top"
                    loading="lazy"
                />
            </div>
        </div>
    </div>
);

export default ExampleCard;
