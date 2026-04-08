export const ROUTES = {
  // Public
  HOME: '/',
  TEMPLATES: '/resume-templates',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:slug',
  RESUME_EXAMPLES: '/resume-examples',
  COVER_LETTER_EXAMPLES: '/cover-letter-examples',
  CAREERS: '/careers',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  RIGHT_OF_WITHDRAWAL: '/right-of-withdrawal',
  DO_NOT_SELL: '/do-not-sell',
  YOUR_PRIVACY_CHOICES: '/your-privacy-choices',
  RESUME_BUILDER: '/builder',

  // Auth — social connect flow
  SIGN_IN: '/app/auth/sign-in',
  LOGIN: '/app/auth/sign-in',
  SIGNUP: '/app/register-resume',
  REGISTER_RESUME: '/app/register-resume',

  // Protected — client app
  DASHBOARD: '/app/dashboard',
  APP_DASHBOARD: '/app/dashboard',
  // Resume Tools
  APP_RESUMES: '/app/resumes',
  // Job Search
  APP_JOB_SEARCH: '/app/job-search',
  APP_JOB_TRACKING: '/app/job-tracking',
  APP_AUTO_APPLY: '/app/auto-apply',

  // Resume Distribution
  APP_RESUME_DISTRIBUTION: '/app/resume-distribution/edit',

  // Career Plans
  APP_CAREER_PLANS: '/app/career-plans',
  CUSTOM_CAREER_PLAN: '/career-plans/custom-plan',
  FIRST_90_DAYS_PLAN: '/career-plans/first-90-days',
  PATH_TO_PROMOTION_PLAN: '/career-plans/path-to-promotion',
  // Career Exploration
  CAREER_PATH: '/app/career-path',
  EXPLORE_CAREERS: '/app/explore-careers',

  APP_ACCOUNT: '/app/account',

  // Protected — admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_TEMPLATES: '/admin/templates',
  ADMIN_TEMPLATE_CREATE: '/admin/templates/new',
  ADMIN_TEMPLATES_NEW: '/admin/templates/new',
  ADMIN_TEMPLATE_EDIT: '/admin/templates/:id',
  ADMIN_TEMPLATES_EDIT: '/admin/templates/:id',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_JOB_CREATE: '/admin/jobs/new',
  ADMIN_JOBS_NEW: '/admin/jobs/new',
  ADMIN_JOB_EDIT: '/admin/jobs/:id',
  ADMIN_JOBS_EDIT: '/admin/jobs/:id',
  ADMIN_BLOGS: '/admin/blogs',
  ADMIN_BLOG_CREATE: '/admin/blogs/new',
  ADMIN_BLOGS_NEW: '/admin/blogs/new',
  ADMIN_BLOG_EDIT: '/admin/blogs/:id',
  ADMIN_BLOGS_EDIT: '/admin/blogs/:id',
} as const;
