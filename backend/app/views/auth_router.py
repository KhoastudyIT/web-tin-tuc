from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from ..database import get_db
from ..services.auth_service import AuthService
from ..schemas.auth import Token
from ..schemas.user import UserCreate, UserLogin, UserResponse
from ..utils.auth import get_current_user

# Tạo router
auth_router = APIRouter()

# Tạo service instance
auth_service = AuthService()

@auth_router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """Đăng ký người dùng mới"""
    # Kiểm tra email đã tồn tại
    db_user = auth_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Tạo user mới
    return auth_service.create_user(db, user)

@auth_router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Đăng nhập người dùng"""
    # Xác thực user
    user = auth_service.authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Tạo access token
    access_token = auth_service.create_access_token(data={"sub": user.email})
    
    # Cập nhật last login
    auth_service.update_last_login(db, user.id)
    
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """Lấy thông tin user hiện tại"""
    return current_user
