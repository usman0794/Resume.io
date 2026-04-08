// LinkButton.tsx — Reusable arrow CTA link
import React from 'react';

interface LinkButtonProps { text: string; href?: string; }

const LinkButton: React.FC<LinkButtonProps> = ({ text, href = '#' }) => (
    <a href={href} className="inline-flex items-center text-[#1675c8] font-semibold text-[16px] hover:text-[#1560a8] transition-colors mt-auto group w-max">
        {text}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current ml-1 group-hover:translate-x-1.5 transition-transform duration-300">
            <path d="M9.4 7.3l1.4-1.5 5.9 5.5c.4.4.4 1 0 1.4l-6 5.5-1.3-1.5 5.1-4.7-5-4.7z" />
        </svg>
    </a>
);

export default LinkButton;
