# MITS ONE — AI-Powered Student Information & Opportunity Platform

> **Everything a student needs, in one place.**

- **Institution:** Madhav Institute of Technology and Science (MITS), Gwalior  
- **Department:** Mathematics and Computing  
- **Team:** Team Nexora  
  - **Adarsh Patel** (BTMC25O1008) — *Frontend & UI/UX Lead*  
  - **Atul Kushwah** (BTMC25O1034) — *Backend & Database Lead*  
- **Project Mentor:** Dr. Dheeraj Dixit (HOD, Mathematics and Computing)

---

## 🏛️ Project Overview

MITS ONE is a centralized, AI-enabled student platform engineered to unify academic study materials (Notes, PYQs, Lab Manuals), real-time announcements, vetted internships/hackathons, and campus facility navigation into one clean, responsive application.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Custom CSS Design Tokens (MITS Blue & Slate), Lucide Icons, Axios, React Router |
| **Backend** | Python 3.11, FastAPI, Uvicorn, SQLAlchemy 2.0, Pydantic v2 |
| **Database** | PostgreSQL (with local SQLite fallback for offline development) |
| **AI / ML** | Scikit-Learn (TF-IDF & Cosine Similarity matching), Gemini API, PyPDF |

---

## 🚀 Quickstart Guide

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend Setup
```bash
cd backend
# Create virtual environment (if not already created)
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```
- API Root: [http://127.0.0.1:8000/api/v1](http://127.0.0.1:8000/api/v1)
- Interactive API Docs (Swagger): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Health Check: [http://127.0.0.1:8000/api/v1/health](http://127.0.0.1:8000/api/v1/health)

---

## 📁 Repository Structure

```
c:\MITS ONE\
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # Navbar, Footer, UI atoms
│   │   ├── pages/        # LandingPage & Module routes
│   │   ├── services/     # Axios API client
│   │   └── styles/       # Design tokens & responsive CSS
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── api/          # Versioned REST endpoints
│   │   ├── core/         # Config, Database, Security
│   │   ├── models/       # Database schemas
│   │   └── services/     # Business logic & AI
│   └── tests/            # Diagnostic & unit tests
└── README.md
```
