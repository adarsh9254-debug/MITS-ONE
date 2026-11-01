from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User, StudentProfile
from app.models.content import OpportunityModel
from app.services.ai_service import ai_assistant
from app.services.recommendation_service import recommender
from app.schemas.ai_schema import QueryRequest, QueryResponse, RecommendationResponse
from app.api.v1.endpoints.opportunities import OPPORTUNITIES_DATA

router = APIRouter()

@router.post("/query", response_model=QueryResponse, summary="Natural-Language AI College Query")
def process_ai_query(req: QueryRequest):
    """
    Submits student questions to the MITS RAG Engine:
    1. Semantically searches MITS circulars, syllabi, exam schedules, and facilities.
    2. Uses Google Gemini LLM API if configured, or grounded institutional RAG synthesis.
    3. Returns formatted markdown response with source citations.
    """
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    response_data = ai_assistant.answer_student_query(req.query)
    return QueryResponse(**response_data)

@router.get("/recommendations", response_model=RecommendationResponse, summary="ML Opportunity Recommendations")
def get_ml_recommendations(
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    """
    Machine Learning Opportunity Matching:
    Vectorizes student's registered technical skills with Scikit-learn (TF-IDF + Cosine Similarity)
    and ranks available internships, hackathons, and research fellowships.
    """
    # Fetch profile from DB or default to Adarsh Patel
    student_profile = {
        "skills": "Python, FastAPI, React.js, SQL, Data Structures, Algorithms, Machine Learning",
        "interests": "Artificial Intelligence, Full-Stack, Competitive Programming",
        "department_code": "MAC"
    }
    student_name = "Adarsh Patel"
    student_enrollment = "BTMC25O1008"

    if current_user and current_user.profile:
        student_profile["skills"] = current_user.profile.skills
        student_profile["interests"] = current_user.profile.interests
        student_profile["department_code"] = current_user.profile.department_code
        student_name = current_user.full_name
        student_enrollment = current_user.profile.enrollment_number

    # Compute recommendations over OPPORTUNITIES_DATA
    ranked_opps = recommender.compute_recommendations(student_profile, OPPORTUNITIES_DATA)

    return RecommendationResponse(
        status="success",
        student_name=student_name,
        student_enrollment=student_enrollment,
        total_matched=len(ranked_opps),
        recommendations=ranked_opps
    )
