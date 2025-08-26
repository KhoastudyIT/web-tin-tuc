from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..models.user import User
from ..schemas.user import UserUpdate

class UserService:
    """Service xử lý user - Business Logic"""
    
    def get_user_by_id(self, db: Session, user_id: int) -> Optional[User]:
        """Lấy user theo ID"""
        return db.query(User).filter(User.id == user_id).first()
    
    def get_user_by_email(self, db: Session, email: str) -> Optional[User]:
        """Lấy user theo email"""
        return db.query(User).filter(User.email == email).first()
    
    def get_users(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Lấy danh sách users"""
        return db.query(User).offset(skip).limit(limit).all()
    
    def update_user(self, db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
        """Cập nhật thông tin user"""
        db_user = self.get_user_by_id(db, user_id)
        if not db_user:
            return None
        
        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_user, field, value)
        
        db.commit()
        db.refresh(db_user)
        return db_user
    
    def update_last_login(self, db: Session, user_id: int) -> bool:
        """Cập nhật thời gian đăng nhập cuối"""
        db_user = self.get_user_by_id(db, user_id)
        if not db_user:
            return False
        
        db_user.last_login = datetime.utcnow()
        db.commit()
        return True
    
    def toggle_user_status(self, db: Session, user_id: int) -> bool:
        """Bật/tắt trạng thái user"""
        db_user = self.get_user_by_id(db, user_id)
        if not db_user:
            return False
        
        db_user.is_active = not db_user.is_active
        db.commit()
        return True
