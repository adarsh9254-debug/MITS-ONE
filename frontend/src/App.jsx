import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InformationHub from './pages/InformationHub';
import ModulePlaceholder from './pages/ModulePlaceholder';
import { BookOpen, Briefcase, Calendar, Compass, Bot, LogIn, Shield } from 'lucide-react';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notices" element={<InformationHub />} />
            <Route
              path="/resources"
              element={
                <ModulePlaceholder
                  title="Study Resource Hub"
                  description="Hierarchical study materials organized by Department → Semester → Subject (Notes, PYQs, Lab Manuals)."
                  icon={BookOpen}
                  phase="Phase 2 (Next Step)"
                />
              }
            />
            <Route
              path="/opportunities"
              element={
                <ModulePlaceholder
                  title="Opportunity Radar"
                  description="Curated internships, hackathons, and scholarship listings with personalized skill matching."
                  icon={Briefcase}
                  phase="Phase 2 (Next Step)"
                />
              }
            />
            <Route
              path="/events"
              element={
                <ModulePlaceholder
                  title="Events & Student Clubs"
                  description="Discover technical & cultural campus events, register for clubs, and track student chapter activities."
                  icon={Calendar}
                  phase="Phase 2 (Next Step)"
                />
              }
            />
            <Route
              path="/campus"
              element={
                <ModulePlaceholder
                  title="Campus Navigator"
                  description="Interactive locator for engineering departments, computing labs, faculty rooms, and campus facilities."
                  icon={Compass}
                  phase="Phase 2 (Next Step)"
                />
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <ModulePlaceholder
                  title="AI College Assistant"
                  description="Intelligent campus assistant powered by LLM RAG to answer queries on syllabus, rules, and deadlines."
                  icon={Bot}
                  phase="Phase 4"
                />
              }
            />
            <Route
              path="/login"
              element={
                <ModulePlaceholder
                  title="Student & Faculty Portal"
                  description="Secure role-based authentication using JWT tokens and Bcrypt password hashing."
                  icon={LogIn}
                  phase="Phase 3"
                />
              }
            />
            <Route
              path="/admin"
              element={
                <ModulePlaceholder
                  title="Administrative Control Center"
                  description="Restricted dashboard for HODs, faculty coordinators, and admins to publish notices and upload study files."
                  icon={Shield}
                  phase="Phase 3"
                />
              }
            />
            {/* Catch-all redirect to Landing */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
