import React from 'react';
import { Link } from 'react-router-dom';

const PodcastsSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-4 md:px-8 font-sans">
      <h2 className="text-[32px] font-semibold text-[#111827] mb-4">Podcasts</h2>
      <hr className="border-slate-200 mb-8 w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

        {/* Left: Popular */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Popular</h3>
          <div className="flex flex-col">

            {/* Card 1 */}
            <div className="flex flex-col group mb-6">
              <Link
                to="/blog/podcast-career-advice"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.4' }}
              >
                <img
                  src="/assets/images/blog/podcasts/blog-podcast-career-advice.jpg"
                  alt="Career advice podcast"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Career</p>
              <Link
                to="/blog/podcast-career-advice"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                Career Advice for the Modern Job Seeker
              </Link>
            </div>

            <hr className="border-slate-200 mb-6 w-full" />

            {/* Card 2 */}
            <div className="flex flex-col group">
              <Link
                to="/blog/podcast-resume-tips"
                className="block bg-white overflow-hidden mb-4 rounded-xl border border-black/5"
                style={{ aspectRatio: '1.4' }}
              >
                <img
                  src="/assets/images/blog/podcasts/blog-podcast-resume-tips.jpg"
                  alt="Resume tips podcast"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-[13px] text-[#9ca3af] font-medium mb-1.5 uppercase tracking-wider">Resume Help</p>
              <Link
                to="/blog/podcast-resume-tips"
                className="text-[17px] leading-[1.4] font-semibold text-[#111827] group-hover:text-blue-600 transition-colors"
              >
                Resume Tips That Actually Get You Hired
              </Link>
            </div>

          </div>
        </div>

        {/* Middle: Latest */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h3 className="text-[22px] font-medium text-[#111827] mb-6">Latest</h3>
          <div className="flex flex-col">

            <div className="py-4 group pt-0">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">20 Aug 2026</p>
              <Link
                to="/blog/podcast-interview-prep"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                How to Ace Any Job Interview — Expert Roundtable
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">12 Aug 2026</p>
              <Link
                to="/blog/podcast-salary-negotiation"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Salary Negotiation Secrets You Need to Know
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">05 Aug 2026</p>
              <Link
                to="/blog/podcast-remote-work"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Remote Work in 2026: What's Changed & What Hasn't
              </Link>
            </div>
            <hr className="border-slate-200 w-full" />

            <div className="py-4 group">
              <p className="text-[13px] text-[#9ca3af] mb-1.5 font-medium">28 Jul 2026</p>
              <Link
                to="/blog/podcast-career-change"
                className="block text-[15px] leading-[1.4] text-[#111827] font-medium group-hover:text-blue-600 transition-colors"
              >
                Making a Bold Career Change: Real Stories
              </Link>
            </div>

          </div>
        </div>

        {/* Right: Featured */}
        <div className="lg:col-span-6 flex flex-col" style={{ height: 520 }}>
          <Link
            to="/blog/podcast-job-search-mindset"
            className="flex flex-col bg-[#dff0e8] rounded-[20px] overflow-hidden h-full group hover:opacity-95 transition-opacity"
            style={{ height: 520 }}
          >
            <div className="px-10 pt-10 pb-4 flex flex-col items-start flex-shrink-0" style={{ flexBasis: '44%' }}>
              <div className="flex items-center text-[14px] text-[#6b7280] mb-5">
                <span className="font-medium text-[#9ca3af]">Hosted by</span>
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-300 mx-2 border border-white">
                  <img src="/assets/images/authors/author-avatar-charlotte-grainger.jpg" alt="Charlotte Grainger" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#374151] font-medium">Charlotte Grainger</span>
              </div>
              <h3 className="text-[28px] md:text-[34px] leading-[1.15] font-bold text-[#111827] mb-5 group-hover:text-blue-600 transition-colors">
                The Job Search Mindset: How to Stay Resilient
              </h3>
              <div className="flex items-center text-[14px] text-[#4d9e72]">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1.5">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                </svg>
                <span>42 min</span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <img
                alt="Job search mindset podcast"
                className="w-full h-full object-cover object-top"
                src="/assets/images/blog/podcasts/blog-podcast-job-search-mindset.jpg"
              />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PodcastsSection;
