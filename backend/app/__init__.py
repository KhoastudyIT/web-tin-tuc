from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine
from .models import Base

# Tạo database tables
Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    """Factory function để tạo FastAPI app"""
    
    app = FastAPI(
        title=settings.APP_TITLE,
        description=settings.APP_DESCRIPTION,
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc"
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Import và đăng ký routers
    from .views import news_router, user_router, auth_router
    
    app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
    app.include_router(user_router, prefix="/api/users", tags=["Users"])
    app.include_router(news_router, prefix="/api/news", tags=["News"])
    
    @app.get("/")
    async def root():
        return {
            "message": "News Website API - MVC Architecture",
            "version": settings.APP_VERSION,
            "docs": "/docs"
        }
    
    return app
