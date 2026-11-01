import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.api.v1.endpoints.notices import get_notices, get_notice_by_id

def test_notices_endpoints():
    print("Testing Notices Endpoints...")

    # 1. Fetch all
    all_notices = get_notices()
    assert len(all_notices) == 5, f"Expected 5 notices, got {len(all_notices)}"
    print(" Fetch all notices passed (Count: 5).")

    # 2. Category filter
    exam_notices = get_notices(category="Examination")
    assert len(exam_notices) == 1, "Expected 1 Examination notice"
    assert exam_notices[0]["category"] == "Examination"
    print(" Category filter passed.")

    # 3. Urgent filter
    urgent_notices = get_notices(urgent_only=True)
    assert len(urgent_notices) == 2, f"Expected 2 urgent notices, got {len(urgent_notices)}"
    print(" Urgent priority filter passed.")

    # 4. Search query
    search_results = get_notices(search="Hackathon")
    assert len(search_results) == 1, "Expected 1 search match for 'Hackathon'"
    assert "Smart India Hackathon" in search_results[0]["title"]
    print(" Search keyword filter passed.")

    # 5. Fetch single notice by id
    notice_1 = get_notice_by_id("not-001")
    assert notice_1["id"] == "not-001"
    print(" Fetch notice by ID passed.")

    print("\n All Notices Endpoint Unit Tests Passed Successfully!")

if __name__ == "__main__":
    test_notices_endpoints()
