import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import TemplateFanVisual from './TemplateFanVisual';

interface BuilderCtaSectionProps {
  heading?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

const BuilderCtaSection: React.FC<BuilderCtaSectionProps> = ({
  heading = "Try our professional Resume builder now!",
  description = "Save time with our easy 3-step resume builder. No more writer's block or formatting difficulties in Word. Rapidly make a perfect resume employers love.",
  primaryBtnText = 'Create my resume',
  primaryBtnHref = ROUTES.RESUME_BUILDER,
  secondaryBtnText = 'Resume examples',
  secondaryBtnHref = ROUTES.RESUME_EXAMPLES,
}) => {
  return (
    <section className="bg-[#f2f5f8] py-20 lg:py-28 overflow-hidden font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

          <TemplateFanVisual />

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-40 lg:pl-10">
            <h2 className="text-4xl sm:text-5xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              {heading}
            </h2>

            <p className="text-[17px] text-slate-700 mb-8 max-w-xl leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to={primaryBtnHref}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1a91f0] hover:bg-[#157acb] text-white font-bold text-[17px] px-8 py-4 rounded transition-colors shadow-sm"
              >
                {primaryBtnText}
              </Link>
              <Link
                to={secondaryBtnHref}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-slate-200/50 text-slate-800 border border-slate-300 hover:border-slate-400 font-bold text-[17px] px-8 py-4 rounded transition-all"
              >
                {secondaryBtnText}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BuilderCtaSection;
