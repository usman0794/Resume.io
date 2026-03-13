import React from 'react';

/**
 * Component: JobMatchesOverlay
 * Purpose: Interstitial state prompting the user to define their role.
 */
const JobMatchesOverlay = () => (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-10">
        <div className="bg-gradient-to-b from-white/60 to-white/95 absolute inset-0 backdrop-blur-[2px]" />

        <div className="relative z-30 flex flex-col items-center text-center max-w-md px-4">
            {/* Mountain/Flag Illustration placeholder */}
            <div className="w-48 h-32 mb-6 relative flex items-center justify-center">
                <svg viewBox="0 0 200 120" className="w-full h-full text-blue-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 100 Q 80 80 120 100 T 180 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M120 100 L 140 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M140 40 L 170 50 L 145 60 Z" fill="currentColor" />
                    <circle cx="130" cy="70" r="5" fill="currentColor" />
                    <path d="M130 75 L 125 90 M 130 75 L 135 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Which role are you going for?</h3>
            <p className="text-gray-600 text-sm mb-6 px-4">Tell us the job title. We show you matching courses.</p>
            <button className="bg-[#1A91F0] hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-colors">
                Set job title
            </button>
        </div>
    </div>
);

export default JobMatchesOverlay;

