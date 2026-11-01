import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { mockEvents, mockClubs } from '../data/mockData';

const EventsClubs = () => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'clubs'
  const [registerToast, setRegisterToast] = useState(null);

  const handleRegister = (eventTitle) => {
    setRegisterToast(`Registration confirmed for "${eventTitle}"! Details sent to your college email.`);
    setTimeout(() => {
      setRegisterToast(null);
    }, 4000);
  };

  return (
    <div className="events-page">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <Calendar size={16} />
            <span>Campus Activities & Student Chapters</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Events & Student Clubs
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '720px' }}>
            Explore technical hackathons, academic workshops, inter-college competitions, and join student-led societies at MITS Gwalior.
          </p>
        </div>

        {/* Feedback Toast */}
        {registerToast && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              background: '#ecfdf5',
              border: '1px solid #6ee7b7',
              color: '#065f46',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={18} color="#059669" />
            <span>{registerToast}</span>
          </div>
        )}

        {/* View Toggle Tabs */}
        <div className="events-tabs">
          <button
            className={`events-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Upcoming Campus Events ({mockEvents.length})
          </button>
          <button
            className={`events-tab-btn ${activeTab === 'clubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            Student Clubs & Societies ({mockClubs.length})
          </button>
        </div>

        {/* Tab 1: Events Grid */}
        {activeTab === 'events' && (
          <div className="events-grid">
            {mockEvents.map((ev) => (
              <div key={ev.id} className="event-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge badge-primary">{ev.category}</span>
                    <span className="badge badge-accent">Registration Open</span>
                  </div>

                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                    {ev.title}
                  </h2>
                  <div style={{ fontSize: '0.825rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Organized by: {ev.clubName}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: '#475569', marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} color="#f59e0b" />
                      <strong>Time:</strong> {ev.startDatetime}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} color="#e11d48" />
                      <strong>Venue:</strong> {ev.venue}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
                    {ev.description}
                  </p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: '1rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => handleRegister(ev.title)}
                  >
                    <span>Register for Event</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Clubs Grid */}
        {activeTab === 'clubs' && (
          <div className="clubs-grid">
            {mockClubs.map((club) => (
              <div key={club.id} className="club-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: 54, height: 54, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                    {club.logo}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="badge badge-primary">{club.category}</span>
                      <span className="badge badge-accent">{club.badge}</span>
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{club.name}</h2>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {club.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 8, fontSize: '0.825rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Club Leadership:</span><br />
                    <strong>{club.leadName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Active Community:</span><br />
                    <strong>{club.membersCount}+ Students</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Contact: {club.leadContact}</span>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => alert(`Application sent to join ${club.name}!`)}
                  >
                    <span>Join Club</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsClubs;
