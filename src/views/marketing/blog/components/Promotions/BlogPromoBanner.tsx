import React from 'react';
import { mockPromoBannerPost } from '../../data/blog.data';

/**
 * Full-width promo card between Articles and Videos sections.
 * Exact visual replication of the ATS-Friendly resume builder banner.
 */
const BlogPromoBanner: React.FC = () => {
  const post = mockPromoBannerPost;

  // Using fallbacks mimicking the image in case mock data structure differs
  const title = post?.title || "ATS-Friendly resume builder: compliant formatting & examples (2026)";
  const readTime = post?.readTime || "39 min";
  const imageUrl = post?.imageUrl || "https://s3.resume.io/cdn-cgi/image/width=416,height=364,fit=cover,quality=100,format=auto/uploads/blog_post/featured_image/783/how-to-build-a-bulletproof-ats-friendly-resume.jpg";
  const bgColor = post?.bgColor || "#FDDEC3";

  return (
    <div
      className="w-full rounded-[24px] p-8 lg:p-[48px] flex flex-col md:flex-row gap-8 lg:gap-12 my-10 cursor-pointer group hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Text Column - Stretches to match image height */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
        <div className="max-w-[480px]">
          <h3 className="text-[28px] md:text-[32px] font-normal text-[#1a1c21] leading-[1.15] mb-3 tracking-tight">
            {title}
          </h3>

          {readTime && (
            <div className="flex items-center gap-1.5 text-[14px] text-[#737373]">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" width="20" fill="currentColor">
                <g clipRule="evenodd" fillRule="evenodd">
                  <path d="m10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zm0 1.5a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path>
                  <path d="m10 3.7c.41 0 .75.33.75.74v5.56a.75 0 0 1-1.5 0v-5.56c0-.41.34-.75.75-.75z"></path>
                  <path d="m13.96 12.64a.75 0 0 1-1.04.2l-3.34-2.22a.75 0 0 1 .84-1.24l3.33 2.22c.34.23.44.7.2 1.04z"></path>
                </g>
              </svg>
              <span>{readTime}</span>
            </div>
          )}
        </div>

        <div className="mt-12 md:mt-0">
          <button className="flex items-center gap-2 px-[22px] py-[9px] rounded-full border border-[#1a1c21] text-[#1a1c21] text-[15px] font-medium hover:bg-[#1a1c21] hover:text-white transition-colors duration-200">
            Read
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" className="text-current">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Image Column */}
      <div className="w-full md:w-[416px] flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={post?.title || "Blog Post"}
            className="w-full h-auto object-cover rounded-[12px] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default BlogPromoBanner;