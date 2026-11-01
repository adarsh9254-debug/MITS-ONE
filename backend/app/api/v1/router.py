from fastapi import APIRouter
from app.api.v1.endpoints import (
    health,
    auth,
    admin,
    notices,
    resources,
    opportunities,
    events,
    campus,
    ai
)

api_router = APIRouter()

# Core diagnostic and health monitoring
api_router.include_router(health.router, prefix="/health", tags=["Health & Diagnostics"])

# Authentication & Registration
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Role-Restricted Admin Operations
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Portal"])

# AI College Assistant & ML Recommendations
api_router.include_router(ai.router, prefix="/ai", tags=["AI & Machine Learning"])

# Smart Information Hub (Notices)
api_router.include_router(notices.router, prefix="/notices", tags=["Notices & Announcements"])

# Study Resource Hub (Curriculum Materials)
api_router.include_router(resources.router, prefix="/resources", tags=["Study Resources"])

# Opportunity Radar (Internships, Jobs, Hackathons)
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunity Radar"])

# Events & Student Clubs
api_router.include_router(events.router, prefix="/events", tags=["Events & Clubs"])

# Campus Navigator
api_router.include_router(campus.router, prefix="/campus", tags=["Campus Navigator"])
