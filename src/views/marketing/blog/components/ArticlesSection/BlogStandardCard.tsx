import React from 'react';
import { CategoryBadge } from '../BlogAtoms';
import type { Post } from '../../types/blog.types';

interface BlogStandardCardProps {
  post: Post;
}

/**
 * Standard 4:3 card with category, read time, and title.
 * Used in the "Browse all" grid section.
 */
const BlogStandardCard: React.FC<BlogStandardCardProps> = ({ post }) => {
  return (
    <div className="flex flex-col cursor-pointer group">
      {/* 4:3 image */}
      <div
        className="w-full rounded-xl mb-3.5 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow"
        style={{ aspectRatio: '4/3', backgroundColor: post.bgColor || '#f1f5f9' }}
      >
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-black/5" />
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-1.5">
        {post.category && <CategoryBadge label={post.category} />}
        {post.readTime && (
          <>
            <span className="text-slate-300 text-xs">•</span>
            <span className="text-[11px] text-slate-400">{post.readTime}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h4 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
        {post.title}
      </h4>
    </div>
  );
};

export default BlogStandardCard;
