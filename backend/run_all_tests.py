"""
MITS ONE — Comprehensive Test Runner
Madhav Institute of Technology and Science, Gwalior
Department of Mathematics and Computing
Team Nexora: Adarsh Patel (BTMC25O1008) & Atul Kushwah (BTMC25O1034)
Project Mentor: Dr. Dheeraj Dixit (HOD)

Executes all unit, integration, and security test suites:
1. System Diagnostics & Database Engine (test_health.py)
2. Smart Information Hub Endpoints (test_notices.py)
3. Study Resource Hub Endpoints (test_resources.py)
4. Opportunity Radar, Events, and Campus Navigator (test_modules.py)
5. Authentication, Bcrypt, JWT, and RBAC Security (test_auth.py)
6. Scikit-learn Opportunity Recommender & Grounded RAG Assistant (test_ai.py)
"""
import sys
import os
import time

# Ensure backend root on path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from tests.test_health import test_system_diagnostics
from tests.test_notices import test_notices_endpoints
from tests.test_resources import test_resources_endpoints
from tests.test_modules import test_phase2_modules
from tests.test_auth import test_auth_and_rbac
from tests.test_ai import test_ai_subsystem

def main():
    print("=" * 75)
    print("           MITS ONE — AUTOMATED TEST SUITE & VERIFICATION HARNESS")
    print("      Madhav Institute of Technology and Science (MITS), Gwalior")
    print("              Department of Mathematics and Computing")
    print("        Team Nexora: Adarsh Patel & Atul Kushwah | Mentor: Dr. Dheeraj Dixit")
    print("=" * 75)

    suites = [
        ("System Diagnostics & Health Check", test_system_diagnostics),
        ("Smart Information Hub (Notices & Circulars)", test_notices_endpoints),
        ("Study Resource Hub (Hierarchical Repository)", test_resources_endpoints),
        ("Campus Modules (Radar, Events, Clubs, Navigator)", test_phase2_modules),
        ("Authentication, Bcrypt, JWT & RBAC Guardrails", test_auth_and_rbac),
        ("Scikit-Learn Recommender & Grounded RAG Assistant", test_ai_subsystem),
    ]

    total_start = time.time()
    passed = 0
    failed = 0

    for name, test_func in suites:
        print(f"\n--- [RUNNING]: {name} ---")
        suite_start = time.time()
        try:
            test_func()
            elapsed = time.time() - suite_start
            print(f"[PASSED]: {name} ({elapsed:.3f}s)")
            passed += 1
        except Exception as e:
            elapsed = time.time() - suite_start
            print(f"[FAILED]: {name} ({elapsed:.3f}s)")
            print(f"Error Details: {e}")
            failed += 1

    total_time = time.time() - total_start

    print("\n" + "=" * 75)
    print("                         TEST SUITE SUMMARY")
    print(f" Total Suites Executed : {len(suites)}")
    print(f" Suites Passed         : {passed} / {len(suites)}")
    print(f" Suites Failed         : {failed}")
    print(f" Total Execution Time  : {total_time:.3f} seconds")
    print("=" * 75)

    if failed == 0:
        print("\n [SUCCESS] ALL MITS ONE CORE BACKEND & AI MODULES VERIFIED 100% OPERATIONAL.\n")
        sys.exit(0)
    else:
        print(f"\n [FAILURE] {failed} test suite(s) reported issues. Check stack trace above.\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
