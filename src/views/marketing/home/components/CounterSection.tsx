// CounterSection.tsx
import React, { useState, useEffect } from 'react';
import type { CounterSectionProps } from '../types/home.types';

const CloudRefreshIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9" strokeDasharray="4 4" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
);

const CounterSection: React.FC<CounterSectionProps> = ({ initialCount = 59435 }) => {
    const [resumeCount, setResumeCount] = useState(initialCount);

    useEffect(() => {
        const interval = setInterval(() => {
            setResumeCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center pt-14 pb-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6f1fe] flex items-center justify-center text-[#1a91f0]">
                    <CloudRefreshIcon className="w-7 h-7" />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
                    <span className="text-[#1a91f0] text-[40px] sm:text-[44px] leading-none font-medium tracking-tight">
                        {resumeCount.toLocaleString()}
                    </span>
                    <span className="text-[20px] sm:text-[28px] text-[#1e2a3b] font-medium tracking-tight mt-1">
                        resumes created today
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
