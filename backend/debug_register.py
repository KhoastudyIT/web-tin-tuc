#!/usr/bin/env python3
"""
Script debug đăng ký user
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_register_step_by_step():
    """Test đăng ký từng bước"""
    
    print("🔍 Đang test đăng ký từng bước...")
    
    try:
        # Test 1: Import các modules
        print("1️⃣ Importing modules...")
        from app.database import SessionLocal
        from app.models import User
        from app.services.auth_service import AuthService
        from app.schemas.user import UserCreate
        print("✅ Import thành công")
        
        # Test 2: Tạo database session
        print("2️⃣ Creating database session...")
        db = SessionLocal()
        print("✅ Database session thành công")
        
        # Test 3: Tạo user data
        print("3️⃣ Creating user data...")
        user_data = UserCreate(
            email="debug@example.com",
            username="debuguser",
            full_name="Debug User",
            password="debug123"
        )
        print("✅ User data thành công")
        
        # Test 4: Tạo auth service
        print("4️⃣ Creating auth service...")
        auth_service = AuthService()
        print("✅ Auth service thành công")
        
        # Test 5: Hash password
        print("5️⃣ Hashing password...")
        hashed_password = auth_service.get_password_hash(user_data.password)
        print(f"✅ Password hash: {hashed_password[:20]}...")
        
        # Test 6: Tạo user object
        print("6️⃣ Creating user object...")
        db_user = User(
            email=user_data.email,
            username=user_data.username,
            full_name=user_data.full_name,
            hashed_password=hashed_password
        )
        print("✅ User object thành công")
        
        # Test 7: Add to database
        print("7️⃣ Adding to database...")
        db.add(db_user)
        print("✅ Add to database thành công")
        
        # Test 8: Commit
        print("8️⃣ Committing...")
        db.commit()
        print("✅ Commit thành công")
        
        # Test 9: Refresh
        print("9️⃣ Refreshing...")
        db.refresh(db_user)
        print("✅ Refresh thành công")
        
        print(f"🎉 User được tạo thành công với ID: {db_user.id}")
        
        # Cleanup
        db.delete(db_user)
        db.commit()
        db.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Lỗi tại bước nào đó: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main function"""
    
    print("🐛 DEBUG REGISTER PROCESS")
    print("=" * 40)
    
    if test_register_step_by_step():
        print("\n🎉 Debug hoàn thành! Không có lỗi gì!")
    else:
        print("\n❌ Debug thất bại! Có lỗi xảy ra!")

if __name__ == "__main__":
    main()
