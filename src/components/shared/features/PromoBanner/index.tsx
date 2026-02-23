import React from 'react';

interface PromoBannerProps {
  title?: string;
  description?: string;
  btnText?: string;
  onBtnClick?: () => void;
  imageUrl?: string;
  imageAlt?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title = 'So much more than a resume builder',
  description = "When you build your resume, you get access to 18 powerful career tools. It's the complete career toolkit, all in one place. If you're here, you're already on the way up.",
  btnText = 'See the tools',
  onBtnClick,
  imageUrl = '/assets/images/misc/promo/promo-banner-templates.svg',
  imageAlt = 'Career tools preview',
}) => (
  <section className="w-full bg-[#f1f2ff] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2 flex flex-wrap justify-center gap-8">
        <img src={imageUrl} alt={imageAlt} className="w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">{description}</p>
        <button
          onClick={onBtnClick}
          className="px-8 py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold rounded-md transition-colors"
        >
          {btnText}
        </button>
      </div>
    </div>
  </section>
);

export default PromoBanner;
