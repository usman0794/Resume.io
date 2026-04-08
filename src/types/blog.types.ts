export interface Blog {
  id: number;
  title: string;
  slug: string;

  /** Backend fields vary across endpoints/templates; keep both names optional. */
  content?: string;
  body?: string;

  excerpt?: string;
  focus_keyword?: string;

  image?: string;
  image_path?: string;

  tags?: string[];
  status?: 'draft' | 'published';

  created_at?: string;
  updated_at?: string;

  user?: {
    id?: number;
    name: string;
  };

  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image_url?: string;
}


export interface BlogPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BlogState {
  blogs: Blog[];
  selectedBlog: Blog | null;
  pagination: BlogPagination | null;
  loading: boolean;
  error: string | null;
}

// Extended SEO fields from backend
export interface BlogSEO {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image_url?: string;
  focus_keyword?: string;
}
