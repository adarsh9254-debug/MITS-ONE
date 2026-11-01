from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.campus_schema import CampusLocationResponse

router = APIRouter()

CAMPUS_LOCATIONS_DATA = [
    {
        "id": "loc-001",
        "name": "Department of Mathematics and Computing",
        "building_block": "Block B (Academic Complex)",
        "floor": "2nd Floor, Room B-204",
        "category": "Department",
        "lead_person": "Dr. Dheeraj Dixit (HOD)",
        "directions": "Enter Main Gate, proceed past Central Garden, take staircase inside Block B to the 2nd floor.",
        "timings": "09:30 AM - 05:00 PM",
        "facilities": ["Faculty Chambers", "MAC Departmental Library", "Seminar Hall B-2"],
    },
    {
        "id": "loc-002",
        "name": "Central Computing Center (Labs 1, 2, 3 & 4)",
        "building_block": "Computing Center Building",
        "floor": "Ground & 1st Floor",
        "category": "Laboratory",
        "lead_person": "Lab Superintendent",
        "directions": "Adjacent to Central Library. Enter glass lobby for Labs 1-4.",
        "timings": "08:30 AM - 07:00 PM",
        "facilities": ["High-Performance Computing Cluster", "Gigabit LAN", "Online Examination Terminals"],
    },
    {
        "id": "loc-003",
        "name": "Central Library & Digital Knowledge Repository",
        "building_block": "Dr. S. Radhakrishnan Central Library",
        "floor": "3-Storey Dedicated Building",
        "category": "Library",
        "lead_person": "Chief Librarian",
        "directions": "Opposite the Administrative Block, adjacent to the North Lawn.",
        "timings": "08:00 AM - 08:00 PM (Extended during exams)",
        "facilities": ["Reading Halls", "Digital IEEE Terminal Zone", "Book Issue Counters", "Reprographic Center"],
    },
    {
        "id": "loc-004",
        "name": "Student Activity Centre (SAC) & Main Auditorium",
        "building_block": "SAC Complex",
        "floor": "Ground Floor",
        "category": "Auditorium",
        "lead_person": "Dean of Student Welfare",
        "directions": "Follow campus main driveway towards the South Pavilion and Sports Ground.",
        "timings": "09:00 AM - 09:00 PM",
        "facilities": ["1,200 Capacity Auditorium", "Indoor Sports Arena", "Club Meeting Rooms", "Cafeteria"],
    },
    {
        "id": "loc-005",
        "name": "Office of the Controller of Examinations (Exam Cell)",
        "building_block": "Administrative Block",
        "floor": "1st Floor, Room A-108",
        "category": "Admin",
        "lead_person": "Controller of Examinations",
        "directions": "Located inside the heritage Main Administrative building, 1st floor west wing.",
        "timings": "10:00 AM - 04:30 PM",
        "facilities": ["Admit Card Verification", "Degree & Grade Sheet Window", "Confidential Exam Chambers"],
    },
    {
        "id": "loc-006",
        "name": "Training & Placement Cell (T&P)",
        "building_block": "Administrative Block",
        "floor": "Ground Floor, Room A-014",
        "category": "Admin",
        "lead_person": "T&P Officer",
        "directions": "Main Building ground floor, opposite the Syndicate Room.",
        "timings": "09:30 AM - 05:30 PM",
        "facilities": ["Interview Suites", "Group Discussion Rooms", "Corporate Waiting Lounge"],
    },
]

@router.get("", response_model=List[CampusLocationResponse], summary="Search Campus Facilities")
def get_campus_locations(
    category: Optional[str] = Query(default=None, description="Department, Laboratory, Library, Auditorium, Admin"),
    search: Optional[str] = Query(default=None, description="Search keyword in facility name, block, or room")
):
    cat_str = category if isinstance(category, str) else None
    search_str = search if isinstance(search, str) else None

    results = CAMPUS_LOCATIONS_DATA

    if cat_str and cat_str.lower() != "all":
        results = [l for l in results if l["category"].lower() == cat_str.lower()]

    if search_str:
        q = search_str.lower().strip()
        results = [
            l for l in results
            if q in l["name"].lower() or q in l["building_block"].lower() or q in l["floor"].lower() or any(q in f.lower() for f in l["facilities"])
        ]

    return results
