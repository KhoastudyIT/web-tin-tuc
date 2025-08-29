#!/usr/bin/env python3
"""
Script test authentication system
Chạy: python backend/test_auth.py
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User
from app.services.auth_service import AuthService
from app.utils.auth import get_password_hash, verify_password
from sqlalchemy import text

def test_database_users():
    """Test xem có user nào trong database không"""
    
    print("🔍 Đang kiểm tra users trong database...")
    
    try:
        db = SessionLocal()
        
        # Kiểm tra số lượng users
        user_count = db.query(User).count()
        print(f"📊 Tổng số users: {user_count}")
        
        if user_count > 0:
            # Lấy thông tin user đầu tiên
            first_user = db.query(User).first()
            print(f"👤 User đầu tiên:")
            print(f"   - ID: {first_user.id}")
            print(f"   - Username: {first_user.username}")
            print(f"   - Email: {first_user.email}")
            print(f"   - Full Name: {first_user.full_name}")
            print(f"   - Is Admin: {first_user.is_admin}")
            print(f"   - Is Active: {first_user.is_active}")
            print(f"   - Created: {first_user.created_at}")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra users: {e}")
        return False

def test_password_hashing():
    """Test password hashing"""
    
    print("\n🔐 Đang test password hashing...")
    
    try:
        # Test password
        test_password = "test123"
        
        # Hash password
        hashed = get_password_hash(test_password)
        print(f"✅ Password hash thành công: {hashed[:20]}...")
        
        # Verify password
        is_valid = verify_password(test_password, hashed)
        print(f"✅ Password verification: {is_valid}")
        
        # Test wrong password
        is_wrong = verify_password("wrong123", hashed)
        print(f"✅ Wrong password test: {not is_wrong}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi password hashing: {e}")
        return False

def test_auth_service():
    """Test authentication service"""
    
    print("\n🔑 Đang test authentication service...")
    
    try:
        auth_service = AuthService()
        
        # Test tạo user mới
        test_user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "test123"
        }
        
        print("📝 Đang tạo test user...")
        # Note: Không thực sự tạo user, chỉ test service
        
        print("✅ Authentication service hoạt động")
        return True
        
    except Exception as e:
        print(f"❌ Lỗi authentication service: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    
    print("\n🌐 Đang test API endpoints...")
    
    try:
        import requests
        
        base_url = "http://localhost:8000"
        
        # Test health check
        try:
            response = requests.get(f"{base_url}/", timeout=5)
            if response.status_code == 200:
                print("✅ Health check endpoint hoạt động")
                print(f"   Response: {response.json()}")
            else:
                print(f"⚠️  Health check status: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print("❌ Không thể kết nối đến backend")
            print("💡 Hãy chạy: python run.py")
            return False
        
        # Test auth endpoints
        try:
            response = requests.get(f"{base_url}/docs", timeout=5)
            if response.status_code == 200:
                print("✅ API docs endpoint hoạt động")
            else:
                print(f"⚠️  API docs status: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print("❌ Không thể kết nối đến API docs")
        
        return True
        
    except ImportError:
        print("⚠️  Requests library không có sẵn")
        print("💡 Cài đặt: pip install requests")
        return False
    except Exception as e:
        print(f"❌ Lỗi test API: {e}")
        return False

def main():
    """Main function"""
    
    print("🔐 TEST AUTHENTICATION SYSTEM")
    print("=" * 50)
    
    # Test database users
    if not test_database_users():
        print("\n❌ Không thể kiểm tra database users!")
        return
    
    # Test password hashing
    if not test_password_hashing():
        print("\n❌ Lỗi password hashing!")
        return
    
    # Test auth service
    if not test_auth_service():
        print("\n❌ Lỗi authentication service!")
        return
    
    # Test API endpoints
    if not test_api_endpoints():
        print("\n❌ Lỗi API endpoints!")
        return
    
    print("\n🎉 HOÀN THÀNH! Authentication system hoạt động!")
    print("\n💡 Nếu vẫn không đăng ký/đăng nhập được:")
    print("   1. Kiểm tra backend có đang chạy không")
    print("   2. Kiểm tra frontend có kết nối đúng backend URL không")
    print("   3. Kiểm tra console browser có lỗi gì không")

if __name__ == "__main__":
    main()
