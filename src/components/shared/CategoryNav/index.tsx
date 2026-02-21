// src/components/CategoryNav.tsx

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryNavProps {
  categories: string[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show first 8 on desktop, all if expanded
  const visibleCategories = isExpanded ? categories : categories.slice(0, 8);

  return (
    <div className="w-full py-8 mb-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8">
        {visibleCategories.map((category, index) => (
          <li key={index}>
            <a
              href={`#${category.toLowerCase().replace(/ /g, '-')}`}
              className="text-[15px] text-slate-600 hover:text-blue-600 hover:underline font-medium transition-colors block"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>

      {!isExpanded && categories.length > 8 && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mt-6 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-[15px] transition-colors"
        >
          Show More <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
export default CategoryNav;
