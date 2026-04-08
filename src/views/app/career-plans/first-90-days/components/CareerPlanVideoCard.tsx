import React, { useState } from 'react';
import { X } from 'lucide-react';

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

interface CareerPlanVideoCardProps {
  onDismiss?: () => void;
}

const CareerPlanVideoCard: React.FC<CareerPlanVideoCardProps> = ({ onDismiss }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const handleVideoClick = () => {
    window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="f90-video-card bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Card header */}
      <div className="f90-video-card__header flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <span className="text-[15px] font-semibold text-gray-800">About career plan</span>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent border-none cursor-pointer"
          aria-label="Dismiss career plan info"
        >
          <X size={18} />
        </button>
      </div>

      {/* YouTube embed area */}
      <div
        className="f90-video-card__ratio relative w-full cursor-pointer overflow-hidden"
        onClick={handleVideoClick}
        role="button"
        tabIndex={0}
        aria-label="Watch First 90 Days Welcome Video on YouTube"
        onKeyDown={(e) => e.key === 'Enter' && handleVideoClick()}
      >
        {/* Dark-green background */}
        <div className="absolute inset-0 bg-[#1c2b1e]" />

        {/* Mint green blob - left side */}
        <div className="f90-video-card__blob absolute left-0 top-0 bottom-0 w-1/2" />

        {/* "First 90 Days Plan" title - bottom-left */}
        <div className="absolute bottom-10 left-4 z-10">
          <p className="f90-video-card__plan-title text-white font-bold leading-tight">
            First 90<br />Days Plan
          </p>
        </div>

        {/* Portrait photo - right side */}
        <div className="f90-video-card__portrait absolute right-0 top-0 bottom-0 w-1/2" />

        {/* Channel + video title - top-left */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
            <div className="w-4 h-4 rounded-full border-2 border-[#1A91F0] bg-transparent" />
          </div>
          <div>
            <p className="text-white text-[12px] font-semibold leading-none">First 90 Days Welcome Video</p>
            <p className="text-white/70 text-[10px] leading-none mt-0.5">Career.io</p>
          </div>
        </div>

        {/* Red YouTube play button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="f90-video-card__play w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg hover:bg-[#cc0000] transition-colors">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <polygon points="8,5 19,11 8,17" fill="white" />
            </svg>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="f90-video-card__ctrl-pill flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="f90-video-card__ctrl-pill flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                <path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="f90-video-card__yt-pill flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <rect width="16" height="12" rx="2" fill="#FF0000"/>
              <polygon points="6.5,3 11.5,6 6.5,9" fill="white"/>
            </svg>
            <span className="text-white text-[11px] font-medium whitespace-nowrap">Watch on YouTube</span>
          </div>
        </div>
      </div>

      {/* Body text */}
      <div className="f90-video-card__body px-5 py-5">
        <p className="text-[15px] md:text-[16px] font-bold text-gray-900 leading-snug mb-3">
          Starting a new job feels overwhelming! Our plan creates a structure to help you excel from day one.
        </p>
        <p className="text-[14px] text-gray-600 mb-3 leading-relaxed">Together, we'll:</p>
        <ul className="list-disc list-outside pl-5 mb-4 space-y-1">
          <li className="text-[14px] text-gray-600 leading-relaxed">Guide you through how to onboard successfully</li>
          <li className="text-[14px] text-gray-600 leading-relaxed">Focus on how to develop key relationships with your colleagues</li>
          <li className="text-[14px] text-gray-600 leading-relaxed">Track your progress across your first 90 days</li>
        </ul>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          After engaging in this plan, you'll be confident in yourself, your work, and your relationships.{' '}
          If you're looking for additional support,{' '}
          <a href="#" className="text-[#1A91F0] hover:underline" onClick={(e) => e.preventDefault()}>
            book a session
          </a>{' '}
          with a coach, and we can help you.
        </p>
      </div>
    </div>
  );
};

export default CareerPlanVideoCard;
