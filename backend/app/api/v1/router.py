from fastapi import APIRouter
from app.api.v1.endpoints import health

api_router = APIRouter()

# Core diagnostic and health monitoring
api_router.include_router(health.router, prefix="/health", tags=["Health & Diagnostics"])
