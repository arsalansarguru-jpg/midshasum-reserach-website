export type IntelligenceCategory =
  | "Research Note"
  | "Institutional Perspective"
  | "Technical Article"
  | "Market Observation"
  | "Publication";

export type IntelligenceArticle = {
  slug: string;
  title: string;
  category: IntelligenceCategory;
  publishedAt: string;
  author: string;
  excerpt: string;
  featuredImage?: { src: string; alt: string };
  seo: { title: string; description: string };
  body: Array<{ heading?: string; paragraphs: string[] }>;
  relatedArticleSlugs: string[];
};

export const intelligenceArticles: IntelligenceArticle[] = [];
