// MITS ONE — Mock Data Layer for Phase 2
// Models the exact PostgreSQL schema designed for Phase 3

export const mockStudentProfile = {
  name: "Adarsh Patel",
  enrollmentNo: "BTMC25O1008",
  department: "Mathematics and Computing",
  departmentCode: "MAC",
  semester: 4,
  cgpa: 8.92,
  email: "adarsh.patel@mitsgwl.ac.in",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adarsh",
  skills: ["Python", "FastAPI", "React.js", "SQL", "Data Structures"],
  interests: ["Artificial Intelligence", "Full-Stack Development", "Competitive Programming"],
  mentor: "Dr. Dheeraj Dixit (HOD)",
};

export const mockNotices = [
  {
    id: "not-001",
    title: "Mid-Semester Examination Schedule — Even Semester 2026",
    category: "Examination",
    isUrgent: true,
    publishedBy: "Office of the Controller of Examinations",
    publishedDate: "2026-11-01",
    content:
      "All B.Tech students of Mathematics & Computing and allied branches are hereby informed that Mid-Sem examinations will commence from 24th November 2026. Detailed subject-wise timetable and seating plan are attached below.",
    attachmentName: "MidSem_Timetable_Nov2026.pdf",
    attachmentSize: "1.4 MB",
    pinned: true,
  },
  {
    id: "not-002",
    title: "Internal Round Nominations for Smart India Hackathon (SIH 2026)",
    category: "Events",
    isUrgent: true,
    publishedBy: "MITS Innovation & Incubation Council",
    publishedDate: "2026-10-29",
    content:
      "Teams wishing to represent MITS Gwalior in SIH 2026 must submit their problem statement abstract and prototype pitch before 10th November 2026. Internal mentoring session will be guided by Dr. Dheeraj Dixit.",
    attachmentName: "SIH_Internal_Guidelines_2026.pdf",
    attachmentSize: "2.1 MB",
    pinned: true,
  },
  {
    id: "not-003",
    title: "Guest Lecture on Applied Linear Algebra & Machine Learning",
    category: "Academic",
    isUrgent: false,
    publishedBy: "Department of Mathematics and Computing",
    publishedDate: "2026-10-25",
    content:
      "The Department of Mathematics and Computing is organizing an expert session on 'High-Dimensional Vector Spaces in LLMs' in the SAC Auditorium on Friday at 3:00 PM. Attendance is compulsory for Sem 4 & 6 students.",
    attachmentName: "LinearAlgebra_Lecture_Brochure.pdf",
    attachmentSize: "840 KB",
    pinned: false,
  },
  {
    id: "not-004",
    title: "Campus Placement Drive — Software Development Engineer Interns",
    category: "Placement",
    isUrgent: false,
    publishedBy: "Training & Placement Cell",
    publishedDate: "2026-10-20",
    content:
      "Registrations are open for pre-final year B.Tech students (MAC, CSE, IT) with CGPA 7.5 and above for SDE Internship roles. Eligible students must update their resume on the placement portal.",
    attachmentName: "Placement_Drive_Eligibility_Criteria.pdf",
    attachmentSize: "920 KB",
    pinned: false,
  },
  {
    id: "not-005",
    title: "Central Library Book Return & Digital Repository Access",
    category: "General",
    isUrgent: false,
    publishedBy: "Central Library MITS",
    publishedDate: "2026-10-15",
    content:
      "Students who issued reference books for the mid-term assessment must renew or return them by 15th November 2026. Digital IEEE and Springer access is now available via campus intranet.",
    attachmentName: "Library_Digital_Access_Manual.pdf",
    attachmentSize: "1.1 MB",
    pinned: false,
  },
];

export const mockDeadlines = [
  {
    id: "dl-001",
    title: "SIH 2026 Abstract Submission",
    subject: "MITS Innovation Cell",
    dueDate: "2026-11-10",
    daysLeft: 8,
    priority: "high",
  },
  {
    id: "dl-002",
    title: "Discrete Math Assignment 3",
    subject: "MAC-301 (Dr. Dixit)",
    dueDate: "2026-11-14",
    daysLeft: 12,
    priority: "medium",
  },
  {
    id: "dl-003",
    title: "Data Structures Lab Record Submission",
    subject: "MAC-302 Lab",
    dueDate: "2026-11-18",
    daysLeft: 16,
    priority: "medium",
  },
  {
    id: "dl-004",
    title: "Mid-Semester Examination Begins",
    subject: "Exam Cell",
    dueDate: "2026-11-24",
    daysLeft: 22,
    priority: "high",
  },
];

export const mockRecentResources = [
  {
    id: "res-001",
    title: "Discrete Mathematics — Complete Graph Theory Notes",
    code: "MAC-301",
    type: "Notes",
    uploadedBy: "Faculty (MAC)",
    downloads: 342,
    fileSize: "3.8 MB",
  },
  {
    id: "res-002",
    title: "Mid-Term Examination Question Papers (2022-2025)",
    code: "MAC-302",
    type: "PYQ",
    uploadedBy: "Exam Archive",
    downloads: 512,
    fileSize: "5.2 MB",
  },
  {
    id: "res-003",
    title: "Design & Analysis of Algorithms Lab Manual",
    code: "MAC-304",
    type: "Lab Manual",
    uploadedBy: "Computing Lab Lead",
    downloads: 289,
    fileSize: "2.4 MB",
  },
];
