#!/usr/bin/env python3
"""
Script kiểm tra database và users
Chạy: python check_database.py
"""

import sys
import os

# Thêm thư mục backend vào Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, test_connection
from app.models.user import User
from app.services.auth_service import AuthService

def check_database():
    """Kiểm tra kết nối database"""
    print("🔍 Kiểm tra kết nối database...")
    
    if test_connection():
        print("✅ Kết nối database thành công!")
    else:
        print("❌ Không thể kết nối database!")
        return False
    
    return True

def check_users():
    """Kiểm tra users trong database"""
    print("\n👥 Kiểm tra users trong database...")
    
    db = SessionLocal()
    
    try:
        # Đếm tổng số users
        total_users = db.query(User).count()
        print(f"📊 Tổng số users: {total_users}")
        
        # Liệt kê tất cả users
        users = db.query(User).all()
        
        for user in users:
            print(f"\n👤 User ID: {user.id}")
            print(f"   📧 Email: {user.email}")
            print(f"   👤 Username: {user.username}")
            print(f"   🏷️  Full Name: {user.full_name}")
            print(f"   👑 Is Admin: {user.is_admin}")
            print(f"   ✅ Is Active: {user.is_active}")
            print(f"   📅 Created: {user.created_at}")
            print(f"   🔑 Password Hash: {user.hashed_password[:50]}...")
        
        return users
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra users: {e}")
        return []
        
    finally:
        db.close()

def test_password_verification():
    """Test việc xác thực password"""
    print("\n🔐 Test xác thực password...")
    
    db = SessionLocal()
    
    try:
        # Lấy admin user
        admin = db.query(User).filter(User.email == "admin@news.com").first()
        
        if not admin:
            print("❌ Không tìm thấy admin user!")
            return False
        
        # Test password verification
        auth_service = AuthService()
        
        # Test với password đúng
        is_valid = auth_service.verify_password("admin123", admin.hashed_password)
        print(f"✅ Password 'admin123' hợp lệ: {is_valid}")
        
        # Test với password sai
        is_invalid = auth_service.verify_password("wrongpass", admin.hashed_password)
        print(f"❌ Password 'wrongpass' hợp lệ: {is_invalid}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi test password: {e}")
        return False
        
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Bắt đầu kiểm tra database...")
    print("=" * 60)
    
    # Kiểm tra kết nối database
    if not check_database():
        print("❌ Không thể tiếp tục do lỗi kết nối database!")
        sys.exit(1)
    
    # Kiểm tra users
    users = check_users()
    
    # Test password verification
    if users:
        test_password_verification()
    
    print("\n" + "=" * 60)
    print("✨ Hoàn thành kiểm tra!")
    
    if users:
        print(f"\n📋 Tài khoản có sẵn:")
        for user in users:
            if user.is_admin:
                print(f"👑 Admin: {user.email}")
            else:
                print(f"👤 User: {user.email}")
