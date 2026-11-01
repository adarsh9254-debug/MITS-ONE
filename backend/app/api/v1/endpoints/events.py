from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.event_schema import EventResponse, ClubResponse

router = APIRouter()

CLUBS_DATA = [
    {
        "id": "club-001",
        "name": "Team Nexora Technical Chapter",
        "category": "Technical",
        "badge": "Student Tech Chapter",
        "lead_name": "Adarsh Patel & Atul Kushwah",
        "lead_contact": "nexora@mitsgwl.ac.in",
        "members_count": 140,
        "description": "Student-driven engineering chapter specializing in full-stack web applications, Python backend development, and open-source contributions.",
        "logo": "💻",
    },
    {
        "id": "club-002",
        "name": "MITS Coding & Algorithmic Club",
        "category": "Technical",
        "badge": "Competitive Programming",
        "lead_name": "Dr. Dheeraj Dixit (Faculty Lead)",
        "lead_contact": "codingclub@mitsgwl.ac.in",
        "members_count": 320,
        "description": "Fosters competitive programming problem-solving skills, weekly LeetCode contests, and mentoring for ACM-ICPC and Google Code Jam.",
        "logo": "⚡",
    },
    {
        "id": "club-003",
        "name": "MITS Robotics & IoT Society",
        "category": "Technical",
        "badge": "Hardware & Automation",
        "lead_name": "Harshit Verma (Sem 6)",
        "lead_contact": "robotics@mitsgwl.ac.in",
        "members_count": 185,
        "description": "Hands-on robotics club building autonomous drones, line-followers, and IoT edge devices for national inter-college tech fests.",
        "logo": "🤖",
    },
    {
        "id": "club-004",
        "name": "Scintilla Cultural Society",
        "category": "Cultural",
        "badge": "Arts & Drama",
        "lead_name": "Priya Sharma (Sem 6)",
        "lead_contact": "scintilla@mitsgwl.ac.in",
        "members_count": 260,
        "description": "Organizes MITS annual cultural festival, musical concerts, street plays (Nukkad Natak), and fine arts exhibitions.",
        "logo": "🎭",
    },
]

EVENTS_DATA = [
    {
        "id": "ev-001",
        "title": "Nexora HackNight 2026 — 24-Hour Code Sprint",
        "club_id": "club-001",
        "club_name": "Team Nexora Technical Chapter",
        "category": "Hackathon",
        "start_datetime": "2026-11-21 09:00 AM",
        "venue": "Computing Center Lab 3 & 4 (Block B)",
        "registration_link": "https://nexora.tech/hacknight",
        "description": "A fast-paced 24-hour hackathon focused on building student-centric AI and web applications with real cash prizes and mentorship.",
        "is_upcoming": True,
    },
    {
        "id": "ev-002",
        "title": "Expert Workshop: Graph Neural Networks & Transformers",
        "club_id": "club-002",
        "club_name": "MITS Coding & Algorithmic Club",
        "category": "Workshop",
        "start_datetime": "2026-11-17 02:00 PM",
        "venue": "SAC Auditorium",
        "registration_link": "https://mitsgwl.ac.in/events/gnn-workshop",
        "description": "Specialized masterclass on graph representation learning and modern LLM attention mechanisms by visiting IIT professors.",
        "is_upcoming": True,
    },
    {
        "id": "ev-003",
        "title": "Annual Inter-Departmental Coding Olympiad",
        "club_id": "club-002",
        "club_name": "MITS Coding & Algorithmic Club",
        "category": "Competition",
        "start_datetime": "2026-11-28 10:00 AM",
        "venue": "Department of Mathematics & Computing Labs",
        "registration_link": "https://mitsgwl.ac.in/events/olympiad-2026",
        "description": "Annual algorithm showdown open to all B.Tech branches. Solve 6 algorithmic problems in 3 hours.",
        "is_upcoming": True,
    },
]

@router.get("", response_model=List[EventResponse], summary="List Campus Events")
def get_events(
    category: Optional[str] = Query(default=None),
    is_upcoming: bool = Query(default=True)
):
    cat_str = category if isinstance(category, str) else None
    upcoming_bool = is_upcoming if isinstance(is_upcoming, bool) else True

    results = [e for e in EVENTS_DATA if e["is_upcoming"] == upcoming_bool]
    if cat_str and cat_str.lower() != "all":
        results = [e for e in results if e["category"].lower() == cat_str.lower()]
    return results

@router.get("/clubs", response_model=List[ClubResponse], summary="List Student Clubs & Societies")
def get_clubs(category: Optional[str] = Query(default=None)):
    cat_str = category if isinstance(category, str) else None
    results = CLUBS_DATA
    if cat_str and cat_str.lower() != "all":
        results = [c for c in results if c["category"].lower() == cat_str.lower()]
    return results
