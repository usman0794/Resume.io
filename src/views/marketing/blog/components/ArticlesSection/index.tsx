import React from 'react';
import { Link } from 'react-router-dom';

const BlogArticlesSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-4 md:px-8 font-sans">
      <h2 className="text-[32px] font-semibold text-[#111827] mb-4">Articles</h2>
      <hr className="border-slate-200 mb-8 w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left: Featured */}
        <div className="lg:col-span-6 flex flex-col h-[520px]">
          <Link
            to="/blog/top-resume-formats-2026"
            className="flex flex-col bg-[#f5ebe4] rounded-[20px] overflow-hidden h-full group hover:opacity-95 transition-opacity relative"
          >
            <div className="p-10 pb-0 z-10 flex flex-col items-start w-[85%]">
              <div className="flex items-center text-[14px] text-[#6b7280] mb-5">
                <span className="font-medium text-[#9ca3af]">Written by</span>
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-300 mx-2 border border-white">
                  <img src="/assets/images/authors/author-avatar-paul-drury-alt.jpg" alt="Paul Drury" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#374151] font-semibold">Paul Drury</span>
              </div>
              <h3 className="text-[32px] md:text-[36px] leading-[1.1] font-bold text-[#111827] mb-5 group-hover:text-blue-600 transition-colors">
                Top Resume Formats for 2026 With Free Examples
              </h3>
              <div className="flex items-center text-[14px] text-[#9ca3af]">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                </svg>
                <span>31 min</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 left-0 h-[60%] flex items-end justify-center pointer-events-none">
              <img
                alt="Hand holding shapes"
                className="w-[85%] h-[90%] object-contain object-bottom"
                src="/assets/images/blog/articles/blog-article-best-resume-formats-featured.jpg"
              />
            </div>
          </Link>
        </div>

        {/* Middle: Popular */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Popular</h3>
          <div className="flex flex-col">
            
            {/* Card 1 */}
            <div className="flex flex-col group mb-6">
              <Link
                to="/blog/crucial-resume-skills"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.15' }}
              >
                <img
                  src="/assets/images/blog/articles/blog-article-resume-skills-popular.png"
                  alt="Resume skills illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Resume Help</p>
              <Link
                to="/blog/crucial-resume-skills"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                275+ Crucial Resume Skills: Top Hard & Soft Skills for Various Careers
              </Link>
            </div>
            
            <hr className="border-slate-200 mb-6 w-full" />

            {/* Card 2 */}
            <div className="flex flex-col group">
              <Link
                to="/blog/how-to-write-resume-no-experience"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.15' }}
              >
                <img
                  src="/assets/images/blog/articles/blog-article-no-experience-resume-popular.png"
                  alt="No experience resume illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Career Advice</p>
              <Link
                to="/blog/how-to-write-resume-no-experience"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                How to Write a Resume with No Experience
              </Link>
            </div>

          </div>
        </div>

        {/* Right: Latest */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Latest</h3>
          <div className="flex flex-col">
            
            {/* List Item 1 */}
            <div className="py-4 group pt-0">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">26 Aug 2026</p>
              <Link
                to="/blog/hustle-culture-survey"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Hustle Culture on Social Media Is Damaging Workers, Survey Finds
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />
            
            {/* List Item 2 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">17 Aug 2026</p>
              <Link
                to="/blog/list-online-courses-resume"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to List Online Courses on Your Resume
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            {/* List Item 3 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">17 Aug 2026</p>
              <Link
                to="/blog/cpr-certification-resume"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to Put CPR Certification on Your Resume
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            {/* List Item 4 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">14 Aug 2026</p>
              <Link
                to="/blog/how-to-get-promotion-2026"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to Get a Promotion in 2026
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Row: Wide Featured */}
      <div className="w-full mt-10">
        <Link
          to="/blog/ats-friendly-resume-format"
          className="flex items-stretch bg-[#f8dccc] rounded-[20px] overflow-hidden h-full group hover:opacity-95 transition-opacity relative"
        >
          <div className="flex-1 p-10 md:p-12 lg:p-16 flex flex-col justify-between z-10 w-[55%]">
            <div>
              <h3 className="text-[32px] md:text-[38px] lg:text-[44px] leading-[1.1] font-medium text-[#111827] mb-4 group-hover:text-blue-600 transition-colors pr-4 tracking-tight">
                How to Make an ATS-Friendly<br className="hidden md:block" /> Resume
              </h3>
              <div className="flex items-center text-[15px] text-[#6b7280]">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                </svg>
                <span>21 min</span>
              </div>
            </div>
            
            <div className="mt-16 md:mt-24 lg:mt-32">
              <span className="inline-flex items-center gap-2 border border-[#111827] rounded-full px-5 py-2 text-[15px] font-medium text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition-colors cursor-pointer">
                Read
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center justify-end pointer-events-none p-6 md:p-10 pr-12">
            <img
              alt="Monitor with resumes"
              className="max-h-[85%] w-full object-contain object-right"
              src="/assets/images/blog/articles/blog-article-ats-resume-bottom-featured.jpg"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BlogArticlesSection;
