import React from 'react';
import { BookOpen, Landmark, Wrench, Briefcase, Stethoscope, Users, ShoppingBag, Scale, Building2, TrendingUp, DollarSign, Shield, UtensilsCrossed, Truck, Car, Heart, Cpu, Dumbbell, HardHat, Sparkles, GraduationCap, Palette } from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
    BookOpen, Landmark, Wrench, Briefcase, Stethoscope, Users,
    ShoppingBag, Scale, Building2, TrendingUp, DollarSign, Shield,
    UtensilsCrossed, Truck, Car, Heart, Cpu, Dumbbell, HardHat,
    Sparkles, GraduationCap, Palette
};

interface IndustryHeaderProps {
    iconName: string;
    title: string;
    count: number;
    description: string;
}

const IndustryHeader: React.FC<IndustryHeaderProps> = ({ iconName, title, count, description }) => {
    const IconComponent = IconMap[iconName] || Briefcase;

    return (
        <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-3 mb-3">
                <IconComponent className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
                <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                <span className="flex items-center justify-center bg-slate-100 text-slate-500 text-sm font-bold h-7 px-3 rounded-full ml-1">
                    {count}
                </span>
            </div>
            <p className="text-[17px] text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default IndustryHeader;
