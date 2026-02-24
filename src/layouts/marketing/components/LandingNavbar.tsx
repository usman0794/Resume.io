import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/client/home.css';
import {
  ChevronDown, Menu, X, ChevronRight,
  Target, FileText, LayoutTemplate, Briefcase,
  Sparkles, FileImage, BookOpen, Landmark,
  Wrench, Store, PlayCircle, Mic
} from 'lucide-react';

// =========================================================
// STATIC DATA FOR MEGA MENUS
// =========================================================

const TEMPLATES_DATA = [
  { icon: Target, title: 'Ats', desc: 'Optimise your resume and impress employers with these ATS-friendly designs.' },
  { icon: FileText, title: 'Google docs', desc: 'Google Docs templates for fast, flexible editing—easy to update, share, and customize anywhere.' },
  { icon: LayoutTemplate, title: 'Modern', desc: 'A current and stylish feel for forward-thinking candidates in innovative fields' },
  { icon: Briefcase, title: 'Professional', desc: 'Job-winning templates to showcase professionalism, dependability, and expertise' },
  { icon: Sparkles, title: 'Simple', desc: 'Clean, timeless templates with a classic balanced structure. A perfect basic canvas' },
  { icon: FileImage, title: 'Word', desc: 'Microsoft Word templates, perfect for downloading, editing, and customizing offline.' },
];

const EXAMPLES_DATA = {
  left: [
    { icon: BookOpen, title: 'Education', desc: 'Educate employers on your skills with a resume fit for any role in or outside the classroom' },
    { icon: Landmark, title: 'Government', desc: 'Create a government resume that commands the attention of department recruiters' },
    { icon: Wrench, title: 'Engineering', desc: 'Build the foundation for success with a resume tailored to highlight your engineering' },
    { icon: Store, title: 'Retail', desc: 'Showcase your retail experience with a resume that’s as well-crafted as your displays' },
  ],
  popular: ['Nurse', 'High School Student', 'Internship', 'Student', 'Accountant']
};

const COVER_LETTER_TEMPLATES = [
  { icon: FileText, title: 'Google docs', desc: 'Google Docs templates for quick, flexible editing easy to personalize' },
  { icon: FileImage, title: 'Microsoft word', desc: 'Microsoft templates you can easily edit, format, and customize offline in Word.' },
  { icon: Briefcase, title: 'Professional', desc: 'Polished designs to help you highlight your knowledge and expertise in formal fields' },
  { icon: Sparkles, title: 'Simple', desc: 'Clean, straightforward templates that keep the focus on your writing and content' },
];

const COVER_LETTER_EXAMPLES = [
  'Nursing', 'Administrative Assistant', 'Internship', 'Graduate', 'Teacher'
];

const RESOURCES_DATA = [
  { icon: PlayCircle, title: 'Video', desc: 'Video guides to help you write better resumes and land more interviews' },
  { icon: Mic, title: 'Podcasts', desc: 'Career podcasts to coach you through every step of your professional journey' }
];

const BLOG_CATEGORIES = [
  'Job Interview', 'Career', 'Cover Letter', 'Resume Help'
];



// =========================================================
// MOBILE MENU COMPONENT
// =========================================================

function MobileAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3.5 text-[16px] font-medium text-[#374151]"
      >
        {label}
        <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>
      {open && <div className="pb-3 flex flex-col gap-1">{children}</div>}
    </div>
  );
}

function MobileMenu({ isAuthenticated, onClose }: { isAuthenticated: boolean; onClose: () => void }) {
  return (
    <div
      className="fixed top-[62px] left-0 w-full bg-white shadow-lg z-40 lg:hidden flex flex-col overflow-y-auto"
      style={{ maxHeight: 'calc(100dvh - 62px)' }}
    >
      {/* Scrollable content */}
      <div className="flex-1 px-6 pt-4 pb-2">

        {/* RESUME SECTION */}
        <p className="text-[11px] font-bold tracking-widest text-[#9ca3af] uppercase mb-1 mt-2">Resume</p>
        <MobileAccordion label="Resume Templates">
          {TEMPLATES_DATA.map((item, i) => (
            <Link key={i} to={ROUTES.TEMPLATES} onClick={onClose} className="py-2 pl-2 text-[15px] text-[#4b5563] hover:text-[#1a91f0] flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[#1a91f0]" strokeWidth={2} /> {item.title}
            </Link>
          ))}
        </MobileAccordion>
        <MobileAccordion label="Resume Examples">
          {EXAMPLES_DATA.left.map((item, i) => (
            <Link key={i} to={ROUTES.RESUME_EXAMPLES} onClick={onClose} className="py-2 pl-2 text-[15px] text-[#4b5563] hover:text-[#1a91f0] flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[#1a91f0]" strokeWidth={2} /> {item.title}
            </Link>
          ))}
        </MobileAccordion>
        <MobileAccordion label="Most Popular">
          {EXAMPLES_DATA.popular.map((item, i) => (
            <Link key={i} to={ROUTES.RESUME_EXAMPLES} onClick={onClose} className="py-2 pl-2 text-[15px] text-[#4b5563] hover:text-[#1a91f0]">
              {item}
            </Link>
          ))}
        </MobileAccordion>

        {/* RESOURCES SECTION */}
        <p className="text-[11px] font-bold tracking-widest text-[#9ca3af] uppercase mb-1 mt-5">Blog</p>



      </div>

      {/* BOTTOM AUTH */}
      <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4">
        {isAuthenticated ? (
          <Link
            to={ROUTES.DASHBOARD}
            onClick={onClose}
            className="flex items-center gap-2 text-[16px] font-semibold text-[#1a91f0] hover:text-[#1578c2]"
          >
            My Account <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        ) : (
          <div className="flex flex-col gap-3">
            <Link to={ROUTES.LOGIN} onClick={onClose} className="w-full text-center text-[#1a91f0] py-3 font-semibold text-[16px] rounded bg-blue-50">Sign in</Link>
            <Link to={ROUTES.SIGNUP} onClick={onClose} className="w-full text-center text-white bg-[#1a91f0] py-3 font-bold text-[16px] rounded">Create my resume</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LandingNavbar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isCoverLetterPage = location.pathname.includes('cover-letter');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[100] bg-white transition-all duration-300 ${isScrolled
        ? 'shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border-b border-slate-100'
        : 'shadow-none border-b border-transparent'
        }`}
    >
      {/* Main Navigation Container - Adjusted for exact image layout */}
      <nav className="flex items-center justify-between px-6 lg:px-10 py-3 max-w-[1440px] w-full mx-auto relative z-50">

        {/* Left Section: Logo */}
        <div className="flex items-center justify-start  gap-12 z-10">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            {/* Exact resume.io Logo Blocks */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute top-0 right-0 w-[14px] h-[14px] bg-[#1a91f0] rounded-sm z-10" />
              <div className="absolute bottom-0 left-0 w-[14px] h-[14px] bg-[#a7d7fd] rounded-sm z-10" />
              <div className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[#1a91f0] rounded-sm z-0" />
            </div>
            <div className="flex flex-col justify-center -space-y-1.5 mt-1">
              <div className="text-[23px] font-bold tracking-tight text-[#111827]">
                resume.io
              </div>
              <span className="text-[10px] font-medium text-[#6b7280] text-right pr-0.5">
                by Muhammad Nabeel Ijaz
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#374151]" onMouseLeave={handleMouseLeave}>
            <div className="relative py-4" onMouseEnter={() => handleMouseEnter('templates')}>
              <Link to={ROUTES.TEMPLATES} className={`flex items-center gap-1.5 transition-colors ${activeDropdown === 'templates' ? 'text-[#1a91f0]' : 'hover:text-[#1a91f0]'}`}>
                Resume Templates <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-300 ${activeDropdown === 'templates' ? 'rotate-180 text-[#1a91f0]' : 'text-[#6b7280]'}`} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="relative py-4" onMouseEnter={() => handleMouseEnter('examples')}>
              <Link to={ROUTES.RESUME_EXAMPLES} className={`flex items-center gap-1.5 transition-colors ${activeDropdown === 'examples' ? 'text-[#1a91f0]' : 'hover:text-[#1a91f0]'}`}>
                Resume Examples <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-300 ${activeDropdown === 'examples' ? 'rotate-180 text-[#1a91f0]' : 'text-[#6b7280]'}`} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="relative py-4" onMouseEnter={() => handleMouseEnter('cover-letter')}>
              <Link to={ROUTES.COVER_LETTER_EXAMPLES} className={`flex items-center gap-1.5 transition-colors ${activeDropdown === 'cover-letter' ? 'text-[#1a91f0]' : 'hover:text-[#1a91f0]'}`}>
                Cover Letter <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-300 ${activeDropdown === 'cover-letter' ? 'rotate-180 text-[#1a91f0]' : 'text-[#6b7280]'}`} strokeWidth={2.5} />
              </Link>
            </div>

            <Link
              to={ROUTES.FAQ}
              className="hover:text-[#1a91f0] transition-colors py-4 text-[15px] font-medium text-[#374151]"
              onMouseEnter={() => handleMouseEnter('faq')}
            >
              FAQ
            </Link>

            <div className="relative py-4" onMouseEnter={() => handleMouseEnter('resources')}>
              <Link to={ROUTES.BLOG} className={`flex items-center gap-1.5 transition-colors ${activeDropdown === 'resources' ? 'text-[#1a91f0]' : 'hover:text-[#1a91f0]'}`}>
                Resources <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-300 ${activeDropdown === 'resources' ? 'rotate-180 text-[#1a91f0]' : 'text-[#6b7280]'}`} strokeWidth={2.5} />
              </Link>
            </div>


          </div>
        </div>

        {/* Right Section: Grouped Links + Divider + Auth (Matching the image right-alignment) */}
        <div className="hidden lg:flex items-center gap-8 z-10">
          {/* Divider */}
          <div className="h-[22px] w-[1px] bg-slate-300 mx-1" />

          {/* Auth Buttons */}
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD ?? '/app'} className="border border-[#1a91f0] text-[#1a91f0] hover:bg-blue-50 px-5 py-[9px] rounded-[4px] text-[15px] font-semibold transition-colors">
                My Account
              </Link>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="text-[15px] font-medium text-[#1a91f0] hover:text-[#1578c2] transition-colors">
                  Sign in
                </Link>
                <Link to={ROUTES.SIGNUP} className="bg-[#1a91f0] hover:bg-[#1578c2] text-white px-5 py-[11px] rounded-[4px] text-[15px] font-semibold transition-colors shadow-sm tracking-wide">
                  {isCoverLetterPage ? 'Build my cover letter' : 'Create my resume'}
                </Link>
              </>
            )}
          </div>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#1a91f0] hover:bg-blue-50 p-1.5 rounded-md transition-colors ml-auto z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" strokeWidth={2.5} />}
        </button>
      </nav>

      {/* DESKTOP MEGA MENUS OVERLAY */}
      {activeDropdown && activeDropdown !== 'faq' && (
        <div
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-40 animate-dropdown"
        >
          <div className="max-w-[1400px] mx-auto flex h-full px-2 lg:px-4">

            {/* ----------------------------- */}
            {/* MENU 1: RESUME TEMPLATES */}
            {/* ----------------------------- */}
            {activeDropdown === 'templates' && (
              <>
                <div className="flex-1 py-12 pr-20 pl-12">
                  <h3 className="text-[20px] font-bold text-[#111827] mb-10">Resume Templates</h3>
                  <div className="grid grid-cols-3 gap-x-16 gap-y-12 auto-rows-max">
                    {TEMPLATES_DATA.map((item, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5 text-[#1a91f0]">
                            <item.icon className="w-[20px] h-[20px]" strokeWidth={2} />
                            <span className="text-[17px] font-bold text-[#111827] group-hover:text-[#1a91f0] transition-colors">{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#1a91f0] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </div>
                        <p className="text-[14px] text-[#6b7280] leading-[1.6] pr-2 group-hover:text-[#4b5563] transition-colors">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[420px] flex flex-col min-h-[420px] shrink-0">
                  <div className="flex-1 bg-[#f0f7fe] p-12 flex flex-col justify-center group cursor-pointer border-b border-white">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5">
                      <LayoutTemplate className="w-[22px] h-[22px] text-[#1a91f0]" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-[18px] font-bold text-[#111827] group-hover:text-[#1a91f0] transition-colors">Resume Builder</h4>
                      <ChevronRight className="w-[16px] h-[16px] text-[#1a91f0] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </div>
                    <p className="text-[14px] text-[#6b7280] leading-[1.6]">
                      Build powerful resumes in only 5 minutes with our easy to use Resume Builder and get hired faster.
                    </p>
                  </div>

                  <div className="flex-1 bg-[#eeecff] p-12 flex flex-col justify-center group cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5">
                      <Sparkles className="w-[22px] h-[22px] text-[#8b5cf6]" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-[18px] font-bold text-[#111827] group-hover:text-[#8b5cf6] transition-colors">Get help from AI</h4>
                      <ChevronRight className="w-[16px] h-[16px] text-[#8b5cf6] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    </div>
                    <p className="text-[14px] text-[#6b7280] leading-[1.6]">
                      Get ahead with our AI resume builder.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ----------------------------- */}
            {/* MENU 2: RESUME EXAMPLES */}
            {/* ----------------------------- */}
            {activeDropdown === 'examples' && (
              <>
                <div className="flex-[1.2] py-12 pr-16 pl-12">
                  <h3 className="text-[20px] font-bold text-[#111827] mb-10">Resume Examples</h3>
                  <div className="grid grid-cols-2 gap-x-14 gap-y-12">
                    {EXAMPLES_DATA.left.map((item, idx) => (
                      <Link key={idx} to={ROUTES.RESUME_EXAMPLES} onClick={() => setActiveDropdown(null)} className="group block">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5 text-[#1a91f0]">
                            <item.icon className="w-[20px] h-[20px]" strokeWidth={2} />
                            <span className="text-[17px] font-bold text-[#111827] group-hover:text-[#1a91f0] transition-colors">{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#1a91f0] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </div>
                        <p className="text-[14px] text-[#6b7280] leading-[1.6] pr-4">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex-[0.8] py-12 pl-6 pr-6">
                  <h3 className="text-[19px] font-bold text-[#111827] mb-8">Most Popular</h3>
                  <ul className="space-y-4.5">
                    {EXAMPLES_DATA.popular.map((item, idx) => (
                      <li key={idx} className="mb-3.5">
                        <Link to={ROUTES.RESUME_EXAMPLES} onClick={() => setActiveDropdown(null)} className="text-[16px] font-medium text-[#4b5563] hover:text-[#1a91f0] transition-colors block">
                          {item}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2">
                      <Link to={ROUTES.RESUME_EXAMPLES} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors flex items-center gap-1 group">
                        All Examples <ChevronRight className="w-[15px] h-[15px] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-[420px] bg-[#f9fafb] p-12 border-l border-slate-100 flex flex-col justify-start shrink-0">
                  <div className="w-[130px] h-[170px] bg-white rounded shadow-md border border-slate-200 mb-8 overflow-hidden">
                    <img src="https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg?v=1651663693" alt="Resume Preview" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#111827] mb-3 leading-tight">500+ Free Resume Examples by industry</h4>
                  <p className="text-[14px] text-[#6b7280] leading-[1.6] mb-6">
                    Use the expert guides and our resume builder to create a beautiful resume in minutes.
                  </p>
                  <Link to={ROUTES.RESUME_BUILDER} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors flex items-center gap-1 group w-fit">
                    Get started now <ChevronRight className="w-[15px] h-[15px] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </Link>
                </div>
              </>
            )}

            {/* ----------------------------- */}
            {/* MENU 3: COVER LETTER EXAMPLES */}
            {/* ----------------------------- */}
            {activeDropdown === 'cover-letter' && (
              <>
                <div className="flex-[1.4] py-12 pr-12 pl-12 border-r border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[19px] font-bold text-[#111827]">Cover Letter Templates</h3>
                    <Link to={ROUTES.COVER_LETTER_EXAMPLES} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors">View all</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                    {COVER_LETTER_TEMPLATES.map((item, idx) => (
                      <Link key={idx} to={ROUTES.COVER_LETTER_EXAMPLES} onClick={() => setActiveDropdown(null)} className="group block">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5 text-[#1a91f0]">
                            <item.icon className="w-[20px] h-[20px]" strokeWidth={2} />
                            <span className="text-[17px] font-bold text-[#111827] group-hover:text-[#1a91f0] transition-colors">{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#1a91f0] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </div>
                        <p className="text-[14px] text-[#6b7280] leading-[1.6] pr-4 group-hover:text-[#4b5563] transition-colors">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex-[0.8] py-12 pl-12 pr-12">
                  <h3 className="text-[19px] font-bold text-[#111827] mb-8">Cover Letter Examples</h3>
                  <ul className="space-y-4.5">
                    {COVER_LETTER_EXAMPLES.map((item, idx) => (
                      <li key={idx} className="mb-4">
                        <Link to={ROUTES.COVER_LETTER_EXAMPLES} onClick={() => setActiveDropdown(null)} className="text-[16px] font-medium text-[#4b5563] hover:text-[#1a91f0] transition-colors block">
                          {item}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-3">
                      <Link to={ROUTES.COVER_LETTER_EXAMPLES} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors flex items-center gap-1 group">
                        All Examples <ChevronRight className="w-[15px] h-[15px] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-[360px] bg-[#f9fafb] p-12 border-l border-slate-100 flex flex-col justify-start shrink-0">
                  <div className="w-[150px] h-[140px] mx-auto mb-6 flex items-center justify-center">
                    <img src="/assets/images/misc/promo/promo-right-resume.svg" alt="Cover Letter Builder" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#111827] mb-3 leading-tight">Cover Letter Builder</h4>
                  <p className="text-[14px] text-[#6b7280] leading-[1.6] mb-6">
                    Build professional cover letters in a few simple steps by using our free Cover Letter builder.
                  </p>
                  <Link to={ROUTES.RESUME_BUILDER} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors flex items-center gap-1 group w-fit">
                    Get started now <ChevronRight className="w-[15px] h-[15px] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </Link>
                </div>
              </>
            )}

            {/* ----------------------------- */}
            {/* MENU 4: RESOURCES */}
            {/* ----------------------------- */}
            {activeDropdown === 'resources' && (
              <>
                <div className="flex-[1.4] py-12 pr-12 pl-12 border-r border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[19px] font-bold text-[#111827]">Resources</h3>
                    <Link to={ROUTES.BLOG} onClick={() => setActiveDropdown(null)} className="text-[15px] font-semibold text-[#1a91f0] hover:text-[#1578c2] transition-colors">View all</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                    {RESOURCES_DATA.map((item, idx) => (
                      <Link key={idx} to={ROUTES.BLOG} onClick={() => setActiveDropdown(null)} className="group block">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5 text-[#1a91f0]">
                            <item.icon className="w-[20px] h-[20px]" strokeWidth={2} />
                            <span className="text-[17px] font-bold text-[#111827] group-hover:text-[#1a91f0] transition-colors">{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#1a91f0] transform transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                        </div>
                        <p className="text-[14px] text-[#6b7280] leading-[1.6] pr-4 group-hover:text-[#4b5563] transition-colors">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex-[0.8] py-12 pl-12 pr-12">
                  <h3 className="text-[19px] font-bold text-[#111827] mb-8">Blog Categories</h3>
                  <ul className="space-y-4.5">
                    {BLOG_CATEGORIES.map((item, idx) => (
                      <li key={idx} className="mb-4">
                        <Link to={ROUTES.BLOG} onClick={() => setActiveDropdown(null)} className="text-[16px] font-medium text-[#4b5563] hover:text-[#1a91f0] transition-colors block">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-[360px] bg-[#f9fafb] p-12 border-l border-slate-100 flex flex-col justify-start shrink-0">
                  <h3 className="text-[19px] font-bold text-[#111827] mb-8">Latest</h3>
                  <Link to={ROUTES.BLOG} onClick={() => setActiveDropdown(null)} className="block group">
                    <div className="w-full h-[160px] rounded overflow-hidden mb-4 bg-white border border-slate-200">
                      <img src="https://resume.io/cdn-cgi/image/width=544,height=480,dpr=1.24,fit=crop,gravity=top,quality=75,format=auto/assets/templates/new_york-afac6df9.jpg" alt="Latest Blog" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      <span>Post</span>
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      <span>Career</span>
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      <span>6 min</span>
                    </div>
                    <h4 className="text-[16px] font-bold text-[#374151] leading-[1.4] group-hover:text-[#1a91f0] transition-colors">
                      Hustle Culture on Social Media Is Damaging Workers, Survey Finds
                    </h4>
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

    </header>
  );
}
