import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Platform & Institutional Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <img src="/mits-logo.svg" alt="MITS ONE" style={{ width: 36, height: 36 }} />
              <h3 className="footer-brand-title">MITS ONE</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              AI-Powered Student Information & Opportunity Platform. Centralizing academic resources, campus notices,
              internships, and navigational assistance for students of Madhav Institute of Technology and Science, Gwalior.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.8rem', color: '#cbd5e1' }}>
              <ShieldCheck size={16} color="#60a5fa" />
              <span>Academic Project Exhibition & Evaluation</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div>
            <h4 className="footer-links-title">Modules</h4>
            <ul className="footer-links-list">
              <li><Link to="/notices">Smart Information Hub</Link></li>
              <li><Link to="/resources">Study Resource Hub</Link></li>
              <li><Link to="/opportunities">Opportunity Radar</Link></li>
              <li><Link to="/events">Events & Student Clubs</Link></li>
              <li><Link to="/campus">Campus Navigator</Link></li>
              <li><Link to="/ai-assistant">AI College Assistant</Link></li>
            </ul>
          </div>

          {/* Column 3: Academic Credits */}
          <div>
            <h4 className="footer-links-title">Academic Details</h4>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
              <strong>Department:</strong><br />Mathematics and Computing
            </p>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
              <strong>Project Mentor:</strong><br />Dr. Dheeraj Dixit (HOD)
            </p>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
              <strong>Institution:</strong><br />Madhav Institute of Technology and Science, Gwalior
            </p>
          </div>

          {/* Column 4: Development Team */}
          <div>
            <h4 className="footer-links-title">Team Nexora</h4>
            <ul className="footer-links-list" style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
              <li>
                <strong>Adarsh Patel</strong>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>BTMC25O1008 (Frontend & UI)</div>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <strong>Atul Kushwah</strong>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>BTMC25O1034 (Backend & DB)</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MITS ONE — Designed & Developed by Team Nexora. Built with React & FastAPI.
          </p>
          <p style={{ color: '#64748b' }}>
            Note: Complements existing institutional systems (ERP / AMS).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
