import type { Blog } from '@/types/blog.types';
import { ROUTES } from '@/routes/routePaths';
import { Badge, IconButton } from '@/components/ui';

interface BlogTableRowProps {
  blog:     Blog;
  isLast:   boolean;
  onDelete: (id: number) => void;
}

const BlogTableRow: React.FC<BlogTableRowProps> = ({ blog, isLast, onDelete }) => {
  const rawSrc = blog.image || blog.image_path || '';
  const imageUrl = rawSrc
    ? (/^(blob:|https?:)/.test(rawSrc) ? rawSrc : `/assets/images/${rawSrc.replace(/^\/+/, '')}`)
    : null;
  const editPath = ROUTES.ADMIN_BLOG_EDIT.replace(':id', String(blog.id));
  const viewPath = `/blog/${blog.slug}`;

  return (
    <tr style={{ borderBottom: isLast ? 'none' : undefined }}>
      {/* Post */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, overflow: 'hidden', flexShrink: 0,
            background: 'var(--clr-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {imageUrl
              ? <img src={imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <svg width="16" height="16" fill="none" stroke="var(--clr-primary)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            }
          </div>
          <div style={{ minWidth: 0 }}>
            <p className="cell-title" style={{ maxWidth: 300 }}>{blog.title}</p>
            {blog.excerpt && (
              <p className="cell-sub" style={{ maxWidth: 300 }}>
                {blog.excerpt.substring(0, 70)}…
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Status */}
      <td style={{ whiteSpace: 'nowrap' }}>
        <Badge variant={blog.status === 'published' ? 'success' : 'warning'}>
          {blog.status ?? 'published'}
        </Badge>
      </td>

      {/* Date */}
      <td className="cell-date" style={{ whiteSpace: 'nowrap' }}>
        {blog.created_at
          ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '—'}
      </td>

      {/* Actions */}
      <td>
        <div className="cell-actions">
          <IconButton to={viewPath} external title="View post">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </IconButton>
          <IconButton to={editPath} title="Edit post">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </IconButton>
          <IconButton variant="danger" onClick={() => onDelete(blog.id)} title="Delete post">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableRow;
