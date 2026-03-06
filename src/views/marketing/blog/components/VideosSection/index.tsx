import React from 'react';
import { Link } from 'react-router-dom';

const VideosSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-4 md:px-8 font-sans">
      <h2 className="text-[32px] font-semibold text-[#111827] mb-4">Videos</h2>
      <hr className="border-slate-200 mb-8 w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left: Popular */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Popular</h3>
          <div className="flex flex-col">
            
            {/* Card 1 — Job Search Guide */}
            <div className="flex flex-col group mb-6">
              <Link
                to="/blog/job-search-guide"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.4' }}
              >
                <img
                  src="/assets/images/blog/videos/blog-video-job-search-guide.jpg"
                  alt="Job search guide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Job Interview</p>
              <Link
                to="/blog/job-search-guide"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                Job search guide: Best strategies &amp; platforms
              </Link>
            </div>
            
            <hr className="border-slate-200 mb-6 w-full" />

            {/* Card 2 — University Applications (green girl / video1.jpg) */}
            <div className="flex flex-col group">
              <Link
                to="/blog/university-applications-cover-letter"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.4' }}
              >
                <img
                  src="/assets/images/blog/videos/blog-video-graduate-cover-letter-green.jpg"
                  alt="University Applications cover letter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Cover Letter</p>
              <Link
                to="/blog/university-applications-cover-letter"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                University Applications: How to write your cover letter
              </Link>
            </div>

          </div>
        </div>

        {/* Middle: Latest */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Latest</h3>
          <div className="flex flex-col">
            
            {/* List Item 1 */}
            <div className="py-4 group pt-0">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">04 Feb 2025</p>
              <Link
                to="/blog/ask-for-promotion"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Best way to ask for that promotion | Interview Masterclass
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />
            
            {/* List Item 2 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">04 Feb 2025</p>
              <Link
                to="/blog/high-school-resume"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Learn how to write a high school resume (with examples)!
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            {/* List Item 3 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">04 Feb 2025</p>
              <Link
                to="/blog/engineering-resume"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to write a top engineering resume (+ example)
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            {/* List Item 4 */}
            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">04 Feb 2025</p>
              <Link
                to="/blog/driver-resume"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to write a driver resume?
              </Link>
            </div>

          </div>
        </div>

        {/* Right: Featured — purple card with thumbs-up girl (video2.jpg) */}
        <div className="lg:col-span-6 flex flex-col" style={{ height: 520 }}>
          <Link
            to="/blog/fresh-graduate-cover-letter"
            className="flex flex-col bg-[#e8e0f5] rounded-[20px] overflow-hidden h-full group hover:opacity-95 transition-opacity"
            style={{ height: 520 }}
          >
            {/* Text content — top 45% */}
            <div className="px-10 pt-10 pb-4 flex flex-col items-start flex-shrink-0" style={{ flexBasis: '44%' }}>
              <div className="flex items-center text-[14px] text-[#6b7280] mb-5">
                <span className="font-medium text-[#9ca3af]">Written by</span>
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-300 mx-2 border border-white">
                  <img src="/assets/images/authors/author-avatar-anna-muckerman.jpg" alt="Anna Muckerman" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#374151] font-medium">Anna Muckerman</span>
              </div>
              <h3 className="text-[28px] md:text-[34px] leading-[1.15] font-bold text-[#111827] mb-5 group-hover:text-blue-600 transition-colors">
                Create a cover letter that gets you hired as a fresh graduate
              </h3>
              <div className="flex items-center text-[14px] text-[#8b7bb5]">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                </svg>
                <span>3 min</span>
              </div>
            </div>

            {/* Image — bottom 56%, fills width, top-cropped */}
            <div className="flex-1 overflow-hidden">
              <img
                alt="Graduate cover letter"
                className="w-full h-full object-cover object-top"
                src="/assets/images/blog/videos/blog-video-graduate-cover-letter-purple.jpg"
              />
            </div>
          </Link>
        </div>


      </div>
    </section>
  );
};

export default VideosSection;
