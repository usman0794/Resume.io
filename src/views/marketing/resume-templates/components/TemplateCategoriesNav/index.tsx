import React, { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Simple',      href: '#cat-simple'      },
  { label: 'Two-column',  href: '#cat-two-column'  },
  { label: 'Google Docs', href: '#cat-google-docs' },
];

const TemplateCategoriesNav: React.FC = () => {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHref(href);
    }
  };

  return (
    <nav
      className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-sm"
      aria-label="Template categories"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = activeHref === href;
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={[
                'whitespace-nowrap px-4 py-4 text-[14px] font-medium border-b-2 transition-colors duration-150',
                isActive
                  ? 'border-[#1a91f0] text-[#1a91f0]'
                  : 'border-transparent text-[#6b7280] hover:text-[#111827] hover:border-slate-300',
              ].join(' ')}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default TemplateCategoriesNav;
