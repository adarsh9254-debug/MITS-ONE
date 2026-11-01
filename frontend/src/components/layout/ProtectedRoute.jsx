import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="status-dot online" style={{ width: 24, height: 24, margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Verifying security credentials...</p>
        </div>
      </div>
    );
  }

  // Not logged in -> Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but route requires admin role and user is a student
  if (requireAdmin && !isAdmin) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <ShieldAlert size={36} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
          Administrative Access Denied (HTTP 403)
        </h1>
        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
          You are currently signed in as a student. Administrative operations (publishing notices, curriculum uploads) are restricted to faculty coordinators and HOD accounts.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Student Dashboard</span>
        </Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
