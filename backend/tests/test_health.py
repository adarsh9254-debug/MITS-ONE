"""
MITS ONE — Backend Health & Diagnostic Test
Validates:
1. Environment configuration loading
2. Database engine initialization & query execution (SELECT 1)
3. Health check response payload integrity
"""
import sys
import os

# Ensure current directory is on python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.config import settings
from app.core.database import SessionLocal
from app.api.v1.endpoints.health import health_check

def test_system_diagnostics():
    print("Testing MITS ONE Core Configuration...")
    assert settings.PROJECT_NAME == "MITS ONE", "Project name mismatch"
    assert "Mathematics and Computing" in settings.DEPARTMENT_NAME, "Department mismatch"
    assert "Dr. Dheeraj Dixit" in settings.PROJECT_MENTOR, "Mentor mismatch"
    print(" Configuration loaded successfully.")

    print("\nTesting Database Connection...")
    db = SessionLocal()
    try:
        diagnostics = health_check(db=db)
        print(" Health Diagnostic Output:")
        for k, v in diagnostics.items():
            print(f"  - {k}: {v}")

        assert diagnostics["status"] == "healthy", "Status should be healthy"
        assert diagnostics["database"] == "healthy", "Database should be healthy"
        print("\nAll Core Backend Health & Diagnostic Checks Passed Successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    test_system_diagnostics()
