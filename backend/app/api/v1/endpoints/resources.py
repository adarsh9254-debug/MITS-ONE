from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.resource_schema import (
    ResourceResponse,
    DepartmentSchema,
    SubjectSchema
)

router = APIRouter()

DEPARTMENTS_DATA = [
    {"code": "MAC", "name": "Mathematics and Computing", "hod": "Dr. Dheeraj Dixit"},
    {"code": "CSE", "name": "Computer Science and Engineering", "hod": "Dr. Akhilesh Tiwari"},
    {"code": "IT", "name": "Information Technology", "hod": "Dr. Sanjeev Sharma"},
    {"code": "ECE", "name": "Electronics and Communication", "hod": "Dr. Laxmi Shrivastava"},
]

SUBJECTS_DATA = [
    {"code": "MAC-101", "name": "Calculus & Analytical Geometry", "dept": "MAC", "semester": 1},
    {"code": "MAC-201", "name": "Linear Algebra & Differential Equations", "dept": "MAC", "semester": 2},
    {"code": "MAC-301", "name": "Discrete Mathematics & Graph Theory", "dept": "MAC", "semester": 3},
    {"code": "MAC-302", "name": "Data Structures & Algorithms", "dept": "MAC", "semester": 3},
    {"code": "MAC-401", "name": "Probability & Stochastic Processes", "dept": "MAC", "semester": 4},
    {"code": "MAC-402", "name": "Design & Analysis of Algorithms", "dept": "MAC", "semester": 4},
    {"code": "MAC-403", "name": "Operating Systems & System Architecture", "dept": "MAC", "semester": 4},
    {"code": "MAC-501", "name": "Scientific Computing & Numerical Methods", "dept": "MAC", "semester": 5},
    {"code": "MAC-502", "name": "Database Management Systems", "dept": "MAC", "semester": 5},
    {"code": "MAC-601", "name": "Machine Learning & Statistical Pattern Recognition", "dept": "MAC", "semester": 6},
    {"code": "CS-301", "name": "Object Oriented Programming (Java/C++)", "dept": "CSE", "semester": 3},
    {"code": "CS-401", "name": "Computer Organization & Architecture", "dept": "CSE", "semester": 4},
    {"code": "CS-501", "name": "Theory of Computation & Automata", "dept": "CSE", "semester": 5},
]

RESOURCES_DATA = [
    {
        "id": "res-001",
        "title": "Discrete Mathematics — Complete Graph Theory & Combinatorics Notes",
        "dept": "MAC",
        "semester": 3,
        "subject_code": "MAC-301",
        "subject_name": "Discrete Mathematics & Graph Theory",
        "resource_type": "Notes",
        "file_format": "PDF",
        "file_size": "4.2 MB",
        "download_count": 412,
        "uploaded_by": "Faculty (MAC)",
        "upload_date": "2026-09-15",
        "description": "Handwritten and typed comprehensive lecture notes covering planar graphs, trees, Eulerian circuits, recurrence relations, and Boolean algebra.",
        "preview_summary": "Unit 1: Set Theory & Relations. Unit 2: Propositional Logic. Unit 3: Graph Traversal Algorithms (BFS/DFS) and Spanning Trees. Unit 4: Group Theory basics.",
    },
    {
        "id": "res-002",
        "title": "Mid-Term & End-Sem Previous Year Papers (2022-2025)",
        "dept": "MAC",
        "semester": 3,
        "subject_code": "MAC-301",
        "subject_name": "Discrete Mathematics & Graph Theory",
        "resource_type": "PYQ",
        "file_format": "PDF",
        "file_size": "6.8 MB",
        "download_count": 628,
        "uploaded_by": "Examination Archive",
        "upload_date": "2026-09-18",
        "description": "Compiled solved and unsolved university question papers for Discrete Mathematics with grading schemes.",
        "preview_summary": "Contains 8 sets of past examination papers with solution hints for high-frequency numerical problems.",
    },
    {
        "id": "res-003",
        "title": "Data Structures Lab Manual & C++ Implementation Codebook",
        "dept": "MAC",
        "semester": 3,
        "subject_code": "MAC-302",
        "subject_name": "Data Structures & Algorithms",
        "resource_type": "Lab Manual",
        "file_format": "PDF",
        "file_size": "3.1 MB",
        "download_count": 389,
        "uploaded_by": "Computing Lab Lead",
        "upload_date": "2026-09-22",
        "description": "Standard lab assignments including Linked Lists, Stacks, Queues, Binary Search Trees, and AVL Trees with input/output test cases.",
        "preview_summary": "14 Lab Experiments fully documented with algorithm flowcharts, complexity analysis, and clean C++ implementation.",
    },
    {
        "id": "res-004",
        "title": "Design & Analysis of Algorithms — Lecture Transcripts & Proofs",
        "dept": "MAC",
        "semester": 4,
        "subject_code": "MAC-402",
        "subject_name": "Design & Analysis of Algorithms",
        "resource_type": "Notes",
        "file_format": "PDF",
        "file_size": "5.4 MB",
        "download_count": 540,
        "uploaded_by": "Dr. Dheeraj Dixit",
        "upload_date": "2026-10-05",
        "description": "Asymptotic notation proofs, Divide and Conquer recurrence solutions (Master Theorem), Greedy paradigms, and Dynamic Programming algorithms.",
        "preview_summary": "Covers Divide & Conquer, Dynamic Programming (0/1 Knapsack, LCS), Greedy methods (Dijkstra, Kruskal), and NP-Completeness introductions.",
    },
    {
        "id": "res-005",
        "title": "DAA Mid-Sem Question Papers & Answer Keys (2023-2025)",
        "dept": "MAC",
        "semester": 4,
        "subject_code": "MAC-402",
        "subject_name": "Design & Analysis of Algorithms",
        "resource_type": "PYQ",
        "file_format": "PDF",
        "file_size": "3.7 MB",
        "download_count": 472,
        "uploaded_by": "Department Examination Lead",
        "upload_date": "2026-10-12",
        "description": "Past question papers for DAA with sample step-by-step trace tables for DP and Dijkstra's algorithm.",
        "preview_summary": "Mid-Term Question Sets 2023, 2024, 2025 with model answers for dynamic programming matrix-chain multiplication.",
    },
    {
        "id": "res-006",
        "title": "Operating Systems — Process Scheduling & Virtual Memory Lab Manual",
        "dept": "MAC",
        "semester": 4,
        "subject_code": "MAC-403",
        "subject_name": "Operating Systems & System Architecture",
        "resource_type": "Lab Manual",
        "file_format": "PDF",
        "file_size": "2.8 MB",
        "download_count": 310,
        "uploaded_by": "Systems Lab Coordinator",
        "upload_date": "2026-10-18",
        "description": "UNIX/Linux process creation (`fork`), CPU scheduling simulators (FCFS, SJF, Round Robin), and Banker's deadlock avoidance in C.",
        "preview_summary": "Complete lab experiments covering POSIX threads, semaphore synchronization, page replacement algorithms, and file system calls.",
    },
    {
        "id": "res-007",
        "title": "Probability & Stochastic Processes — Formula Handbook & Theorems",
        "dept": "MAC",
        "semester": 4,
        "subject_code": "MAC-401",
        "subject_name": "Probability & Stochastic Processes",
        "resource_type": "Study PDF",
        "file_format": "PDF",
        "file_size": "1.9 MB",
        "download_count": 295,
        "uploaded_by": "Faculty (MAC)",
        "upload_date": "2026-10-21",
        "description": "Cheat sheet and formula guide covering Bayes Theorem, Markov Chains, Poisson processes, and Gaussian distributions for machine learning.",
        "preview_summary": "Formula reference guide for continuous random variables, joint probability distributions, and transition probability matrices.",
    },
    {
        "id": "res-008",
        "title": "Calculus & Analytical Geometry — 1st Year Solved Papers",
        "dept": "MAC",
        "semester": 1,
        "subject_code": "MAC-101",
        "subject_name": "Calculus & Analytical Geometry",
        "resource_type": "PYQ",
        "file_format": "PDF",
        "file_size": "4.8 MB",
        "download_count": 780,
        "uploaded_by": "Freshman Academic Cell",
        "upload_date": "2026-08-20",
        "description": "Four years of mid-term and end-term calculus exam papers covering partial derivatives, maxima-minima, and multiple integrals.",
        "preview_summary": "Complete solutions for Rolle's Theorem, Mean Value Theorems, and Double Integrals.",
    },
    {
        "id": "res-009",
        "title": "Linear Algebra & ODE — Complete Matrix Theory Notes",
        "dept": "MAC",
        "semester": 2,
        "subject_code": "MAC-201",
        "subject_name": "Linear Algebra & Differential Equations",
        "resource_type": "Notes",
        "file_format": "PDF",
        "file_size": "3.9 MB",
        "download_count": 615,
        "uploaded_by": "Faculty (MAC)",
        "upload_date": "2026-08-25",
        "description": "Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Orthogonal projections, and second-order differential equations.",
        "preview_summary": "Comprehensive vector space notes, Gram-Schmidt orthogonalization, and Cauchy-Euler equations.",
    },
    {
        "id": "res-010",
        "title": "Machine Learning & Pattern Recognition — Foundations Lecture Notes",
        "dept": "MAC",
        "semester": 6,
        "subject_code": "MAC-601",
        "subject_name": "Machine Learning & Statistical Pattern Recognition",
        "resource_type": "Notes",
        "file_format": "PDF",
        "file_size": "6.1 MB",
        "download_count": 520,
        "uploaded_by": "AI Lab Mentor",
        "upload_date": "2026-09-02",
        "description": "Mathematical formulations of Linear Regression, Logistic Regression, Support Vector Machines, Decision Trees, and Neural Network Backpropagation.",
        "preview_summary": "Includes complete gradient descent mathematical derivations, loss functions, regularization (L1/L2), and evaluation metrics (ROC/AUC).",
    },
    {
        "id": "res-011",
        "title": "Object Oriented Programming (Java) — Lab Manual & Coding Exercises",
        "dept": "CSE",
        "semester": 3,
        "subject_code": "CS-301",
        "subject_name": "Object Oriented Programming (Java/C++)",
        "resource_type": "Lab Manual",
        "file_format": "PDF",
        "file_size": "3.5 MB",
        "download_count": 440,
        "uploaded_by": "CSE Department Lead",
        "upload_date": "2026-09-12",
        "description": "OOP principles, inheritance, polymorphism, abstract classes, Java Exception handling, Multithreading, and Java Collections Framework.",
        "preview_summary": "12 hands-on Java exercises from basic class definitions to multithreaded producer-consumer pipelines.",
    },
]

@router.get("", response_model=List[ResourceResponse], summary="Filter Study Resources")
def get_resources(
    dept: Optional[str] = Query(default=None, description="Department code (MAC, CSE, IT, ECE)"),
    semester: Optional[int] = Query(default=None, description="Semester number (1-8)"),
    subject_code: Optional[str] = Query(default=None, description="Subject code (e.g. MAC-301)"),
    resource_type: Optional[str] = Query(default=None, description="Type: Notes, PYQ, Lab Manual, Study PDF"),
    search: Optional[str] = Query(default=None, description="Search keyword in title or topic")
):
    """
    Retrieve academic study materials organized by:
    Department -> Semester -> Subject -> Resource Type
    """
    dept_str = dept if isinstance(dept, str) else None
    sem_int = semester if isinstance(semester, int) else None
    sub_str = subject_code if isinstance(subject_code, str) else None
    type_str = resource_type if isinstance(resource_type, str) else None
    search_str = search if isinstance(search, str) else None

    results = RESOURCES_DATA

    if dept_str:
        results = [r for r in results if r["dept"].upper() == dept_str.upper()]

    if sem_int:
        results = [r for r in results if r["semester"] == sem_int]

    if sub_str and sub_str.lower() != "all":
        results = [r for r in results if r["subject_code"].upper() == sub_str.upper()]

    if type_str and type_str.lower() != "all":
        results = [r for r in results if r["resource_type"].lower() == type_str.lower()]

    if search_str:
        q = search_str.lower().strip()
        results = [
            r for r in results
            if q in r["title"].lower() or q in r["subject_code"].lower() or q in r["subject_name"].lower() or q in r["description"].lower()
        ]

    return results

@router.get("/meta/departments", response_model=List[DepartmentSchema], summary="List Academic Departments")
def get_departments():
    return DEPARTMENTS_DATA

@router.get("/meta/subjects", response_model=List[SubjectSchema], summary="List Subjects with optional filters")
def get_subjects(
    dept: Optional[str] = Query(default=None),
    semester: Optional[int] = Query(default=None)
):
    dept_str = dept if isinstance(dept, str) else None
    sem_int = semester if isinstance(semester, int) else None

    results = SUBJECTS_DATA
    if dept_str:
        results = [s for s in results if s["dept"].upper() == dept_str.upper()]
    if sem_int:
        results = [s for s in results if s["semester"] == sem_int]
    return results

@router.get("/{resource_id}", response_model=ResourceResponse, summary="Get Single Resource")
def get_resource_by_id(resource_id: str):
    for res in RESOURCES_DATA:
        if res["id"] == resource_id:
            return res
    raise HTTPException(status_code=404, detail="Study resource not found")

@router.post("/{resource_id}/download", summary="Simulate Resource Download")
def download_resource(resource_id: str):
    for res in RESOURCES_DATA:
        if res["id"] == resource_id:
            res["download_count"] += 1
            return {
                "message": f"Download initiated for {res['title']}",
                "download_count": res["download_count"],
                "file_size": res["file_size"],
                "file_format": res["file_format"]
            }
    raise HTTPException(status_code=404, detail="Study resource not found")
