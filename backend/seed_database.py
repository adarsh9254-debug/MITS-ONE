import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.core.database import Base, engine, SessionLocal
from app.core.security import get_password_hash
from app.models.user import User, StudentProfile
from app.models.content import NoticeModel, ResourceModel, OpportunityModel

def seed():
    print("Initializing Database Tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Admin User
        admin_user = db.query(User).filter(User.email == "admin@mitsgwl.ac.in").first()
        if not admin_user:
            admin_user = User(
                email="admin@mitsgwl.ac.in",
                hashed_password=get_password_hash("admin123"),
                full_name="Dr. Dheeraj Dixit (Admin)",
                role="admin",
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print(" Created default Admin account: admin@mitsgwl.ac.in (Password: admin123)")
        else:
            print(" Admin user already exists.")

        # 2. Seed Student User (Adarsh Patel)
        student_user = db.query(User).filter(User.email == "adarsh.patel@mitsgwl.ac.in").first()
        if not student_user:
            student_user = User(
                email="adarsh.patel@mitsgwl.ac.in",
                hashed_password=get_password_hash("student123"),
                full_name="Adarsh Patel",
                role="student",
                is_active=True
            )
            db.add(student_user)
            db.flush()

            student_profile = StudentProfile(
                user_id=student_user.id,
                enrollment_number="BTMC25O1008",
                department_code="MAC",
                semester=4,
                cgpa=8.92,
                skills="Python, FastAPI, React.js, SQL, Algorithms, Machine Learning",
                interests="Artificial Intelligence, Full-Stack, Competitive Programming"
            )
            db.add(student_profile)
            db.commit()
            print(" Created default Student account: adarsh.patel@mitsgwl.ac.in (Password: student123, Roll: BTMC25O1008)")
        else:
            print(" Student user already exists.")

        # 3. Seed Notices
        if db.query(NoticeModel).count() == 0:
            notices = [
                NoticeModel(
                    title="Mid-Semester Examination Schedule — Even Semester 2026",
                    category="Examination",
                    is_urgent=True,
                    published_by="Office of the Controller of Examinations",
                    content="All B.Tech students of Mathematics & Computing and allied branches are hereby informed that Mid-Sem examinations will commence from 24th November 2026.",
                    attachment_name="MidSem_Timetable_Nov2026.pdf",
                    attachment_size="1.4 MB",
                    pinned=True
                ),
                NoticeModel(
                    title="Internal Round Nominations for Smart India Hackathon (SIH 2026)",
                    category="Events",
                    is_urgent=True,
                    published_by="MITS Innovation & Incubation Council",
                    content="Teams wishing to represent MITS Gwalior in SIH 2026 must submit their problem statement abstract and prototype pitch before 10th November 2026.",
                    attachment_name="SIH_Internal_Guidelines_2026.pdf",
                    attachment_size="2.1 MB",
                    pinned=True
                ),
                NoticeModel(
                    title="Guest Lecture on Applied Linear Algebra & Machine Learning",
                    category="Academic",
                    is_urgent=False,
                    published_by="Department of Mathematics and Computing",
                    content="The Department of Mathematics and Computing is organizing an expert session on 'High-Dimensional Vector Spaces in LLMs' in the SAC Auditorium.",
                    attachment_name="LinearAlgebra_Lecture_Brochure.pdf",
                    attachment_size="840 KB",
                    pinned=False
                )
            ]
            db.add_all(notices)
            db.commit()
            print(f" Seeded {len(notices)} persistent notices.")

        # 4. Seed Resources
        if db.query(ResourceModel).count() == 0:
            resources = [
                ResourceModel(
                    title="Discrete Mathematics — Graph Theory Lecture Notes",
                    dept="MAC",
                    semester=3,
                    subject_code="MAC-301",
                    subject_name="Discrete Mathematics & Graph Theory",
                    resource_type="Notes",
                    file_format="PDF",
                    file_size="4.2 MB",
                    download_count=412,
                    uploaded_by="Dr. Dheeraj Dixit",
                    description="Planar graphs, trees, Eulerian circuits, recurrence relations, and Boolean algebra.",
                    preview_summary="Unit 1: Set Theory & Relations. Unit 2: Logic. Unit 3: Graph Traversal. Unit 4: Group Theory."
                ),
                ResourceModel(
                    title="Design & Analysis of Algorithms — Lecture Transcripts",
                    dept="MAC",
                    semester=4,
                    subject_code="MAC-402",
                    subject_name="Design & Analysis of Algorithms",
                    resource_type="Notes",
                    file_format="PDF",
                    file_size="5.4 MB",
                    download_count=540,
                    uploaded_by="Dr. Dheeraj Dixit",
                    description="Asymptotic notation proofs, Divide & Conquer, Dynamic Programming, and Greedy methods.",
                    preview_summary="Master Theorem, 0/1 Knapsack, LCS, Dijkstra, and Kruskal algorithms."
                )
            ]
            db.add_all(resources)
            db.commit()
            print(f" Seeded {len(resources)} persistent study resources.")

        # 5. Seed Opportunities
        if db.query(OpportunityModel).count() == 0:
            opportunities = [
                OpportunityModel(
                    title="AI / Python Engineering Intern",
                    organization="Nexora Intelligence Labs",
                    type="Internship",
                    location="Remote / Hybrid (Gwalior)",
                    stipend_or_prize="₹25,000 / month",
                    deadline="2026-11-20",
                    required_skills="Python, FastAPI, React.js, SQL",
                    eligibility="B.Tech MAC / CSE / IT (3rd & 4th Year)",
                    description="Work on scalable FastAPI backends, vector search pipelines, and responsive React web applications.",
                    apply_url="https://nexora.tech/careers",
                    featured=True
                ),
                OpportunityModel(
                    title="Smart India Hackathon (SIH 2026) — Software Edition",
                    organization="Ministry of Education & AICTE",
                    type="Hackathon",
                    location="National Finals / MITS College Round",
                    stipend_or_prize="₹1,00,000 Grand Prize",
                    deadline="2026-11-10",
                    required_skills="Data Structures, Python, React.js, Algorithms",
                    eligibility="All undergraduate engineering teams",
                    description="India's premier nationwide innovation challenge solving real problems.",
                    apply_url="https://sih.gov.in",
                    featured=True
                )
            ]
            db.add_all(opportunities)
            db.commit()
            print(f" Seeded {len(opportunities)} persistent opportunities.")

        print("\n Database Seeding Completed Successfully!")

    finally:
        db.close()

if __name__ == "__main__":
    seed()
