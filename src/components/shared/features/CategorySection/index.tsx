import React from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../TemplateGrid/TemplateCard';
import type { CategorySectionData } from '@/types/page-templates.types';

interface CategorySectionProps {
    data: CategorySectionData;
    loading?: boolean;
}

const shimmer: React.CSSProperties = {
    background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skshimmer 1.4s infinite',
};

const CategorySection: React.FC<CategorySectionProps> = ({ data, loading = false }) => {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-[#f3f4f6] py-10 sm:py-16 lg:py-20 mb-8 sm:mb-12">
            <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                    {/* Category Info */}
                    <div className="w-full lg:w-1/4 flex flex-col items-start">
                        {loading ? (
                            <>
                                <div style={{ width: '72%', height: 28, borderRadius: 7, marginBottom: 14, ...shimmer }} />
                                <div style={{ width: '100%', height: 14, borderRadius: 5, marginBottom: 8, ...shimmer }} />
                                <div style={{ width: '88%', height: 14, borderRadius: 5, marginBottom: 8, ...shimmer }} />
                                <div style={{ width: '60%', height: 14, borderRadius: 5, marginBottom: 22, ...shimmer }} />
                                <div style={{ width: 120, height: 36, borderRadius: 8, ...shimmer }} />
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 mb-3 sm:mb-4 leading-tight tracking-tight">
                                    {data.title}
                                </h2>
                                <p className="text-[14px] sm:text-[15px] text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                                    {data.description}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/builder?mode=manual')}
                                    className="text-[13px] sm:text-[14px] font-semibold text-[#1a73e8] bg-[#f3f8ff] hover:bg-[#e6f0ff] px-4 sm:px-5 py-2 sm:py-2.5 rounded-md transition-colors duration-200"
                                >
                                    {data.buttonText}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Category Templates */}
                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ width: '100%', aspectRatio: '1/1.414', borderRadius: 8, marginBottom: 12, ...shimmer }} />
                                        <div style={{ width: '60%', height: 16, borderRadius: 5, marginBottom: 8, ...shimmer }} />
                                        <div style={{ width: '85%', height: 12, borderRadius: 5, marginBottom: 6, ...shimmer }} />
                                        <div style={{ width: '70%', height: 12, borderRadius: 5, ...shimmer }} />
                                    </div>
                                ))
                            ) : (
                                data.templates.slice(0, 3).map((template) => (
                                    <TemplateCard key={template.id} template={template} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
