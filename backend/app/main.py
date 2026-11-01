from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import Base, engine

# Initialize database tables if not yet created
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=f"{settings.PROJECT_NAME} Backend API",
    description="Backend services for MITS ONE — AI-Powered Student Information & Opportunity Platform for MITS Gwalior.",
    version=settings.PROJECT_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register v1 API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to MITS ONE API",
        "tagline": "Everything a student needs, in one place.",
        "institution": settings.INSTITUTION_NAME,
        "department": settings.DEPARTMENT_NAME,
        "mentor": settings.PROJECT_MENTOR,
        "team": settings.TEAM_MEMBERS,
        "docs_url": "/docs",
        "health_check": f"{settings.API_V1_STR}/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
