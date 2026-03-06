import React from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from '@/types/blog.types';

// ─── Fallback accent palette ────────────────────────────────────────────────
// Used when a blog's image filename isn't in BROWSE_CARD_COLORS below
// (e.g. newly published articles without a sampled color yet).
const PLACEHOLDER_COLORS: string[] = [
  '#d6e2ef', '#f48fb1', '#a8e62d', '#4895ef',
  '#a7c957', '#f7b731', '#2ec4b6', '#e9c46a',
];

// ─── Per-article accent colors (sampled from resume.io Browse All cards) ──────
// Each color matches the vivid border/bg shown on resume.io for that article
const BROWSE_CARD_COLORS: Record<string, string> = {
  'browse-44869-a-person-at-work-in-an-office-on-their-phone-looki--1-.png': '#d6e2ef', // light steel blue
  'browse-44836-online-courses-on-resume-main-pic.png': '#f72d8e', // hot pink
  'browse-44803-cpr-certificate-resume-main-pic.png': '#e63946', // vivid red
  'browse-44770-how-to-get-a-promotion-main-pic.png': '#a8e62d', // lime green
  'browse-44737-social-media-jobs-main-pic.png': '#f48fb1', // soft pink
  'browse-44704-remove-the-graphics-next-to-his-head---the-graphic.png': '#1a9688', // teal
  'browse-44671-How-many-jobs-to-list-on-a-resume-main-pic.png': '#4895ef', // blue
  'browse-44638-replace-the-floral-swimsuit-on-the-person-with-a-s.png': '#a7c957', // olive green
  'browse-44605-interview-nerves-main-pic.png': '#9b5de5', // purple
  'browse-44572-xyz-resume.png': '#f7b731', // amber
  'browse-44506-walking-out-on-a-new-job-main-pic.png': '#ef476f', // rose
  'browse-44473-ai-job-displacement-main-pic.png': '#118ab2', // ocean blue
  'browse-44440-career-change-guide-main-pic.png': '#06d6a0', // emerald
  'browse-44407-reverse-chronological-resume-main-pic.png': '#e9c46a', // gold
  'browse-44374-zoom-interview-tips.png': '#2ec4b6', // turquoise
  'browse-44341-signs-of-micro-main-image.png': '#ff6b6b', // coral
  'browse-44308-micromanaging-main-pic.png': '#7400b8', // deep purple
  // older articles
  'browse-30976-best-Resume-Formats.jpeg': '#f4a261', // orange
  'browse-30877-crucial-resume-skills.png': '#457b9d', // slate blue
  'browse-2134-How-to-Write-a-Resume-with-No-Experience.png': '#e76f51', // burnt orange
  'browse-37213-week-11--1-.jpg': '#2d6a4f', // forest green
  'browse-37214-Job-search-guide--1-.jpg': '#1d3557', // navy
  'browse-37215-week-12.jpg': '#6d6875', // mauve
  'browse-37051-Cover-Spotify.jpg': '#1db954', // spotify green
  'browse-37052-Cover-Spotify.jpg': '#1db954',
  'browse-37053-Cover-Spotify.jpg': '#1db954',
};

interface BrowseAllCardProps {
  blog: Blog;
  index: number;
}

const BrowseAllCard: React.FC<BrowseAllCardProps> = ({ blog, index }) => {
  const imageUrl = blog.image_path ? `/assets/images/${blog.image_path}` : null;
  const filename = blog.image_path ? blog.image_path.split('/').pop() || '' : '';
  // Use vivid accent color from map, fallback to muted palette
  const accentColor = BROWSE_CARD_COLORS[filename] || PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const category = blog.tags?.[0]
    ? blog.tags[0].charAt(0).toUpperCase() + blog.tags[0].slice(1)
    : 'Career';

  const readTime = blog.body
    ? `${Math.max(1, Math.round(blog.body.split(/\s+/).length / 200))} min read`
    : '5 min read';

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group flex flex-col cursor-pointer"
      style={{ textDecoration: 'none' }}
    >
      {/* Image container — colored background matches resume.io card style */}
      <div
        className="w-full overflow-hidden mb-3"
        style={{
          aspectRatio: '16 / 10',
          borderRadius: 12,
          background: accentColor,
          padding: 0,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={blog.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              transition: 'transform 0.35s ease',
              display: 'block',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.35 }}>
              <rect x="8" y="20" width="48" height="32" rx="6" fill="#1a1c29" />
              <rect x="16" y="12" width="32" height="16" rx="4" fill="#8f95a3" />
              <circle cx="32" cy="28" r="6" fill="white" opacity="0.6" />
            </svg>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div
        style={{
          fontSize: 13,
          color: '#8A94A6',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span>Article</span>
        <span style={{ color: '#C4C9D4' }}>•</span>
        <span>{category}</span>
        <span style={{ color: '#C4C9D4' }}>•</span>
        <span>{readTime}</span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 17,
          fontWeight: 500,
          lineHeight: 1.45,
          color: '#1A1C20',
          margin: 0,
          transition: 'color 0.2s',
        }}
        className="group-hover:text-blue-600"
      >
        {blog.title}
      </h3>
    </Link>
  );
};


// ─── Pagination ───────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Build visible page numbers
  const buildPages = (): (number | '...')[] => {
    if (totalPages <= 9) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (totalPages > 11) pages.push('...');
    if (totalPages > 10) pages.push(totalPages - 1);
    pages.push(totalPages);
    return pages;
  };

  const pages = buildPages();

  return (
    <>
      {/* Desktop pagination */}
      <div
        className="hidden md:flex"
        style={{
          marginTop: 64,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {pages.map((p, i) =>
            p === '...' ? (
              <span
                key={`ellipsis-${i}`}
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: '#8A94A6',
                }}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: currentPage === p ? 500 : 400,
                  color: currentPage === p ? '#1A1C20' : '#606672',
                  background: currentPage === p ? '#F0F2F5' : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.background = '#F7F9FC';
                }}
                onMouseLeave={e => {
                  if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                {p}
              </button>
            )
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            style={{
              background: 'none', border: 'none', cursor: currentPage <= 1 ? 'default' : 'pointer',
              fontSize: 14, fontWeight: 500,
              color: currentPage <= 1 ? '#C4C9D4' : '#606672',
              padding: 0,
            }}
          >
            Previous
          </button>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            style={{
              background: 'none', border: 'none', cursor: currentPage >= totalPages ? 'default' : 'pointer',
              fontSize: 14, fontWeight: 500,
              color: currentPage >= totalPages ? '#C4C9D4' : '#606672',
              padding: 0,
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Mobile pagination */}
      <div
        className="flex md:hidden"
        style={{
          marginTop: 48,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 14, color: '#606672' }}>Page {currentPage}</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            style={{
              padding: '8px 20px', borderRadius: 99,
              border: '1px solid #D1D5DB',
              background: 'none', cursor: currentPage <= 1 ? 'default' : 'pointer',
              fontSize: 13, fontWeight: 500,
              color: currentPage <= 1 ? '#C4C9D4' : '#1A1C20',
            }}
          >
            Previous
          </button>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            style={{
              padding: '8px 20px', borderRadius: 99,
              border: '1px solid #D1D5DB',
              background: 'none', cursor: currentPage >= totalPages ? 'default' : 'pointer',
              fontSize: 13, fontWeight: 500,
              color: currentPage >= totalPages ? '#C4C9D4' : '#1A1C20',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Main BrowseAllSection ────────────────────────────────────────────────

interface BrowseAllSectionProps {
  /** All blogs from the store (will slice off first 8 used by ArticlesSection on page 1) */
  blogs: Blog[];
  /** Whether page 1 sections (hero, articles) are visible — if true, skip first 8 blogs */
  isFirstPage: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const BROWSE_PER_PAGE = 6;

const BrowseAllSection: React.FC<BrowseAllSectionProps> = ({
  blogs,
  isFirstPage,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  // On page 1: Articles section consumes blogs[0..7], so Browse All shows blogs[8+]
  // On page 2+: All fetched blogs go into Browse All
  const displayBlogs = isFirstPage ? blogs.slice(8) : blogs;

  // Loading skeleton
  if (loading) {
    const shimmer = {
      background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'skshimmer 1.4s infinite',
    } as React.CSSProperties;
    return (
      <section style={{
        width: '100%', maxWidth: 1200, margin: '0 auto',
        padding: '0 16px', marginTop: isFirstPage ? 64 : 0, marginBottom: 80,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        {/* Header — same height as real "Browse all" h2 */}
        <div style={{ paddingBottom: 16, borderBottom: '1px solid #E1E4E8', marginBottom: 32 }}>
          <div style={{ width: 180, height: 36, borderRadius: 8, ...shimmer }} />
        </div>
        {/* Grid — exactly 3 cols same as real */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ display: 'grid', gap: '48px 32px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Image — same 16/10 ratio */}
              <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 12, marginBottom: 12, ...shimmer }} />
              {/* Meta: Article • Category • X min read */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 44, height: 12, borderRadius: 5, ...shimmer }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', ...shimmer }} />
                <div style={{ width: 54, height: 12, borderRadius: 5, ...shimmer }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', ...shimmer }} />
                <div style={{ width: 62, height: 12, borderRadius: 5, ...shimmer }} />
              </div>
              {/* Title — 2 lines same as real cards */}
              <div style={{ width: '95%', height: 18, borderRadius: 6, marginBottom: 6, ...shimmer }} />
              <div style={{ width: '72%', height: 18, borderRadius: 6, ...shimmer }} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (displayBlogs.length === 0 && !isFirstPage) return null;

  return (
    <section
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 16px',
        marginTop: isFirstPage ? 64 : 0,
        marginBottom: 80,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ paddingBottom: 16, borderBottom: '1px solid #E1E4E8', marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#1A1C20',
            margin: 0,
            lineHeight: 1.2,
          }}
          className="text-[28px] md:text-[32px]"
        >
          Browse all
        </h2>
      </div>

      {displayBlogs.length === 0 ? (
        <p style={{ color: '#8A94A6', textAlign: 'center', padding: '64px 0', fontSize: 15 }}>
          More articles coming soon!
        </p>
      ) : (
        <>
          {/* Grid */}
          <div
            style={{ display: 'grid', gap: '48px 32px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {displayBlogs.map((blog, i) => (
              <BrowseAllCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  );
};

export default BrowseAllSection;
