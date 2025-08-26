from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NewsCategoryBase(BaseModel):
    """Base news category schema"""
    name: str
    slug: str
    description: Optional[str] = None
    color: str = "#007bff"
    icon: Optional[str] = None

class NewsCategoryCreate(NewsCategoryBase):
    """Schema để tạo category mới"""
    pass

class NewsCategoryResponse(NewsCategoryBase):
    """Schema để trả về category"""
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class NewsItemBase(BaseModel):
    """Base news item schema"""
    title: str
    slug: str
    summary: Optional[str] = None
    content: str
    image_url: Optional[str] = None
    author: Optional[str] = None
    source: Optional[str] = None
    category_id: int
    is_featured: bool = False
    is_published: bool = True

class NewsItemCreate(NewsItemBase):
    """Schema để tạo news mới"""
    pass

class NewsItemUpdate(BaseModel):
    """Schema để cập nhật news"""
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = None
    source: Optional[str] = None
    category_id: Optional[int] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None

class NewsItemResponse(NewsItemBase):
    """Schema để trả về news"""
    id: int
    views_count: int
    likes_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: NewsCategoryResponse
    
    class Config:
        from_attributes = True
