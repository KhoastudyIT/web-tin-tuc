#!/usr/bin/env python3
"""
Script tạo file .env với đầy đủ các biến môi trường
Chạy: python backend/create_env.py
"""

import os

def create_env_file():
    """Tạo file .env với đầy đủ các biến môi trường"""
    
    env_content = """# =====================================================
# ENVIRONMENT VARIABLES FOR NEWS WEBSITE BACKEND
# =====================================================

# Database Configuration
DATABASE_URL=mysql://root:@localhost:3306/news_website

# Security Configuration
SECRET_KEY=your-super-secret-key-change-in-production-2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# App Configuration
APP_TITLE=News Website API - MVC Architecture
APP_DESCRIPTION=Modern news website backend with MVC pattern
APP_VERSION=1.0.0

# CORS Configuration (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000

# Pagination Configuration
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# MySQL Specific Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=news_website
MYSQL_CHARSET=utf8mb4

# Development Configuration
DEBUG=True
LOG_LEVEL=info
RELOAD=True
"""
    
    env_file_path = ".env"
    
    try:
        # Kiểm tra xem file .env đã tồn tại chưa
        if os.path.exists(env_file_path):
            print(f"⚠️  File {env_file_path} đã tồn tại!")
            response = input("Bạn có muốn ghi đè không? (y/N): ")
            if response.lower() != 'y':
                print("❌ Không tạo file .env mới")
                return False
        
        # Tạo file .env
        with open(env_file_path, 'w', encoding='utf-8') as f:
            f.write(env_content)
        
        print(f"✅ Đã tạo file {env_file_path} thành công!")
        print(f"📁 Đường dẫn: {os.path.abspath(env_file_path)}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo file .env: {e}")
        return False

def main():
    """Main function"""
    
    print("🔧 CREATE ENVIRONMENT FILE")
    print("=" * 50)
    
    if create_env_file():
        print("\n🎉 HOÀN THÀNH! File .env đã được tạo!")
        print("\n💡 Bây giờ bạn có thể:")
        print("   1. Chỉnh sửa file .env nếu cần")
        print("   2. Test database: python test_database.py")
        print("   3. Chạy backend: python run.py")
    else:
        print("\n❌ Không thể tạo file .env!")

if __name__ == "__main__":
    main()
