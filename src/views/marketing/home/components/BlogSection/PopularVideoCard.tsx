// PopularVideoCard.tsx
import React from 'react';

interface PopularVideoCard {
    id: string;
    category: string;
    title: string;
    thumbnail: string;
    link: string;
    bgColor: string;
}

const PopularVideoCard: React.FC<{ card: PopularVideoCard }> = ({ card }) => (
    <div className="flex flex-col mb-8 last:mb-0">
        <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full aspect-[4/3] rounded-[8px] flex items-center justify-center overflow-hidden mb-3 transition-transform hover:-translate-y-1 duration-300 shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]"
            style={{ backgroundColor: card.bgColor }}
        >
            <img src={card.thumbnail} alt="" className="h-[80%] w-[80%] object-contain" />
        </a>
        <div>
            <p className="text-[#a5afc3] text-[13px] mb-1">{card.category}</p>
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="block group">
                <h4 className="text-[#1a1c20] text-[16px] font-medium leading-[1.4] group-hover:text-[#1a91f0] transition-colors pr-2">
                    {card.title}
                </h4>
            </a>
        </div>
    </div>
);

export default PopularVideoCard;