from fastapi import APIRouter
from app.api.v1.endpoints import health, notices, resources

api_router = APIRouter()

# Core diagnostic and health monitoring
api_router.include_router(health.router, prefix="/health", tags=["Health & Diagnostics"])

# Smart Information Hub (Notices)
api_router.include_router(notices.router, prefix="/notices", tags=["Notices & Announcements"])

# Study Resource Hub (Curriculum Materials)
api_router.include_router(resources.router, prefix="/resources", tags=["Study Resources"])
