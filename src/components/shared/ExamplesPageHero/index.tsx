import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import StarRating from './StarRating';

interface ExamplesPageHeroProps {
  breadcrumbLabel: string;
  title: string;
  description: string;
  ctaBtnText?: string;
  ctaBtnHref?: string;
  trustpilotScore?: number;
  trustpilotTotal?: number;
  heroImageSrc?: string;
  heroImageAlt?: string;
  promoLeftImageSrc?: string;
  promoRightImageSrc?: string;
}

const ExamplesPageHero: React.FC<ExamplesPageHeroProps> = ({
  breadcrumbLabel,
  title,
  description,
  ctaBtnText = 'Create my resume',
  ctaBtnHref = ROUTES.RESUME_BUILDER,
  trustpilotScore = 4.2,
  trustpilotTotal = 55610,
  heroImageSrc = '/assets/images/templates/template-new-york-alt.jpg',
  heroImageAlt = 'Resume Example',
  promoLeftImageSrc = '/assets/images/misc/promo/promo-left-resume.svg',
  promoRightImageSrc = '/assets/images/misc/promo/promo-right-resume.svg',
}) => {
  return (
    <section className="bg-[#f2f5f8] pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">

        {/* Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left z-20 pb-12 lg:pb-24">

          {/* Breadcrumb */}
          <nav className="flex items-center text-[15px] text-slate-500 mb-6 lg:mb-8 font-medium">
            <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600">{breadcrumbLabel}</span>
          </nav>

          <h1 className="text-4xl sm:text-[42px] lg:text-[48px] font-extrabold text-slate-900 leading-[1.15] mb-5 tracking-tight">
            {title}
          </h1>

          <p className="text-lg text-slate-700 mb-8 max-w-2xl lg:max-w-none leading-relaxed">
            {description}
          </p>

          <Link
            to={ctaBtnHref}
            className="inline-flex items-center justify-center bg-[#1a91f0] hover:bg-[#157acb] text-white font-bold text-[17px] px-8 py-4 rounded transition-colors mb-8 shadow-sm"
          >
            {ctaBtnText}
          </Link>

          <StarRating score={trustpilotScore} total={trustpilotTotal} source="Trustpilot" />
        </div>

        {/* Visuals */}
        <div className="w-full lg:w-[45%] relative flex justify-center lg:justify-end items-end h-full">

          <div
            className="absolute z-10 top-[-40px] right-[10%] lg:right-0 w-[140px] h-[120px] bg-no-repeat bg-contain"
            style={{ backgroundImage: `url("${promoRightImageSrc}")` }}
            aria-hidden="true"
          />

          <div className="relative z-20 w-full max-w-[544px] shadow-[0_0_40px_rgba(0,0,0,0.08)] rounded-t-lg bg-white overflow-hidden transform translate-y-4 lg:translate-y-0">
            <img
              src={heroImageSrc}
              alt={heroImageAlt}
              className="w-full h-auto object-cover object-top block"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesPageHero;
