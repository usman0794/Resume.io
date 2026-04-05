import { Link } from 'react-router-dom';
import type { Blog } from '@/types/blog.types';
import { ROUTES } from '@/routes/routePaths';
import { IconButton, EmptyState } from '@/components/ui';

interface RecentActivityProps {
  blogs: Blog[];
}

const DocIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const RecentActivity = ({ blogs }: RecentActivityProps) => {
  const recent = blogs.slice(0, 5);

  const cardStyle = {
    boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06), 0 7px 70px rgba(90, 97, 105, .1)',
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card__header">
        <h2 className="card__title">Recent Posts</h2>
        <Link to={ROUTES.ADMIN_BLOGS} className="view-all-link">View all →</Link>
      </div>

      {recent.length > 0 ? (
        <div>
          {recent.map(blog => {
            const editPath = ROUTES.ADMIN_BLOG_EDIT.replace(':id', String(blog.id));
            const rawSrc = blog.image || blog.image_path || '';
            const thumbSrc = rawSrc
              ? (/^(blob:|https?:)/.test(rawSrc) ? rawSrc : `/assets/images/${rawSrc.replace(/^\/+/, '')}`)
              : '';
            return (
              <div key={blog.id} className="activity-row">
                <div className="activity-row__thumb">
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={blog.title}
                      className="activity-row__img"
                    />
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="var(--clr-primary)" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="activity-row__info">
                  <Link to={editPath} className="activity-row__title">
                    {blog.title}
                  </Link>
                  <p className="activity-row__meta">
                    {new Date(blog.created_at ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {blog.user ? ` · ${blog.user.name}` : ''}
                  </p>
                </div>
                <IconButton to={editPath} title="Edit post">
                  <EditIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<DocIcon />}
          title="No posts yet"
          sub="Create your first blog post to get started."
          ctaLabel="+ Create Post"
          ctaTo={ROUTES.ADMIN_BLOG_CREATE}
        />
      )}
    </div>
  );
};

export default RecentActivity;