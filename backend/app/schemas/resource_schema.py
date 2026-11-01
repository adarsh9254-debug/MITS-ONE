from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class DepartmentSchema(BaseModel):
    code: str
    name: str
    hod: str

class SubjectSchema(BaseModel):
    code: str
    name: str
    dept: str
    semester: int

class ResourceBase(BaseModel):
    title: str
    dept: str
    semester: int
    subject_code: str
    subject_name: str
    resource_type: str  # Notes, PYQ, Lab Manual, Study PDF
    file_format: str = "PDF"
    file_size: str
    description: str
    preview_summary: Optional[str] = None

class ResourceCreate(ResourceBase):
    pass

class ResourceResponse(ResourceBase):
    id: str
    download_count: int = 0
    uploaded_by: str
    upload_date: str

    model_config = ConfigDict(from_attributes=True)
