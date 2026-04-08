import type { Post } from '../types/blog.types';

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const mockHeroPost: Post = {
  id: 'hero-1',
  type: 'article',
  title: 'How to Write a Resume: Expert Guide & Examples',
  author: { name: 'Charlotte Grainger', avatarUrl: '/assets/images/authors/author-avatar-charlotte-grainger.jpg' },
  readTime: '57 min',
  bgColor: '#edd7df',
  imageUrl: '/assets/images/blog/carousel/blog-carousel-how-to-write-resume.png',
};

export const mockHeroPostSecondary: Post = {
  id: 'hero-2',
  type: 'article',
  title: 'Top Resume Formats for 2026 With Free Examples & Templates',
  author: { name: 'Paul Drury', avatarUrl: '/assets/images/authors/author-avatar-paul-drury.jpg' },
  readTime: '31 min',
  bgColor: '#feebe4',
  imageUrl: '/assets/images/blog/carousel/blog-carousel-cover-letter-2026.jpg',
};


// ─── ARTICLES ─────────────────────────────────────────────────────────────────
export const mockArticlesFeatured: Post = {
  id: 'art-feat-1',
  type: 'article',
  title: 'Top Resume Formats for 2026 With Free Examples',
  author: { name: 'Paul Drury', avatarUrl: '/assets/images/authors/author-avatar-paul-drury.jpg' },
  readTime: '31 min',
  bgColor: '#f2ebe6',
  imageUrl: '/assets/images/blog/articles/blog-article-best-resume-formats-featured.jpg',
};

export const mockArticlesPopular: Post[] = [
  {
    id: 'art-pop-1',
    type: 'article',
    title: '275+ Crucial Resume Skills: Top Hard & Soft Skills for Various Careers',
    category: 'Resume Help',
    bgColor: '#ccfbf1',
    imageUrl: '/assets/images/blog/articles/blog-article-resume-skills-popular.png',
  },
  {
    id: 'art-pop-2',
    type: 'article',
    title: 'How to write a resume with no experience + (free) examples',
    category: 'Resume Help',
    bgColor: '#1e3a5f',
    imageUrl: '/assets/images/blog/articles/blog-article-no-experience-resume-popular.png',
  },
];

export const mockArticlesLatest: Post[] = [
  { id: 'art-lat-1', type: 'article', title: 'How Long Should a Cover Letter Be In 2026?', date: '18 May 2026' },
  { id: 'art-lat-2', type: 'article', title: 'Junior Employee Satisfaction Report 2026: Best and Worst U.S. Companies Revealed', date: '27 Apr 2026' },
  { id: 'art-lat-3', type: 'article', title: 'Should You Use First Person in a Resume?', date: '10 Apr 2026' },
  { id: 'art-lat-4', type: 'article', title: 'Free IT Certifications for Beginners 2026', date: '07 Apr 2026' },
];

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────
export const mockPromoBannerPost: Post = {
  id: 'promo-1',
  type: 'article',
  title: 'ATS-Friendly resume builder compliant formatting & examples (2026)',
  readTime: '39 min',
  bgColor: '#fddec3',
  imageUrl: '/assets/images/blog/articles/blog-article-ats-resume-bottom-featured.jpg',
};

// ─── VIDEOS ───────────────────────────────────────────────────────────────────
export const mockVideoFeatured: Post = {
  id: 'vid-feat-1',
  type: 'video',
  title: 'Create a cover letter that gets you hired as a fresh graduate',
  author: { name: 'Eva Blackstone', avatarUrl: '/assets/images/authors/author-avatar-eva-blackstone.jpg' },
  readTime: '8 min',
  bgColor: '#e8e0f5',
  imageUrl: '/assets/images/blog/videos/blog-video-graduate-cover-letter-purple.jpg',
};

export const mockVideosPopular: Post[] = [
  {
    id: 'vid-pop-1',
    type: 'video',
    title: 'Job search guide and strategies & platforms',
    category: 'Career',
    bgColor: '#fef9c3',
    imageUrl: '/assets/images/blog/videos/blog-video-job-search-guide.jpg',
  },
  {
    id: 'vid-pop-2',
    type: 'video',
    title: 'University Applications: How to write your cover letter',
    category: 'Cover Letter',
    bgColor: '#dbeafe',
    imageUrl: '/assets/images/blog/videos/blog-video-graduate-cover-letter-green.jpg',
  },
];

export const mockVideosLatest: Post[] = [
  { id: 'vid-lat-1', type: 'video', title: 'Best way to ask for that promotion: Interview Masterclass', date: '12 May 2026' },
  { id: 'vid-lat-2', type: 'video', title: 'How to answer situational interview questions (plus sample responses)', date: '05 May 2026' },
  { id: 'vid-lat-3', type: 'video', title: 'How to write a top engineering resume (+ examples)', date: '28 Apr 2026' },
  { id: 'vid-lat-4', type: 'video', title: 'How to write a driver resume? 8 top tips (tutorial)', date: '15 Apr 2026' },
];

// ─── PODCASTS ─────────────────────────────────────────────────────────────────
export const mockPodcastFeatured: Post = {
  id: 'pod-feat-1',
  type: 'podcast',
  title: 'The Roadmap Episode 1 - How to write a resume employees want to read',
  author: { name: 'The Roadmap', avatarUrl: '/assets/images/authors/author-avatar-roadmap-podcast.jpg' },
  readTime: '45 min',
  bgColor: '#fdf4ff',
  imageUrl: '/assets/images/misc/podcast-illustration-roadmap.svg',
};

export const mockPodcastsPopular: Post[] = [
  {
    id: 'pod-pop-1',
    type: 'podcast',
    title: 'The Roadmap Episode 17 - Writing a resume with no experience',
    bgColor: '#fef3c7',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f45433d00192?w=300&q=80',
  },
  {
    id: 'pod-pop-2',
    type: 'podcast',
    title: 'The Roadmap Episode 12 - Writing a professional summary',
    bgColor: '#e0f2fe',
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&q=80',
  },
  {
    id: 'pod-pop-3',
    type: 'podcast',
    title: 'The Roadmap Episode 10 - Asking for a raise',
    bgColor: '#dcfce7',
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=80',
  },
];

export const mockPodcastsLatest: Post[] = [
  { id: 'pod-lat-1', type: 'podcast', title: 'The Roadmap Episode 3 - Writing a resignation letter', date: '02 May 2026' },
  { id: 'pod-lat-2', type: 'podcast', title: 'The Roadmap Episode 2 - How to prepare for any interview and ace the job done', date: '21 Apr 2026' },
  { id: 'pod-lat-3', type: 'podcast', title: 'The Roadmap Episode 19 - Making career goals guide', date: '10 Apr 2026' },
];

// ─── BROWSE ALL ───────────────────────────────────────────────────────────────


// ─── BLOG HERO POSTS (used by BlogHero.tsx) ───────────────────────────────────
export const BLOG_HERO_POSTS: Post[] = [
  {
    id: 'bh-1',
    type: 'article',
    title: 'How to Write a Resume: Expert Guide & Examples',
    author: { name: 'Charlotte Grainger', avatarUrl: '/assets/images/authors/author-avatar-charlotte-grainger-s3.jpg' },
    readTime: '57 min',
    imageUrl: '/assets/images/blog/carousel/blog-carousel-how-to-write-resume.png',
    bgColor: '#edd7df', // sampled from image edge pixels
  },
  {
    id: 'bh-2',
    type: 'article',
    title: 'Functional resume format: Examples, tips, & free templates',
    author: { name: 'Anna Muckerman', avatarUrl: '/assets/images/authors/author-avatar-anna-muckerman-s3.jpg' },
    readTime: '23 min',
    imageUrl: '/assets/images/blog/carousel/blog-carousel-functional-resume-format.jpg',
    bgColor: '#f1ece6', // sampled from image edge pixels
  },
  {
    id: 'bh-3',
    type: 'article',
    title: 'Why do you want to work here? Bad & good answers to this tough interview question',
    author: { name: 'Karl Kahler', avatarUrl: '/assets/images/authors/author-avatar-karl-kahler-s3.jpg' },
    readTime: '24 min',
    imageUrl: '/assets/images/blog/carousel/blog-carousel-why-work-here.jpg',
    bgColor: '#faf9da', // sampled from image edge pixels
  },
  {
    id: 'bh-4',
    type: 'article',
    title: 'How to Write an Effective Cover Letter in 2026',
    author: { name: 'Charlotte Grainger', avatarUrl: '/assets/images/authors/author-avatar-charlotte-grainger-s3.jpg' },
    readTime: '27 min',
    imageUrl: '/assets/images/blog/carousel/blog-carousel-cover-letter-2026.jpg',
    bgColor: '#feebe4', // sampled from image edge pixels
  },
];
