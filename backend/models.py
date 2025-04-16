from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class User(BaseModel):
    user_id: str
    username: str
    email: EmailStr
    display_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Note(BaseModel):
    note_id: str
    user_id: str
    content: str
    bucket_path: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
