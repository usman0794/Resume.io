import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TableOfContents from './components/BlogDetail/TableOfContents';

interface Heading { id: string; text: string; level: number; }

function parseBody(raw: string): { html: string; headings: Heading[] } {
  if (!raw) return { html: '', headings: [] };
  const headings: Heading[] = [];
  const lines = raw.split('\n');
  const parts: string[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      const text = h2[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 2 });
      parts.push(`<h2 id="${id}" class="toc-heading blog-h2">${text}</h2>`);
      continue;
    }
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      const text = h3[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 3 });
      parts.push(`<h3 id="${id}" class="toc-heading blog-h3">${text}</h3>`);
      continue;
    }
    const h4 = line.match(/^####\s+(.+)/);
    if (h4) {
      const text = h4[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 4 });
      parts.push(`<h4 id="${id}" class="toc-heading blog-h4">${text}</h4>`);
      continue;
    }
    const ulItem = line.match(/^[-*]\s+(.+)/);
    if (ulItem) {
      const t = ulItem[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      parts.push(`<li class="blog-li">${t}</li>`);
      continue;
    }
    const olItem = line.match(/^\d+\.\s+(.+)/);
    if (olItem) {
      const t = olItem[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      parts.push(`<li class="blog-oli">${t}</li>`);
      continue;
    }
    const boldLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (boldLine.trim() === '') { parts.push('<br/>'); continue; }
    parts.push(`<p class="blog-p">${boldLine}</p>`);
  }

  let html = parts.join('\n');
  html = html.replace(/(<li class="blog-li">[\s\S]*?<\/li>\n?)+/g, m => `<ul class="blog-ul">${m}</ul>`);
  html = html.replace(/(<li class="blog-oli">[\s\S]*?<\/li>\n?)+/g, m => `<ol class="blog-ol">${m}</ol>`);

  return { html, headings };
}

function injectSEO(blog: {
  title: string; meta_title?: string; meta_description?: string;
  canonical_url?: string; og_image_url?: string; image_path?: string;
}) {
  const title = blog.meta_title || blog.title;
  document.title = title;

  const setMeta = (attr: string, name: string, content: string) => {
    let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, name); document.head.appendChild(tag); }
    tag.setAttribute('content', content);
  };

  if (blog.meta_description) {
    setMeta('name', 'description', blog.meta_description);
    setMeta('property', 'og:description', blog.meta_description);
  }
  setMeta('property', 'og:title', title);
  const ogImg = blog.og_image_url || (blog.image_path ? `/assets/images/${blog.image_path}` : '');
  if (ogImg) setMeta('property', 'og:image', ogImg);

  let canonical = document.querySelector('link[rel=canonical]') as HTMLLinkElement | null;
  if (!canonical) { canonical = document.createElement('link'); (canonical as HTMLLinkElement).rel = 'canonical'; document.head.appendChild(canonical); }
  (canonical as HTMLLinkElement).href = blog.canonical_url || window.location.href;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setTimeout(() => {
        setSelectedBlog({
          title: 'Mocked Blog Post Title',
          slug: slug,
          content: '## Introduction\nThis is a mocked blog post body since the backend is detached.\n\n## Conclusion\nWe removed the API.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          image_path: 'blog/carousel/blog-carousel-how-to-write-resume.png'
        });
        setLoading(false);
      }, 500);
    }
  }, [slug]);

  useEffect(() => {
    if (!selectedBlog) return;
    injectSEO(selectedBlog);
    return () => { document.title = 'resume.io'; };
  }, [selectedBlog]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <style>{`@keyframes skshimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ display: 'flex', gap: 48 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 14, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 4, width: '30%', marginBottom: 24 }} />
              <div style={{ height: 44, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 6, width: '85%', marginBottom: 12 }} />
              <div style={{ height: 44, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 6, width: '70%', marginBottom: 32 }} />
              <div style={{ height: 380, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 16, marginBottom: 32 }} />
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ height: 14, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 4, width: i % 3 === 2 ? '70%' : '100%', marginBottom: 12 }} />
              ))}
            </div>
            <div style={{ width: 260, flexShrink: 0 }} className="hidden lg:block">
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ height: 13, background: 'linear-gradient(90deg,#f0f0f0 25%,#e5e5e5 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skshimmer 1.4s infinite', borderRadius: 4, marginBottom: 10 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !selectedBlog) {
    return (
      <div style={{ minHeight: '80vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="32" height="32" fill="none" stroke="#aab0bd" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1c20', marginBottom: 8 }}>Article not found</h1>
          <p style={{ fontSize: 15, color: '#8a94a6', marginBottom: 28 }}>{error || "We couldn't find the article you're looking for."}</p>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a91f0', color: '#fff', fontWeight: 600, padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontSize: 14 }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { html: bodyHtml, headings } = parseBody(selectedBlog.body || selectedBlog.content || '');
  const wordCount = (selectedBlog.body || selectedBlog.content || '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imgSrc = selectedBlog.image_path ? `/assets/images/${selectedBlog.image_path}` : null;
  const authorInitial = selectedBlog.user?.name?.[0]?.toUpperCase() || 'C';
  const authorName = selectedBlog.user?.name || 'resume.io Team';
  const publishDate = selectedBlog.created_at
    ? new Date(selectedBlog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  const updatedDate = selectedBlog.updated_at
    ? new Date(selectedBlog.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const shareLinks = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(selectedBlog.title)}`,
      label: 'X',
      icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      label: 'LinkedIn',
      icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      label: 'Facebook',
      icon: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    },
  ];

  return (
    <>
      <style>{`
        .bd-wrap { background:#fff; min-height:100vh; color:#1a1c20; }

        /* Progress bar */
        .bd-progress { position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,#1a91f0,#6366f1); z-index:9999; transition:width .08s linear; pointer-events:none; }

        /* Hero */
        .bd-hero { background:linear-gradient(160deg,#f0f6ff 0%,#f5f0ff 60%,#e8f4ff 100%); padding:52px 0 0; border-bottom:1px solid #eaecf0; }
        .bd-hero-inner { max-width:820px; margin:0 auto; padding:0 24px; }

        /* Breadcrumb */
        .bd-crumb { display:flex; align-items:center; gap:6px; font-size:13px; color:#8a94a6; margin-bottom:20px; flex-wrap:wrap; }
        .bd-crumb a { color:#1a91f0; text-decoration:none; font-weight:500; }
        .bd-crumb a:hover { text-decoration:underline; }
        .bd-crumb svg { flex-shrink:0; }

        /* Badge */
        .bd-badge { display:inline-flex; align-items:center; gap:6px; background:#1a91f0; color:#fff; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:5px 13px; border-radius:100px; margin-bottom:20px; }

        /* Title */
        .bd-title { font-size:clamp(26px,4.5vw,44px); font-weight:800; color:#0f172a; line-height:1.15; letter-spacing:-.025em; margin:0 0 18px; }

        /* Excerpt */
        .bd-excerpt { font-size:17px; color:#4b5563; line-height:1.7; margin:0 0 28px; }

        /* Meta row */
        .bd-meta { display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding-bottom:36px; }
        .bd-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#1a91f0,#6366f1); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:15px; flex-shrink:0; }
        .bd-author-wrap { display:flex; flex-direction:column; }
        .bd-author-name { font-size:14px; font-weight:600; color:#111827; line-height:1.2; }
        .bd-author-role { font-size:12px; color:#8a94a6; }
        .bd-sep { color:#d1d5db; }
        .bd-meta-item { display:flex; align-items:center; gap:5px; font-size:13px; color:#6b7280; }
        .bd-tag { font-size:12px; font-weight:600; color:#1a91f0; background:#e0f0ff; padding:3px 10px; border-radius:100px; }

        /* Hero image */
        .bd-img-wrap { max-width:820px; margin:0 auto; padding:0 24px; transform:translateY(36px); }
        .bd-img { width:100%; aspect-ratio:16/7; object-fit:cover; border-radius:18px; display:block; box-shadow:0 24px 64px rgba(0,0,0,.13); }
        .bd-img-placeholder { width:100%; aspect-ratio:16/7; border-radius:18px; background:linear-gradient(135deg,#dbeafe,#c7d2fe); display:flex; align-items:center; justify-content:center; box-shadow:0 24px 64px rgba(0,0,0,.07); }

        /* Layout */
        .bd-layout { max-width:1160px; margin:0 auto; padding:0 24px; display:flex; gap:56px; align-items:flex-start; }
        .bd-article { flex:1; min-width:0; padding-top:76px; }
        .bd-sidebar { width:252px; flex-shrink:0; padding-top:76px; position:sticky; top:84px; display:none; }
        @media(min-width:1024px){ .bd-sidebar { display:block; } }

        /* Mobile TOC */
        .bd-mobile-toc { background:#f8f9ff; border:1px solid #e0e7ff; border-radius:14px; padding:18px 20px; margin-bottom:32px; display:block; }
        @media(min-width:1024px){ .bd-mobile-toc { display:none; } }
        .bd-toc-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#8a94a6; margin-bottom:12px; }

        /* Article body */
        .bd-body .blog-p { font-size:16.5px; line-height:1.9; color:#374151; margin:0 0 22px; }
        .bd-body .blog-h2 { font-size:clamp(20px,3vw,26px); font-weight:800; color:#0f172a; margin:52px 0 16px; line-height:1.25; scroll-margin-top:88px; letter-spacing:-.015em; }
        .bd-body .blog-h3 { font-size:clamp(17px,2.5vw,21px); font-weight:700; color:#1f2937; margin:38px 0 12px; scroll-margin-top:88px; line-height:1.3; }
        .bd-body .blog-h4 { font-size:17px; font-weight:700; color:#374151; margin:28px 0 10px; scroll-margin-top:88px; }
        .bd-body .blog-ul { margin:0 0 22px; padding-left:0; list-style:none; }
        .bd-body .blog-ul .blog-li { font-size:16px; line-height:1.8; color:#374151; padding:4px 0 4px 26px; position:relative; }
        .bd-body .blog-ul .blog-li::before { content:''; position:absolute; left:7px; top:14px; width:6px; height:6px; border-radius:50%; background:#1a91f0; }
        .bd-body .blog-ol { margin:0 0 22px; padding-left:0; list-style:none; counter-reset:blog-cnt; }
        .bd-body .blog-ol .blog-oli { font-size:16px; line-height:1.8; color:#374151; padding:4px 0 4px 34px; position:relative; counter-increment:blog-cnt; }
        .bd-body .blog-ol .blog-oli::before { content:counter(blog-cnt); position:absolute; left:0; top:5px; width:22px; height:22px; border-radius:50%; background:#eff6ff; color:#1a91f0; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .bd-body strong { color:#111827; font-weight:700; }

        /* Sidebar cards */
        .bd-sc { background:#f8fafc; border:1px solid #eef0f5; border-radius:14px; padding:20px; margin-bottom:14px; }
        .bd-sc-blue { background:linear-gradient(135deg,#1a91f0,#4f46e5); border:none; color:#fff; }

        /* Share bar */
        .bd-share-bar { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:40px; padding-top:30px; border-top:1px solid #f0f2f5; }
        .bd-share-lbl { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#8a94a6; margin-right:4px; }
        .bd-share-btn { display:inline-flex; align-items:center; gap:7px; padding:8px 15px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; font-size:13px; font-weight:600; cursor:pointer; text-decoration:none; transition:all .15s; }
        .bd-share-btn:hover { border-color:#1a91f0; color:#1a91f0; background:#f0f7ff; }

        /* Author card */
        .bd-author-card { display:flex; align-items:center; gap:16px; padding:22px; background:#f8fafc; border-radius:14px; border:1px solid #eef0f5; margin-top:40px; }
        .bd-author-card-av { width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg,#1a91f0,#6366f1); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:19px; flex-shrink:0; }

        /* CTA banner */
        .bd-cta { background:linear-gradient(135deg,#1a91f0,#4f46e5); border-radius:16px; padding:28px 30px; display:flex; align-items:center; justify-content:space-between; gap:20px; margin-top:48px; flex-wrap:wrap; }
        .bd-cta-btn { background:#fff; color:#1a91f0; font-weight:700; font-size:14px; padding:12px 22px; border-radius:10px; text-decoration:none; white-space:nowrap; transition:background .15s; display:inline-flex; align-items:center; gap:8px; flex-shrink:0; }
        .bd-cta-btn:hover { background:#eff6ff; }

        /* Last updated */
        .bd-updated { display:inline-flex; align-items:center; gap:6px; font-size:12px; color:#8a94a6; background:#f8fafc; border:1px solid #eef0f5; padding:6px 12px; border-radius:8px; margin-bottom:32px; }

        /* Responsive */
        @media(max-width:768px){
          .bd-hero { padding:32px 0 0; }
          .bd-hero-inner { padding:0 16px; }
          .bd-img-wrap { padding:0 16px; transform:translateY(24px); }
          .bd-layout { padding:0 16px; gap:0; }
          .bd-article { padding-top:44px; }
          .bd-cta { padding:20px; flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <ReadingProgress />

      <div className="bd-wrap">
        {/* ── Hero ── */}
        <div className="bd-hero">
          <div className="bd-hero-inner">
            <nav className="bd-crumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <Link to="/blog">Blog</Link>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span style={{ color: '#374151', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedBlog.title}</span>
            </nav>

            {selectedBlog.focus_keyword && (
              <div className="bd-badge">
                <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg>
                {selectedBlog.focus_keyword}
              </div>
            )}

            <h1 className="bd-title">{selectedBlog.title}</h1>

            {selectedBlog.meta_description && (
              <p className="bd-excerpt">{selectedBlog.meta_description}</p>
            )}

            <div className="bd-meta">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="bd-avatar">{authorInitial}</div>
                <div className="bd-author-wrap">
                  <span className="bd-author-name">{authorName}</span>
                  <span className="bd-author-role">Career Expert · resume.io</span>
                </div>
              </div>
              {publishDate && <>
                <span className="bd-sep">·</span>
                <span className="bd-meta-item">
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} /><line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} /><line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} /><line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} /></svg>
                  {publishDate}
                </span>
              </>}
              <span className="bd-sep">·</span>
              <span className="bd-meta-item">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} /><polyline points="12 6 12 12 16 14" strokeWidth={2} /></svg>
                {readTime} min read
              </span>
              {selectedBlog.tags?.[0] && <>
                <span className="bd-sep">·</span>
                <span className="bd-tag">{selectedBlog.tags[0]}</span>
              </>}
            </div>
          </div>

          <div className="bd-img-wrap">
            {imgSrc ? (
              <img src={imgSrc} alt={selectedBlog.meta_title || selectedBlog.title} className="bd-img" />
            ) : (
              <div className="bd-img-placeholder">
                <svg width="72" height="72" fill="none" viewBox="0 0 72 72">
                  <rect x="8" y="22" width="56" height="38" rx="8" fill="#c7d2fe" />
                  <rect x="18" y="14" width="36" height="18" rx="5" fill="#a5b4fc" />
                  <circle cx="36" cy="35" r="9" fill="#fff" opacity=".7" />
                  <path d="M31 35l3 3 7-7" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ── Content Layout ── */}
        <div className="bd-layout">
          <article className="bd-article">
            {/* Last updated */}
            {updatedDate && updatedDate !== publishDate && (
              <div className="bd-updated">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Last updated: {updatedDate}
              </div>
            )}

            {/* Mobile TOC */}
            {headings.length > 0 && (
              <div className="bd-mobile-toc">
                <p className="bd-toc-label">In this article</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {headings.map(h => (
                    <li key={h.id} style={{ paddingLeft: h.level === 3 ? 10 : 0 }}>
                      <a href={`#${h.id}`} onClick={e => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                        style={{ display: 'block', fontSize: 14, color: '#1a91f0', padding: '5px 0', fontWeight: 500, textDecoration: 'none' }}>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body */}
            <div ref={contentRef} className="bd-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Share bar */}
            <div className="bd-share-bar">
              <span className="bd-share-lbl">Share</span>
              {shareLinks.map(({ href, label, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="bd-share-btn">
                  {icon} {label}
                </a>
              ))}
              <button onClick={handleCopyLink} className="bd-share-btn" style={{ border: copied ? '1px solid #22c55e' : undefined, color: copied ? '#22c55e' : undefined }}>
                {copied
                  ? <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" /></svg>
                  : <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" strokeWidth={2} /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={2} /></svg>
                }
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>

            {/* Author card */}
            <div className="bd-author-card">
              <div className="bd-author-card-av">{authorInitial}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 2 }}>{authorName}</div>
                <div style={{ fontSize: 13, color: '#8a94a6' }}>Career Expert · resume.io Team</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bd-cta">
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 4 }}>Ready to build your resume?</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.75)' }}>AI-powered. Professional. Free to start.</div>
              </div>
              <Link to="/resume-builder" className="bd-cta-btn">
                Build my resume
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #f0f2f5' }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#1a91f0', textDecoration: 'none' }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Desktop Sidebar */}
          <aside className="bd-sidebar">
            {headings.length > 0 && (
              <div className="bd-sc">
                <TableOfContents headings={headings} />
              </div>
            )}

            <div className="bd-sc" style={{ marginTop: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#8a94a6', marginBottom: 12 }}>Share</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {shareLinks.map(({ href, label, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 8, border: '1px solid #e5e7eb', color: '#374151', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .15s', background: '#fff' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#1a91f0'; el.style.color = '#1a91f0'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#e5e7eb'; el.style.color = '#374151'; }}
                  >
                    {icon} {label}
                  </a>
                ))}
                <button onClick={handleCopyLink}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 8, border: `1px solid ${copied ? '#22c55e' : '#e5e7eb'}`, color: copied ? '#22c55e' : '#374151', fontSize: 13, fontWeight: 500, background: '#fff', cursor: 'pointer', transition: 'all .15s' }}
                >
                  {copied
                    ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" /></svg>
                    : <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" strokeWidth={2} /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={2} /></svg>
                  }
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>

            <div className="bd-sc bd-sc-blue" style={{ marginTop: 14 }}>
              <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 6 }}>Build your resume</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginBottom: 16 }}>AI-powered. Free to start.</p>
              <Link to="/resume-builder"
                style={{ display: 'block', textAlign: 'center', background: '#fff', color: '#1a91f0', fontWeight: 700, fontSize: 13, padding: '11px', borderRadius: 9, textDecoration: 'none' }}>
                Get started →
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: 14, padding: '14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #eef0f5' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#111827' }}>{readTime}</div>
              <div style={{ fontSize: 12, color: '#8a94a6', fontWeight: 500 }}>min read</div>
            </div>
          </aside>
        </div>

        <div style={{ height: 80 }} />
      </div>
    </>
  );
};

const ReadingProgress: React.FC = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="bd-progress" style={{ width: `${pct}%` }} />;
};

export default BlogDetailPage;
