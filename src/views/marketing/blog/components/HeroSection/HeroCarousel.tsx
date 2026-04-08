import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types/blog.types';
import { SkShimmerStyle } from '../SkeletonPulse';

interface BlogHeroCarouselProps {
  posts: Post[];
  loading?: boolean;
}

// ─── Hero Skeleton ────────────────────────────────────────────────────────────
const HeroSkeleton: React.FC = () => (
  <div style={{ width: '100%', overflow: 'hidden', marginBottom: 0 }}>
    <style>{SkShimmerStyle}</style>
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <div style={{ width: 140, minWidth: 140, height: 440, borderRadius: '0 20px 20px 0', background: 'linear-gradient(90deg,#f5f5f5 25%,#ececec 50%,#f5f5f5 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', flexShrink: 0 }} />
      <div style={{ flex: 1, height: 440, borderRadius: 20, margin: '0 8px', background: '#f7f7f7', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, boxSizing: 'border-box' as const }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 70, height: 13, borderRadius: 6, background: 'linear-gradient(90deg,#ebebeb 25%,#e0e0e0 50%,#ebebeb 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(90deg,#e5e5e5 25%,#d8d8d8 50%,#e5e5e5 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
            <div style={{ width: 120, height: 14, borderRadius: 6, background: 'linear-gradient(90deg,#ebebeb 25%,#e0e0e0 50%,#ebebeb 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
          </div>
          <div style={{ width: '85%', height: 38, borderRadius: 8, marginBottom: 14, background: 'linear-gradient(90deg,#e8e8e8 25%,#ddd 50%,#e8e8e8 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
          <div style={{ width: '60%', height: 38, borderRadius: 8, marginBottom: 20, background: 'linear-gradient(90deg,#e8e8e8 25%,#ddd 50%,#e8e8e8 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'linear-gradient(90deg,#ebebeb 25%,#e2e2e2 50%,#ebebeb 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
            <div style={{ width: 60, height: 13, borderRadius: 6, background: 'linear-gradient(90deg,#ebebeb 25%,#e2e2e2 50%,#ebebeb 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
          </div>
        </div>
        <div style={{ width: 300, height: 260, borderRadius: 16, flexShrink: 0, background: 'linear-gradient(90deg,#efefef 25%,#e4e4e4 50%,#efefef 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />
      </div>
      <div style={{ width: 140, minWidth: 140, height: 440, borderRadius: '20px 0 0 20px', background: 'linear-gradient(90deg,#f5f5f5 25%,#ececec 50%,#f5f5f5 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', flexShrink: 0 }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16, paddingRight: 16 }}>
      {[0,1].map(i => <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite' }} />)}
    </div>
  </div>
);

// Exact background colors — extracted via edge-pixel sampling of each carousel image
// so the card background PERFECTLY blends with the illustration's own background
const SLIDE_BG: Record<number, string> = {
  0: '#edd7df', // Slide 1: How to Write a Resume       — blush pink  (sampled from image edges)
  1: '#f1ece6', // Slide 2: Functional Resume Format   — warm cream  (sampled from image edges)
  2: '#faf9da', // Slide 3: Why do you want to work here — light yellow (sampled from image edges)
  3: '#feebe4', // Slide 4: Cover Letter 2026           — soft peach  (sampled from image edges)
};

// ─────────────────────────────────────────────────────────────────────────────

const BlogHeroCarousel: React.FC<BlogHeroCarouselProps> = ({ posts, loading }) => {
  // ALL HOOKS AT TOP — no early returns before this block
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = posts.slice(0, 6);

  // Show skeleton while loading (even if posts empty)
  // This must be AFTER hooks but before early returns that skip hook calls
  // We track loading via ref so hooks order stays stable

  const goTo = useCallback((idx: number) => {
    const clamped = (idx + slides.length) % slides.length;
    if (transitioning || clamped === activeIdx) return;
    setTransitioning(true);
    setActiveIdx(clamped);
    setTimeout(() => setTransitioning(false), 400);
  }, [transitioning, activeIdx, slides.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % slides.length);
    }, 5500);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length, resetTimer]);

  // NOW safe to early-return
  if (loading) return <HeroSkeleton />;
  if (slides.length === 0) return null;

  const prev = () => { goTo(activeIdx - 1); resetTimer(); };
  const next = () => { goTo(activeIdx + 1); resetTimer(); };

  const getSlide = (offset: number) => slides[(activeIdx + offset + slides.length) % slides.length];

  const prevPost = getSlide(-1);
  const activePost = slides[activeIdx];
  const nextPost = getSlide(1);

  const bg = SLIDE_BG[activeIdx % 4];

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      marginBottom: 0,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* ── Three-panel layout: prev peek | active | next peek ── */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        transition: 'none',
      }}>

        {/* Left peek card */}
        <div
          onClick={prev}
          style={{
            width: 140,
            minWidth: 140,
            flexShrink: 0,
            background: SLIDE_BG[(activeIdx - 1 + 4) % 4],
            borderRadius: '0 20px 20px 0',
            cursor: 'pointer',
            overflow: 'hidden',
            opacity: 0.72,
            transition: 'opacity .25s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '36px 0 36px 0',
            minHeight: 440,
            height: 440,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}
        >
          <div style={{ width: 90, height: 130, flexShrink: 0, marginRight: -12, pointerEvents: 'none', position: 'relative' }}>
             {/* Snippet of prev image */}
             <div style={{
               position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
               width: 280, height: 280, opacity: 0.5
             }}>
                <img src={getSlide(-1).imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             </div>
          </div>
        </div>

        {/* ── ACTIVE CARD ── */}
        <div style={{
          flex: 1,
          background: bg,
          borderRadius: 20,
          margin: '0 8px',
          padding: '48px 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          minHeight: 440,
          height: 440,
          position: 'relative',
          transition: 'background-color .4s ease',
          overflow: 'hidden',
        }}>
          {/* Text side */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Author row */}
            {activePost.author && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 14, color: '#6b7280', marginBottom: 18,
              }}>
                <span style={{ color: '#9ca3af', fontWeight: 400 }}>Written by</span>
                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  background: '#e0dcd8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, color: '#6b7280',
                  border: '2px solid rgba(255,255,255,.7)',
                }}>
                  {activePost.author.avatarUrl
                    ? <img src={activePost.author.avatarUrl} alt={activePost.author.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : activePost.author.name.trim()[0]?.toUpperCase()
                  }
                </div>
                <span style={{ fontWeight: 600, color: '#374151' }}>{activePost.author.name}</span>
              </div>
            )}

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(26px, 3.2vw, 42px)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.15,
              margin: '0 0 20px',
              letterSpacing: '-.03em',
              maxWidth: 520,
            }}>
              {activePost.title}
            </h2>

            {/* Read time */}
            {activePost.readTime && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 14, color: '#6b7280',
              }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                </svg>
                <span>{activePost.readTime}</span>
              </div>
            )}
          </div>

          {/* Illustration side — no container bg so card bg seamlessly blends with image bg */}
          {activePost.imageUrl && (
            <div style={{
              width: 480, height: '100%',
              position: 'absolute',
              right: 0, top: 0, bottom: 0,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 32,
              pointerEvents: 'none',
            }}>
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                style={{
                  width: '416px',
                  height: '364px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Invisible link overlay */}
          <Link
            to={`/blog/${activePost.id}`}
            style={{
              position: 'absolute', inset: 0,
              textDecoration: 'none', borderRadius: 20,
            }}
            aria-label={activePost.title}
          />
        </div>

        {/* Right peek card */}
        <div
          onClick={next}
          style={{
            width: 140,
            minWidth: 140,
            flexShrink: 0,
            background: SLIDE_BG[(activeIdx + 1) % 4],
            borderRadius: '20px 0 0 20px',
            cursor: 'pointer',
            overflow: 'hidden',
            opacity: 0.72,
            transition: 'opacity .25s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '36px 0',
            minHeight: 440,
            height: 440,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.72')}
        >
          <div style={{ width: 90, height: 130, flexShrink: 0, marginLeft: -12, pointerEvents: 'none', position: 'relative' }}>
             {/* Snippet of next image */}
             <div style={{
               position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
               width: 280, height: 280, opacity: 0.5
             }}>
                <img src={getSlide(1).imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             </div>
          </div>
        </div>
      </div>

      {/* ── Arrow buttons only — no dots ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginTop: 16,
        paddingRight: 16,
      }}>
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color .2s, box-shadow .2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#9ca3af';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#374151" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color .2s, box-shadow .2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#9ca3af';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#374151" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-peek-left, .hero-peek-right { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default BlogHeroCarousel;
