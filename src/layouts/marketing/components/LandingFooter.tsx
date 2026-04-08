import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';

// ==========================================
// SVG ASSETS (Zero Dependencies)
// ==========================================

const LogoSVG = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="4" width="24" height="24" rx="4" fill="#1A91F0" />
    <rect x="10" y="4" width="14" height="14" rx="2" fill="white" />
    <rect x="0" y="14" width="14" height="14" rx="2" fill="#88C5F7" />
    <text x="34" y="18" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white" letterSpacing="-0.5">resume.io</text>
    <text x="52" y="28" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="normal" fill="#828BA2">by MuhammadNabeelIJaz</text>
  </svg>
);

const CareerIoLogoSVG = () => (
  <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#88C5F7" />
    <circle cx="18" cy="10" r="8" fill="#1A91F0" />
    <text x="32" y="15" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#828BA2" letterSpacing="-0.5">career.io</text>
  </svg>
);


const ChevronDown = ({ className, isOpen }: { className?: string, isOpen?: boolean }) => (
  <svg className={`${className} transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-[#828BA2]'}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1L6 6L11 1" />
  </svg>
);

const SocialIcons = {
  LinkedIn: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" /></svg>,
  YouTube: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  Pinterest: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>,
  Instagram: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  Facebook: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>,
  TikTok: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" /></svg>,
  Spotify: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.6 12.84c.42.24.6.84.36 1.2zM20.16 9.3C16.32 7.02 9.48 6.84 5.52 8.04c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.56-1.32 12.001-1.08 16.32 1.5.54.3 0.72 1.02.42 1.56-.24.48-.96.6-1.44.3z" /></svg>,
};

// ==========================================
// DATA STRUCTURE
// ==========================================

// Map link labels to routes where pages exist
const FOOTER_LINK_ROUTES: Record<string, string> = {
  'Resume Templates': ROUTES.TEMPLATES,
  'Resume Examples': ROUTES.RESUME_EXAMPLES,
  'Resume Builder': ROUTES.RESUME_BUILDER,
  'Blog': ROUTES.BLOG,
  'FAQ': ROUTES.FAQ,
  'Contact Us': ROUTES.CONTACT,
  'Terms Of Service': ROUTES.TERMS,
  'Privacy Policy': ROUTES.PRIVACY_POLICY,
  'Right Of Withdrawal': ROUTES.RIGHT_OF_WITHDRAWAL,
  'Do Not Sell, Do Not Share': ROUTES.DO_NOT_SELL,
  'Your Privacy Choices': ROUTES.YOUR_PRIVACY_CHOICES,
  'About Us': ROUTES.ABOUT,
  'Careers': ROUTES.CAREERS,
};

const FOOTER_CATEGORIES = [
  { title: 'RESUME', links: ['Resume Examples', 'Resume Templates', 'Resume Builder'] },
  { title: 'COVER LETTER', links: ['Cover Letter Examples', 'Cover Letter Templates'] },
  { title: 'JOB SEEKERS', links: ['Careers'] },
  {
    title: 'RESOURCES',
    links: [
      'Blog',
      'Resume Help',
    ],
  },
  {
    title: 'OUR COMPANY',
    links: [
      'About Us',
      'Careers',
      'Contact Us',
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      'FAQ',
      'Terms Of Service',
      'Privacy Policy',
      'Right Of Withdrawal',
      'Do Not Sell, Do Not Share',
      'Your Privacy Choices',
    ],
  },
];

const SOCIAL_LINKS = [
  { Icon: SocialIcons.LinkedIn, label: 'LinkedIn' },
  { Icon: SocialIcons.YouTube, label: 'YouTube' },
  { Icon: SocialIcons.Pinterest, label: 'Pinterest' },
  { Icon: SocialIcons.Instagram, label: 'Instagram' },
  { Icon: SocialIcons.Facebook, label: 'Facebook' },
  { Icon: SocialIcons.TikTok, label: 'TikTok' },
  { Icon: SocialIcons.Spotify, label: 'Spotify' },
];

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

const FooterColumnGroup = ({ title, links, className = "" }: { title: string, links: string[], className?: string }) => (
  <div className={className}>
    <h4 className="text-[#828BA2] text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
      {title}
    </h4>
    <ul className="flex flex-col gap-[14px]">
      {links.map(link => {
        const route = FOOTER_LINK_ROUTES[link];
        const cls = "text-white hover:text-[#1a91f0] text-[15px] font-medium transition-colors flex items-center w-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a91f0] rounded-sm";
        return (
          <li key={link}>
            {route ? (
              <Link to={route} className={cls}>
                {link}

              </Link>
            ) : (
              <a href="#" className={cls}>
                {link}

              </a>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

const LandingFooter: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <footer className="bg-[#0a0f17] font-sans selection:bg-[#1a91f0] selection:text-white border-t border-[#1e2635]/50">
      <div className="max-w-[1300px] mx-auto">

        {/* =========================================
            DESKTOP GRID (Hidden on Mobile)
        ========================================= */}
        <div className="hidden lg:block px-8">

          {/* TOP TIER: Links & Categories */}
          <div className="grid grid-cols-12 gap-8 pt-20 pb-14 border-b border-transparent">
            {/* Col 1: Logo */}
            <div className="col-span-3">
              <Link to="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a91f0] rounded-sm" aria-label="Home">
                <LogoSVG />
              </Link>
            </div>

            {/* Col 2: Resume / Cover Letter */}
            <div className="col-span-2 flex flex-col gap-12">
              <FooterColumnGroup title="RESUME" links={FOOTER_CATEGORIES[0].links} />
            </div>

            {/* Col 3: Job Seekers / Resources */}
            <div className="col-span-2 flex flex-col gap-12">
              <FooterColumnGroup title="JOB SEEKERS" links={FOOTER_CATEGORIES[2].links} />
              <FooterColumnGroup title="RESOURCES" links={FOOTER_CATEGORIES[3].links} />
            </div>

            {/* Col 4: Our Company */}
            <div className="col-span-2">
              <FooterColumnGroup title="OUR COMPANY" links={FOOTER_CATEGORIES[4].links} />
            </div>

            {/* Col 5: Support */}
            <div className="col-span-3">
              <FooterColumnGroup title="SUPPORT" links={FOOTER_CATEGORIES[5].links} />
            </div>
          </div>

          {/* BOTTOM TIER: Misc Elements */}
          {/* Matches the 3-2-2-2-3 span structure above to align perfectly to the left axes */}
          <div className="grid grid-cols-12 gap-8 items-end pt-8 pb-16">

            {/* Under Logo */}
            <div className="col-span-3">
              <h4 className="text-[#828BA2] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
                Select Your Country
              </h4>
              <button className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a91f0] rounded-sm group">
                <span className="text-[20px] shadow-sm leading-none">🇺🇸</span>
                <span className="text-white text-[15px] font-medium group-hover:text-[#1a91f0] transition-colors">International</span>
              </button>
            </div>

            {/* Under Resume & Job Seekers */}
            <div className="col-span-4">
              <h4 className="text-[#828BA2] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
                Join us on social media
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="w-[36px] h-[36px] bg-[#222834] hover:bg-[#323b4d] rounded-full flex items-center justify-center text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a91f0]">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Under Our Company */}
            <div className="col-span-2">
              <div className="w-[74px] h-[44px] bg-white rounded flex flex-col p-[2px] shadow-sm cursor-default">
                <div className="flex-1 flex items-center justify-center text-black font-black text-[18px] leading-none tracking-tight pt-0.5">
                  CPRW
                </div>
                <div className="h-[15px] bg-[#0a0f17] rounded-sm flex items-center justify-center text-white text-[4px] font-bold tracking-widest text-center leading-[1.2]">
                  CERTIFIED PROFESSIONAL<br />RÉSUMÉ WRITER
                </div>
              </div>
            </div>

            {/* Under Support */}
            <div className="col-span-3 pb-2">
              <p className="text-[#828BA2] text-[14px]">
                Copyright 2026 - resume.io
              </p>
            </div>
          </div>
        </div>


        {/* MOBILE ACCORDION (Hidden on Desktop) */}
        <div className="lg:hidden flex flex-col w-full">

          <div className="w-full pt-4">
            {FOOTER_CATEGORIES.map((category) => {
              const isOpen = !!openSections[category.title];
              return (
                <div key={category.title} className="border-b border-[#1e2635]/60">
                  <button
                    onClick={() => toggleSection(category.title)}
                    className="w-full flex items-center justify-between px-6 py-[22px] focus-visible:outline-none focus-visible:bg-[#1e2635]/40 transition-colors group"
                  >
                    <span className="text-[#828BA2] text-[12px] font-bold uppercase tracking-[0.15em] group-hover:text-white transition-colors">
                      {category.title}
                    </span>
                    <ChevronDown isOpen={isOpen} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                    <ul className="flex flex-col gap-4 px-6 pt-2">
                      {category.links.map(link => {
                        const route = FOOTER_LINK_ROUTES[link];
                        const cls = "text-white hover:text-[#1a91f0] text-[15px] font-medium transition-colors flex items-center";
                        return (
                          <li key={link}>
                            {route ? (
                              <Link to={route} className={cls}>
                                {link}

                              </Link>
                            ) : (
                              <a href="#" className={cls}>
                                {link}

                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-10 flex flex-col gap-10">
            <div>
              <h4 className="text-[#828BA2] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Select Your Country</h4>
              <button className="flex items-center gap-3">
                <span className="text-[24px] shadow-sm leading-none">🇺🇸</span>
                <span className="text-white text-[16px] font-medium">International</span>
              </button>
            </div>

            <div>
              <h4 className="text-[#828BA2] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Join us on social media</h4>
              <div className="flex flex-wrap items-center gap-3">
                {SOCIAL_LINKS.map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="w-[42px] h-[42px] bg-[#222834] hover:bg-[#323b4d] rounded-full flex items-center justify-center text-white transition-all duration-200">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="w-[74px] h-[44px] bg-white rounded flex flex-col p-[2px] shadow-sm">
                <div className="flex-1 flex items-center justify-center text-black font-black text-[18px] leading-none tracking-tight pt-0.5">
                  CPRW
                </div>
                <div className="h-[15px] bg-[#0a0f17] rounded-sm flex items-center justify-center text-white text-[4px] font-bold tracking-widest text-center leading-[1.2]">
                  CERTIFIED PROFESSIONAL<br />RÉSUMÉ WRITER
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#1e2635]/60">
              <p className="text-[#828BA2] text-[13px]">Copyright 2026 - resume.io</p>
              <CareerIoLogoSVG />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;