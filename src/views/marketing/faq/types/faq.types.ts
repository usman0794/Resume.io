// faq.types.ts — Types for FAQ/Help Center

export interface FaqArticle {
  id: string;
  title: string;
  description: string;
  updatedAt?: string;
  categoryId: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  articleCount: number;
  articles: FaqArticle[];
}
