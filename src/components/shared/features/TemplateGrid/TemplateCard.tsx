import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TemplateData } from '@/types/page-templates.types';

interface TemplateCardProps {
  template: TemplateData;
}

const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
  <span
    className="inline-block w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm flex-shrink-0"
    style={{ backgroundColor: color }}
    aria-hidden="true"
  />
);

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();
  const hasColors = template.colors && template.colors.length > 0;

  const handleUseTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/builder?mode=manual&templateId=${template.id}`);
  };

  return (
    <div className="group flex flex-col w-full cursor-pointer" onClick={handleUseTemplate}>
      {/* Template Preview Image */}
      <div className="relative w-full aspect-[1/1.414] bg-[#f8fafc] rounded-lg overflow-hidden mb-3 sm:mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-300">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/5 transition-colors duration-300 rounded-lg" />

        {/* Use Template button — always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 flex items-end justify-center pb-3 sm:pb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleUseTemplate}
            className="bg-[#1a91f0] hover:bg-[#1578c2] active:bg-[#1578c2] text-white text-[12px] sm:text-[13px] font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-md shadow-lg transition-colors">
            Use template
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex items-start justify-between mb-1 gap-1">
        <h3 className="text-[13px] sm:text-[15px] font-semibold text-slate-900 leading-tight">{template.name}</h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          {template.formats.map((fmt) => (
            <span
              key={fmt}
              className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide border border-slate-200 px-1 sm:px-1.5 py-0.5 rounded"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>

      <p className="text-[12px] sm:text-[13px] text-slate-500 leading-snug line-clamp-2 mb-2 sm:mb-3 hidden sm:block">{template.description}</p>

      {/* Color Swatches */}
      {hasColors && (
        <div className="flex items-center gap-1 sm:gap-1.5 mt-auto">
          {template.colors!.map((color) => (
            <ColorSwatch key={color} color={color} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
