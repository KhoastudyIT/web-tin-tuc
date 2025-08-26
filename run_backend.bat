@echo off
echo ========================================
echo    News Website - MVC Backend
echo ========================================
echo.

REM Kiểm tra Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Lỗi: Python chưa được cài đặt hoặc không có trong PATH
    echo Vui lòng cài đặt Python 3.8+ và thử lại
    pause
    exit /b 1
)

echo ✅ Python đã được cài đặt
echo.

REM Kiểm tra virtual environment
if not exist "venv" (
    echo 🔧 Tạo virtual environment...
    python -m venv venv
    echo ✅ Virtual environment đã được tạo
) else (
    echo ✅ Virtual environment đã tồn tại
)

echo.

REM Kích hoạt virtual environment
echo 🔄 Kích hoạt virtual environment...
call venv\Scripts\activate

REM Cài đặt dependencies
echo 📦 Cài đặt dependencies...
pip install -r requirements.txt

echo.

REM Chạy backend
echo 🚀 Khởi động FastAPI backend...
echo 📍 API sẽ chạy tại: http://localhost:8000
echo 📖 Swagger UI: http://localhost:8000/docs
echo 📚 ReDoc: http://localhost:8000/redoc
echo.

cd backend
python run.py

pause
