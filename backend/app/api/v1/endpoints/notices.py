from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.notice_schema import NoticeResponse

router = APIRouter()

MOCK_NOTICES = [
    {
        "id": "not-001",
        "title": "Mid-Semester Examination Schedule — Even Semester 2026",
        "category": "Examination",
        "is_urgent": True,
        "published_by": "Office of the Controller of Examinations",
        "published_date": "2026-11-01",
        "content": "All B.Tech students of Mathematics & Computing and allied branches are hereby informed that Mid-Sem examinations will commence from 24th November 2026. Detailed subject-wise timetable and seating plan are attached below.",
        "attachment_name": "MidSem_Timetable_Nov2026.pdf",
        "attachment_size": "1.4 MB",
        "pinned": True,
    },
    {
        "id": "not-002",
        "title": "Internal Round Nominations for Smart India Hackathon (SIH 2026)",
        "category": "Events",
        "is_urgent": True,
        "published_by": "MITS Innovation & Incubation Council",
        "published_date": "2026-10-29",
        "content": "Teams wishing to represent MITS Gwalior in SIH 2026 must submit their problem statement abstract and prototype pitch before 10th November 2026. Internal mentoring session will be guided by Dr. Dheeraj Dixit.",
        "attachment_name": "SIH_Internal_Guidelines_2026.pdf",
        "attachment_size": "2.1 MB",
        "pinned": True,
    },
    {
        "id": "not-003",
        "title": "Guest Lecture on Applied Linear Algebra & Machine Learning",
        "category": "Academic",
        "is_urgent": False,
        "published_by": "Department of Mathematics and Computing",
        "published_date": "2026-10-25",
        "content": "The Department of Mathematics and Computing is organizing an expert session on 'High-Dimensional Vector Spaces in LLMs' in the SAC Auditorium on Friday at 3:00 PM. Attendance is compulsory for Sem 4 & 6 students.",
        "attachment_name": "LinearAlgebra_Lecture_Brochure.pdf",
        "attachment_size": "840 KB",
        "pinned": False,
    },
    {
        "id": "not-004",
        "title": "Campus Placement Drive — Software Development Engineer Interns",
        "category": "Placement",
        "is_urgent": False,
        "published_by": "Training & Placement Cell",
        "published_date": "2026-10-20",
        "content": "Registrations are open for pre-final year B.Tech students (MAC, CSE, IT) with CGPA 7.5 and above for SDE Internship roles. Eligible students must update their resume on the placement portal.",
        "attachment_name": "Placement_Drive_Eligibility_Criteria.pdf",
        "attachment_size": "920 KB",
        "pinned": False,
    },
    {
        "id": "not-005",
        "title": "Central Library Book Return & Digital Repository Access",
        "category": "General",
        "is_urgent": False,
        "published_by": "Central Library MITS",
        "published_date": "2026-10-15",
        "content": "Students who issued reference books for the mid-term assessment must renew or return them by 15th November 2026. Digital IEEE and Springer access is now available via campus intranet.",
        "attachment_name": "Library_Digital_Access_Manual.pdf",
        "attachment_size": "1.1 MB",
        "pinned": False,
    },
]

@router.get("", response_model=List[NoticeResponse], summary="Retrieve Filtered Notices")
def get_notices(
    category: Optional[str] = Query(default=None, description="Category filter (Academic, Examination, Placement, Events, General)"),
    search: Optional[str] = Query(default=None, description="Keyword search in title or content"),
    urgent_only: bool = Query(default=False, description="Filter only urgent priority notices")
):
    """
    Fetch circulars with optional search and category filters.
    Used by Smart Information Hub and Student Dashboard.
    """
    # Normalize inputs for both FastAPI injection and direct unit testing
    cat_str = category if isinstance(category, str) else None
    search_str = search if isinstance(search, str) else None
    urgent_bool = urgent_only if isinstance(urgent_only, bool) else False

    results = MOCK_NOTICES

    if urgent_bool:
        results = [n for n in results if n["is_urgent"]]

    if cat_str and cat_str.lower() != "all":
        results = [n for n in results if n["category"].lower() == cat_str.lower()]

    if search_str:
        q = search_str.lower()
        results = [
            n for n in results
            if q in n["title"].lower() or q in n["content"].lower() or q in n["published_by"].lower()
        ]

    return results

@router.get("/{notice_id}", response_model=NoticeResponse, summary="Get Single Notice Details")
def get_notice_by_id(notice_id: str):
    """
    Retrieve notice by unique identifier.
    """
    for notice in MOCK_NOTICES:
        if notice["id"] == notice_id:
            return notice
    raise HTTPException(status_code=404, detail="Notice not found")
