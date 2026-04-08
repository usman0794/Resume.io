// ToolCard.tsx — Single tool card for EveryToolSection
import React from 'react';
import type { ToolItem } from '../../types/home.types';

interface ToolCardProps {
    tool: ToolItem;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => (
    <div
        className={`
      ${tool.bgColor} 
      flex flex-col h-[370px] overflow-hidden rounded-3xl 
      pt-8 px-6 sm:px-8 
      shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)] 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
    `}
    >
        <div className="mb-4 flex items-center gap-3">
            <img
                src={tool.iconUrl}
                alt={`${tool.title} icon`}
                className="h-9 w-9"
                loading="lazy"
            />
            <h3 className="text-[22px] font-medium text-slate-900">
                {tool.title}
            </h3>
        </div>

        <p className="mb-6 leading-[1.6] text-[15px] text-slate-500">
            {tool.description}
        </p>

        <div className="mt-auto flex w-full justify-center">
            <img
                src={tool.imageUrl}
                alt={`${tool.title} interface preview`}
                className="w-[85%] max-w-[280px] object-contain object-bottom"
                loading="lazy"
            />
        </div>
    </div>
);

export default ToolCard;