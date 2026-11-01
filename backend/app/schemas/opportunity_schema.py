from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class OpportunityBase(BaseModel):
    title: str
    organization: str
    type: str  # Internship, Job, Hackathon, Competition, Scholarship
    location: str
    stipend_or_prize: str
    deadline: str
    required_skills: List[str]
    eligibility: str
    description: str
    apply_url: str
    featured: bool = False

class OpportunityCreate(OpportunityBase):
    pass

class OpportunityResponse(OpportunityBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
