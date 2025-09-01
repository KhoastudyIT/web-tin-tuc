#!/usr/bin/env python3
"""
Fix password cho admin user và debug lỗi đăng nhập
Chạy: python fix_admin_password.py
"""

import sys
import os

# Thêm thư mục backend vào Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.user import User
from app.services.auth_service import AuthService

def debug_bcrypt():
    """Debug bcrypt hoạt động"""
    
    print("🔧 Debug bcrypt...")
    
    try:
        auth_service = AuthService()
        
        # Test hash và verify password đơn giản
        test_password = "test123"
        hashed = auth_service.get_password_hash(test_password)
        
        print(f"✅ Hash password: {hashed[:50]}...")
        
        # Test verify
        is_valid = auth_service.verify_password(test_password, hashed)
        print(f"✅ Verify password: {is_valid}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi bcrypt: {e}")
        import traceback
        traceback.print_exc()
        return False

def fix_admin_password():
    """Fix password cho admin user"""
    
    print("\n🔧 Fix password cho admin user...")
    
    db = SessionLocal()
    
    try:
        # Tìm admin user
        admin = db.query(User).filter(User.email == "admin@news.com").first()
        
        if not admin:
            print("❌ Không tìm thấy admin user!")
            return False
        
        print(f"👑 Tìm thấy admin: {admin.email}")
        print(f"🔑 Password hash cũ: {admin.hashed_password[:50]}...")
        
        # Tạo auth service
        auth_service = AuthService()
        
        # Tạo password hash mới
        new_password = "admin123"
        new_hash = auth_service.get_password_hash(new_password)
        
        print(f"🔄 Password hash mới: {new_hash[:50]}...")
        
        # Cập nhật password
        admin.hashed_password = new_hash
        db.commit()
        
        print(f"✅ Đã cập nhật password cho admin: {new_password}")
        
        # Test password mới
        is_valid = auth_service.verify_password(new_password, new_hash)
        print(f"✅ Test password mới: {is_valid}")
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi khi fix password: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return False
        
    finally:
        db.close()

def test_admin_login():
    """Test đăng nhập admin"""
    
    print("\n🔐 Test đăng nhập admin...")
    
    db = SessionLocal()
    
    try:
        auth_service = AuthService()
        
        # Test với password mới
        user = auth_service.authenticate_user(db, "admin@news.com", "admin123")
        
        if user:
            print("✅ Đăng nhập admin thành công!")
            print(f"   👤 User: {user.username}")
            print(f"   👑 Is Admin: {user.is_admin}")
            
            # Test tạo token
            token = auth_service.create_access_token(data={"sub": user.email})
            print(f"   🔑 Token: {token[:50]}...")
            
            return True
        else:
            print("❌ Đăng nhập admin thất bại!")
            
            # Debug chi tiết
            print("\n🔍 Debug chi tiết:")
            
            # Kiểm tra user có tồn tại không
            user = db.query(User).filter(User.email == "admin@news.com").first()
            if user:
                print(f"   ✅ User tồn tại: {user.email}")
                print(f"   🔑 Password hash: {user.hashed_password[:50]}...")
                
                # Test verify password trực tiếp
                is_valid = auth_service.verify_password("admin123", user.hashed_password)
                print(f"   🔍 Verify password trực tiếp: {is_valid}")
            else:
                print("   ❌ User không tồn tại")
            
            return False
            
    except Exception as e:
        print(f"❌ Lỗi khi test đăng nhập: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        db.close()

def check_all_users():
    """Kiểm tra tất cả users"""
    
    print("\n👥 Kiểm tra tất cả users...")
    
    db = SessionLocal()
    
    try:
        users = db.query(User).all()
        
        print(f"📊 Tổng số users: {len(users)}")
        
        for user in users:
            print(f"\n👤 User ID: {user.id}")
            print(f"   📧 Email: {user.email}")
            print(f"   👤 Username: {user.username}")
            print(f"   🔑 Password Hash: {user.hashed_password[:50]}...")
            
            # Test password verification
            auth_service = AuthService()
            
            # Test với các password có thể
            test_passwords = ["admin123", "password", "123456", user.username]
            
            for test_pwd in test_passwords:
                try:
                    is_valid = auth_service.verify_password(test_pwd, user.hashed_password)
                    if is_valid:
                        print(f"   ✅ Password '{test_pwd}' hợp lệ!")
                        break
                except Exception as e:
                    print(f"   ❌ Lỗi verify '{test_pwd}': {e}")
            else:
                print(f"   ❌ Không tìm thấy password hợp lệ")
        
        return users
        
    except Exception as e:
        print(f"❌ Lỗi khi kiểm tra users: {e}")
        return []
        
    finally:
        db.close()

def main():
    """Main function"""
    print("🔧 Fix admin password và debug lỗi đăng nhập...")
    print("=" * 60)
    
    # Debug bcrypt trước
    if not debug_bcrypt():
        print("\n❌ Bcrypt có vấn đề!")
        print("💡 Hãy fix bcrypt trước")
        return
    
    # Kiểm tra users
    users = check_all_users()
    
    # Fix password admin
    if fix_admin_password():
        # Test đăng nhập
        test_admin_login()
        
        print("\n✅ Hoàn thành fix admin password!")
        print("\n💡 Bây giờ bạn có thể:")
        print("1. Chạy: python run.py")
        print("2. Đăng nhập với: admin@news.com / admin123")
    else:
        print("\n❌ Không thể fix admin password!")
    
    print("\n" + "=" * 60)
    print("✨ Hoàn thành!")

if __name__ == "__main__":
    main()