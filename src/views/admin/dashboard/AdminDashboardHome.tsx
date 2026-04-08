import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchBlogs } from '@/store/actions/blogActions';
import { fetchAdminTemplates } from '@/store/actions/templateActions';
import { fetchJobs } from '@/store/actions/jobActions';
import { ROUTES } from '@/routes/routePaths';
import { Button } from '@/components/ui';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import type { ReactNode } from 'react';

/* ── Feature Card ────────────────────────────────────────── */
interface FeatureCardProps {
  to: string;
  viewTo: string;
  title: string;
  desc: string;
  bg: string;
  accent: string;
  ctaLabel: string;
  viewLabel: string;
  icon: ReactNode;
  btnVariant?: 'primary' | 'success' | 'danger';
}

const FeatureCard = ({
  to,
  viewTo,
  title,
  desc,
  bg,
  accent,
  ctaLabel,
  viewLabel,
  icon,
  btnVariant = 'primary'
}: FeatureCardProps) => {

  // Main card styles including the new box-shadow
  const cardStyle = {
    background: bg,
    boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06), 0 7px 70px rgba(90, 97, 105, .1)',
  };

  // Icon container styles
  const iconBoxStyle = {
    color: accent,
    boxShadow: `0 2px 8px ${accent}1f`,
  };

  // View button styles
  const viewBtnStyle = {
    flex: 1,
    justifyContent: 'center',
    color: accent,
    borderColor: `${accent}33`
  };

  return (
    <div className="feature-card" style={cardStyle}>
      <div className="feature-card__header">
        <div className="feature-card__icon-box" style={iconBoxStyle}>
          {icon}
        </div>
        <h3 className="feature-card__title">{title}</h3>
      </div>
      <p className="feature-card__desc">{desc}</p>
      <div className="feature-card__actions">
        <Button variant={btnVariant} to={to} size="sm" className="btn--flex">
          {ctaLabel}
        </Button>
        <Button variant="outline" to={viewTo} size="sm" style={viewBtnStyle}>
          {viewLabel}
        </Button>
      </div>
    </div>
  );
};

/* ── Page ────────────────────────────────────────────────── */
const AdminDashboardHome = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(s => s.blogReducer.blogs);
  const templates = useAppSelector(s => s.templateReducer.templates);
  const jobs = useAppSelector(s => s.jobReducer.jobs);
  const user = useAppSelector(s => s.userReducer.user);

  useEffect(() => {
    dispatch(fetchBlogs(1, 50));
    dispatch(fetchAdminTemplates());
    dispatch(fetchJobs());
  }, [dispatch]);

  const thisMonth = blogs.filter(b => {
    const d = new Date(b.created_at ?? ''), n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }).length;

  const withImages = blogs.filter(b => b.image_path).length;
  const published = blogs.filter(b => b.status === 'published').length || blogs.length;
  const firstName = (user as { name?: string } | null)?.name?.split(' ')[0] ?? 'Admin';

  return (
    <div className="admin-page">
      {/* Welcome */}
      <div className="dashboard-welcome">
        <span className="page-header__eyebrow">Dashboard</span>
        <h1 className="dashboard-welcome__title">
          Welcome back, {firstName} 👋
        </h1>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <StatsCard
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          label="Total Posts" value={blogs.length} bg="var(--clr-primary-bg)" iconColor="var(--clr-primary)" to={ROUTES.ADMIN_BLOGS}
        />
        <StatsCard
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          label="This Month" value={thisMonth} bg="var(--clr-success-bg)" iconColor="var(--clr-success)"
        />
        <StatsCard
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
          label="Templates" value={templates.length} bg="var(--clr-warning-bg)" iconColor="var(--clr-warning)" to={ROUTES.ADMIN_TEMPLATES}
        />
        <StatsCard
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          label="Jobs Posted" value={jobs.length} bg="var(--clr-purple-bg)" iconColor="var(--clr-purple)" to={ROUTES.ADMIN_JOBS}
        />
      </div>

      {/* Feature cards */}
      <div className="admin-feature-grid">
        <FeatureCard
          to={ROUTES.ADMIN_BLOG_CREATE} viewTo={ROUTES.ADMIN_BLOGS}
          title="Blog Manager" accent="var(--clr-primary)" bg="var(--clr-primary-bg)"
          ctaLabel="+ New Post" viewLabel="View All" btnVariant="primary"
          desc="Write, edit and publish blog posts. Keep your audience engaged with fresh content."
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <FeatureCard
          to={ROUTES.ADMIN_JOB_CREATE} viewTo={ROUTES.ADMIN_JOBS}
          title="Job Board" accent="var(--clr-success)" bg="var(--clr-success-bg)"
          ctaLabel="+ Add Job" viewLabel="View All" btnVariant="success"
          desc="Post and manage job listings. Help candidates find the right opportunities."
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <FeatureCard
          to={ROUTES.ADMIN_TEMPLATE_CREATE} viewTo={ROUTES.ADMIN_TEMPLATES}
          title="Templates" accent="var(--clr-warning)" bg="var(--clr-warning-bg)"
          ctaLabel="+ Add Template" viewLabel="View All" btnVariant="primary"
          desc="Manage resume templates. Add new designs or update existing ones."
          icon={<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
        />
      </div>

      {/* Bottom */}
      <div className="admin-bottom-grid">
        <RecentActivity blogs={blogs} />
        <div className="admin-bottom-grid__actions">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;