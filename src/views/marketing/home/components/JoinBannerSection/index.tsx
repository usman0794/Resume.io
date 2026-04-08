// JoinBannerSection/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import { HOME_JOIN_BANNER_IMAGE } from '../../data/home.data';
import AnimatedCounter from './AnimatedCounter';

const JoinBannerSection: React.FC = () => {
    const [triggered, setTriggered] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTriggered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-[#f0f7ff] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-between px-8 sm:px-12 lg:px-16 py-12 lg:py-0 gap-8 lg:gap-0 shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:py-14 max-w-lg">
                        <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-slate-900 leading-tight mb-3">
                            Join over{' '}
                            <span className="text-[#248af0]"><AnimatedCounter triggered={triggered} /></span>{' '}
                            resume makers
                        </h2>
                        <p className="text-[16px] sm:text-[18px] text-slate-500 mb-7">Start now and get hired faster.</p>
                        <Link to={ROUTES.RESUME_BUILDER}
                            className="inline-block bg-[#248af0] hover:bg-[#1b7ce0] text-white text-[16px] font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-sm">
                            Create my resume
                        </Link>
                    </div>
                    <div className="flex-shrink-0 flex items-end justify-center lg:justify-end w-full lg:w-auto">
                        <img src={HOME_JOIN_BANNER_IMAGE} alt="Create my resume"
                            className="w-[280px] sm:w-[340px] lg:w-[400px] object-contain" loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinBannerSection;