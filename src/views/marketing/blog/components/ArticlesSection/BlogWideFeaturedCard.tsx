import React from 'react';
import type { Post } from '../../types/blog.types';

interface BlogWideFeaturedCardProps {
  post: Post;
}

/**
 * Wide 2-column spanning featured card used to break up the Browse All grid.
 * Has a text side + image side layout.
 */
const BlogWideFeaturedCard: React.FC<BlogWideFeaturedCardProps> = ({ post }) => {
  return (
    <div
      className="md:col-span-2 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-md transition-shadow flex flex-col sm:flex-row"
      style={{ backgroundColor: post.bgColor || '#fef9c3' }}
    >
      {/* Text side */}
      <div className="p-6 flex flex-col justify-center flex-1">
        {post.category && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/60 text-slate-600 px-2 py-0.5 rounded-full mb-3 w-fit">
            {post.category}
          </span>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-blue-700 transition-colors">
          {post.title}
        </h3>
        <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-full px-4 py-1.5 w-fit hover:bg-white/50 transition-colors">
          Read <span aria-hidden>→</span>
        </button>
      </div>

      {/* Image side */}
      <div className="w-full sm:w-2/5 min-h-[180px] overflow-hidden">
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
    </div>
  );
};

export default BlogWideFeaturedCard;
