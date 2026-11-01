import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Bell,
  Calendar,
  Briefcase,
  Compass,
  Bot,
  Clock,
  ArrowRight,
  Download,
  CheckCircle,
  GraduationCap,
  Sparkles,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  mockStudentProfile,
  mockNotices,
  mockDeadlines,
  mockRecentResources
} from '../data/mockData';

const Dashboard = () => {
  const urgentNotices = mockNotices.filter((n) => n.isUrgent);

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* 1. Student Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-info">
            <img
              src={mockStudentProfile.avatarUrl}
              alt={mockStudentProfile.name}
              className="student-avatar"
            />
            <div>
              <h1 className="student-greeting">Welcome back, {mockStudentProfile.name}! 👋</h1>
              <div className="student-meta">
                <span className="student-meta-item">
                  <GraduationCap size={16} />
                  <span>{mockStudentProfile.department} (Sem {mockStudentProfile.semester})</span>
                </span>
                <span>•</span>
                <span className="student-meta-item">
                  <strong>Enrollment:</strong> {mockStudentProfile.enrollmentNo}
                </span>
                <span>•</span>
                <span className="student-meta-item">
                  <UserCheck size={16} />
                  <span>Mentor: {mockStudentProfile.mentor}</span>
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#bfdbfe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Standing
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              {mockStudentProfile.cgpa} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#93c5fd' }}>CGPA</span>
            </div>
          </div>
        </div>

        {/* 2. Key Metrics Row */}
        <div className="metrics-row">
          <div className="metric-card">
            <div>
              <div className="metric-number">6</div>
              <div className="metric-label">Enrolled Subjects</div>
            </div>
            <div className="metric-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <BookOpen size={24} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <div className="metric-number">{mockDeadlines.length}</div>
              <div className="metric-label">Upcoming Deadlines</div>
            </div>
            <div className="metric-icon-box" style={{ background: '#fff1f2', color: '#e11d48' }}>
              <Clock size={24} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <div className="metric-number">{mockNotices.length}</div>
              <div className="metric-label">Active Announcements</div>
            </div>
            <div className="metric-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
              <Bell size={24} />
            </div>
          </div>

          <div className="metric-card">
            <div>
              <div className="metric-number">12+</div>
              <div className="metric-label">Vetted Opportunities</div>
            </div>
            <div className="metric-icon-box" style={{ background: '#faf5ff', color: '#9333ea' }}>
              <Briefcase size={24} />
            </div>
          </div>
        </div>

        {/* 3. Main 2-Column Dashboard Layout */}
        <div className="dashboard-grid">
          {/* Left Column: Quick Actions, Recent Circulars, Recent Resources */}
          <div>
            {/* Quick Navigation Tiles */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <Sparkles size={18} color="#2563eb" />
                  <span>Quick Campus Hubs</span>
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>One-click jump</span>
              </div>
              <div className="quick-nav-grid">
                <Link to="/resources" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                    <BookOpen size={22} />
                  </div>
                  <span className="quick-nav-tile-name">Study Materials</span>
                </Link>

                <Link to="/notices" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                    <Bell size={22} />
                  </div>
                  <span className="quick-nav-tile-name">Circulars & Notices</span>
                </Link>

                <Link to="/opportunities" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                    <Briefcase size={22} />
                  </div>
                  <span className="quick-nav-tile-name">Opportunity Radar</span>
                </Link>

                <Link to="/events" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#faf5ff', color: '#9333ea' }}>
                    <Calendar size={22} />
                  </div>
                  <span className="quick-nav-tile-name">Events & Clubs</span>
                </Link>

                <Link to="/campus" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                    <Compass size={22} />
                  </div>
                  <span className="quick-nav-tile-name">Campus Navigator</span>
                </Link>

                <Link to="/ai-assistant" className="quick-nav-tile">
                  <div className="quick-nav-tile-icon" style={{ background: '#eff6ff', color: '#1e3a8a' }}>
                    <Bot size={22} />
                  </div>
                  <span className="quick-nav-tile-name">AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* Latest Important Circulars Preview */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <AlertCircle size={18} color="#ef4444" />
                  <span>Important Campus Notices</span>
                </h2>
                <Link to="/notices" className="btn btn-outline btn-sm">
                  <span>View All Notices</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {urgentNotices.map((notice) => (
                  <div
                    key={notice.id}
                    style={{
                      borderLeft: '4px solid #ef4444',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderLeftWidth: '4px',
                      borderRadius: 8,
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="badge badge-warning" style={{ background: '#fef2f2', color: '#b91c1c' }}>
                        URGENT • {notice.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{notice.publishedDate}</span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{notice.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {notice.content.substring(0, 140)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>By: {notice.publishedBy}</span>
                      <Link to="/notices" style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>
                        Read full notice →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Added Study Materials */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <FileText size={18} color="#2563eb" />
                  <span>Recently Added Study Materials</span>
                </h2>
                <Link to="/resources" className="btn btn-outline btn-sm">
                  <span>Explore Repository</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="resource-preview-list">
                {mockRecentResources.map((res) => (
                  <div key={res.id} className="resource-preview-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 6, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{res.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Code: <strong>{res.code}</strong> • {res.type} • {res.fileSize}
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-outline btn-sm" title="Preview or Download Document">
                      <Download size={14} />
                      <span>PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Deadlines & Student Skills Profile */}
          <div>
            {/* Upcoming Deadlines Widget */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <Clock size={18} color="#f59e0b" />
                  <span>Upcoming Deadlines</span>
                </h2>
                <span className="badge badge-accent">Next 30 Days</span>
              </div>

              <div className="deadline-list">
                {mockDeadlines.map((dl) => (
                  <div key={dl.id} className={`deadline-item priority-${dl.priority}`}>
                    <div>
                      <div className="deadline-title">{dl.title}</div>
                      <div className="deadline-sub">{dl.subject}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        className="deadline-badge"
                        style={{
                          background: dl.priority === 'high' ? '#fee2e2' : '#fef3c7',
                          color: dl.priority === 'high' ? '#991b1b' : '#92400e',
                        }}
                      >
                        {dl.daysLeft} days left
                      </span>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                        Due {dl.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Skills & Interests Card */}
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Skill Profile</span>
                </h2>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Matched with Radar</span>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                  Core Technical Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {mockStudentProfile.skills.map((skill, idx) => (
                    <span key={idx} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                  Academic Interests
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {mockStudentProfile.interests.map((interest, idx) => (
                    <span key={idx} className="badge badge-accent">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Assistant Quick Prompt Box */}
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Bot size={22} color="#93c5fd" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI College Assistant</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#bfdbfe', lineHeight: 1.5, marginBottom: '1rem' }}>
                Have questions about syllabus, lab exams, or hackathon eligibility? Ask our intelligent query engine.
              </p>
              <Link to="/ai-assistant" className="btn btn-accent btn-sm" style={{ width: '100%', background: '#ffffff', color: '#1e3a8a' }}>
                <Sparkles size={14} color="#1e3a8a" />
                <span>Launch Assistant</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
