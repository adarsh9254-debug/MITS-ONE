# MITS ONE — AI-Powered Student Information & Opportunity Platform

> **"Everything a student needs, in one place."**

- **Institution:** Madhav Institute of Technology and Science (MITS), Gwalior  
- **Department:** Department of Mathematics and Computing  
- **Team Name:** Team Nexora  
- **Team Members:**
  1. **Adarsh Patel** (Enrollment: `BTMC25O1008`) — *Frontend Architecture, UI/UX Design, React Engineering & Integration*
  2. **Atul Kushwah** (Enrollment: `BTMC25O1034`) — *Backend Systems, FastAPI Services, Database Architecture & AI Engineering*
- **Project Mentor:** **Dr. Dheeraj Dixit** (Head of Department, Mathematics and Computing)

---

## 🏛️ Executive Summary & Motivation

In academic institutions like MITS Gwalior, students currently navigate dozens of disparate WhatsApp groups, departmental noticeboards, unofficial Telegram channels, and scattered cloud drives to access essential academic and career materials.

This fragmentation leads to:
1. **Critical Missed Deadlines**: Exam form submissions, scholarship windows, and fee payment deadlines buried in chat floods.
2. **Resource Scarcity & Chaos**: Inability to quickly find verified previous year question papers (PYQs), lab manuals, and syllabus lecture notes categorized by semester and subject.
3. **Disjointed Career Discovery**: Students unaware of high-impact opportunities such as Smart India Hackathon (SIH), Google Summer of Code, or research fellowships.
4. **Wayfinding Friction**: Newly admitted students and visitors struggling to locate departmental computing labs, seminar halls, and administrative offices.

**MITS ONE** unifies all these requirements into a single, high-performance, responsive academic portal. It is engineered from scratch adhering to clean multi-tier software architecture, rigorous role-based security, and grounded Artificial Intelligence.

---

## 🛠️ Complete Technology Stack

```
                        MITS ONE ARCHITECTURE STACK
┌────────────────────────────────────────────────────────────────────────┐
│ FRONTEND LAYER                                                         │
│ React 18 • Vite 6 • React Router v6 • Lucide React • Vanilla CSS Tokens│
│ Axios (Bearer JWT Interceptors) • Fully Responsive (Mobile / Desktop) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON REST APIs
┌───────────────────────────────────▼────────────────────────────────────┐
│ BACKEND APPLICATION LAYER                                              │
│ Python 3.11 • FastAPI • Uvicorn ASGI • Pydantic v2 Settings/Schemas     │
│ Direct Bcrypt Password Hashing • HS256 JWT Authorization Dependencies │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
┌───────────────────▼────────────────┐   ┌───────────▼───────────────────┐
│ PERSISTENCE & DATABASE             │   │ AI & DATA SCIENCE SUBSYSTEM   │
│ PostgreSQL / SQLite Engine         │   │ Scikit-Learn TF-IDF Cosine Sim│
│ SQLAlchemy 2.0 ORM                 │   │ Google Gemini 2.5 Flash RAG   │
│ Role-Based Integrity (Admin/User)  │   │ PyPDF Document Ingestion      │
└────────────────────────────────────┘   └───────────────────────────────┘
```

| Layer | Technologies & Rationale |
|---|---|
| **Frontend Framework** | **React.js 18 + Vite**: Lightning-fast Hot Module Replacement (HMR), sub-5s optimized production builds. |
| **Styling & Design System** | **Custom CSS Design Tokens**: Zero bloated UI libraries. Uses an official MITS deep blue (`#1e3a8a`), slate gray, and cobalt palette with accessible contrast and responsive grid typography. |
| **Backend REST Engine** | **FastAPI + Uvicorn**: High-concurrency asynchronous ASGI framework with automated OpenAPI 3.0 (Swagger) generation and native Pydantic v2 data validation. |
| **Database & ORM** | **PostgreSQL (Production) / SQLite (Offline Development)**: Managed via SQLAlchemy 2.0 declarative models with foreign key constraints, indexes, and automated cascade lifecycles. |
| **Security & Auth** | **Direct Bcrypt (Cost 12) + Signed HS256 JWT**: Industry-standard cryptographic salt/hash and stateless token expiration (24h). Enforces strict **Role-Based Access Control (RBAC)** — students receive HTTP 403 Forbidden on administrative endpoints. |
| **AI / Machine Learning** | **Scikit-learn + Grounded RAG + Google Gemini 2.5 Flash**: Hybrid student-opportunity matching ($65\%\text{ Skill Overlap} + 35\%\text{ TF-IDF Cosine Similarity}$) and institutional RAG that eliminates hallucination by grounding answers in verified MITS circulars and syllabi. |

---

## 🔑 Demonstration Accounts & Credentials

For academic project evaluation and viva demonstration, pre-seeded accounts are provided:

| Role | Email Address | Password | Privileges / Access |
|---|---|---|---|
| **Student** | `adarsh.patel@mitsgwl.ac.in` | `student123` | Student Dashboard, Resource Download, Notice Feed, Opportunity Radar, AI Assistant |
| **Administrator** | `admin@mitsgwl.ac.in` | `admin123` | Full Admin Dashboard, Live Metrics, Publish Notices, Manage Resources, File Upload |

> **1-Click Quick Fill**: On the `/login` screen, click either the **"Fill Student Credentials"** or **"Fill Admin Credentials"** button for instant demonstration.

---

## ⚡ Quickstart Guide

### 1. Backend Server Setup

```bash
# Navigate to backend directory
cd backend

# Activate the pre-configured Python 3.11 virtual environment (Windows)
.\venv\Scripts\activate

# (Optional) Verify or install dependencies
pip install -r requirements.txt

# Run all 6 automated test suites to verify 100% system health
python run_all_tests.py

# Start the FastAPI ASGI server
uvicorn app.main:app --reload --port 8000
```
- **API Base URL**: `http://127.0.0.1:8000/api/v1`
- **Interactive Swagger Documentation**: `http://127.0.0.1:8000/docs`
- **System Health Diagnostics**: `http://127.0.0.1:8000/api/v1/health`

### 2. Frontend Client Setup

Open a separate terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install node modules (if not already installed)
npm install

# Start Vite development server
npm run dev
```
- Open browser at: **`http://localhost:5173`**
- Test production build at any time: `npm run build`

---

## 📂 Project Repository Organization

```
c:\MITS ONE\
├── backend/                              # Python FastAPI Backend Architecture
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py                   # RBAC Security Dependencies (JWT, Admin Guard)
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── admin.py          # Admin metrics, notice publishing, uploads
│   │   │       │   ├── ai.py             # Grounded RAG query & ML recommendations
│   │   │       │   ├── auth.py           # Login, registration, token issuance
│   │   │       │   ├── campus.py         # Campus Navigator facility wayfinding
│   │   │       │   ├── events.py         # Events & student clubs directory
│   │   │       │   ├── health.py         # Diagnostic system health endpoints
│   │   │       │   ├── notices.py        # Circulars, filters, urgent priorities
│   │   │       │   └── resources.py      # Study resources cascading hierarchy
│   │   │       └── router.py             # Central v1 API router aggregation
│   │   ├── core/
│   │   │   ├── config.py                 # Pydantic v2 application settings
│   │   │   ├── database.py               # SQLAlchemy engine & session factory
│   │   │   └── security.py               # Direct Bcrypt hashing & JWT signing
│   │   ├── models/
│   │   │   ├── content.py                # NoticeModel, ResourceModel, OpportunityModel
│   │   │   └── user.py                   # User & StudentProfile relational models
│   │   ├── schemas/                      # Pydantic validation request/response schemas
│   │   │   ├── ai_schema.py
│   │   │   ├── auth_schema.py
│   │   │   ├── campus_schema.py
│   │   │   ├── event_schema.py
│   │   │   ├── notice_schema.py
│   │   │   └── resource_schema.py
│   │   └── services/
│   │       ├── ai_service.py             # Grounded RAG query assistant & Gemini API
│   │       └── recommendation_service.py # Scikit-Learn TF-IDF Cosine Recommender
│   ├── tests/                            # Automated Backend Verification Suites
│   │   ├── test_ai.py                    # RAG & ML recommendation assertions
│   │   ├── test_auth.py                  # Bcrypt, JWT & HTTP 403 RBAC guard tests
│   │   ├── test_health.py                # Core configuration & DB connection check
│   │   ├── test_modules.py               # Radar, Events, Clubs & Campus tests
│   │   ├── test_notices.py               # Category filtering & urgent notices tests
│   │   └── test_resources.py             # Cascading hierarchy & download tests
│   ├── mits_one.db                       # Pre-seeded SQLite database instance
│   ├── run_all_tests.py                  # Unified 1-click test runner
│   ├── seed_database.py                  # Database initial seeding script
│   └── requirements.txt                  # Python dependencies
│
├── frontend/                             # React 18 + Vite Modern Frontend Client
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Footer.jsx            # Institutional footer with team credits
│   │   │       ├── Navbar.jsx            # Dynamic navigation bar with auth badges
│   │   │       └── ProtectedRoute.jsx    # Client-side route guard with HTTP 403 card
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global JWT auth state & user session provider
│   │   ├── data/
│   │   │   └── mockData.js               # Comprehensive offline campus mock dataset
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   └── AdminDashboard.jsx    # Role-based administrative dashboard
│   │   │   ├── AIAssistant.jsx           # Grounded RAG conversational campus bot
│   │   │   ├── CampusNavigator.jsx       # Wayfinding & campus facility directory
│   │   │   ├── Dashboard.jsx             # Student Dashboard with live ML recommendations
│   │   │   ├── EventsClubs.jsx           # Hackathons, cultural events & club directory
│   │   │   ├── InformationHub.jsx        # Searchable circulars & urgent notices
│   │   │   ├── LandingPage.jsx           # Modern commercial landing presentation
│   │   │   ├── Login.jsx                 # Authentication portal with 1-click credentials
│   │   │   ├── Register.jsx              # Student enrollment onboarding portal
│   │   │   ├── StudyResourceHub.jsx      # Cascading Department → Sem → Subject → Type
│   │   │   └── OpportunityRadar.jsx      # Internships, fellowships, and SIH radar
│   │   ├── services/
│   │   │   └── api.js                    # Axios instance with Bearer interceptors
│   │   ├── styles/                       # Modular CSS design token stylesheets
│   │   │   ├── admin.css
│   │   │   ├── ai.css
│   │   │   ├── base.css
│   │   │   ├── campus.css
│   │   │   ├── components.css
│   │   │   ├── dashboard.css
│   │   │   ├── events.css
│   │   │   ├── landing.css
│   │   │   ├── navbar.css
│   │   │   ├── notices.css
│   │   │   ├── opportunities.css
│   │   │   ├── resources.css
│   │   │   └── variables.css
│   │   ├── App.jsx                       # Main application routing tree
│   │   └── main.jsx                      # React 18 root mounting
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🌐 Complete API Endpoint Reference

All endpoints are versioned under `/api/v1`:

### 1. Authentication & Users
- `POST /api/v1/auth/register` — Student registration with enrollment verification
- `POST /api/v1/auth/login` — Bcrypt password validation and JWT token issuance
- `GET /api/v1/auth/me` — Retrieve current authenticated user profile

### 2. Notices & Circulars (Smart Information Hub)
- `GET /api/v1/notices` — List circulars with filters (`category`, `urgent_only`, `search`)
- `GET /api/v1/notices/{id}` — Retrieve notice details and attachment metadata

### 3. Study Resources
- `GET /api/v1/resources` — Filter resources by `dept`, `semester`, `subject`, `resource_type`, `search`
- `GET /api/v1/resources/metadata/departments` — List available academic departments
- `GET /api/v1/resources/metadata/subjects` — List subjects filtered by department and semester
- `POST /api/v1/resources/{id}/download` — Increment verified document download counter

### 4. Opportunities, Events & Campus
- `GET /api/v1/opportunities` — List opportunities filtered by `type` and `skill`
- `GET /api/v1/events` — List campus technical and cultural events
- `GET /api/v1/events/clubs` — List student societies and technical chapters
- `GET /api/v1/campus/locations` — Campus facility directory with search and category filters

### 5. AI & Machine Learning Subsystem
- `POST /api/v1/ai/query` — Grounded RAG natural language answer generation
- `GET /api/v1/ai/recommendations` — Scikit-Learn TF-IDF cosine similarity opportunity matching

### 6. Administration (Role-Guarded: Admin Only)
- `GET /api/v1/admin/stats` — Platform analytics (student count, resources, notices, downloads)
- `POST /api/v1/admin/notices` — Create and publish official circulars
- `POST /api/v1/admin/resources` — Add academic study documents
- `POST /api/v1/admin/upload-document` — Secure file upload with MIME whitelist & size validation

---

## 🧠 Machine Learning & Grounded RAG Formulation

### 1. Opportunity Recommendation Engine (Scikit-Learn)
To avoid generic recommendations, the platform implements a hybrid mathematical scoring metric:

$$\text{FinalScore} = 0.65 \times \text{JaccardSkillOverlap} + 0.35 \times \text{TF-IDF CosineSimilarity}$$

Where:
- $\text{JaccardSkillOverlap} = \frac{|S_{\text{student}} \cap S_{\text{opportunity}}|}{|S_{\text{opportunity}}|}$
- $\text{TF-IDF CosineSimilarity} = \frac{\mathbf{v}_{\text{profile}} \cdot \mathbf{v}_{\text{opp}}}{\|\mathbf{v}_{\text{profile}}\| \|\mathbf{v}_{\text{opp}}\|}$

This guarantees that a student possessing exact required skills (e.g., *Python*, *FastAPI*, *React*) is prioritized while also semantically matching related domains (*Machine Learning*, *Web Development*).

### 2. Grounded Institutional RAG Architecture
Generic LLMs frequently hallucinate college schedules and policies. MITS ONE eliminates hallucination through a two-step grounded retrieval pipeline:
1. **Semantic Vector Search**: When a student asks a question, the query is vectorized using TF-IDF across the verified MITS knowledge corpus (circulars, syllabi, facility rooms).
2. **Context-Constrained Prompting**: Top matching text chunks are supplied to Google Gemini 2.5 Flash with strict grounding instructions:
   > *"Answer solely based on the provided official MITS context. Cite the specific notice ID, department handbook, or building room number. If the information is not in the context, state that clearly."*
3. **Offline Resilience**: If the internet or Gemini API key is absent, an offline deterministic synthesis engine extracts and formats the grounded citations directly from the local knowledge base.

---

## 🔒 Security Best Practices Implemented

- **Password Hashing**: Direct `bcrypt.hashpw` with standard 12 salt rounds. Plaintext passwords are never logged or stored.
- **Stateless Authorization**: Signed HS256 JWT tokens containing user ID, role, and expiration timestamp.
- **RBAC Enforcement**: Route-level dependency injection (`get_current_admin`) raises `HTTP 403 Forbidden` if a student token attempts administrative endpoints.
- **SQL Injection Prevention**: 100% parameterized queries via SQLAlchemy 2.0 ORM.
- **File Upload Protection**: Validates MIME types (PDF, DOCX, PNG) and enforces a strict 25 MB payload limit.
- **Zero Secrets in Version Control**: All sensitive values are abstracted into `.env` and `pydantic-settings`.

---

## 👥 Team Nexora — Division of Responsibilities

### Adarsh Patel (BTMC25O1008) — Frontend & UI/UX Lead
- Architecture and scaffolding of the React 18 + Vite client.
- Authored custom CSS design tokens (`variables.css`, `base.css`, `components.css`) without heavyweight CSS frameworks.
- Developed all interactive student portals: Student Dashboard, Study Resource Hub cascading filters, Information Hub search, Opportunity Radar, and Campus Navigator.
- Built the AI College Assistant conversational interface with real-time prompt suggestions and source citation badges.
- Implemented client-side Bearer token interceptors in Axios and role-based route guardrails (`ProtectedRoute.jsx`).

### Atul Kushwah (BTMC25O1034) — Backend & Database Lead
- Engineered the FastAPI REST backend with clean multi-layered routing (`/api/v1`).
- Designed the relational database schema in SQLAlchemy 2.0 for Users, Student Profiles, Notices, Study Materials, and Opportunities.
- Implemented the direct Bcrypt password hashing and JWT token signing pipeline.
- Developed the Scikit-learn TF-IDF recommendation engine and Grounded RAG campus assistant pipeline.
- Authored the role-guarded Administrative endpoints (`/admin`) and automated regression test suite (`run_all_tests.py`).

---

## 🎓 Academic Viva & Evaluation Defense

For detailed viva preparation, sample examiner questions, and a 7-minute live exhibition demonstration walkthrough, refer to the accompanying specification:
- [MITS_ONE_ARCHITECTURE_SPECIFICATION.md](file:///C:/Users/adars/.gemini/antigravity/brain/10d5739b-bf16-4dcb-b8fe-8498c08c813d/MITS_ONE_ARCHITECTURE_SPECIFICATION.md)

Developed with pride by **Team Nexora** under the guidance of **Dr. Dheeraj Dixit** (HOD, Mathematics and Computing, MITS Gwalior).
