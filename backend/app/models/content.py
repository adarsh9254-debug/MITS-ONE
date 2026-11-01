from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text
from datetime import datetime, timezone
import uuid
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class NoticeModel(Base):
    __tablename__ = "notices"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(50), default="General", index=True)
    is_urgent = Column(Boolean, default=False)
    published_by = Column(String(255), nullable=False)
    attachment_name = Column(String(255), nullable=True)
    attachment_size = Column(String(50), nullable=True)
    pinned = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class ResourceModel(Base):
    __tablename__ = "study_resources"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    title = Column(String(255), nullable=False)
    dept = Column(String(20), index=True, nullable=False)
    semester = Column(Integer, index=True, nullable=False)
    subject_code = Column(String(50), index=True, nullable=False)
    subject_name = Column(String(255), nullable=False)
    resource_type = Column(String(50), index=True, nullable=False)  # Notes, PYQ, Lab Manual, Study PDF
    file_format = Column(String(20), default="PDF")
    file_size = Column(String(50), default="1.0 MB")
    file_path = Column(String(500), nullable=True)
    download_count = Column(Integer, default=0)
    uploaded_by = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    preview_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class OpportunityModel(Base):
    __tablename__ = "opportunities"

    id = Column(String(36), primary_key=True, default=generate_uuid, index=True)
    title = Column(String(255), nullable=False)
    organization = Column(String(255), nullable=False)
    type = Column(String(50), index=True, nullable=False)  # Internship, Job, Hackathon, Competition, Scholarship
    location = Column(String(255), default="Remote / Hybrid")
    stipend_or_prize = Column(String(100), nullable=False)
    deadline = Column(String(50), nullable=False)
    required_skills = Column(Text, nullable=False)  # Stored as comma-separated
    eligibility = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    apply_url = Column(String(500), nullable=False)
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
