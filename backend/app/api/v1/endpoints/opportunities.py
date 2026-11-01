from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.opportunity_schema import OpportunityResponse

router = APIRouter()

OPPORTUNITIES_DATA = [
    {
        "id": "opp-001",
        "title": "AI / Python Engineering Intern",
        "organization": "Nexora Intelligence Labs",
        "type": "Internship",
        "location": "Remote / Hybrid (Gwalior)",
        "stipend_or_prize": "₹25,000 / month",
        "deadline": "2026-11-20",
        "required_skills": ["Python", "FastAPI", "React.js", "SQL"],
        "eligibility": "B.Tech MAC / CSE / IT (3rd & 4th Year)",
        "description": "Work directly on scalable FastAPI backends, vector search pipelines, and responsive React web applications. Mentored by experienced full-stack engineers.",
        "apply_url": "https://nexora.tech/careers",
        "featured": True,
    },
    {
        "id": "opp-002",
        "title": "Smart India Hackathon (SIH 2026) — Software Edition",
        "organization": "Ministry of Education & AICTE",
        "type": "Hackathon",
        "location": "National Finals / MITS College Round",
        "stipend_or_prize": "₹1,00,000 Grand Prize per Problem",
        "deadline": "2026-11-10",
        "required_skills": ["Data Structures", "Python", "React.js", "Algorithms"],
        "eligibility": "All undergraduate engineering teams (6 members including at least 1 female teammate)",
        "description": "India's premier nationwide innovation challenge solving real problems posed by Government Ministries and Industry Leaders.",
        "apply_url": "https://sih.gov.in",
        "featured": True,
    },
    {
        "id": "opp-003",
        "title": "Summer Research Fellowship — Scientific Computing",
        "organization": "IIT Bombay & MITS Joint R&D Cell",
        "type": "Scholarship",
        "location": "IIT Bombay Campus / Hybrid",
        "stipend_or_prize": "₹15,000 / month + Accommodation",
        "deadline": "2026-12-05",
        "required_skills": ["Python", "Algorithms", "Machine Learning"],
        "eligibility": "B.Tech Mathematics and Computing with CGPA > 8.0",
        "description": "2-month funded summer research internship focusing on numerical optimization, high-dimensional matrices, and scientific AI modeling.",
        "apply_url": "https://iitb.ac.in/research-fellowships",
        "featured": False,
    },
    {
        "id": "opp-004",
        "title": "Junior Data Analyst & Machine Learning Trainee",
        "organization": "Tata Consultancy Services (TCS Digital)",
        "type": "Job",
        "location": "Indore / Pune / Bangalore",
        "stipend_or_prize": "₹7.5 LPA CTC",
        "deadline": "2026-11-30",
        "required_skills": ["SQL", "Python", "Machine Learning"],
        "eligibility": "Final and Pre-Final Year B.Tech Students (No active backlogs)",
        "description": "Entry-level engineering role involving SQL database administration, predictive model maintenance, and enterprise data analytics pipelines.",
        "apply_url": "https://nextstep.tcs.com",
        "featured": False,
    },
    {
        "id": "opp-005",
        "title": "ACM-ICPC Gwalior-Kanpur Regional Competitive Contest",
        "organization": "International Collegiate Programming Contest",
        "type": "Competition",
        "location": "Online Preliminary Round",
        "stipend_or_prize": "Certificate of Merit + World Finals Qualifier",
        "deadline": "2026-11-15",
        "required_skills": ["Algorithms", "Data Structures", "C++ / Python"],
        "eligibility": "College teams of 3 members from recognized Indian universities",
        "description": "The Olympics of competitive programming. Tackle complex graph theory, dynamic programming, and computational geometry challenges.",
        "apply_url": "https://icpc.global",
        "featured": True,
    },
]

@router.get("", response_model=List[OpportunityResponse], summary="Retrieve Filtered Opportunities")
def get_opportunities(
    type: Optional[str] = Query(default=None, description="Category filter (Internship, Job, Hackathon, Competition, Scholarship)"),
    skill: Optional[str] = Query(default=None, description="Required skill filter (e.g. Python, SQL)"),
    search: Optional[str] = Query(default=None, description="Search keyword in title or organization")
):
    type_str = type if isinstance(type, str) else None
    skill_str = skill if isinstance(skill, str) else None
    search_str = search if isinstance(search, str) else None

    results = OPPORTUNITIES_DATA

    if type_str and type_str.lower() != "all":
        results = [o for o in results if o["type"].lower() == type_str.lower()]

    if skill_str:
        s_low = skill_str.lower()
        results = [
            o for o in results
            if any(s_low in s.lower() for s in o["required_skills"])
        ]

    if search_str:
        q = search_str.lower().strip()
        results = [
            o for o in results
            if q in o["title"].lower() or q in o["organization"].lower() or q in o["description"].lower()
        ]

    return results

@router.get("/{opp_id}", response_model=OpportunityResponse, summary="Get Single Opportunity Details")
def get_opportunity_by_id(opp_id: str):
    for opp in OPPORTUNITIES_DATA:
        if opp["id"] == opp_id:
            return opp
    raise HTTPException(status_code=404, detail="Opportunity not found")
