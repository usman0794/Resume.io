import type { Blog, BlogPagination } from '@/types/blog.types';

export interface BlogListResult {
  blogs:      Blog[];
  pagination: BlogPagination | null;
}

let mockBlogs: Blog[] = [
  { id: 1, title: 'How to write a great resume', slug: 'how-to-write-resume', content: 'Lorem ipsum...',  image_path: 'blog/carousel/blog-carousel-how-to-write-resume.png', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, title: 'Ace your next interview', slug: 'ace-interview', content: 'Lorem ipsum...',  image_path: 'blog/articles/blog-article-ats-resume-bottom-featured.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, title: 'The ultimate cover letter guide', slug: 'cover-letter-guide', content: 'Lorem ipsum...',  image_path: 'blog/carousel/blog-carousel-cover-letter-2026.jpg', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const nextId = () => (mockBlogs.length ? Math.max(...mockBlogs.map(b => Number(b.id))) + 1 : 1);

const slugify = (title: string) =>
  title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`;

/** Pull the plain fields we care about out of the FormData the admin form builds. */
const parseFormData = (formData: FormData) => {
  const title = String(formData.get('title') ?? '');
  const body = String(formData.get('body') ?? '');
  const tags = formData.getAll('tags[]').map(String);
  const meta_title = formData.get('meta_title');
  const meta_description = formData.get('meta_description');
  const focus_keyword = formData.get('focus_keyword');
  const canonical_url = formData.get('canonical_url');
  const og_image_url = formData.get('og_image_url');
  const imageFile = formData.get('image');
  const image = imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;

  return {
    title, content: body, body, tags,
    meta_title: meta_title ? String(meta_title) : undefined,
    meta_description: meta_description ? String(meta_description) : undefined,
    focus_keyword: focus_keyword ? String(focus_keyword) : undefined,
    canonical_url: canonical_url ? String(canonical_url) : undefined,
    og_image_url: og_image_url ? String(og_image_url) : undefined,
    image,
  };
};

const blogService = {
  /** Public — paginated blog list */
  async getBlogs(page = 1, perPage = 10): Promise<BlogListResult> {
    await new Promise(r => setTimeout(r, 500));
    return {
      blogs: mockBlogs,
      pagination: { current_page: 1, last_page: 1, per_page: 10, total: mockBlogs.length }
    };
  },

  /** Public — single blog by slug */
  async getBlogBySlug(slug: string): Promise<Blog> {
    await new Promise(r => setTimeout(r, 500));
    return mockBlogs.find(b => b.slug === slug) ?? mockBlogs[0];
  },

  /** Admin — single blog by ID */
  async getBlogById(id: number | string): Promise<Blog> {
    await new Promise(r => setTimeout(r, 500));
    return mockBlogs.find(b => b.id === Number(id)) ?? mockBlogs[0];
  },

  /** Admin — create blog (stored in-memory; resets on page reload) */
  async createBlog(formData: FormData): Promise<{ message: string; data: Blog }> {
    await new Promise(r => setTimeout(r, 500));
    const parsed = parseFormData(formData);
    const newBlog: Blog = {
      id: nextId(),
      slug: slugify(parsed.title),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...parsed,
    };
    mockBlogs = [newBlog, ...mockBlogs];
    return { message: 'Post published successfully.', data: newBlog };
  },

  /** Admin — update blog */
  async updateBlog(id: number | string, formData: FormData): Promise<{ message: string; data: Blog }> {
    await new Promise(r => setTimeout(r, 500));
    const idx = mockBlogs.findIndex(b => b.id === Number(id));
    const parsed = parseFormData(formData);
    const base = idx !== -1 ? mockBlogs[idx] : { id: Number(id), slug: slugify(parsed.title) } as Blog;
    const updated: Blog = {
      ...base,
      ...parsed,
      image: parsed.image ?? base.image,
      id: base.id,
      slug: base.slug,
      updated_at: new Date().toISOString(),
    };
    if (idx !== -1) mockBlogs[idx] = updated;
    return { message: 'Post updated successfully.', data: updated };
  },

  /** Admin — delete blog */
  async deleteBlog(id: number | string): Promise<{ message: string }> {
    await new Promise(r => setTimeout(r, 500));
    mockBlogs = mockBlogs.filter(b => String(b.id) !== String(id));
    return { message: 'Post deleted successfully.' };
  },
};

export default blogService;
