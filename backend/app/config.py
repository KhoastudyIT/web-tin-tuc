import os
from typing import List
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings:
    """Cấu hình ứng dụng - Sử dụng PyMySQL"""
    
    def __init__(self):
        # App settings
        self.APP_TITLE = os.getenv("APP_TITLE", "News Website API - MVC Architecture")
        self.APP_DESCRIPTION = os.getenv("APP_DESCRIPTION", "Modern news website backend with MVC pattern")
        self.APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
        
        # Database - MySQL với PyMySQL
        self.DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:@localhost:3306/news_website")
        
        # MySQL specific settings
        self.MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
        self.MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
        self.MYSQL_USER = os.getenv("MYSQL_USER", "root")
        self.MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
        self.MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "news_website")
        self.MYSQL_CHARSET = os.getenv("MYSQL_CHARSET", "utf8mb4")
        
        # Security
        self.SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key-change-in-production-2024")
        self.ALGORITHM = os.getenv("ALGORITHM", "HS256")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
        
        # CORS - Sử dụng default values
        self.ALLOWED_ORIGINS = [
            "http://localhost:3000",
            "http://localhost:5173", 
            "http://127.0.0.1:3000"
        ]
        
        # Pagination
        self.DEFAULT_PAGE_SIZE = int(os.getenv("DEFAULT_PAGE_SIZE", "20"))
        self.MAX_PAGE_SIZE = int(os.getenv("MAX_PAGE_SIZE", "100"))
        
        # Development
        self.DEBUG = os.getenv("DEBUG", "True").lower() == "true"
        self.LOG_LEVEL = os.getenv("LOG_LEVEL", "info")
        self.RELOAD = os.getenv("RELOAD", "True").lower() == "true"

# Tạo instance settings
settings = Settings()