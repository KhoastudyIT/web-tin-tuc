@echo off
echo ========================================
echo    News Website - Frontend
echo ========================================
echo.

REM Kiểm tra Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Lỗi: Node.js chưa được cài đặt hoặc không có trong PATH
    echo Vui lòng cài đặt Node.js 16+ và thử lại
    pause
    exit /b 1
)

echo ✅ Node.js đã được cài đặt

REM Kiểm tra npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Lỗi: npm chưa được cài đặt
    echo Vui lòng cài đặt npm và thử lại
    pause
    exit /b 1
)

echo ✅ npm đã được cài đặt
echo.

REM Cài đặt dependencies
echo 📦 Cài đặt dependencies...
npm install

echo.

REM Chạy frontend
echo 🚀 Khởi động React development server...
echo 📍 Frontend sẽ chạy tại: http://localhost:3000
echo.

npm start

pause
