import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.api.v1.endpoints.opportunities import get_opportunities, get_opportunity_by_id
from app.api.v1.endpoints.events import get_events, get_clubs
from app.api.v1.endpoints.campus import get_campus_locations

def test_opportunity_radar():
    print("Testing Opportunity Radar Endpoints...")
    all_opps = get_opportunities()
    assert len(all_opps) >= 5, f"Expected 5 opportunities, got {len(all_opps)}"
    print(f" Fetch all opportunities passed (Count: {len(all_opps)}).")

    hackathons = get_opportunities(type="Hackathon")
    assert len(hackathons) >= 1
    assert "Smart India Hackathon" in hackathons[0]["title"]
    print(" Type filter (Hackathon) passed.")

    python_opps = get_opportunities(skill="Python")
    assert len(python_opps) >= 3, "Expected at least 3 Python opportunities"
    print(" Skill filter (Python) passed.")

def test_events_and_clubs():
    print("\nTesting Events & Clubs Endpoints...")
    events = get_events()
    assert len(events) >= 3, f"Expected 3 campus events, got {len(events)}"
    print(f" Fetch upcoming events passed (Count: {len(events)}).")

    clubs = get_clubs()
    assert len(clubs) >= 4, f"Expected 4 clubs, got {len(clubs)}"
    nexora = next(c for c in clubs if "Nexora" in c["name"])
    assert "Adarsh Patel" in nexora["lead_name"]
    print(f" Fetch clubs & societies passed (Count: {len(clubs)}).")

def test_campus_navigator():
    print("\nTesting Campus Navigator Endpoints...")
    locations = get_campus_locations()
    assert len(locations) >= 6, f"Expected 6 campus facilities, got {len(locations)}"
    print(f" Fetch all campus facilities passed (Count: {len(locations)}).")

    labs = get_campus_locations(category="Laboratory")
    assert len(labs) >= 1
    assert "Computing Center" in labs[0]["name"]
    print(" Category filter (Laboratory) passed.")

    search_lib = get_campus_locations(search="Central Library")
    assert len(search_lib) >= 1
    assert any("Central Library" in l["name"] for l in search_lib)
    print(" Search query (Central Library) passed.")

if __name__ == "__main__":
    test_opportunity_radar()
    test_events_and_clubs()
    test_campus_navigator()
    print("\n All Phase 2 Core Modules Unit Tests Passed Successfully!")
