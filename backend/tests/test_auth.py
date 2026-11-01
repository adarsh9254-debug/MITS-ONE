import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import SessionLocal
from app.api.v1.endpoints.auth import login_user, register_student
from app.api.v1.endpoints.admin import get_admin_stats
from app.schemas.auth_schema import UserLogin, UserRegister
from app.api.deps import get_current_user, get_current_admin
from fastapi import HTTPException

def test_auth_and_rbac():
    db = SessionLocal()
    print("Testing Authentication & RBAC...")

    try:
        # 1. Test Student Login
        student_login = UserLogin(email="adarsh.patel@mitsgwl.ac.in", password="student123")
        res_student = login_user(user_in=student_login, db=db)
        assert res_student.token_type == "bearer"
        assert res_student.user.role == "student"
        assert res_student.user.profile.enrollment_number == "BTMC25O1008"
        print(" Student Login passed (Role: student, Roll: BTMC25O1008).")

        # 2. Test Admin Login
        admin_login = UserLogin(email="admin@mitsgwl.ac.in", password="admin123")
        res_admin = login_user(user_in=admin_login, db=db)
        assert res_admin.user.role == "admin"
        print(" Admin Login passed (Role: admin).")

        # 3. Test Invalid Credentials
        try:
            bad_login = UserLogin(email="adarsh.patel@mitsgwl.ac.in", password="wrongpassword")
            login_user(user_in=bad_login, db=db)
            assert False, "Should have thrown 401"
        except HTTPException as e:
            assert e.status_code == 401
            print(" Bad credentials rejection passed (HTTP 401).")

        # 4. Test Student Registration (Atul Kushwah)
        atul_reg = UserRegister(
            email="atul.kushwah@mitsgwl.ac.in",
            password="atulpassword123",
            full_name="Atul Kushwah",
            enrollment_number="BTMC25O1034",
            department_code="MAC",
            semester=4
        )
        res_reg = register_student(user_in=atul_reg, db=db)
        assert res_reg.user.full_name == "Atul Kushwah"
        assert res_reg.user.profile.enrollment_number == "BTMC25O1034"
        print(" Student Registration passed (Atul Kushwah: BTMC25O1034).")

        # 5. Test Role-Based Access Control (RBAC)
        # Attempting Admin action with Student user
        student_obj = get_current_user(db=db, token=res_student.access_token)
        try:
            get_current_admin(current_user=student_obj)
            assert False, "Student should NOT be permitted into admin"
        except HTTPException as e:
            assert e.status_code == 403
            print(" RBAC Enforcement passed: Student rejected from Admin route (HTTP 403 Forbidden).")

        # Admin user accessing admin endpoint
        admin_obj = get_current_user(db=db, token=res_admin.access_token)
        admin_verified = get_current_admin(current_user=admin_obj)
        admin_stats = get_admin_stats(db=db, current_admin=admin_verified)
        assert admin_stats["status"] == "success"
        assert admin_stats["metrics"]["total_students"] >= 2
        print(f" Admin access authorized passed (Active Students: {admin_stats['metrics']['total_students']}).")

        print("\n All Authentication & RBAC Security Tests Passed Successfully!")

    finally:
        db.close()

if __name__ == "__main__":
    test_auth_and_rbac()
