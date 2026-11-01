from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
import shutil
import uuid
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User, StudentProfile
from app.models.content import NoticeModel, ResourceModel, OpportunityModel
from app.schemas.notice_schema import NoticeCreate, NoticeResponse
from app.schemas.resource_schema import ResourceCreate, ResourceResponse
from app.schemas.opportunity_schema import OpportunityCreate, OpportunityResponse

router = APIRouter()

UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../uploads/resources"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".pptx"}
MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB

@router.get("/stats", summary="Platform Management Analytics")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """
    Returns platform-wide metrics for administrator dashboard.
    Restricted to Admin role.
    """
    total_students = db.query(StudentProfile).count()
    total_notices = db.query(NoticeModel).count()
    total_resources = db.query(ResourceModel).count()
    total_opportunities = db.query(OpportunityModel).count()

    return {
        "status": "success",
        "admin_user": current_admin.full_name,
        "metrics": {
            "total_students": total_students,
            "total_notices": total_notices,
            "total_resources": total_resources,
            "total_opportunities": total_opportunities
        }
    }

@router.post("/notices", response_model=NoticeResponse, summary="Publish Official Campus Notice")
def create_notice(
    notice_in: NoticeCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """
    Publishes an official announcement with optional urgency flag.
    Restricted to Admin role.
    """
    notice = NoticeModel(
        title=notice_in.title,
        content=notice_in.content,
        category=notice_in.category,
        is_urgent=notice_in.is_urgent,
        published_by=current_admin.full_name,
        attachment_name=notice_in.attachment_name,
        attachment_size=notice_in.attachment_size,
        pinned=notice_in.is_urgent
    )
    db.add(notice)
    db.commit()
    db.refresh(notice)
    return notice

@router.post("/resources", response_model=ResourceResponse, summary="Publish Study Material Entry")
def create_resource(
    res_in: ResourceCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    """
    Creates a new study curriculum entry in the repository.
    Restricted to Admin role.
    """
    resource = ResourceModel(
        title=res_in.title,
        dept=res_in.dept.upper(),
        semester=res_in.semester,
        subject_code=res_in.subject_code.upper(),
        subject_name=res_in.subject_name,
        resource_type=res_in.resource_type,
        file_format=res_in.file_format,
        file_size=res_in.file_size,
        uploaded_by=current_admin.full_name,
        description=res_in.description,
        preview_summary=res_in.preview_summary or "Verified departmental curriculum material.",
        download_count=0
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

@router.post("/upload-document", summary="Securely Upload Study Document File")
async def upload_document(
    file: UploadFile = File(...),
    current_admin: User = Depends(get_current_admin)
):
    """
    Handles multipart file upload with validation:
    1. Checks file extension against safe whitelist (.pdf, .docx, .pptx).
    2. Validates that file does not exceed size limits (25 MB).
    3. Saves securely with sanitized unique filename.
    """
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{file_ext}'. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Read and validate file size
    contents = await file.read()
    file_size_bytes = len(contents)

    if file_size_bytes > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the 25 MB limit."
        )

    # Generate sanitized unique filename
    unique_filename = f"{uuid.uuid4()}_{file.filename.replace(' ', '_')}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as f:
        f.write(contents)

    size_mb = f"{round(file_size_bytes / (1024 * 1024), 2)} MB" if file_size_bytes >= 1024*1024 else f"{round(file_size_bytes / 1024, 1)} KB"

    return {
        "status": "success",
        "original_filename": file.filename,
        "saved_filename": unique_filename,
        "file_size": size_mb,
        "file_format": file_ext.replace(".", "").upper(),
        "uploaded_by": current_admin.full_name
    }
