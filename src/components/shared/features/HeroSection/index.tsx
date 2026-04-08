import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';

interface PageHeroSectionProps {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  breadcrumbLabel,
  title,
  subtitle,
  primaryBtnText = 'Create my resume',
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section className="w-full bg-white pt-2 pb-4 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mx-auto flex justify-start mb-2">
        <nav className="text-sm text-slate-500 font-medium">
          <Link to={ROUTES.HOME} className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2 text-slate-400">›</span>
          <span className="text-slate-900">{breadcrumbLabel}</span>
        </nav>
      </div>

      {/* Heading */}
      <div className="max-w-3xl mx-auto mt-2">
        <h1 className="text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-[17px] md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-base font-semibold rounded-md shadow-sm transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-100"
          >
            {primaryBtnText}
          </button>

          {secondaryBtnText && (
            <button
              type="button"
              onClick={onSecondaryClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#f3f8ff] hover:bg-[#e6f0ff] text-[#1a73e8] text-base font-semibold rounded-md transition-all duration-200 ease-in-out"
            >
              {secondaryBtnText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
