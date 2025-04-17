from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class User(BaseModel):
    user_id: str
    email: EmailStr
    created_at: datetime = Field(default_factory=datetime.utcnow)
    num_notes: int

class Note(BaseModel):
    note_id: str
    user_id: str
    content: str
    bucket_path: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
