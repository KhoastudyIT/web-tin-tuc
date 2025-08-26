from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    """Schema để tạo user mới"""
    password: str

class UserUpdate(BaseModel):
    """Schema để cập nhật user"""
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    """Schema để trả về thông tin user"""
    id: int
    is_active: bool
    is_admin: bool
    avatar_url: Optional[str] = None
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    """Schema để đăng nhập"""
    email: EmailStr
    password: str
