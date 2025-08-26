export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  created_at: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  image_url?: string;
  author?: string;
  source?: string;
  category_id?: number;
  is_featured: boolean;
  is_published: boolean;
  views_count: number;
  likes_count?: number;
  created_at: string;
  updated_at?: string;
  category: NewsCategory;
}

export interface NewsItemList {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  image_url?: string;
  author?: string;
  category: NewsCategory;
  is_featured: boolean;
  is_published: boolean;
  views_count: number;
  created_at: string;
}

export interface NewsItemCreate {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  image_url?: string;
  author?: string;
  source?: string;
  category_id: number;
  is_featured: boolean;
  is_published: boolean;
}

export interface NewsItemUpdate {
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  image_url?: string;
  author?: string;
  source?: string;
  category_id?: number;
  is_featured?: boolean;
  is_published?: boolean;
}
