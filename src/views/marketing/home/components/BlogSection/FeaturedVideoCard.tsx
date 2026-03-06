// FeaturedVideoCard.tsx
import React from 'react';

interface FeaturedVideoCard {
    id: string;
    title: string;
    author: {
        name: string;
        avatar: string;
        link: string
    };
    duration: string;
    thumbnail: string;
    link: string;
    bgColor: string;
}

const FeaturedVideoCard: React.FC<{ card: FeaturedVideoCard }> = ({ card }) => (
    <div
        className="rounded-[10px] relative overflow-hidden flex flex-col h-[520px] lg:h-full w-full transition-transform hover:-translate-y-1 duration-300 shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]"
        style={{ backgroundColor: card.bgColor }}
    >
        <div className="p-8 pb-0 z-10 flex flex-col flex-grow">
            <div className="text-[15px] text-[#656e83] mb-5 flex items-center">
                Written by
                <a href={card.author.link} className="flex items-center ml-1.5 text-[#1a1c20] hover:text-[#1a91f0] transition-colors font-medium">
                    <img src={card.author.avatar} alt={card.author.name} className="w-7 h-7 rounded-full object-cover mr-2" />
                    {card.author.name}
                </a>
            </div>
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-[#1a1c20] text-[24px] font-medium leading-[1.3] mb-4 group-hover:text-[#1a91f0] transition-colors pr-4">
                    {card.title}
                </h3>
            </a>
            <div className="flex items-center gap-1.5 text-[#656e83] text-[14px]">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" width="20" className="fill-current opacity-70">
                    <g clipRule="evenodd" fillRule="evenodd">
                        <path d="m10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zm0 1.5a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                        <path d="m10 3.7c.41 0 .75.33.75.74v5.56a.75.75 0 0 1 -1.5 0v-5.56c0-.41.34-.75.75-.75z" />
                        <path d="m13.96 12.64a.75.75 0 0 1 -1.04.2l-3.34-2.22a.75.75 0 0 1 .84-1.24l3.33 2.22c.34.23.44.7.2 1.04z" />
                    </g>
                </svg>
                {card.duration}
            </div>
        </div>
        <div className="mt-auto h-[260px] w-full flex justify-center items-end px-8 pt-4">
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img src={card.thumbnail} alt="" className="w-full h-full object-contain object-bottom" />
            </a>
        </div>
    </div>
);

export default FeaturedVideoCard;