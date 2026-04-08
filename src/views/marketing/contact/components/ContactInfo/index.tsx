import React from 'react';

export default function ContactInfo() {
  return (
    <div className="mt-10 md:mt-12">
      <h2 className="text-[18px] font-semibold text-[#1E2532] mb-6">Our Office</h2>
      <div className="flex flex-col gap-5 text-[15px] text-[#616B7B]">
        <div className="flex items-start gap-4">
          <svg className="w-5 h-5 mt-0.5 text-[#1A91F0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>420 Lexington Avenue, Suite 1402<br />New York, NY 10170, USA</span>
        </div>
        <div className="flex items-center gap-4">
          <svg className="w-5 h-5 text-[#1A91F0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="mailto:support@resume.io.com" className="text-[#1A91F0] hover:underline transition-colors">
            support@resume.io.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <svg className="w-5 h-5 text-[#1A91F0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Mon – Fri, 9:00 AM – 6:00 PM EST</span>
        </div>
      </div>
    </div>
  );
}
