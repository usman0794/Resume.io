// FeatureCard.tsx — Single feature card
import React from 'react';

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
    <div className="bg-[#f8fafc] rounded-2xl p-7 flex flex-col items-start transition-transform duration-300 hover:-translate-y-1 shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
        <div className="text-slate-800 mb-4"><Icon className="w-6 h-6" /></div>
        <h3 className="text-[17px] font-semibold text-slate-800 mb-4">{title}</h3>
        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
);

export default FeatureCard;