from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any

class QueryRequest(BaseModel):
    query: str
    conversation_history: Optional[List[Dict[str, str]]] = None

class QueryResponse(BaseModel):
    answer: str
    source: str
    citations: List[str]
    matched_records: List[Dict[str, Any]]

class RecommendationResponse(BaseModel):
    status: str = "success"
    student_name: str
    student_enrollment: str
    total_matched: int
    recommendations: List[Dict[str, Any]]
