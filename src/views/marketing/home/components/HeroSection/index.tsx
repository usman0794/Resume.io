// HeroSection/index.tsx — Main export; uses HeroResumeVisual as sub-component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HeroSectionProps } from '../../types/home.types';
import { Check, Star } from 'lucide-react';
import HeroResumeVisual from './HeroResumeVisual';
import { ROUTES } from '@/routes/routePaths';

const HeroSection: React.FC<HeroSectionProps> = ({ words = ['hired faster.', 'an interview.', 'a remote job.', 'promoted.', 'pro.'] }) => {
    const maxWordLength = Math.max(...words.map((w) => w.length));
    const [wordIndex, setWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const typingSpeed = isDeleting ? 40 : 120;
        if (!isDeleting && currentText === words[wordIndex]) { setTimeout(() => setIsDeleting(true), 2000); return; }
        else if (isDeleting && currentText === '') { setIsDeleting(false); setWordIndex((prev) => (prev + 1) % words.length); return; }
        const timeout = setTimeout(() => {
            setCurrentText(prev => isDeleting ? prev.substring(0, prev.length - 1) : words[wordIndex].substring(0, prev.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, wordIndex, words]);

    return (
        <div className="w-full max-w-[1440px] mx-auto pt-2 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#f7f9fc] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 px-12 sm:px-24 lg:px-36 xl:px-44 relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-8 lg:gap-4 items-center relative z-10">

                    {/* Left: Text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">

                        {/* Heading */}
                        <h1 className="text-[32px] sm:text-[40px] lg:text-[50px] leading-[1.15] font-bold text-[#1e2a3b] mb-5 tracking-tight">
                            <span className="block">This resume</span>
                            <span className="block">builder gets you</span>

                            {/* Fixed height container for animated text */}
                            <div className="relative h-[1.2em] overflow-hidden">
                                <span className="absolute left-0 top-0 text-[#1a91f0] whitespace-nowrap">
                                    {currentText}
                                </span>
                            </div>
                        </h1>

                        <p className="text-[15px] sm:text-[16px] text-[#4b5563] mb-8 font-medium max-w-[380px]">
                            Only 2% of resumes win. Yours will be one of them.
                        </p>

                        {/* Buttons — navigate to /builder (StartModal handles the flow) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-8">
                            <button
                                onClick={() => navigate(ROUTES.RESUME_BUILDER)}
                                className="w-full sm:w-auto bg-[#1a91f0] hover:bg-[#1580d6] text-white px-6 py-3 rounded-lg text-[15px] font-semibold transition-colors duration-200"
                            >
                                Create my resume
                            </button>
                            <button
                                onClick={() => navigate(ROUTES.RESUME_BUILDER)}
                                className="w-full sm:w-auto bg-[#e6f1fe] hover:bg-[#d4e7fe] text-[#1a91f0] px-6 py-3 rounded-lg text-[15px] font-semibold transition-colors duration-200"
                            >
                                Upload my resume
                            </button>
                        </div>

                        {/* Trust Section */}
                        <div className="flex flex-col items-center lg:items-start gap-2.5">
                            <div className="flex items-center gap-2 text-[#4b5563] text-[14px]">
                                <div className="w-[20px] h-[20px] rounded-full bg-[#21b068] flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <span><strong className="text-[#1e2a3b] font-semibold">39%</strong> more likely to land the job</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
                                    <span className="font-bold text-[17px] tracking-tight text-[#1e2a3b]">Trustpilot</span>
                                </div>
                                <div className="text-[14px] text-[#4b5563] border-l border-slate-300 pl-2">
                                    <strong>4.2</strong> out of 5 | 56,057 reviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <HeroResumeVisual />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
