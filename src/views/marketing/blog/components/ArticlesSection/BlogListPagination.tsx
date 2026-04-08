import React from 'react';

interface BlogListPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

/**
 * Refined numeric pagination matching the exact visual specs of the reference image.
 */
const BlogListPagination: React.FC<BlogListPaginationProps> = ({
  currentPage = 1,
  totalPages = 24,
  onPageChange,
}) => {
  // Matched exactly to the reference image's visible sequence
  const visiblePages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex items-center w-full mt-12 mb-6 text-sm text-slate-500">
      <div className="flex items-center gap-1">
        {visiblePages.map((n) => (
          <button
            key={n}
            onClick={() => onPageChange?.(n)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${n === currentPage
                ? 'bg-slate-50 text-slate-600'
                : 'hover:bg-slate-50'
              }`}
          >
            {n}
          </button>
        ))}

        <span className="w-10 h-10 flex items-center justify-center text-slate-400 tracking-wider">
          ...
        </span>

        {/* Dynamic render for the last two pages to preserve business logic */}
        {[totalPages - 1, totalPages].map((n) => (
          <button
            key={n}
            onClick={() => onPageChange?.(n)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-slate-50 ${n === currentPage ? 'bg-slate-50 text-slate-600' : ''
              }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => (currentPage ?? 1) > 1 && onPageChange?.((currentPage ?? 1) - 1)}
          disabled={(currentPage ?? 1) <= 1}
          className="flex items-center justify-center px-4 h-10 rounded-full hover:bg-slate-50 transition-colors hover:text-slate-700 disabled:opacity-40 disabled:cursor-default"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange?.((currentPage ?? 1) + 1)}
          disabled={(currentPage ?? 1) >= (totalPages ?? 24)}
          className="flex items-center justify-center px-4 h-10 rounded-full hover:bg-slate-50 transition-colors hover:text-slate-700 disabled:opacity-40 disabled:cursor-default"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogListPagination;