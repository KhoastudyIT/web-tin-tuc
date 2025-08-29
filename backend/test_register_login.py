#!/usr/bin/env python3
"""
Script test đăng ký và đăng nhập thực tế
Chạy: python backend/test_register_login.py
"""

import sys
import os
import requests
import json
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_register():
    """Test đăng ký user mới"""
    
    print("📝 Đang test đăng ký user mới...")
    
    try:
        # Test data
        user_data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "test123"
        }
        
        # Gọi API đăng ký
        response = requests.post(
            "http://localhost:8000/api/auth/register",
            json=user_data,
            timeout=10
        )
        
        if response.status_code == 201:
            print("✅ Đăng ký thành công!")
            print(f"   Response: {response.json()}")
            return True
        else:
            print(f"❌ Đăng ký thất bại! Status: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Không thể kết nối đến backend!")
        print("💡 Hãy chạy: python run.py")
        return False
    except Exception as e:
        print(f"❌ Lỗi đăng ký: {e}")
        return False

def test_login():
    """Test đăng nhập"""
    
    print("\n🔑 Đang test đăng nhập...")
    
    try:
        # Test data
        login_data = {
            "email": "testuser@example.com",
            "password": "test123"
        }
        
        # Gọi API đăng nhập
        response = requests.post(
            "http://localhost:8000/api/auth/login",
            json=login_data,
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Đăng nhập thành công!")
            data = response.json()
            print(f"   Access Token: {data.get('access_token', 'N/A')[:20]}...")
            print(f"   Token Type: {data.get('token_type', 'N/A')}")
            
            # Test lấy thông tin user
            token = data.get('access_token')
            if token:
                return test_get_user_info(token)
            return True
        else:
            print(f"❌ Đăng nhập thất bại! Status: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Không thể kết nối đến backend!")
        return False
    except Exception as e:
        print(f"❌ Lỗi đăng nhập: {e}")
        return False

def test_get_user_info(token):
    """Test lấy thông tin user"""
    
    print("\n👤 Đang test lấy thông tin user...")
    
    try:
        # Gọi API lấy thông tin user
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(
            "http://localhost:8000/api/auth/me",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Lấy thông tin user thành công!")
            user_data = response.json()
            print(f"   User ID: {user_data.get('id')}")
            print(f"   Username: {user_data.get('username')}")
            print(f"   Email: {user_data.get('email')}")
            print(f"   Full Name: {user_data.get('full_name')}")
            return True
        else:
            print(f"❌ Lấy thông tin user thất bại! Status: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi lấy thông tin user: {e}")
        return False

def test_admin_login():
    """Test đăng nhập admin"""
    
    print("\n👑 Đang test đăng nhập admin...")
    
    try:
        # Test data cho admin
        admin_data = {
            "email": "admin@news.com",
            "password": "admin123"
        }
        
        # Gọi API đăng nhập
        response = requests.post(
            "http://localhost:8000/api/auth/login",
            json=admin_data,
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ Đăng nhập admin thành công!")
            data = response.json()
            print(f"   Access Token: {data.get('access_token', 'N/A')[:20]}...")
            return True
        else:
            print(f"❌ Đăng nhập admin thất bại! Status: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi đăng nhập admin: {e}")
        return False

def main():
    """Main function"""
    
    print("🔐 TEST REGISTER & LOGIN SYSTEM")
    print("=" * 50)
    
    # Test đăng ký
    if not test_register():
        print("\n❌ Test đăng ký thất bại!")
        return
    
    # Test đăng nhập
    if not test_login():
        print("\n❌ Test đăng nhập thất bại!")
        return
    
    # Test đăng nhập admin
    if not test_admin_login():
        print("\n❌ Test đăng nhập admin thất bại!")
        return
    
    print("\n🎉 HOÀN THÀNH! Authentication system hoạt động hoàn hảo!")
    print("\n💡 Nếu frontend vẫn không đăng ký/đăng nhập được:")
    print("   1. Kiểm tra console browser có lỗi gì không")
    print("   2. Kiểm tra Network tab trong DevTools")
    print("   3. Kiểm tra CORS settings")
    print("   4. Kiểm tra frontend có gọi đúng API endpoints không")

if __name__ == "__main__":
    main()
