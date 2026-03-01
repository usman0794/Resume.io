// CoachingBanner.tsx — "Need some advice?" banner
import React from 'react';

const CoachingBanner: React.FC = () => (
    <div className="bg-[#eff6ff] rounded-[16px] p-6 sm:p-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6 w-full shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8">
            <div className="flex items-center justify-center -space-x-4">
                {[11, 47, 12].map((n) => (
                    <img
                        key={n}
                        src={`https://i.pravatar.cc/150?img=${n}`}
                        alt={`Coach ${n}`}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-white object-cover shadow-sm"
                    />
                ))}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#1e2a3b] leading-tight">
                    Need some advice?
                </h3>
                <p className="text-[#4b5563] text-[15px] sm:text-[16px]">
                    98% of our coaching clients receive a job offer within 12 weeks.
                </p>
            </div>
        </div>
        <button className="bg-[#1a91f0] hover:bg-[#1579c9] transition-colors duration-200 text-white font-semibold text-[15px] sm:text-[16px] py-3.5 px-8 rounded-[4px] whitespace-nowrap w-full md:w-auto shadow-sm">
            Find your coach
        </button>
    </div>
);

export default CoachingBanner;