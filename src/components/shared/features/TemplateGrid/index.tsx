import React from 'react';
import TemplateCard from './TemplateCard';
import type { TemplateData } from '@/types/page-templates.types';

interface TemplateGridProps {
  templates: TemplateData[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  loading = false,
  error = null,
  onRetry,
}) => {

  // ── Loading skeleton ──
  if (loading) {
    const shimmer: React.CSSProperties = {
      background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skshimmer 1.4s infinite',
    };
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10 lg:gap-y-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {/* A4 card — matches real aspect-[1/1.414] */}
              <div style={{ width: '100%', aspectRatio: '1/1.414', borderRadius: 8, marginBottom: 14, ...shimmer }} />
              {/* Title + badge row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: '58%', height: 18, borderRadius: 6, ...shimmer }} />
                <div style={{ width: '22%', height: 14, borderRadius: 5, ...shimmer }} />
              </div>
              {/* Description lines */}
              <div style={{ width: '100%', height: 13, borderRadius: 5, marginBottom: 7, ...shimmer }} />
              <div style={{ width: '78%', height: 13, borderRadius: 5, marginBottom: 18, ...shimmer }} />
              {/* CTA link */}
              <div style={{ width: '32%', height: 13, borderRadius: 5, marginTop: 'auto', ...shimmer }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error || (!loading && templates.length === 0)) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-slate-800 mb-1">
            Templates not available at the moment.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Please check your connection and try again.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2.5 bg-[#1A91F0] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Template grid ──
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10 lg:gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
