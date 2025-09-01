#!/usr/bin/env python3
"""
Debug mới - kiểm tra users và đăng nhập
"""

print("🚀 Bắt đầu debug...")

try:
    import sys
    import os
    
    print("✅ Import sys, os OK")
    
    # Thêm thư mục backend vào Python path
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    print("✅ Python path OK")
    
    # Test import app
    import app
    print("✅ Import app OK")
    
    # Test import database
    from app.database import SessionLocal
    print("✅ Import database OK")
    
    # Test import models
    from app.models.user import User
    print("✅ Import User model OK")
    
    # Test import auth service
    from app.services.auth_service import AuthService
    print("✅ Import AuthService OK")
    
    print("\n🔍 Kiểm tra users trong database...")
    
    # Kết nối database
    db = SessionLocal()
    
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
    
    db.close()
    
    if users:
        print(f"\n✅ Tìm thấy {len(users)} users!")
        print("\n�� Bước tiếp theo:")
        print("1. Chạy: python run.py")
        print("2. Test đăng nhập với admin@news.com / admin123")
    else:
        print("\n❌ Không có users nào!")
        print("💡 Cần tạo users trước")
    
except Exception as e:
    print(f"❌ Lỗi: {e}")
    import traceback
    traceback.print_exc()

print("\n✨ Kết thúc debug")