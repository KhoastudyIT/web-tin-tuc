from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    """Schema cho JWT token"""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Schema cho token data"""
    email: Optional[str] = None
