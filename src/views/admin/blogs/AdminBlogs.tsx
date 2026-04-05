import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchBlogs, deleteBlog } from '@/store/actions/blogActions';
import { ROUTES } from '@/routes/routePaths';
import { Button, Modal, Alert, Spinner, EmptyState } from '@/components/ui';
import BlogFilters from './components/BlogFilters';
import BlogTable from './components/BlogTable';

const AdminBlogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector(s => s.blogReducer);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { dispatch(fetchBlogs(1, 50)); }, [dispatch]);

  const handleDelete = async (blogId: number) => {
    setDeleteLoading(true);
    await dispatch(deleteBlog(blogId));
    setDeleteConfirm(null);
    setDeleteLoading(false);
  };

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Blog Posts</h1>
          <p className="page-header__sub">{blogs.length} post{blogs.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button variant="primary" to={ROUTES.ADMIN_BLOG_CREATE}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner text="Loading posts…" />
      ) : blogs.length > 0 ? (
        <div className="card">
          <BlogFilters searchTerm={searchTerm} onSearch={setSearchTerm}
            resultCount={filtered.length} totalCount={blogs.length} />
          <BlogTable blogs={filtered} searchTerm={searchTerm}
            onDelete={id => setDeleteConfirm(id)} />
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={<svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            title="No posts yet"
            sub="Write your first blog post and it will appear here."
            ctaLabel="+ Create your first post"
            ctaTo={ROUTES.ADMIN_BLOG_CREATE}
          />
        </div>
      )}

      {deleteConfirm !== null && (
        <Modal
          title="Delete post?"
          body="This action cannot be undone. The post will be permanently removed."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminBlogs;
