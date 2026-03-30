import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ROUTES } from '@/routes/routePaths';

interface QuickActionItemProps {
  to: string;
  label: string;
  sub: string;
  accent?: boolean;
  external?: boolean;
  icon: ReactNode;
}

// --- Icons Extracted for Cleaner Code ---
const Icons = {
  Plus: (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Briefcase: (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ExternalLink: (
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

const QuickActionItem = ({ to, label, sub, accent, external, icon }: QuickActionItemProps) => {
  // Cleaner class concatenation
  const className = `quick-action ${accent ? 'quick-action--primary' : 'quick-action--plain'}`;

  return (
    <Link
      to={to}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={className}
    >
      <div className="quick-action__icon">{icon}</div>
      <div className="quick-action__text">
        <p className="quick-action__label">{label}</p>
        <p className="quick-action__sub">{sub}</p>
      </div>
    </Link>
  );
};

const QuickActions = () => (
  <div
    className="card"
    style={{
      // Box shadow added here!
      boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06), 0 7px 70px rgba(90, 97, 105, .1)'
    }}
  >
    <div className="card__header">
      <h2 className="card__title">Quick Actions</h2>
    </div>

    <div className="quick-actions__body">
      <QuickActionItem
        to={ROUTES.ADMIN_BLOG_CREATE}
        label="New Blog Post"
        sub="Write and publish"
        accent
        icon={Icons.Plus}
      />
      <QuickActionItem
        to={ROUTES.ADMIN_JOB_CREATE}
        label="Post a Job"
        sub="Add a new listing"
        icon={Icons.Briefcase}
      />
      <QuickActionItem
        to="/blog"
        label="View live blog"
        sub="Open in new tab"
        external
        icon={Icons.ExternalLink}
      />
    </div>
  </div>
);

export default QuickActions;