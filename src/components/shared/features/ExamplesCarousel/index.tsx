import React, { useRef } from 'react';
import type { ExampleItem } from '@/types/page-templates.types';
import { EXAMPLES_CAROUSEL } from '@/views/marketing/resume-templates/data/templates.data';
import ExampleCard from './ExampleCard';

interface ExamplesCarouselProps {
  title?: string;
  subtitle?: string;
  examples?: ExampleItem[];
}

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
  </svg>
);

const ExamplesCarousel: React.FC<ExamplesCarouselProps> = ({
  title = 'Save time with\nresume examples',
  subtitle = 'Check out our free resume samples for inspiration. Use the expert guides and our resume builder to create a beautiful resume in minutes. Our new and advanced resume builder will guide you from start to finish.',
  examples = EXAMPLES_CAROUSEL,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#1e225c] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-[1360px] mx-auto relative">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 lg:mb-16 gap-4 md:gap-12 px-2 md:px-6">
          <h2 className="text-[28px] sm:text-[36px] md:text-[46px] lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight lg:w-[45%] shrink-0">
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < title.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </h2>
          <p className="text-[#a5aacb] text-[15px] sm:text-[16px] md:text-[18px] leading-[1.6] lg:w-[50%] pt-2 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Navigation & Carousel */}
        <div className="relative group mt-4">
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-16px] md:left-[-24px] lg:left-[-24px] top-[calc(50%+28px)] -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#2c3078] hover:bg-[#3d428a] flex items-center justify-center transition-colors shadow-lg z-10 focus:outline-none"
            aria-label="Previous examples"
          >
            <ArrowLeft />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-[-16px] md:right-[-24px] lg:right-[-24px] top-[calc(50%+28px)] -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#2c3078] hover:bg-[#3d428a] flex items-center justify-center transition-colors shadow-lg z-10 focus:outline-none"
            aria-label="Next examples"
          >
            <ArrowRight />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-12 pt-2 snap-x snap-mandatory scroll-smooth px-6 md:px-8 lg:px-4"
          >
            {examples.map((example) => (
              <ExampleCard key={example.id} example={example} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesCarousel;
