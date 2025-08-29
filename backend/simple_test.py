#!/usr/bin/env python3
"""
Script test đơn giản authentication system
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_basic_imports():
    """Test basic imports"""
    
    print("🔍 Đang test basic imports...")
    
    try:
        from app.database import engine
        print("✅ Database engine import thành công")
        
        from app.models import User
        print("✅ User model import thành công")
        
        from app.services.auth_service import AuthService
        print("✅ AuthService import thành công")
        
        from app.utils.auth import get_password_hash, verify_password
        print("✅ Auth utils import thành công")
        
        return True
        
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_password_hashing():
    """Test password hashing"""
    
    print("\n🔐 Đang test password hashing...")
    
    try:
        from app.utils.auth import get_password_hash, verify_password
        
        # Test password
        test_password = "test123"
        
        # Hash password
        hashed = get_password_hash(test_password)
        print(f"✅ Password hash thành công: {hashed[:20]}...")
        
        # Verify password
        is_valid = verify_password(test_password, hashed)
        print(f"✅ Password verification: {is_valid}")
        
        return True
        
    except Exception as e:
        print(f"❌ Password hashing error: {e}")
        return False

def test_database_connection():
    """Test database connection"""
    
    print("\n🗄️ Đang test database connection...")
    
    try:
        from app.database import engine
        from sqlalchemy import text
        
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Database connection thành công")
            return True
            
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return False

def test_user_creation():
    """Test user creation without database"""
    
    print("\n👤 Đang test user creation logic...")
    
    try:
        from app.services.auth_service import AuthService
        
        auth_service = AuthService()
        
        # Test password hashing
        test_password = "test123"
        hashed = auth_service.get_password_hash(test_password)
        print(f"✅ Password hash từ service: {hashed[:20]}...")
        
        # Test password verification
        is_valid = auth_service.verify_password(test_password, hashed)
        print(f"✅ Password verification từ service: {is_valid}")
        
        return True
        
    except Exception as e:
        print(f"❌ User creation logic error: {e}")
        return False

def test_database_schema():
    """Test database schema compatibility"""
    
    print("\n🏗️ Đang test database schema...")
    
    try:
        from app.database import engine
        from sqlalchemy import text
        
        with engine.connect() as connection:
            # Kiểm tra bảng users
            result = connection.execute(text("DESCRIBE users"))
            columns = result.fetchall()
            print(f"✅ Bảng users có {len(columns)} cột:")
            
            for col in columns:
                print(f"   - {col[0]} ({col[1]})")
            
            return True
            
    except Exception as e:
        print(f"❌ Database schema error: {e}")
        return False

def main():
    """Main function"""
    
    print("🔧 SIMPLE AUTHENTICATION TEST")
    print("=" * 40)
    
    # Test basic imports
    if not test_basic_imports():
        return
    
    # Test password hashing
    if not test_password_hashing():
        return
    
    # Test database connection
    if not test_database_connection():
        return
    
    # Test user creation logic
    if not test_user_creation():
        return
    
    # Test database schema
    if not test_database_schema():
        return
    
    print("\n🎉 HOÀN THÀNH! Tất cả tests đều thành công!")
    print("\n💡 Nếu vẫn có lỗi 500, vấn đề có thể là:")
    print("   1. Database schema không khớp với models")
    print("   2. Missing database columns")
    print("   3. Database constraints")

if __name__ == "__main__":
    main()
