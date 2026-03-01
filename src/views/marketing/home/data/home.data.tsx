import React from 'react';
import type { ReviewItem, TemplateItem, ToolItem } from '../types/home.types';
import type { FAQData } from '@/components/shared/FAQSection';

// ─── Hero Page ────────────────────────────────────────────────────────────────
export const HOME_HERO_WORDS = ['a remote job', 'pro', 'an interview', 'hired faster', 'promoted'];

// ─── Counter Page ────────────────────────────────────────────────────────────────
export const HOME_COUNTER_INITIAL = 59435;

// ─── JoinBanner Page ────────────────────────────────────────────────────────────────
export const HOME_FEATURE_CARDS_DATA = [
    { key: 'sparkle', title: 'A draft in 10 mins', description: 'The AI builder is 10 x faster than doing on your own.' },
    { key: 'aplus', title: 'Zero mistakes', description: "Don't stress over typos; you'll sound great!" },
    { key: 'target', title: 'ATS templates', description: 'Your resume will be 100% compliant. Recruiters will see you.' },
    { key: 'dollar', title: 'Get paid 7% more', description: 'We can help you negotiate a higher starting salary...' },
];

import resumeBuilderImg from '@/assets/tools/resume_builder-002448b3.png';
import recruiterMatchImg from '@/assets/tools/recruiter_match-51fa21d8.png';
import jobBoardImg from '@/assets/tools/job_board-f56bc21f.png';
import autoApplyImg from '@/assets/tools/auto_apply-bfa715bc.png';
import interviewPrepImg from '@/assets/tools/interview_prep-d63a9473.png';
import salaryAnalyzerImg from '@/assets/tools/salary_analyzer-0ef50516.png';
import careerCoachingImg from '@/assets/tools/career_coaching-58c3e73b.png';
import futureLearnImg from '@/assets/tools/future_learn-02162f77.png';

import resumeBuilderIconSvg from '@/assets/tools/resume_builder_icon.svg';
import recruiterMatchIconSvg from '@/assets/tools/recruiter_match_icon.svg';
import jobBoardIconSvg from '@/assets/tools/job_board_icon.svg';
import autoApplyIconSvg from '@/assets/tools/auto_apply_icon.svg';
import interviewPrepIconSvg from '@/assets/tools/interview_prep_icon.svg';
import salaryAnalyzerIconSvg from '@/assets/tools/salary_analyzer_icon.svg';
import careerCoachingIconSvg from '@/assets/tools/career_coaching_icon.svg';
import futureLearnIconSvg from '@/assets/tools/future_learn_icon.svg';

// ─── Tool Page ────────────────────────────────────────────────────────────────
export const HOME_TOOLS_DATA: Record<string, ToolItem[]> = {
    noticed: [
        { id: 'resume-builder', title: 'Resume Builder', description: 'Build the resume that gets you hired. Finish a draft in 20 mins with "Recruiter-AI".', iconUrl: resumeBuilderIconSvg, imageUrl: resumeBuilderImg, bgColor: 'bg-[#F0F7FD]' },
        { id: 'recruiter-match', title: 'Recruiter Match', description: "Recruiters come to us with roles they can't fill. We close-match your resume and send it to 50 recruiters a week.", iconUrl: recruiterMatchIconSvg, imageUrl: recruiterMatchImg, bgColor: 'bg-[#EEF6F0]' },
    ],
    hired: [
        { id: 'job-board', title: 'Job Board', description: "See every online job board in one place. If a role goes live, you won't miss it.", iconUrl: jobBoardIconSvg, imageUrl: jobBoardImg, bgColor: 'bg-[#F0F7FD]' },
        { id: 'auto-apply', title: 'Auto Apply', description: 'Our team of experts apply for you. All they need is your resume and your target salary.', iconUrl: autoApplyIconSvg, imageUrl: autoApplyImg, bgColor: 'bg-[#F4F4FF]' },
    ],
    paid: [
        { id: 'interview-prep', title: 'Interview Prep', description: "Practice the questions that get you hired. See instant feedback.", iconUrl: interviewPrepIconSvg, imageUrl: interviewPrepImg, bgColor: 'bg-[#EEF6F0]' },
        { id: 'salary-analyzer', title: 'Salary Analyzer', description: 'Get paid 7% more. Our salary analyzer shows you if your job offer is at market rate.', iconUrl: salaryAnalyzerIconSvg, imageUrl: salaryAnalyzerImg, bgColor: 'bg-[#F4F4FF]' },
    ],
    promoted: [
        { id: 'career-coaching', title: 'Career Coaching', description: 'Work 1-1 with an expert to expand your network, give better interviews and negotiate a higher salary.', iconUrl: careerCoachingIconSvg, imageUrl: careerCoachingImg, bgColor: 'bg-[#EEF6F0]' },
        { id: 'future-learn', title: 'Future Learn', description: 'Future proof yourself. Get accredited, certified courses respected by employers.', iconUrl: futureLearnIconSvg, imageUrl: futureLearnImg, bgColor: 'bg-[#F4F4FF]' },
    ],
};

// ─── Resume Templates Page ────────────────────────────────────────────────────────────────
export const HOME_TEMPLATES: TemplateItem[] = [
    { id: 'entry-level', name: 'Entry Level', users: '1,200,000+', img: 'https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/london-bd8262b0.jpg' },
    { id: 'classic', name: 'Classic', users: '3,100,000+', img: 'https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/vancouver-27c47f55.jpg' },
    { id: 'traditional', name: 'Traditional', users: '2,300,000+', img: 'https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg?v=1651663693' },
    { id: 'professional', name: 'Professional', users: '6,400,000+', img: 'https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/santiago-e9da5710.jpg' },
    { id: 'prime-ats', name: 'Prime ATS', users: '980,000+', img: 'https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/8581/persistent-resource/seoul-resume-templates.jpg?v=1775564175' },
];

// ─── Review Page ────────────────────────────────────────────────────────────────
export const HOME_REVIEWS: ReviewItem[] = [
    { id: 1, rating: 5, title: 'Great experience', comment: 'Great experience. Put a little information about your job detail and they generate a more professional way...', author: 'Anthony Morallo', time: 'about 5 hours ago' },
    { id: 2, rating: 4, title: 'I struggle a little...', comment: 'I struggle a little with the formatting when building a resume but am slowly learning.', author: 'Teri Henderson', time: 'about 12 hours ago' },
    { id: 3, rating: 5, title: 'Great experience', comment: 'Great experience. The whole process was fast, easy and professional. Highly recommended!', author: 'Luka Toman', time: '2 days ago' },
    { id: 4, rating: 5, title: 'THANK YOU SO MUCH', comment: "I really appreciate having people go over my experiences and giving me feedback...", author: 'Day Yang', time: '2 days ago' },
    { id: 5, rating: 5, title: 'Worth it!', comment: 'Super organized platform that is easy to follow and does all of the formatting work for you.', author: 'Alisanni Guzman', time: '7 days ago' },
];


// ─── BlogSection Data (moved here from inside BlogSection.tsx) ─────────────────
export const BLOG_FEATURED_VIDEO = {
    id: 'featured-1',
    title: 'Create a cover letter that gets you hired as a fresh graduate',
    author: { name: 'Anna Muckerman', avatar: 'https://s3.resume.io/cdn-cgi/image/width=28,height=28,fit=cover,quality=85,format=auto/uploads/authors/writer/avatar/166/39.png', link: '/blog/authors/anna-muckerman' },
    duration: '3 min',
    thumbnail: 'https://s3.resume.io/cdn-cgi/image/width=304,height=266,fit=contain,quality=100,format=auto/uploads/blog_post/featured_image/37213/week-11__1_.jpg',
    link: 'https://www.youtube.com/watch?v=KiggRi_7pnU',
    bgColor: '#CFE9D8',
};

export const BLOG_POPULAR_VIDEOS = [
    { id: 'pop-1', category: 'Job Interview', title: 'Job search guide: Best strategies & platforms', thumbnail: 'https://s3.resume.io/cdn-cgi/image/width=304,height=266,fit=contain,quality=100,format=auto/uploads/blog_post/featured_image/37214/Job_search_guide__1_.jpg', link: 'https://www.youtube.com/watch?v=8hQiLt1Sj6E', bgColor: '#C3E5FD' },
    { id: 'pop-2', category: 'Cover Letter', title: 'University Applications: How to write your cover letter', thumbnail: 'https://s3.resume.io/cdn-cgi/image/width=304,height=266,fit=contain,quality=100,format=auto/uploads/blog_post/featured_image/37215/week-12.jpg', link: 'https://www.youtube.com/watch?v=muHBta6-oe8', bgColor: '#DBDEFF' },
];

export const BLOG_LATEST_VIDEOS = [
    { id: 'lat-1', date: '04 Feb 2025', title: 'Best way to ask for that promotion | Interview Masterclass', link: 'https://www.youtube.com/watch?v=wJf7-SQcATQ' },
    { id: 'lat-2', date: '04 Feb 2025', title: 'How to answer phone interview questions (plus sample responses)', link: 'https://www.youtube.com/watch?v=I8XgKiOtHDQ' },
    { id: 'lat-3', date: '04 Feb 2025', title: 'Learn how to write a high school resume (with examples)!', link: 'https://www.youtube.com/watch?v=-qdMuD2Vn_M' },
    { id: 'lat-4', date: '04 Feb 2025', title: 'How to write a top engineering resume (+ example)', link: 'https://www.youtube.com/watch?v=7PrlaHvCwDg' },
    { id: 'lat-5', date: '04 Feb 2025', title: 'How to write a driver resume? 4 top tips (tutorial)', link: 'https://www.youtube.com/watch?v=my9H2W-k1tM' },
];


// ─── FAQs ─────────────────────────────────────────────────────────────────────
export const HOME_FAQS: FAQData[] = [
    { question: 'What is the definition of a resume?', answer: (<>A resume is a concise document that summarizes your work experience, education, skills, and accomplishments. <a href="https://resume.io/blog/2-pages-resume" target="_blank" rel="noopener noreferrer" className="text-[#1a91f0] hover:underline">Learn more.</a></>) },
    { question: 'What is the difference between a CV and a resume?', answer: (<>In the U.S., "CV" and "resume" are often used interchangeably, but a resume is shorter and targeted; a CV is a complete career record. <a href="https://resume.io/blog/resume-vs-cv-curriculum-vitae-the-complete-guide" target="_blank" rel="noopener noreferrer" className="text-[#1a91f0] hover:underline">Learn more.</a></>) },
    { question: 'How do I choose the right resume template?', answer: 'Consider the job and industry. Creative fields benefit from visual templates; traditional industries prefer clean, professional layouts.' },
    { question: 'How far back should a resume go?', answer: 'Typically 10–15 years. Focus on the most recent and relevant experience; older roles can be summarized or omitted.' },
    { question: 'What does an ATS-friendly resume mean?', answer: 'A resume designed to pass Applicant Tracking Systems: simple format, relevant keywords, no tables or images, saved as .docx or PDF.' },
    { question: 'What resume file format can I download in?', answer: 'You can download as PDF or .docx. The .docx can be uploaded to Google Drive and edited in Google Docs.' },
    { question: 'Is it worth paying for a resume builder?', answer: 'Yes. Paid features unlock professional templates, advanced customization, and AI-powered suggestions that increase hiring chances.' },
    { question: 'Should I make a different resume for every job application?', answer: "Yes — tailor key sections to match each job description. You don't need to start from scratch; just adjust relevant parts." },
    { question: 'What makes resume.io the best resume builder?', answer: "10+ years of refinement and 18+ career tools included with every resume: job search, interview prep, salary analysis, and more." },
];

// ─── JoinBanner ────────────────────────────────────────────────────────────────
import footerBlockImg from '@/assets/home/footer_block.png';

export const HOME_JOIN_COUNTER = 37850;
export const HOME_JOIN_BANNER_IMAGE = footerBlockImg;
