import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.api.v1.endpoints.resources import (
    get_resources,
    get_departments,
    get_subjects,
    get_resource_by_id,
    download_resource
)

def test_resources_endpoints():
    print("Testing Study Resources Endpoints...")

    # 1. Fetch all
    all_res = get_resources()
    assert len(all_res) >= 11, f"Expected at least 11 resources, got {len(all_res)}"
    print(f" Fetch all study resources passed (Count: {len(all_res)}).")

    # 2. Hierarchy Filter: Department (MAC) + Semester (3)
    mac_sem3 = get_resources(dept="MAC", semester=3)
    assert len(mac_sem3) == 3, f"Expected 3 MAC Sem 3 resources, got {len(mac_sem3)}"
    for r in mac_sem3:
        assert r["dept"] == "MAC"
        assert r["semester"] == 3
    print(" Department + Semester hierarchical filtering passed.")

    # 3. Resource Type Filter (PYQ)
    pyqs = get_resources(resource_type="PYQ")
    assert len(pyqs) >= 3, "Expected at least 3 PYQs"
    for r in pyqs:
        assert r["resource_type"] == "PYQ"
    print(" Resource type filtering (PYQ) passed.")

    # 4. Search Filter
    search_res = get_resources(search="Graph Theory")
    assert len(search_res) >= 1
    assert "Graph Theory" in search_res[0]["title"]
    print(" Keyword search filtering passed.")

    # 5. Metadata Endpoints
    depts = get_departments()
    assert len(depts) == 4, f"Expected 4 departments, got {len(depts)}"
    mac_dept = next(d for d in depts if d["code"] == "MAC")
    assert "Dr. Dheeraj Dixit" in mac_dept["hod"]
    print(" Departments metadata check passed.")

    subjects = get_subjects(dept="MAC", semester=4)
    assert len(subjects) == 3, f"Expected 3 subjects for MAC Sem 4, got {len(subjects)}"
    print(" Filtered subjects metadata check passed.")

    # 6. Download Counter Increment
    res_before = get_resource_by_id("res-001")
    count_before = res_before["download_count"]
    download_res = download_resource("res-001")
    assert download_res["download_count"] == count_before + 1
    print(" Document download counter increment passed.")

    print("\n All Study Resources Endpoint Unit Tests Passed Successfully!")

if __name__ == "__main__":
    test_resources_endpoints()
