#!/usr/bin/env python3
"""
Script test kết nối database MySQL
Chạy: python backend/test_database.py
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, SessionLocal
from app.models import Base, User, NewsCategory, NewsItem
from sqlalchemy import text

def test_database_connection():
    """Test kết nối database"""
    
    print("🔍 Đang test kết nối database...")
    
    try:
        # Test kết nối cơ bản
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Kết nối database thành công!")
            
            # Test version MySQL
            result = connection.execute(text("SELECT VERSION()"))
            version = result.fetchone()[0]
            print(f"📊 MySQL Version: {version}")
            
    except Exception as e:
        print(f"❌ Lỗi kết nối database: {e}")
        return False
    
    return True

def test_models():
    """Test các models"""
    
    print("\n🔍 Đang test models...")
    
    try:
        # Test tạo tables
        Base.metadata.create_all(bind=engine)
        print("✅ Đã tạo database tables")
        
        # Test session
        db = SessionLocal()
        print("✅ Database session hoạt động")
        
        # Test query
        user_count = db.query(User).count()
        category_count = db.query(NewsCategory).count()
        news_count = db.query(NewsItem).count()
        
        print(f"📊 Số lượng records hiện tại:")
        print(f"   👤 Users: {user_count}")
        print(f"   🏷️  Categories: {category_count}")
        print(f"   📰 News: {news_count}")
        
        db.close()
        print("✅ Database session đóng thành công")
        
    except Exception as e:
        print(f"❌ Lỗi test models: {e}")
        return False
    
    return True

def main():
    """Main function"""
    
    print("🚀 TEST DATABASE CONNECTION")
    print("=" * 50)
    
    # Test kết nối
    if not test_database_connection():
        print("\n❌ Không thể kết nối database!")
        print("💡 Hãy kiểm tra:")
        print("   - MySQL có đang chạy không?")
        print("   - Database 'news_website' đã được tạo chưa?")
        print("   - Cấu hình DATABASE_URL có đúng không?")
        return
    
    # Test models
    if not test_models():
        print("\n❌ Lỗi test models!")
        return
    
    print("\n🎉 HOÀN THÀNH! Database hoạt động bình thường!")
    print("\n🚀 Bây giờ bạn có thể:")
    print("   1. Import file SQL vào phpMyAdmin")
    print("   2. Chạy backend: python backend/run.py")
    print("   3. Chạy frontend: npm start")

if __name__ == "__main__":
    main()
