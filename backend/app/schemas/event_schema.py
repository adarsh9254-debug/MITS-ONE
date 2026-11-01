from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ClubResponse(BaseModel):
    id: str
    name: str
    category: str
    badge: str
    lead_name: str
    lead_contact: str
    members_count: int
    description: str
    logo: str

    model_config = ConfigDict(from_attributes=True)

class EventResponse(BaseModel):
    id: str
    title: str
    club_id: str
    club_name: str
    category: str
    start_datetime: str
    venue: str
    registration_link: str
    description: str
    is_upcoming: bool = True

    model_config = ConfigDict(from_attributes=True)
