import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

const ModulePlaceholder = ({ title, description, icon: Icon, phase = 'Phase 2' }) => {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '16px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {Icon ? <Icon size={32} /> : <Clock size={32} />}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
        <Clock size={14} />
        <span>Ready for Implementation in {phase}</span>
      </div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>{title}</h1>
      <p style={{ maxWidth: '600px', color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        {description}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn btn-outline">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <Link to="/resources" className="btn btn-primary">
          <span>Explore Next</span>
        </Link>
      </div>
    </div>
  );
};

export default ModulePlaceholder;
