#!/usr/bin/env python3
"""
Script chạy backend Python cho dự án News Website
"""

import os
import sys
import subprocess
import platform

def run_backend():
    """Chạy backend Python"""
    print("=" * 60)
    print("    🚀 KHỞI CHẠY BACKEND PYTHON")
    print("=" * 60)
    print()
    
    # Kiểm tra virtual environment
    if not os.path.exists("venv"):
        print("❌ Virtual environment chưa được tạo!")
        print("Vui lòng chạy: python setup_env.py")
        return False
    
    # Kiểm tra thư mục backend
    if not os.path.exists("backend"):
        print("❌ Thư mục backend không tồn tại!")
        return False
    
    # Kiểm tra file run.py
    if not os.path.exists("backend/run.py"):
        print("❌ File backend/run.py không tồn tại!")
        return False
    
    print("✅ Môi trường đã sẵn sàng!")
    print()
    
    # Thay đổi thư mục làm việc
    os.chdir("backend")
    print(f"📁 Đã chuyển đến thư mục: {os.getcwd()}")
    print()
    
    # Kiểm tra Python trong virtual environment
    if platform.system() == "Windows":
        python_path = os.path.join("..", "venv", "Scripts", "python.exe")
    else:
        python_path = os.path.join("..", "venv", "bin", "python")
    
    if not os.path.exists(python_path):
        print("❌ Không thể tìm thấy Python trong virtual environment!")
        print("Vui lòng kiểm tra lại virtual environment")
        return False
    
    print("🐍 Sử dụng Python từ virtual environment:")
    print(f"   {python_path}")
    print()
    
    # Chạy backend
    print("🚀 Khởi chạy FastAPI backend...")
    print("📍 API sẽ chạy tại: http://localhost:8000")
    print("📖 Swagger UI: http://localhost:8000/docs")
    print("📚 ReDoc: http://localhost:8000/redoc")
    print()
    print("💡 Nhấn Ctrl+C để dừng server")
    print("=" * 60)
    print()
    
    try:
        # Chạy backend với Python từ virtual environment
        subprocess.run([python_path, "run.py"], check=True)
    except KeyboardInterrupt:
        print("\n\n⚠️ Server đã được dừng bởi người dùng.")
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Lỗi khi chạy backend: {e}")
        return False
    except FileNotFoundError:
        print(f"\n❌ Không thể tìm thấy file: {python_path}")
        return False
    
    return True

def main():
    """Hàm chính"""
    try:
        success = run_backend()
        if not success:
            print("\n❌ Không thể chạy backend. Vui lòng kiểm tra lỗi và thử lại.")
            input("\nNhấn Enter để thoát...")
    except Exception as e:
        print(f"\n❌ Lỗi không mong muốn: {e}")
        input("\nNhấn Enter để thoát...")

if __name__ == "__main__":
    main()
