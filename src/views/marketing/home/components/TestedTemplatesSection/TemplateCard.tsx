// TemplateCard.tsx — Single template card with hover button
import React from 'react';
import type { TemplateItem } from '../../types/home.types';

interface TemplateCardProps { tpl: TemplateItem; offset: number; isActive: boolean; onClick: () => void; }

const TemplateCard: React.FC<TemplateCardProps> = ({ tpl, offset, isActive, onClick }) => {
    const clampedOffset = Math.max(-3, Math.min(3, offset));
    return (
        <div className={`tpl-card tpl-offset-${clampedOffset}`} onClick={onClick}>
            <div className="tpl-text-block">
                <h3 className={`tpl-name transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{tpl.name}</h3>
                <div className={`tpl-users-container ${isActive ? 'active' : ''}`}>
                    <p className="text-[#6c757d] text-[12px] md:text-[13px] whitespace-nowrap">{tpl.users} users chose this template</p>
                </div>
            </div>
            <div className="tpl-image-wrapper group relative rounded-lg bg-white w-[75%] sm:w-[85%] md:w-full mx-auto">
                <img
                    src={tpl.img}
                    alt={tpl.name}
                    loading={isActive ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-auto block rounded-lg pointer-events-none border border-slate-100"
                />
                {isActive && (
                    <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full">
                        <button className="bg-[#1A91F0] text-white text-[13px] md:text-[15px] font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded shadow-[0_8px_20px_rgba(26,145,240,0.3)] hover:bg-[#1578c2] transition-all transform hover:-translate-y-1">
                            Use this template
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateCard;
