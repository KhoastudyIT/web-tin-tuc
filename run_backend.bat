@echo off
REM ===== BACKEND STARTUP SCRIPT - Script khởi chạy Backend Python =====
REM File này giúp khởi chạy backend server một cách dễ dàng trên Windows
REM Không cần phải gõ lệnh phức tạp, chỉ cần double-click file này

echo.
echo ========================================
echo    WEBSITE TIN TUC - BACKEND SERVER
echo ========================================
echo.

REM ===== CHECK PYTHON INSTALLATION - Kiểm tra Python đã cài chưa =====
echo [1/4] Kiem tra Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Loi: Python chua duoc cai dat!
    echo Hay cai dat Python tu: https://python.org
    echo.
    pause
    exit /b 1
)
echo ✅ Python da duoc cai dat

REM ===== CHECK VIRTUAL ENVIRONMENT - Kiểm tra virtual environment =====
echo.
echo [2/4] Kiem tra virtual environment...
if not exist "venv" (
    echo ⚠️  Virtual environment chua duoc tao
    echo Dang tao virtual environment...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo ❌ Loi: Khong the tao virtual environment
        pause
        exit /b 1
    )
    echo ✅ Virtual environment da duoc tao
) else (
    echo ✅ Virtual environment da ton tai
)

REM ===== ACTIVATE VIRTUAL ENVIRONMENT - Kích hoạt môi trường ảo =====
echo.
echo [3/4] Kich hoat virtual environment...
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo ❌ Loi: Khong the kich hoat virtual environment
    pause
    exit /b 1
)
echo ✅ Virtual environment da duoc kich hoat

REM ===== INSTALL DEPENDENCIES - Cài đặt các thư viện cần thiết =====
echo.
echo [4/4] Cai dat dependencies...
if not exist "requirements.txt" (
    echo ❌ Loi: File requirements.txt khong ton tai!
    echo Hay dam bao ban dang o dung thu muc project
    pause
    exit /b 1
)

echo Dang cai dat cac thu vien Python...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Loi: Khong the cai dat dependencies
    echo Hay kiem tra ket noi internet va thu lai
    pause
    exit /b 1
)
echo ✅ Dependencies da duoc cai dat

REM ===== START BACKEND SERVER - Khởi chạy backend server =====
echo.
echo ========================================
echo    DANG KHOI CHAY BACKEND SERVER...
echo ========================================
echo.
echo 🌐 Backend se chay tai: http://localhost:8000
echo 📚 API Documentation: http://localhost:8000/docs
echo 🔄 ReDoc: http://localhost:8000/redoc
echo.
echo 💡 De dung, nhan Ctrl+C
echo.

REM ===== RUN BACKEND - Chạy backend với uvicorn =====
REM --reload: Tự động reload khi code thay đổi (development mode)
REM --host 0.0.0.0: Cho phép truy cập từ các thiết bị khác trong mạng
REM --port 8000: Port mặc định cho backend
python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

REM ===== ERROR HANDLING - Xử lý lỗi nếu có =====
if %errorlevel% neq 0 (
    echo.
    echo ❌ Loi: Backend server bi dung!
    echo Hay kiem tra:
    echo - Python version (nen dung Python 3.8+)
    echo - Dependencies da duoc cai dat chua
    echo - Port 8000 co bi chiem chua
    echo.
    pause
)

REM ===== CLEANUP - Dọn dẹp sau khi kết thúc =====
echo.
echo Dang tat virtual environment...
deactivate
echo ✅ Da tat virtual environment
echo.
echo Tam biet! 👋
pause
