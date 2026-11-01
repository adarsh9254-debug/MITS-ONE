from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timezone
from app.core.config import settings
from app.core.database import get_db

router = APIRouter()

@router.get("", summary="System Health & Diagnostic Check")
def health_check(db: Session = Depends(get_db)):
    """
    Diagnostic endpoint that verifies:
    1. FastAPI ASGI application is active and receiving requests.
    2. Database connection is responding.
    3. Institutional and team metadata is properly configured.
    """
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "app": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "environment": settings.ENVIRONMENT,
        "server_time": datetime.now(timezone.utc).isoformat(),
        "institution": settings.INSTITUTION_NAME,
        "department": settings.DEPARTMENT_NAME,
        "project_mentor": settings.PROJECT_MENTOR,
        "team": settings.TEAM_MEMBERS,
        "database": db_status
    }
