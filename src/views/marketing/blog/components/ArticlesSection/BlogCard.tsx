import React from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from '@/types/blog.types';

interface Props { blog: Blog; featured?: boolean; }

const CategoryPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
    {label}
  </span>
);

const BlogCard: React.FC<Props> = ({ blog, featured = false }) => {
  const wordCount = blog.body ? blog.body.split(/\s+/).length : 0;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));
  const dateStr   = new Date(blog.created_at ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const imgSrc    = blog.image_path ? `/assets/images/${blog.image_path}` : null;

  if (featured) {
    return (
      <article className="group col-span-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg flex flex-col lg:flex-row">
        <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden flex-shrink-0">
          {imgSrc ? (
            <img src={imgSrc} alt={blog.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-indigo-100 to-blue-50 flex items-center justify-center">
              <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            <CategoryPill label={blog.focus_keyword || 'Featured'} />
            <span className="text-xs text-slate-400">{dateStr}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-indigo-700 transition-colors">
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">{blog.body?.substring(0, 220)}…</p>
          <div className="flex items-center gap-4">
            {blog.user && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {blog.user.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-600">{blog.user.name}</span>
              </div>
            )}
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-400">{readTime} min read</span>
            <Link to={`/blog/${blog.slug}`} className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              Read article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="h-52 overflow-hidden flex-shrink-0">
        {imgSrc ? (
          <img src={imgSrc} alt={blog.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
        ) : (
          <div className="h-full bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {blog.focus_keyword && <CategoryPill label={blog.focus_keyword} />}
          <span className="text-xs text-slate-400">{dateStr}</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-400">{readTime} min read</span>
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-2">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5 flex-1">{blog.body?.substring(0, 160)}…</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          {blog.user && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                {blog.user.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-slate-500 font-medium">{blog.user.name}</span>
            </div>
          )}
          <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors ml-auto">
            Read more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
