// HiredAtSection/index.tsx
import React from 'react';
import CompanyLogos from './CompanyLogos';
import CoachingBanner from './CoachingBanner';

const HiredAtSection: React.FC = () => (
    <section className="bg-white w-full py-12 px-6 sm:px-10 lg:px-16 flex justify-center font-sans">
        <div className="max-w-[1240px] w-full flex flex-col gap-14">
            <div className="flex flex-col xl:flex-row items-center xl:items-center justify-between gap-8 xl:gap-4">
                <p className="text-[#828ba2] text-[15px] sm:text-[16px] font-medium text-center xl:text-left xl:w-[200px] leading-snug flex-shrink-0">
                    Our candidates<br className="hidden xl:block" /> have been hired at:
                </p>
                <CompanyLogos />
            </div>
            <CoachingBanner />
        </div>
    </section>
);

export default HiredAtSection;