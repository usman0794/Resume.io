// EveryToolSection/index.tsx
import React, { useState, useEffect } from 'react';
import type { ToolItem } from '../../types/home.types';
import { HOME_TOOLS_DATA } from '../../data/home.data';
import ToolCard from './ToolCard';
import { TabIconNoticed, TabIconHired, TabIconPaid, TabIconPromoted } from './icons/TabIcons';

const TABS = [
    { id: 'noticed', label: 'Get Noticed', Icon: TabIconNoticed },
    { id: 'hired', label: 'Get Hired', Icon: TabIconHired },
    { id: 'paid', label: 'Get Paid More', Icon: TabIconPaid },
    { id: 'promoted', label: 'Get promoted', Icon: TabIconPromoted },
];

interface EveryToolSectionProps {
    toolsData?: Record<string, ToolItem[]>;
}

export default function EveryToolSection({ toolsData = HOME_TOOLS_DATA }: EveryToolSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const activeTab = TABS[activeIndex].id;
    const currentTools = toolsData[activeTab] || [];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % TABS.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, activeIndex]);

    return (
        <section className="bg-white py-12 px-4 sm:px-6 w-full font-sans">
            <div className="max-w-[1100px] mx-auto">
                <h2 className="text-3xl sm:text-[42px] font-semibold text-slate-900 text-center mb-10 sm:mb-14 tracking-tight">
                    Every tool you need is here...
                </h2>

                {/* DESKTOP LAYOUT */}
                <div className="hidden lg:flex gap-8 items-start">
                    <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {TABS.map((tab, index) => {
                            const isActive = activeIndex === index;
                            const TabIcon = tab.Icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsAutoPlaying(false);
                                    }}
                                    className={`w-full flex items-center px-5 py-5 text-left rounded-xl transition-all duration-300 ${
                                        isActive ? 'bg-[#f0f7ff] shadow-sm text-[#1A91F0] font-medium' : 'bg-transparent text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <TabIcon isActive={isActive} />
                                        <span className="text-[17px]">
                                            <span className="mr-1">{index + 1}.</span>{tab.label}
                                        </span>
                                    </div>
                                    
                                    {/* The circular timer */}
                                    {isActive && isAutoPlaying && (
                                        <div className="ml-auto flex items-center justify-center w-6 h-6">
                                            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                                                <circle
                                                    className="text-[#dbe9ff]"
                                                    strokeWidth="2.5"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="10"
                                                    cx="12"
                                                    cy="12"
                                                />
                                                <circle
                                                    key={`circle-${index}`}
                                                    className="text-[#1A91F0] animate-circular-timer"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="10"
                                                    cx="12"
                                                    cy="12"
                                                    strokeDasharray="62.83"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-6 min-h-[400px]">
                        {currentTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>

                {/* MOBILE/TABLET LAYOUT */}
                <div className="flex flex-col gap-4 lg:hidden">
                    {TABS.map((tab, index) => {
                        const isActive = activeIndex === index;
                        const TabIcon = tab.Icon;
                        return (
                            <React.Fragment key={tab.id}>
                                <button
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsAutoPlaying(false);
                                    }}
                                    className={`w-full flex items-center px-6 py-5 rounded-2xl border transition-all duration-300 ${
                                        isActive ? 'border-[#1a91f0]/30 shadow-sm bg-[#f0f7ff]' : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <TabIcon isActive={isActive} />
                                        <span className={`text-[18px] font-medium transition-colors ${isActive ? 'text-[#1A91F0]' : 'text-slate-700'}`}>
                                            {tab.label}
                                        </span>
                                    </div>
                                    
                                    {/* The circular timer for mobile */}
                                    {isActive && isAutoPlaying && (
                                        <div className="ml-auto flex items-center justify-center w-6 h-6">
                                            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                                                <circle
                                                    className="text-[#dbe9ff]"
                                                    strokeWidth="2.5"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="10"
                                                    cx="12"
                                                    cy="12"
                                                />
                                                <circle
                                                    key={`circle-mobile-${index}`}
                                                    className="text-[#1A91F0] animate-circular-timer"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="10"
                                                    cx="12"
                                                    cy="12"
                                                    strokeDasharray="62.83"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                                {isActive && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2 animate-in fade-in slide-in-from-top-4 duration-300">
                                        {toolsData[tab.id]?.map((tool) => (
                                            <ToolCard key={tool.id} tool={tool} />
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
