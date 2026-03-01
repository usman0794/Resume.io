// LatestVideoCard.tsx
import React from 'react';

interface LatestVideoCard { id: string; date: string; title: string; link: string; }

const LatestVideoCard: React.FC<{ card: LatestVideoCard }> = ({ card }) => (
    <div className="py-[18px] border-b border-[#e7eaf4] last:border-0 first:pt-0 group">
        <p className="text-[#a5afc3] text-[13px] mb-1.5">{card.date}</p>
        <a href={card.link} target="_blank" rel="noopener noreferrer" className="block">
            <h4 className="text-[#1a1c20] text-[17px] leading-[1.4] group-hover:text-[#1a91f0] transition-colors pr-4">{card.title}</h4>
        </a>
    </div>
);

export default LatestVideoCard;
