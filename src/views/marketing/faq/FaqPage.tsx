import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/client/faq.css';
import { FAQ_CATEGORIES } from './data/faq.data';
import type { FaqCategory } from './types/faq.types';

import HelpHero from './components/HelpHero';
import CategoryCard from './components/CategorySection/CategoryCard';
import SearchResults from './components/SearchResults';
import FaqSection from './components/CategorySection';

const FaqHeader: React.FC = () => (
    <header className="w-full flex items-center justify-between px-6 lg:px-10 py-5 bg-white">
        <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                {/* Exact resume.io Logo Blocks */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#1a91f0] rounded-sm z-10" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#a7d7fd] rounded-sm z-10" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1a91f0] rounded-sm z-0" />
                </div>
                <div className="flex flex-col justify-center -space-y-1.5 mt-1">
                    <div className="text-[19px] font-bold tracking-tight text-[#111827]">
                        resume.io
                    </div>
                    <span className="text-[8px] font-medium text-[#6b7280] text-right pr-0.5">
                        by Muhammad Nabeel Ijaz
                    </span>
                </div>
            </Link>
            <div className="h-6 w-[1px] bg-slate-200" />
            <span className="text-[17px] font-medium text-[#4b5563]">FAQ · resume.io</span>
        </div>
        <div>
            <Link to="/contact" className="bg-[#4b94f6] hover:bg-[#3b82f6] text-white px-5 py-2.5 rounded-[20px] text-[14px] font-semibold transition-colors">
                Contact Us
            </Link>
        </div>
    </header>
);

const CookieBanner: React.FC = () => (
    <div className="fixed bottom-0 left-0 w-full bg-[#3d3d3d] text-white py-4 px-6 flex flex-col md:flex-row items-center justify-center gap-6 z-50">
        <p className="text-[14px]">
            We use cookies to analyze website traffic and help improve our visitor experience. <Link to="/privacy-policy" className="underline font-medium hover:text-slate-200">Privacy Policy</Link>
        </p>
        <div className="flex items-center gap-3">
            <button className="px-5 py-2 rounded-full border border-white text-[14px] font-medium hover:bg-white/10 transition-colors">Reject</button>
            <button className="px-5 py-2 rounded-full border border-white text-[14px] font-medium hover:bg-white/10 transition-colors">Accept</button>
        </div>
    </div>
);

const FaqPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<FaqCategory | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        if (value) setActiveCategory(null);
    };

    const handleCategoryClick = (category: FaqCategory) => {
        setActiveCategory(category);
        setSearchQuery('');
    };

    const handleBack = () => setActiveCategory(null);

    return (
        <div className="min-h-screen bg-white font-sans relative pb-24">
            <FaqHeader />

            <main>
                <HelpHero searchQuery={searchQuery} onSearch={handleSearch} />

                {searchQuery ? (
                    <SearchResults query={searchQuery} onBack={handleBack} />
                ) : activeCategory ? (
                    <FaqSection category={activeCategory} onBack={handleBack} />
                ) : (
                    <div className="w-full max-w-4xl mx-auto px-4 pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {FAQ_CATEGORIES.map((cat) => (
                                <CategoryCard
                                    key={cat.id}
                                    category={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <div className="absolute bottom-6 left-6">
                <p className="text-[13px] text-slate-500 font-medium hover:text-slate-700 cursor-pointer">Cookie preferences</p>
            </div>

            <CookieBanner />
        </div>
    );
};

export default FaqPage;
