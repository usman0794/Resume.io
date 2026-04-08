import React, { useEffect, useState } from 'react';
import '@/styles/client/blog.css';
import type { Blog } from '@/types/blog.types';

import BlogHeader from './components/BlogHeader';
import BlogHeroCarousel from './components/HeroSection/HeroCarousel';
import BlogArticlesSection from './components/ArticlesSection';
import VideosSection from './components/VideosSection';
import PodcastsSection from './components/PodcastsSection';
import BlogNewsletterBanner from './components/Promotions/BlogNewsletterBanner';
import BrowseAllSection from './components/BrowseAllSection';
import type { Post } from './types/blog.types';

function calcReadTime(blog: Blog): string {
  const words = (blog.body || blog.content || '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

// Colors pixel-sampled from each carousel image edge — ensures seamless blending
const HERO_BG_COLORS = ['#edd7df', '#f1ece6', '#faf9da', '#feebe4'];

function toHeroPost(blog: Blog, idx: number): Post {
  return {
    id: blog.slug,
    type: 'article',
    title: blog.title,
    author: blog.user ? { name: blog.user.name, avatarUrl: '' } : undefined,
    imageUrl: blog.image_path ? `/assets/images/${blog.image_path}` : undefined,
    bgColor: HERO_BG_COLORS[idx % HERO_BG_COLORS.length],
    readTime: calcReadTime(blog),
  };
}

const BLOGS_PER_PAGE = 14;

const MOCK_BLOGS: Blog[] = [
  // Hero carousel posts (4)
  { id: 1, title: 'How to Write a Resume: Expert Guide & Examples', slug: 'how-to-write-a-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(67), image_path: 'blog/carousel/blog-carousel-how-to-write-resume.png', user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, title: 'Functional resume format: Examples, tips, & free templates', slug: 'functional-resume-format', content: 'Lorem ipsum dolor sit amet...'.repeat(23), image_path: 'blog/carousel/blog-carousel-functional-resume-format.jpg', user: { name: 'Anna Muckerman' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, title: 'Why do you want to work here? Bad & good answers to this tough interview question', slug: 'why-do-you-want-to-work-here', content: 'Lorem ipsum dolor sit amet...'.repeat(24), image_path: 'blog/carousel/blog-carousel-why-work-here.jpg', user: { name: 'Karl Kahler' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, title: 'How to Write an Effective Cover Letter in 2026', slug: 'how-to-write-cover-letter', content: 'Lorem ipsum dolor sit amet...'.repeat(28), image_path: 'blog/carousel/blog-carousel-cover-letter-2026.jpg', user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  // Articles section posts (4 — picked up by ArticlesSection)
  { id: 5, title: 'How to build a bulletproof ATS-friendly resume', slug: 'ats-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(20), image_path: 'blog/articles/blog-article-ats-resume-bottom-featured.jpg', tags: ['Resume Help'], user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, title: 'Best Resume Formats for 2026 (Examples & Guide)', slug: 'best-resume-formats', content: 'Lorem ipsum dolor sit amet...'.repeat(18), image_path: 'blog/articles/blog-article-best-resume-formats-featured.jpg', tags: ['Resume Help'], user: { name: 'Anna Muckerman' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, title: 'Crucial resume skills employers look for in 2026', slug: 'resume-skills', content: 'Lorem ipsum dolor sit amet...'.repeat(15), image_path: 'blog/articles/blog-article-resume-skills-popular.png', tags: ['Resume Help'], user: { name: 'Karl Kahler' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, title: 'How to write a resume with no experience', slug: 'resume-no-experience', content: 'Lorem ipsum dolor sit amet...'.repeat(16), image_path: 'blog/articles/blog-article-no-experience-resume-popular.png', tags: ['Resume Help'], user: { name: 'Eva Blackstone' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  // Browse All posts — real resume.io articles with downloaded images
  { id: 9, title: 'Hustle Culture on Social Media Is Damaging Workers, Survey Finds', slug: 'hustle-culture-social-media', content: 'Lorem ipsum dolor sit amet...'.repeat(12), image_path: 'blog/browse/browse-44869-a-person-at-work-in-an-office-on-their-phone-looki--1-.png', tags: ['Career'], user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 10, title: 'How to List Online Courses on Your Resume', slug: 'online-courses-on-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(24), image_path: 'blog/browse/browse-44836-online-courses-on-resume-main-pic.png', tags: ['Resume Help'], user: { name: 'Anna Muckerman' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 11, title: 'How to Put CPR Certification on Your Resume', slug: 'cpr-certification-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(26), image_path: 'blog/browse/browse-44803-cpr-certificate-resume-main-pic.png', tags: ['Resume Help'], user: { name: 'Karl Kahler' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 12, title: 'How to Get a Promotion: Proven Strategies That Work', slug: 'how-to-get-a-promotion', content: 'Lorem ipsum dolor sit amet...'.repeat(32), image_path: 'blog/browse/browse-44770-how-to-get-a-promotion-main-pic.png', tags: ['Career'], user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 13, title: 'Best Social Media Jobs and How to Get Them', slug: 'social-media-jobs', content: 'Lorem ipsum dolor sit amet...'.repeat(38), image_path: 'blog/browse/browse-44737-social-media-jobs-main-pic.png', tags: ['Career'], user: { name: 'Eva Blackstone' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 14, title: 'How to Write a Driver Resume', slug: 'driver-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(14), image_path: 'blog/browse/browse-44704-remove-the-graphics-next-to-his-head---the-graphic.png', tags: ['Career'], user: { name: 'Karl Kahler' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 15, title: 'How Many Jobs Should You List on a Resume?', slug: 'how-many-jobs-on-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(20), image_path: 'blog/browse/browse-44671-How-many-jobs-to-list-on-a-resume-main-pic.png', tags: ['Resume Help'], user: { name: 'Anna Muckerman' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 16, title: 'Overcoming Interview Nerves: Expert Tips', slug: 'interview-nerves', content: 'Lorem ipsum dolor sit amet...'.repeat(22), image_path: 'blog/browse/browse-44605-interview-nerves-main-pic.png', tags: ['Job Interview'], user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 17, title: 'XYZ Resume Format: What It Is and How to Use It', slug: 'xyz-resume', content: 'Lorem ipsum dolor sit amet...'.repeat(30), image_path: 'blog/browse/browse-44572-xyz-resume.png', tags: ['Resume Help'], user: { name: 'Karl Kahler' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 18, title: 'Should You Walk Out on a New Job? What to Consider', slug: 'walking-out-on-a-new-job', content: 'Lorem ipsum dolor sit amet...'.repeat(18), image_path: 'blog/browse/browse-44506-walking-out-on-a-new-job-main-pic.png', tags: ['Career'], user: { name: 'Eva Blackstone' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 19, title: 'AI Job Displacement: Is Your Career at Risk?', slug: 'ai-job-displacement', content: 'Lorem ipsum dolor sit amet...'.repeat(24), image_path: 'blog/browse/browse-44473-ai-job-displacement-main-pic.png', tags: ['Career'], user: { name: 'Anna Muckerman' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 20, title: 'Career Change Guide: How to Switch Careers Successfully', slug: 'career-change-guide', content: 'Lorem ipsum dolor sit amet...'.repeat(40), image_path: 'blog/browse/browse-44440-career-change-guide-main-pic.png', tags: ['Career'], user: { name: 'Charlotte Grainger' } as any, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const BlogListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [currentPage]);

  const blogs = MOCK_BLOGS;
  const pagination = { last_page: 16, current_page: 1, total: 192 };

  const isFirstPage = currentPage === 1;
  const totalPages = pagination?.last_page ?? 1;

  // Hero: up to 4 slides
  const heroSlides: Post[] = blogs.slice(0, 4).map((b, i) => toHeroPost(b, i));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <BlogHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        loading={loading}
      />

      {isFirstPage && (
        <>
          <BlogHeroCarousel posts={heroSlides} loading={loading} />
          <main className="w-full bg-white">
            <BlogArticlesSection />
            <VideosSection />
            <BlogNewsletterBanner />
            <PodcastsSection />
          </main>
        </>
      )}

      <main className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        <BrowseAllSection
          blogs={blogs}
          isFirstPage={isFirstPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </main>

      {/* Second promo banner at bottom */}
      <div className="w-full bg-white mb-12">
        <BlogNewsletterBanner />
      </div>
    </div>
  );
};

export default BlogListPage;
