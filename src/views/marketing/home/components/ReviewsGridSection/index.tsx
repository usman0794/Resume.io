// ReviewsGridSection/index.tsx
import React, { useRef, useState, useEffect } from 'react';
import type { ReviewItem } from '../../types/home.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TrustpilotSquare, TrustpilotLogoStar } from './TrustpilotStars';
import ReviewCard from './ReviewCard';

interface ReviewsGridSectionProps { reviews?: ReviewItem[]; }

export default function ReviewsGridSection({ reviews = [] }: ReviewsGridSectionProps) {
    if (!reviews || reviews.length === 0) return null;
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < maxScroll - 5);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const cardWidth = (scrollContainerRef.current.children[0] as HTMLElement)?.clientWidth || 300;
        scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -(cardWidth + 24) : cardWidth + 24, behavior: 'smooth' });
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    return (
        <section className="w-full bg-[#f8fafc] py-20 sm:py-28 font-sans">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[42px] font-medium text-[#1e2a3b] text-center mb-16 tracking-tight">
                    92% of customers recommend us
                </h2>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 w-full">
                    {/* Trustpilot Summary */}
                    <div className="w-full lg:w-[220px] flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left pt-1">
                        <div className="text-[34px] sm:text-[38px] font-medium text-[#1e2a3b] mb-4 leading-none">4.2 out of 5</div>
                        <div className="flex items-center justify-center lg:justify-start gap-[2px] mb-4">
                            {[1, 1, 1, 1, 0.2].map((f, i) => <TrustpilotSquare key={i} fraction={f} size="large" />)}
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-2">
                            <TrustpilotLogoStar />
                            <span className="font-bold text-[19px] text-[#1e2a3b] tracking-tight">Trustpilot</span>
                        </div>
                        <p className="text-[13px] text-[#828ba2] font-medium">based on 55,606 reviews</p>
                    </div>

                    {/* Carousel */}
                    <div className="flex-1 w-full min-w-0">
                        <div ref={scrollContainerRef} onScroll={handleScroll}
                            className="flex flex-row gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
                        </div>
                        <div className="mt-8 flex items-center gap-6 w-full lg:w-[95%]">
                            <div className="flex items-center gap-2">
                                {(['left', 'right'] as const).map((dir) => {
                                    const canScroll = dir === 'left' ? canScrollLeft : canScrollRight;
                                    return (
                                        <button key={dir} onClick={() => scroll(dir)} disabled={!canScroll}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${canScroll ? 'bg-[#e6f1fe] text-[#1a91f0] hover:bg-[#d4e7fe] cursor-pointer' : 'bg-[#f1f5f9] text-[#cbd5e1] cursor-default'}`}
                                            aria-label={`${dir === 'left' ? 'Previous' : 'Next'} review`}>
                                            {dir === 'left' ? <ChevronLeft className="w-5 h-5" strokeWidth={2.5} /> : <ChevronRight className="w-5 h-5" strokeWidth={2.5} />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex-1 h-[2px] bg-[#e2e8f0] relative overflow-hidden rounded-full">
                                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#1a91f0] transition-transform duration-300 ease-out rounded-full"
                                    style={{ transform: `translateX(${scrollProgress * 2}%)` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

