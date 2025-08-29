#!/usr/bin/env python3
"""
Script sửa cấu trúc database MySQL
Chạy: python backend/fix_database.py
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine
from sqlalchemy import text

def fix_database_structure():
    """Sửa cấu trúc database"""
    
    print("🔧 Đang sửa cấu trúc database...")
    
    try:
        with engine.connect() as connection:
            # Sửa bảng users
            print("\n📝 Sửa bảng users...")
            try:
                connection.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                """))
                print("✅ Đã thêm cột updated_at vào bảng users")
            except Exception as e:
                if "Duplicate column name" in str(e):
                    print("ℹ️  Cột updated_at đã tồn tại trong bảng users")
                else:
                    print(f"⚠️  Lỗi khi thêm cột updated_at: {e}")
            
            try:
                connection.execute(text("""
                    ALTER TABLE users 
                    ADD COLUMN full_name VARCHAR(255) NOT NULL DEFAULT 'Unknown User'
                """))
                print("✅ Đã thêm cột full_name vào bảng users")
            except Exception as e:
                if "Duplicate column name" in str(e):
                    print("ℹ️  Cột full_name đã tồn tại trong bảng users")
                else:
                    print(f"⚠️  Lỗi khi thêm cột full_name: {e}")
            
            # Sửa bảng news_categories
            print("\n📝 Sửa bảng news_categories...")
            try:
                connection.execute(text("""
                    ALTER TABLE news_categories 
                    ADD COLUMN is_active BOOLEAN DEFAULT TRUE
                """))
                print("✅ Đã thêm cột is_active vào bảng news_categories")
            except Exception as e:
                if "Duplicate column name" in str(e):
                    print("ℹ️  Cột is_active đã tồn tại trong bảng news_categories")
                else:
                    print(f"⚠️  Lỗi khi thêm cột is_active: {e}")
            
            try:
                connection.execute(text("""
                    ALTER TABLE news_categories 
                    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                """))
                print("✅ Đã thêm cột updated_at vào bảng news_categories")
            except Exception as e:
                if "Duplicate column name" in str(e):
                    print("ℹ️  Cột updated_at đã tồn tại trong bảng news_categories")
                else:
                    print(f"⚠️  Lỗi khi thêm cột updated_at: {e}")
            
            # Sửa bảng news_items
            print("\n📝 Sửa bảng news_items...")
            try:
                connection.execute(text("""
                    ALTER TABLE news_items 
                    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                """))
                print("✅ Đã thêm cột updated_at vào bảng news_items")
            except Exception as e:
                if "Duplicate column name" in str(e):
                    print("ℹ️  Cột updated_at đã tồn tại trong bảng news_items")
                else:
                    print(f"⚠️  Lỗi khi thêm cột updated_at: {e}")
            
            # Commit thay đổi
            connection.commit()
            print("\n✅ Đã commit thay đổi vào database")
            
    except Exception as e:
        print(f"❌ Lỗi khi sửa database: {e}")
        return False
    
    return True

def main():
    """Main function"""
    
    print("🔧 FIX DATABASE STRUCTURE")
    print("=" * 50)
    
    if fix_database_structure():
        print("\n🎉 HOÀN THÀNH! Database đã được sửa!")
        print("\n🚀 Bây giờ bạn có thể:")
        print("   1. Chạy test database: python test_database.py")
        print("   2. Chạy backend: python run.py")
    else:
        print("\n❌ Không thể sửa database!")

if __name__ == "__main__":
    main()
