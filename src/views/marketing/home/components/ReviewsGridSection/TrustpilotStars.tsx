// TrustpilotStars.tsx — Reusable star components for Trustpilot ratings
import React from 'react';

export const TrustpilotSquare: React.FC<{ fraction?: number; size?: 'large' | 'small' }> = ({ fraction = 1, size = 'large' }) => {
    const sizeClass = size === 'large' ? 'w-[30px] h-[30px]' : 'w-[20px] h-[20px]';
    const color = fraction >= 1 ? '#00b67a' : fraction > 0 ? '#00b67a' : '#dcdce6';
    return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill={color}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
};

export const TrustpilotLogoStar: React.FC = () => (
    <svg viewBox="0 0 24 24" className="w-[24px] h-[24px] text-[#00b67a] fill-[#00b67a]">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);
