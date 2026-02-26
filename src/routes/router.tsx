import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/routes/routePaths';

// Layouts
import RootLayout from '@/layouts/RootLayout';
import LandingLayout from '@/layouts/marketing/LandingLayout';
import DashboardLayout from '@/layouts/marketing/DashboardLayout';
import AdminLayout from '@/layouts/admin/AdminLayout';

// Guards
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import RoleGuard from '@/components/shared/RoleGuard';

// ── Public / Landing pages ──────────────────────────────────
import HomePage from '@/views/marketing/home/HomePage';
import TemplatesPage from '@/views/marketing/resume-templates/TemplatesPage';
import BlogListPage from '@/views/marketing/blog/BlogListPage';
import BlogDetailPage from '@/views/marketing/blog/BlogDetailPage';
import ResumeExamplesPage from '@/views/marketing/resume/ResumeExamplesPage';
import CoverLetterExamplesPage from '@/views/marketing/cover-letter/CoverLetterExamplesPage';
import CareersPage from '@/views/marketing/careers/CareersPage';
import AboutPage from '@/views/marketing/about/AboutPage';
import ContactPage from '@/views/marketing/contact/ContactPage';
import FaqPage from '@/views/marketing/faq/FaqPage';
import PrivacyPolicyPage from '@/views/marketing/privacy-and-terms/PrivacyPolicyPage';
import TermsPage from '@/views/marketing/privacy-and-terms/TermsAndConditionsPage';
import WithdrawalPage from '@/views/marketing/privacy-and-terms/WithdrawalPage';
import DoNotSellPage from '@/views/marketing/privacy-and-terms/DoNotSellPage';
import YourPrivacyChoicesPage from '@/views/marketing/privacy-and-terms/YourPrivacyChoicesPage';
import ResumeBuilderPage from '@/views/marketing/resume-builder/ResumeBuilderPage';

// ── Auth pages ───────────────────────────────────────────────
import LoginPage from '@/views/app/auth/LoginPage';
import SignupPage from '@/views/app/auth/SignupPage';

// ── Protected client pages ───────────────────────────────────
import DashboardPage from '@/views/app/dashboard/ResumeIODashboardPage';
import ResumesPage from '@/views/app/resumes';
import JobSearchPage from '@/views/app/job-search';
import JobTrackingPage from '@/views/app/job-tracking';
import AutoApplyPage from '@/views/app/auto-apply';
import ResumeDistributionPage from '@/views/app/resume-distribution';
import { CustomCareerPlanPage, First90DaysPage, PathToPromotionPage, CareerPlansPage } from '@/views/app/career-plans';

import CareerPathPage from '@/views/app/career-path';
import ExploreCareersPage from '@/views/app/explore-careers';
import AccountSettingsPage from '@/views/app/account/AccountSettingsPage';



// ── Admin pages ──────────────────────────────────────────────
import AdminDashboardHome from '@/views/admin/dashboard/AdminDashboardHome';
import AdminTemplates from '@/views/admin/templates/AdminTemplates';
import AdminTemplateForm from '@/views/admin/template-form/AdminTemplateForm';
import AdminJobs from '@/views/admin/jobs/AdminJobs';
import AdminJobForm from '@/views/admin/job-form/AdminJobForm';
import AdminBlogs from '@/views/admin/blogs/AdminBlogs';
import AdminBlogForm from '@/views/admin/blog-form/AdminBlogForm';

/* ── Auth guard that renders <Outlet /> for nested routes ── */
/* ── Admin guard: auth + role check ── */
const RequireAdmin: React.FC = () => (
  <ProtectedRoute redirectTo={ROUTES.SIGN_IN}>
    <RoleGuard role="admin">
      <Outlet />
    </RoleGuard>
  </ProtectedRoute>
);

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>

        {/* ════════════════════════════════════════
            PUBLIC — Landing layout (navbar + footer)
            ════════════════════════════════════════ */}
        <Route element={<LandingLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.TEMPLATES} element={<TemplatesPage />} />
          <Route path={ROUTES.BLOG} element={<BlogListPage />} />
          <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetailPage />} />
          <Route path={ROUTES.RESUME_EXAMPLES} element={<ResumeExamplesPage />} />
          <Route path={ROUTES.COVER_LETTER_EXAMPLES} element={<CoverLetterExamplesPage />} />
          <Route path={ROUTES.CAREERS} element={<CareersPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />
          <Route path={ROUTES.RIGHT_OF_WITHDRAWAL} element={<WithdrawalPage />} />
          <Route path={ROUTES.DO_NOT_SELL} element={<DoNotSellPage />} />
          <Route path={ROUTES.YOUR_PRIVACY_CHOICES} element={<YourPrivacyChoicesPage />} />

        </Route>

        {/* ════════════════════════════════════════
            STANDALONE PUBLIC PAGES
            ════════════════════════════════════════ */}
        <Route path={ROUTES.FAQ} element={<FaqPage />} />

        {/* ════════════════════════════════════════
            AUTH FLOW — full page, no navbar/footer
            ════════════════════════════════════════ */}
        <Route path={ROUTES.SIGN_IN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER_RESUME} element={<SignupPage />} />
        <Route path={ROUTES.RESUME_BUILDER} element={<ResumeBuilderPage />} />

        {/* ════════════════════════════════════════
            PROTECTED — User dashboard
            ════════════════════════════════════════ */}
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.APP_DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.APP_RESUMES} element={<ResumesPage />} />
          <Route path={ROUTES.APP_JOB_SEARCH} element={<JobSearchPage />} />
          <Route path={ROUTES.APP_JOB_TRACKING} element={<JobTrackingPage />} />
          <Route path={ROUTES.APP_AUTO_APPLY} element={<AutoApplyPage />} />

          <Route path={ROUTES.APP_RESUME_DISTRIBUTION} element={<ResumeDistributionPage />} />
          <Route path={ROUTES.APP_CAREER_PLANS} element={<CareerPlansPage />} />
          <Route path={ROUTES.CUSTOM_CAREER_PLAN} element={<CustomCareerPlanPage />} />
          <Route path={ROUTES.CAREER_PATH} element={<CareerPathPage />} />
          <Route path={ROUTES.EXPLORE_CAREERS} element={<ExploreCareersPage />} />
          <Route path={ROUTES.FIRST_90_DAYS_PLAN} element={<First90DaysPage />} />
          <Route path={ROUTES.PATH_TO_PROMOTION_PLAN} element={<PathToPromotionPage />} />
          <Route path={ROUTES.APP_ACCOUNT} element={<AccountSettingsPage />} />
        </Route>


        {/* ════════════════════════════════════════
            PROTECTED — Admin panel
            ════════════════════════════════════════ */}
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardHome />} />
            <Route path={ROUTES.ADMIN_TEMPLATES} element={<AdminTemplates />} />
            <Route path={ROUTES.ADMIN_TEMPLATES_NEW} element={<AdminTemplateForm />} />
            <Route path={ROUTES.ADMIN_TEMPLATES_EDIT} element={<AdminTemplateForm />} />
            <Route path={ROUTES.ADMIN_JOBS} element={<AdminJobs />} />
            <Route path={ROUTES.ADMIN_JOBS_NEW} element={<AdminJobForm />} />
            <Route path={ROUTES.ADMIN_JOBS_EDIT} element={<AdminJobForm />} />
            <Route path={ROUTES.ADMIN_BLOGS} element={<AdminBlogs />} />
            <Route path={ROUTES.ADMIN_BLOGS_NEW} element={<AdminBlogForm />} />
            <Route path={ROUTES.ADMIN_BLOGS_EDIT} element={<AdminBlogForm />} />
          </Route>
        </Route>


        {/* 404 */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
