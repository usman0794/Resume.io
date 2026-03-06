import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';

const BlogNewsletterBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-white py-12 md:py-20 overflow-hidden border-t border-b border-gray-100 my-8">
      {/* Left Illustration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none md:pl-10 lg:pl-24">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Yellow X */}
          <path d="M35 45L45 55M45 45L35 55" stroke="#FFC233" strokeWidth="2.5" strokeLinecap="round" />
          {/* Purple Star/Sparkle */}
          <path d="M75 55C80 65 95 65 95 65C95 65 95 80 85 85C75 90 60 90 60 90C60 90 60 75 70 70C75 65 75 55 75 55Z" fill="#EEF0FF" />
          <path d="M77 42L79 48M104 60L110 63M95 95L91 100" stroke="#B8BCD8" strokeWidth="2" strokeLinecap="round" />
          {/* Yellow Spring/Coil */}
          <path d="M40 115C45 100 60 95 65 110C70 125 55 130 50 115C45 100 65 100 70 115C75 130 90 120 85 105" stroke="#FFC233" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Gray Circle */}
          <circle cx="105" cy="105" r="9" fill="#9DA9B2" />
          {/* Purple Dashes */}
          <path d="M65 125L80 110M70 135L85 120M75 145L90 130" stroke="#EEF0FF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Right Illustration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none md:pr-10 lg:pr-24">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Purple Triangles */}
          <path d="M120 40L130 30L140 40L150 30L160 40Z" fill="#EEF0FF" />
          {/* Purple Asterisk */}
          <path d="M115 90L85 90M100 75L100 105M110 80L90 100M90 80L110 100" stroke="#B8BCD8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Yellow Pendulum */}
          <path d="M140 65L145 105" stroke="#FFC233" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="65" r="5" stroke="#9DA9B2" strokeWidth="2.5" fill="none" />
          <circle cx="145.5" cy="110" r="6" stroke="#FFC233" strokeWidth="2.5" fill="none" />
          {/* Gray Squiggle */}
          <path d="M145 135C150 125 155 125 155 130C155 135 160 135 165 125C170 115 175 125 175 125" stroke="#9DA9B2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[720px] mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-[28px] md:text-[34px] font-bold text-[#111827] tracking-tight mb-4">
          Ready to find a job you truly love?
        </h2>
        <p className="text-[16px] text-[#4b5563] mb-8">
          Create a resume you can be proud of with our resume builder.
        </p>
        <Link
          to={ROUTES.RESUME_BUILDER}
          className="bg-[#1a91f0] hover:bg-[#1578c2] text-white px-8 py-3.5 rounded-[4px] text-[16px] font-semibold transition-colors shadow-sm tracking-wide"
        >
          Build my resume
        </Link>
      </div>
    </div>
  );
};

export default BlogNewsletterBanner;