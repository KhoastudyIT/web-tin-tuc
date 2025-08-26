from sqlalchemy import Column, String, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class NewsCategory(Base):
    """NewsCategory model - M trong MVC"""
    __tablename__ = "news_categories"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Các trường cơ bản
    name = Column(String(100), unique=True, index=True, nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    
    # Giao diện
    color = Column(String(7), default="#007bff")  # Hex color
    icon = Column(String(50), nullable=True)
    
    # Relationship
    news_items = relationship("NewsItem", back_populates="category")
    
    def __repr__(self):
        return f"<NewsCategory(id={self.id}, name='{self.name}', slug='{self.slug}')>"

class NewsItem(Base):
    """NewsItem model - M trong MVC"""
    __tablename__ = "news_items"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Các trường cơ bản
    title = Column(String(200), nullable=False, index=True)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    
    # Media và metadata
    image_url = Column(String(500), nullable=True)
    author = Column(String(100), nullable=True)
    source = Column(String(100), nullable=True)
    
    # Phân loại và trạng thái
    category_id = Column(Integer, ForeignKey("news_categories.id"), nullable=False)
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    
    # Thống kê
    views_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    
    # Relationship
    category = relationship("NewsCategory", back_populates="news_items")
    
    def __repr__(self):
        return f"<NewsItem(id={self.id}, title='{self.title}', slug='{self.slug}')>"
