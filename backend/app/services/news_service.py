from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional

from ..models.news import NewsItem, NewsCategory
from ..schemas.news import NewsItemCreate, NewsItemUpdate

class NewsService:
    """Service xử lý news - Business Logic"""
    
    def get_news_items(self, db: Session, skip: int = 0, limit: int = 20) -> List[NewsItem]:
        """Lấy danh sách news items"""
        return db.query(NewsItem).filter(NewsItem.is_published == True)\
            .order_by(desc(NewsItem.created_at)).offset(skip).limit(limit).all()
    
    def get_news_by_id(self, db: Session, news_id: int) -> Optional[NewsItem]:
        """Lấy news theo ID"""
        return db.query(NewsItem).filter(NewsItem.id == news_id).first()
    
    def get_news_by_slug(self, db: Session, slug: str) -> Optional[NewsItem]:
        """Lấy news theo slug"""
        return db.query(NewsItem).filter(NewsItem.slug == slug).first()
    
    def get_featured_news(self, db: Session, limit: int = 5) -> List[NewsItem]:
        """Lấy news nổi bật"""
        return db.query(NewsItem).filter(
            NewsItem.is_featured == True,
            NewsItem.is_published == True
        ).order_by(desc(NewsItem.created_at)).limit(limit).all()
    
    def get_news_by_category(self, db: Session, category_slug: str, limit: int = 20) -> List[NewsItem]:
        """Lấy news theo category"""
        return db.query(NewsItem).join(NewsCategory).filter(
            NewsCategory.slug == category_slug,
            NewsItem.is_published == True
        ).order_by(desc(NewsItem.created_at)).limit(limit).all()
    
    def create_news(self, db: Session, news: NewsItemCreate) -> NewsItem:
        """Tạo news mới"""
        db_news = NewsItem(**news.dict())
        db.add(db_news)
        db.commit()
        db.refresh(db_news)
        return db_news
    
    def update_news(self, db: Session, news_id: int, news_update: NewsItemUpdate) -> Optional[NewsItem]:
        """Cập nhật news"""
        db_news = self.get_news_by_id(db, news_id)
        if not db_news:
            return None
        
        update_data = news_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_news, field, value)
        
        db.commit()
        db.refresh(db_news)
        return db_news
    
    def increment_views(self, db: Session, news_id: int) -> bool:
        """Tăng lượt xem cho news"""
        db_news = self.get_news_by_id(db, news_id)
        if not db_news:
            return False
        
        db_news.views_count += 1
        db.commit()
        return True
    
    def get_categories(self, db: Session) -> List[NewsCategory]:
        """Lấy danh sách categories"""
        return db.query(NewsCategory).all()
    
    def search_news(self, db: Session, query: str, limit: int = 20) -> List[NewsItem]:
        """Tìm kiếm news theo từ khóa"""
        search_term = f"%{query}%"
        return db.query(NewsItem).filter(
            NewsItem.is_published == True,
            (NewsItem.summary.ilike(search_term) |
             NewsItem.content.ilike(search_term))
        ).order_by(desc(NewsItem.created_at)).limit(limit).all()
    
    def get_popular_news(self, db: Session, limit: int = 5) -> List[NewsItem]:
        """Lấy news phổ biến theo lượt xem"""
        return db.query(NewsItem).filter(
            NewsItem.is_published == True
        ).order_by(desc(NewsItem.views_count)).limit(limit).all()
