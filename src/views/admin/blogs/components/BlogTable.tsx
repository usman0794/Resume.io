import type { Blog } from '@/types/blog.types';
import BlogTableRow from './BlogTableRow';

interface BlogTableProps {
  blogs:      Blog[];
  searchTerm: string;
  onDelete:   (id: number) => void;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, searchTerm, onDelete }) => (
  <div className="admin-table-wrap">
    <table className="admin-table">
      <thead>
        <tr>
          <th>Post</th>
          <th>Status</th>
          <th>Published</th>
          <th style={{ textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, i) => (
          <BlogTableRow key={blog.id} blog={blog} isLast={i === blogs.length - 1} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
    {blogs.length === 0 && (
      <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '0.875rem', color: 'var(--clr-text-faint)' }}>
        No posts match &ldquo;{searchTerm}&rdquo;
      </div>
    )}
  </div>
);

export default BlogTable;
