#!/usr/bin/env python3
"""
Script debug MySQL để xem lỗi chi tiết
Chạy: python debug_mysql.py
"""

import socket
import subprocess
import sys

def check_port():
    """Kiểm tra port 3306"""
    print("🔍 Kiểm tra port 3306...")
    
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('localhost', 3306))
        sock.close()
        
        if result == 0:
            print("✅ Port 3306 đang mở")
            return True
        else:
            print("❌ Port 3306 đang đóng")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi kiểm tra port: {e}")
        return False

def check_xampp():
    """Kiểm tra XAMPP services"""
    print("\n🔍 Kiểm tra XAMPP services...")
    
    try:
        # Kiểm tra MySQL process
        result = subprocess.run(['tasklist', '/FI', 'IMAGENAME eq mysqld.exe'], 
                              capture_output=True, text=True)
        
        if 'mysqld.exe' in result.stdout:
            print("✅ MySQL process đang chạy")
            return True
        else:
            print("❌ MySQL process không chạy")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi kiểm tra process: {e}")
        return False

def check_netstat():
    """Kiểm tra netstat"""
    print("\n🔍 Kiểm tra netstat...")
    
    try:
        result = subprocess.run(['netstat', '-an'], capture_output=True, text=True)
        
        if '3306' in result.stdout:
            print("✅ Port 3306 được tìm thấy trong netstat")
            lines = [line for line in result.stdout.split('\n') if '3306' in line]
            for line in lines:
                print(f"   {line.strip()}")
            return True
        else:
            print("❌ Port 3306 không tìm thấy trong netstat")
            return False
            
    except Exception as e:
        print(f"❌ Lỗi kiểm tra netstat: {e}")
        return False

def test_pymysql():
    """Test PyMySQL connection"""
    print("\n🔍 Test PyMySQL connection...")
    
    try:
        import pymysql
        
        # Test kết nối cơ bản
        connection = pymysql.connect(
            host="localhost",
            port=3306,
            user="root",
            password="",
            connect_timeout=5
        )
        
        print("✅ PyMySQL kết nối thành công!")
        connection.close()
        return True
        
    except ImportError:
        print("❌ PyMySQL chưa được cài đặt")
        print("💡 Chạy: pip install PyMySQL")
        return False
        
    except Exception as e:
        print(f"❌ Lỗi PyMySQL: {e}")
        return False

def main():
    """Main function"""
    print("🚀 Debug MySQL connection...")
    print("=" * 60)
    
    # Kiểm tra các thành phần
    port_ok = check_port()
    xampp_ok = check_xampp()
    netstat_ok = check_netstat()
    pymysql_ok = test_pymysql()
    
    print("\n" + "=" * 60)
    print("📊 Kết quả kiểm tra:")
    print(f"   Port 3306: {'✅' if port_ok else '❌'}")
    print(f"   XAMPP MySQL: {'✅' if xampp_ok else '❌'}")
    print(f"   Netstat: {'✅' if netstat_ok else '❌'}")
    print(f"   PyMySQL: {'✅' if pymysql_ok else '❌'}")
    
    if all([port_ok, xampp_ok, netstat_ok, pymysql_ok]):
        print("\n✅ Tất cả đều OK! MySQL hoạt động bình thường.")
        print("\n📋 Bước tiếp theo:")
        print("1. Chạy: python simple_mysql_test.py")
        print("2. Nếu OK, chạy: python run.py")
    else:
        print("\n❌ Có vấn đề với MySQL!")
        print("\n🔧 Hướng dẫn fix:")
        
        if not port_ok:
            print("- Port 3306 đang đóng, kiểm tra XAMPP MySQL")
        if not xampp_ok:
            print("- MySQL process không chạy, start MySQL trong XAMPP")
        if not netstat_ok:
            print("- MySQL không lắng nghe, restart MySQL service")
        if not pymysql_ok:
            print("- Cài đặt PyMySQL: pip install PyMySQL")
    
    print("\n" + "=" * 60)
    print("✨ Hoàn thành debug!")

if __name__ == "__main__":
    main()
