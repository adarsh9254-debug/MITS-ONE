import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InformationHub from './pages/InformationHub';
import StudyResourceHub from './pages/StudyResourceHub';
import OpportunityRadar from './pages/OpportunityRadar';
import EventsClubs from './pages/EventsClubs';
import CampusNavigator from './pages/CampusNavigator';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ModulePlaceholder from './pages/ModulePlaceholder';
import { Bot } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notices" element={<InformationHub />} />
              <Route path="/resources" element={<StudyResourceHub />} />
              <Route path="/opportunities" element={<OpportunityRadar />} />
              <Route path="/events" element={<EventsClubs />} />
              <Route path="/campus" element={<CampusNavigator />} />

              {/* Protected Student Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Role-Based Admin Route (HTTP 403 / Guarded against students) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* AI Assistant (Phase 4) */}
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

              {/* Catch-all redirect to Landing */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
