import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const CATEGORY_PILLS = [
  'All Posts',
  'Career',
  'Cover Letter',
  'Job Interview',
  'Resume Help'
];

interface BlogHeaderProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  loading?: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  loading,
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 p-8 font-sans">
      {/* Title row + Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-[460px]">
          <h1 className="text-[56px] font-normal text-[#1e293b] tracking-tight leading-[1.1] mb-3">
            The Elevator
          </h1>
          <p className="text-[16px] text-[#475569] font-medium leading-relaxed">
            Expert career advice by <span className="font-bold">resume.io</span>
          </p>
        </div>

        {/* Search field */}
        <div className="w-full md:w-[280px] relative flex-shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type something"
            className="w-full bg-transparent border-b border-slate-300 pb-2.5 pr-8 text-[15px] focus:outline-none focus:border-slate-400 placeholder-[#94a3b8] text-slate-800 transition-colors"
          />
          <Search className="absolute right-0 bottom-3 w-[18px] h-[18px] text-[#94a3b8] stroke-[1.5]" />
        </div>
      </div>

      {/* Category pills row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Left pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
          {loading ? (
            // Skeleton pills — same size as real pills
            <>
              <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
              {[88, 70, 148, 164, 148].map((w, i) => (
                <div key={i} style={{
                  width: w, height: 38, borderRadius: 999, flexShrink: 0,
                  background: 'linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)',
                  backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite',
                }} />
              ))}
            </>
          ) : (
            CATEGORY_PILLS.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[15px] transition-colors ${activeCategory === cat
                  ? 'bg-[#cde8fd] text-[#0f172a]'
                  : 'bg-[#f4f7f9] text-[#334155] hover:bg-[#e9eff4]'
                  }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>

        {/* Right: Sort By */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[14px] text-slate-500 font-medium">Sort by</span>
          <button className="flex items-center gap-1 text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors bg-[#f4f7f9] hover:bg-[#e9eff4] px-4 py-2 rounded-full">
            Latest <ChevronDown className="w-4 h-4 ml-1" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;