import React from 'react';

interface CategoryBadgeProps {
  label: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label }) => (
  <span className="inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
    {label}
  </span>
);
