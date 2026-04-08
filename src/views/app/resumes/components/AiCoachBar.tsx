import React, { useState } from 'react';

/**
 * Component: AiCoachBar
 *
 * Purpose:
 * Floating "Ask AI coach anything" input bar shown at the bottom of the
 * Resumes page content area. Matches the resume.io AI coach prompt exactly.
 *
 * Responsibilities:
 * - Render a spinning rainbow-ring logo icon on the left (CSS animation)
 * - Render "Ask AI coach anything." placeholder text input
 * - Submit question to parent via onSubmit on Enter key
 * - Clear input after submission
 *
 * Props:
 *   onSubmit — optional callback with user's trimmed question string
 *
 * Design Intent:
 * White card, rounded-2xl, shadow-md. Logo spinner left (rainbow gradient ring,
 * ~32px). Gray placeholder text ("Ask AI coach anything.") right of icon.
 * Max-width ~448px (max-w-md), centred in the content area (mx-auto).
 * Visible below the ResumeGrid on both desktop and mobile.
 * Matches reference screenshot bottom area exactly.
 *
 * Layout Role:
 * Final element in ResumesPage, below the ResumeGrid.
 * On mobile: full-width with horizontal page padding handled by parent.
 * On desktop: max-w-md centred.
 *
 * Responsive Behavior:
 * - Mobile: full-width within page padding
 * - Desktop: max-w-md centred (mx-auto)
 */

interface AiCoachBarProps {
  onSubmit?: (question: string) => void;
}

const AiCoachBar: React.FC<AiCoachBarProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit?.(value.trim());
      setValue('');
    }
  };

  return (
    <div className="cl-ai-bar flex items-center gap-3 bg-white rounded-2xl shadow-md px-4 py-3.5 w-full max-w-md mx-auto mt-6">

      {/* Spinning rainbow logo ring */}
      <div className="cl-ai-bar__icon flex-shrink-0 w-8 h-8" aria-hidden="true">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full cl-ai-ring"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="url(#aiGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="56 20"
          />
          <defs>
            <linearGradient id="aiGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="0.33" stopColor="#EC4899" />
              <stop offset="0.66" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Ask AI coach anything."
        className="cl-ai-bar__input flex-1 text-[15px] text-gray-400 placeholder-gray-400 bg-transparent outline-none"
        aria-label="Ask AI coach"
      />
    </div>
  );
};

export default AiCoachBar;
