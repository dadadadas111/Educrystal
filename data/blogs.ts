export interface Blog {
  id: string;
  slug: string;
  title: string;
  body: string;
  coverImage?: string;
  sourceUrl?: string;
  sourceName?: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}