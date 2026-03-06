import React, { useState, useEffect } from 'react';

interface Heading { id: string; text: string; level: number; }
interface Props { headings: Heading[]; }

const TableOfContents: React.FC<Props> = ({ headings }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-15% 0% -70% 0%', threshold: 0 }
    );
    headings.forEach(h => { const el = document.getElementById(h.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8a94a6', marginBottom: 14, margin: '0 0 14px' }}>
        In this article
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {headings.map(h => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? 10 : 0 }}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(h.id);
              }}
              style={{
                display: 'block',
                fontSize: 13,
                padding: '5px 10px 5px 10px',
                borderLeft: `2px solid ${activeId === h.id ? '#1a91f0' : 'transparent'}`,
                color: activeId === h.id ? '#1a91f0' : '#6b7280',
                fontWeight: activeId === h.id ? 600 : 400,
                background: activeId === h.id ? '#f0f7ff' : 'transparent',
                borderRadius: '0 6px 6px 0',
                textDecoration: 'none',
                lineHeight: 1.4,
                transition: 'all .15s',
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
