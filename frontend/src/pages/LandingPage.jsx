import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Bell,
  Briefcase,
  Compass,
  Calendar,
  Bot,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle,
  GraduationCap,
  Users,
  Search,
  ExternalLink,
  Activity,
  Layers
} from 'lucide-react';
import { checkSystemHealth } from '../services/api';

const LandingPage = () => {
  const [healthData, setHealthData] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await checkSystemHealth();
      setHealthData(res);
      setLoadingHealth(false);
    };
    fetchStatus();
  }, []);

  const modules = [
    {
      title: 'Smart Information Hub',
      desc: 'Centralized college circulars, exam dates, academic deadlines, and priority notices with smart category filters.',
      icon: Bell,
      colorClass: 'module-icon-blue',
      badge: 'Real-time',
      link: '/notices',
    },
    {
      title: 'Study Resource Hub',
      desc: 'Curated Notes, Previous Year Question Papers (PYQs), and Lab Manuals organized by Department → Semester → Subject.',
      icon: BookOpen,
      colorClass: 'module-icon-indigo',
      badge: 'Academic',
      link: '/resources',
    },
    {
      title: 'Opportunity Radar',
      desc: 'Curated technical internships, jobs, hackathons, and research scholarships with personalized skill matching.',
      icon: Briefcase,
      colorClass: 'module-icon-emerald',
      badge: 'Career',
      link: '/opportunities',
    },
    {
      title: 'Campus Navigator',
      desc: 'Find faculty rooms, specialized labs, seminar halls, and amenities across campus building blocks easily.',
      icon: Compass,
      colorClass: 'module-icon-amber',
      badge: 'Navigation',
      link: '/campus',
    },
    {
      title: 'Events & Student Clubs',
      desc: 'Stay informed on hackathons, tech fests, workshops, and register directly for active student clubs and societies.',
      icon: Calendar,
      colorClass: 'module-icon-purple',
      badge: 'Campus Life',
      link: '/events',
    },
    {
      title: 'AI College Assistant',
      desc: 'Natural language question answering powered by LLM. Ask questions about syllabus, deadlines, or campus queries.',
      icon: Bot,
      colorClass: 'module-icon-rose',
      badge: 'AI Powered',
      link: '/ai-assistant',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          {/* Institutional Badge */}
          <div className="hero-institution-badge">
            <GraduationCap size={16} />
            <span>Madhav Institute of Technology and Science • Dept of Mathematics & Computing</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Everything a student needs, <br />
            <span className="hero-title-gradient">in one organized place.</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">
            MITS ONE centralizes academic study materials, official announcements, competitive opportunities,
            and campus navigation — ending fragmented WhatsApp notices and scattered links.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <Link to="/resources" className="btn btn-accent btn-lg">
              <BookOpen size={18} />
              <span>Explore Study Resources</span>
            </Link>
            <Link to="/ai-assistant" className="btn btn-outline btn-lg">
              <Sparkles size={18} color="#2563eb" />
              <span>Ask AI Assistant</span>
            </Link>
          </div>

          {/* Live System Communication Status Banner */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '50px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', fontSize: '0.85rem' }}>
            <Activity size={16} color={healthData?.online ? '#10b981' : '#ef4444'} />
            <span>
              <strong>System Connectivity:</strong>{' '}
              {loadingHealth ? (
                'Checking FastAPI backend...'
              ) : healthData?.online ? (
                <span style={{ color: '#059669', fontWeight: 600 }}>
                  FastAPI v{healthData.data?.version || '1.0.0'} Connected ({healthData.data?.status || 'OK'})
                </span>
              ) : (
                <span style={{ color: '#dc2626' }}>FastAPI backend offline or starting up</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Statistics Bar */}
      <section style={{ transform: 'translateY(-2rem)', zIndex: 10, position: 'relative' }}>
        <div className="container">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Centralized Resources</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8+</div>
              <div className="stat-label">Academic Semesters</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">5+</div>
              <div className="stat-label">Core Campus Modules</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">AI</div>
              <div className="stat-label">Interactive Query Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="modules-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Platform Modules</span>
            <h2 className="section-title">Built for Modern Campus Life</h2>
            <p className="section-subtitle">
              Every feature has been engineered to eliminate student pain points, streamline exam preparation,
              and surface career opportunities.
            </p>
          </div>

          <div className="modules-grid">
            {modules.map((mod, index) => {
              const Icon = mod.icon;
              return (
                <div key={index} className="module-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className={`module-icon-wrap ${mod.colorClass}`}>
                      <Icon size={26} />
                    </div>
                    <span className="badge badge-primary">{mod.badge}</span>
                  </div>
                  <h3 className="module-title">{mod.title}</h3>
                  <p className="module-desc">{mod.desc}</p>
                  <Link to={mod.link} className="module-link">
                    <span>Open Module</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Institutional Context & Nexora Team */}
      <section className="academic-section">
        <div className="container">
          <div className="academic-grid">
            {/* Left Column: Mission */}
            <div>
              <span className="section-badge">Academic Context</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Madhav Institute of Technology and Science, Gwalior
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Developed under the Department of Mathematics and Computing, MITS ONE addresses the daily challenges
                faced by engineering undergraduates: missing urgent notifications, hunting for reliable past question
                papers, and discovering high-impact internships late.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: '#1e293b' }}>
                  <CheckCircle size={18} color="#2563eb" />
                  <span>Complements official institutional systems without conflicting with ERP/AMS.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: '#1e293b' }}>
                  <CheckCircle size={18} color="#2563eb" />
                  <span>Full-stack architecture leveraging FastAPI, React, and modern PostgreSQL.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.925rem', color: '#1e293b' }}>
                  <CheckCircle size={18} color="#2563eb" />
                  <span>Scalable role-based access control protecting student documents and administrator workflows.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mentorship & Team Card */}
            <div className="mentor-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Award size={28} color="#1e3a8a" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Project Leadership & Guidance</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Department of Mathematics and Computing</p>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: 10, border: '1px solid #bfdbfe', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
                  Project Mentor
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  Dr. Dheeraj Dixit
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  Head of Department (HOD), Mathematics & Computing
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
                Development Team — Team Nexora
              </div>
              <div className="team-list">
                <div className="team-member-pill">
                  <div>
                    <strong>Adarsh Patel</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Enrollment: BTMC25O1008</div>
                  </div>
                  <span className="badge badge-primary">Frontend & UI/UX</span>
                </div>
                <div className="team-member-pill">
                  <div>
                    <strong>Atul Kushwah</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Enrollment: BTMC25O1034</div>
                  </div>
                  <span className="badge badge-accent">Backend & Database</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
