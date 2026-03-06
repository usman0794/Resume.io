export type PostType = 'article' | 'video' | 'podcast';

export interface Author {
  name: string;
  avatarUrl: string;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  category?: string;
  author?: Author;
  readTime?: string;
  date?: string;
  imageUrl?: string;
  bgColor?: string;
  description?: string;
  featured?: boolean;
}
