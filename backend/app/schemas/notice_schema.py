from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date

class NoticeBase(BaseModel):
    title: str
    content: str
    category: str  # Academic, Examination, Placement, Events, General
    is_urgent: bool = False
    attachment_name: Optional[str] = None
    attachment_size: Optional[str] = None

class NoticeCreate(NoticeBase):
    pass

class NoticeResponse(NoticeBase):
    id: str
    published_by: str
    published_date: str
    pinned: bool = False

    model_config = ConfigDict(from_attributes=True)
