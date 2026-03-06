import React from 'react';

interface CategoryTagProps {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ name, href, icon }) => (
    <a
        href={href}
        className="flex items-center gap-[7px] bg-white text-[#6b7a99] font-medium text-[15px] px-[18px] py-[9px] rounded-full shadow-sm hover:bg-slate-50 hover:text-slate-600 transition-colors duration-150 whitespace-nowrap no-underline"
    >
        <span className="flex-shrink-0 text-[#6b7a99]">{icon}</span>
        {name}
    </a>
);

export default CategoryTag;
