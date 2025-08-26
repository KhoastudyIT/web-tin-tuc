import api from './api';
import { NewsItem, NewsItemList, NewsCategory, NewsItemCreate, NewsItemUpdate } from '../types/news';

export const newsService = {
  // Lấy danh sách tin tức
  getNews: async (category?: string, limit: number = 20, offset: number = 0): Promise<NewsItemList[]> => {
    const params = { limit, offset };
    if (category) params.category = category;
    
    const response = await api.get('/api/news', { params });
    return response.data;
  },

  // Lấy tin tức theo ID
  getNewsById: async (id: number): Promise<NewsItem> => {
    const response = await api.get(`/api/news/${id}`);
    return response.data;
  },

  // Lấy tin tức theo slug
  getNewsBySlug: async (slug: string): Promise<NewsItem> => {
    const response = await api.get(`/api/news/slug/${slug}`);
    return response.data;
  },

  // Lấy tin tức nổi bật
  getFeaturedNews: async (limit: number = 5): Promise<NewsItemList[]> => {
    const response = await api.get('/api/news/featured', { 
      params: { limit } 
    });
    return response.data;
  },

  // Lấy tin tức mới nhất
  getLatestNews: async (limit: number = 10): Promise<NewsItemList[]> => {
    const response = await api.get('/api/news', { 
      params: { limit } 
    });
    return response.data;
  },

  // Lấy tin tức phổ biến
  getPopularNews: async (limit: number = 10): Promise<NewsItemList[]> => {
    const response = await api.get('/api/news', { 
      params: { limit } 
    });
    return response.data;
  },

  // Tìm kiếm tin tức
  searchNews: async (query: string, limit: number = 20): Promise<NewsItemList[]> => {
    const response = await api.get('/api/news/search', { 
      params: { q: query, limit } 
    });
    return response.data;
  },

  // Lấy danh mục tin tức
  getCategories: async (): Promise<NewsCategory[]> => {
    const response = await api.get('/api/news/categories');
    return response.data;
  },

  // Lấy tin tức theo category
  getNewsByCategory: async (category: string, limit: number = 20): Promise<NewsItemList[]> => {
    const response = await api.get(`/api/news/category/${category}`, { 
      params: { limit } 
    });
    return response.data;
  },

  // Tạo tin tức mới (yêu cầu admin)
  createNews: async (news: NewsItemCreate): Promise<NewsItem> => {
    const response = await api.post('/api/news', news);
    return response.data;
  },

  // Cập nhật tin tức (yêu cầu admin)
  updateNews: async (id: number, news: NewsItemUpdate): Promise<NewsItem> => {
    const response = await api.put(`/api/news/${id}`, news);
    return response.data;
  },

  // Xóa tin tức (yêu cầu admin)
  deleteNews: async (id: number): Promise<boolean> => {
    await api.delete(`/api/news/${id}`);
    return true;
  },

  // Tăng lượt xem
  incrementViews: async (id: number): Promise<boolean> => {
    await api.post(`/api/news/${id}/views`);
    return true;
  },

  // Like/Unlike tin tức
  toggleLike: async (id: number): Promise<boolean> => {
    await api.post(`/api/news/${id}/like`);
    return true;
  }
};
