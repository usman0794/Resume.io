// TestedTemplatesSection/index.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TemplateItem } from '../../types/home.types';
import { HOME_TEMPLATES } from '../../data/home.data';
import TemplateCard from './TemplateCard';

interface TestedTemplatesSectionProps { templates?: TemplateItem[]; defaultActiveIndex?: number; }

const TestedTemplatesSection: React.FC<TestedTemplatesSectionProps> = ({ templates = HOME_TEMPLATES, defaultActiveIndex = 2 }) => {
    const [activeIdx, setActiveIdx] = useState(defaultActiveIndex);
    const next = () => setActiveIdx((i) => Math.min(i + 1, templates.length - 1));
    const prev = () => setActiveIdx((i) => Math.max(i - 1, 0));

    return (
        <section className="bg-[#fbfcff] py-10 overflow-hidden font-sans">
            <div className="max-w-[1300px] mx-auto px-4">
                <div className="text-center mb-4">
                    <h2 className="text-[28px] md:text-[42px] font-bold text-slate-900 tracking-tight">Tested resume templates</h2>
                    <p className="text-slate-500 text-[15px] md:text-[17px] mt-3">Use the templates recruiters like. Download to Word or PDF.</p>
                </div>
                <div className="relative w-full h-[450px] md:h-[550px] lg:h-[620px]">
                    <button onClick={prev} disabled={activeIdx === 0}
                        className="absolute left-2 md:left-8 lg:left-0 top-[55%] w-10 h-10 md:w-12 md:h-12 bg-[#1A91F0] text-white rounded-full flex items-center justify-center z-40 hover:bg-[#1578c2] shadow-lg transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
                        style={{ transform: 'translateY(-50%)' }}>
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={next} disabled={activeIdx === templates.length - 1}
                        className="absolute right-2 md:right-8 lg:right-0 top-[55%] w-10 h-10 md:w-12 md:h-12 bg-[#1A91F0] text-white rounded-full flex items-center justify-center z-40 hover:bg-[#1578c2] shadow-lg transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
                        style={{ transform: 'translateY(-50%)' }}>
                        <ChevronRight size={24} />
                    </button>
                    <div className="relative w-full h-full max-w-[1100px] mx-auto">
                        {templates.map((tpl, i) => (
                            <TemplateCard key={tpl.id} tpl={tpl} offset={i - activeIdx} isActive={i === activeIdx} onClick={() => setActiveIdx(i)} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestedTemplatesSection;
