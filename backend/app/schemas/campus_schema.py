from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class CampusLocationResponse(BaseModel):
    id: str
    name: str
    building_block: str
    floor: str
    category: str  # Department, Laboratory, Library, Auditorium, Admin
    lead_person: str
    directions: str
    timings: str
    facilities: List[str]

    model_config = ConfigDict(from_attributes=True)
