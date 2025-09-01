#!/usr/bin/env python3
"""
Script debug user để kiểm tra đăng nhập
Chạy: python debug_user.py
"""

import sys
import os

# Thêm thư mục backend vào Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.user import User
from app.services.auth_service import AuthService

def check_users():
    """Kiểm tra tất cả users trong database"""
    
    print("🔍 Kiểm tra users trong database...")
    
    db = SessionLocal()
    
    try:
        # Lấy tất cả users
        users = db.query(User).all()
        
        print(f"📊 Tổng số users: {len(users)}")
        
        for user in users:
            print(f"\n👤 User ID: {user.id}")
            print(f"   �� Email: {user.email}")
            print(f"   👤 Username: {user.username}")
            print(f"   ��️  Full Name: {user.full_name}")
            print(f"   �� Is Admin: {user.is_admin}")
            print(f"   ✅ Is Active: {user.is_active}")
            print(f"   📅 Created: {user.created_at}")
            print(f"   🔑 Password Hash: {user.hashed_password[:50]}...")
            
            # Test password verification
            auth_service = AuthService()
            
            # Test với password mặc định
            test_passwords = ["admin123", "password", "123456", user.username]
            
            for test_pwd in test_passwords:
                try:
                    is_valid = auth_service.verify_password(test_pwd, user.hashed_password)
                    if is_valid:
                        print(f"   ✅ Password '{test_pwd}' hợp lệ!")
                        break
                except Exception as e:
                    print(f"   ❌ Lỗi verify password '{test_pwd}': {e}")
            else:
                print(f"   ❌ Không tìm thấy password hợp lệ")
        
        return users
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra users: {e}")
        return []
        
    finally:
        db.close()

def test_login(email, password):
    """Test đăng nhập với email và password"""
    
    print(f"\n🔐 Test đăng nhập: {email} / {password}")
    
    db = SessionLocal()
    
    try:
        auth_service = AuthService()
        
        # Test authentication
        user = auth_service.authenticate_user(db, email, password)
        
        if user:
            print(f"✅ Đăng nhập thành công!")
            print(f"   👤 User: {user.username}")
            print(f"   �� Is Admin: {user.is_admin}")
            
            # Test tạo token
            token = auth_service.create_access_token(data={"sub": user.email})
            print(f"   🔑 Token: {token[:50]}...")
            
            return True
        else:
            print(f"❌ Đăng nhập thất bại!")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi khi test đăng nhập: {e}")
        return False
        
    finally:
        db.close()

def test_bcrypt():
    """Test bcrypt hoạt động"""
    
    print("\n🔐 Test bcrypt...")
    
    try:
        auth_service = AuthService()
        
        # Test hash và verify password
        test_password = "test123"
        hashed = auth_service.get_password_hash(test_password)
        
        print(f"✅ Hash password thành công: {hashed[:50]}...")
        
        # Test verify
        is_valid = auth_service.verify_password(test_password, hashed)
        print(f"✅ Verify password thành công: {is_valid}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi bcrypt: {e}")
        return False

def main():
    """Main function"""
    print("🚀 Debug users và test đăng nhập...")
    print("=" * 60)
    
    # Test bcrypt trước
    bcrypt_ok = test_bcrypt()
    
    if not bcrypt_ok:
        print("\n❌ Bcrypt có vấn đề!")
        print("💡 Hãy fix bcrypt trước:")
        print("   pip uninstall bcrypt")
        print("   pip install bcrypt==4.0.1")
        print("   pip install passlib[bcrypt]")
        return
    
    # Kiểm tra users
    users = check_users()
    
    if users:
        print(f"\n�� Test đăng nhập các users:")
        
        # Test với admin user
        test_login("admin@news.com", "admin123")
        
        # Test với user đầu tiên (nếu có)
        if len(users) > 1:
            first_user = users[0]
            test_login(first_user.email, "password")
        
        print(f"\n�� Nếu đăng nhập thất bại, có thể:")
        print("1. Password hash không đúng")
        print("2. Lỗi bcrypt")
        print("3. User chưa được tạo đúng cách")
        
    else:
        print("❌ Không có users nào trong database!")
    
    print("\n" + "=" * 60)
    print("✨ Hoàn thành!")

if __name__ == "__main__":
    main()