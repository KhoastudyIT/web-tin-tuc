from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..services.news_service import NewsService
from ..schemas.news import NewsItemCreate, NewsItemUpdate, NewsItemResponse, NewsCategoryResponse
from ..utils.auth import get_current_user

# Tạo router
news_router = APIRouter()

# Tạo service instance
news_service = NewsService()

@news_router.get("/", response_model=List[NewsItemResponse])
async def get_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Lấy danh sách tin tức"""
    return news_service.get_news_items(db, skip=skip, limit=limit)

@news_router.get("/featured", response_model=List[NewsItemResponse])
async def get_featured_news(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Lấy tin tức nổi bật"""
    return news_service.get_featured_news(db, limit=limit)

@news_router.get("/categories", response_model=List[NewsCategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    """Lấy danh sách danh mục"""
    return news_service.get_categories(db)

@news_router.get("/category/{category_slug}", response_model=List[NewsItemResponse])
async def get_news_by_category(
    category_slug: str,
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Lấy tin tức theo danh mục"""
    return news_service.get_news_by_category(db, category_slug, limit)

@news_router.get("/{news_id}", response_model=NewsItemResponse)
async def get_news_by_id(news_id: int, db: Session = Depends(get_db)):
    """Lấy tin tức theo ID"""
    news = news_service.get_news_by_id(db, news_id)
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    # Tăng lượt xem
    news_service.increment_views(db, news_id)
    
    return news

@auth_router.post("/", response_model=NewsItemResponse, status_code=status.HTTP_201_CREATED)
async def create_news(
    news: NewsItemCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Tạo tin tức mới (yêu cầu đăng nhập)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return news_service.create_news(db, news)

@auth_router.put("/{news_id}", response_model=NewsItemResponse)
async def update_news(
    news_id: int,
    news_update: NewsItemUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Cập nhật tin tức (yêu cầu admin)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    updated_news = news_service.update_news(db, news_id, news_update)
    if not updated_news:
        raise HTTPException(status_code=404, detail="News not found")
    
    return updated_news
