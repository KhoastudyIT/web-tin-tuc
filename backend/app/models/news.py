from sqlalchemy import Column, String, Text, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class NewsCategory(Base):
    """NewsCategory model - M trong MVC"""
    __tablename__ = "news_categories"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Các trường cơ bản
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    color = Column(String(7), default="#007bff")  # Hex color
    icon = Column(String(50), default="📰")
    description = Column(Text, nullable=True)
    
    # Trạng thái
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
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
    title = Column(String(500), nullable=False)
    slug = Column(String(500), unique=True, nullable=False)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=True)  # Made optional to match SQL schema
    
    # Media và metadata
    image_url = Column(String(500), nullable=True)
    author = Column(String(100), nullable=True)
    source = Column(String(200), nullable=True)
    
    # Phân loại và trạng thái
    category_id = Column(Integer, ForeignKey("news_categories.id", ondelete="SET NULL"), nullable=True)  # Made optional to match SQL schema
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    
    # Thống kê
    views_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationship
    category = relationship("NewsCategory", back_populates="news_items")
    
    def __repr__(self):
        return f"<NewsItem(id={self.id}, title='{self.title}', slug='{self.slug}')>"
