// HelpHero.tsx — Hero banner with search bar for FAQ/Help Center
import React from 'react';
import { Search } from 'lucide-react';

interface HelpHeroProps {
    searchQuery: string;
    onSearch: (value: string) => void;
}

const HelpHero: React.FC<HelpHeroProps> = ({ searchQuery, onSearch }) => (
    <div className="w-full max-w-3xl mx-auto px-4 pt-12 pb-10 flex flex-col items-center">
        <h1 className="text-[36px] md:text-[44px] lg:text-[52px] font-semibold text-slate-800 mb-8 text-center tracking-tight leading-tight">
            How can we help you?
        </h1>
        <div className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-[18px] w-[18px] text-slate-400 group-focus-within:text-[#1a91f0] transition-colors" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-[#f3f4f6] border border-transparent text-slate-800 text-[16px] rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:bg-white focus:border-[#1a91f0] focus:ring-4 focus:ring-[#1a91f0]/10 transition-all duration-300 placeholder-slate-400"
                placeholder="Search"
            />
        </div>
    </div>
);

export default HelpHero;
