import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Key, Mail, Shield, AlertCircle, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const fillCredentials = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    setErrorMsg('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <LogIn size={24} />
          </div>
          <h1 className="auth-title">Sign In to MITS ONE</h1>
          <p className="auth-subtitle">Access student resources, deadlines, and circulars</p>
        </div>

        {/* Demo Quick Login Helper (Ideal for Mentor / Viva Evaluation) */}
        <div className="demo-credentials-box">
          <div className="demo-title">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Quick Demo Credentials (Exhibition Mode)
          </div>
          <div className="demo-btns-row">
            <button
              type="button"
              className="demo-btn"
              onClick={() => fillCredentials('adarsh.patel@mitsgwl.ac.in', 'student123')}
            >
              🎓 Student (Adarsh)
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => fillCredentials('admin@mitsgwl.ac.in', 'admin123')}
            >
              🛡️ Admin (Dr. Dixit)
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            <AlertCircle size={16} style={{ display: 'inline', marginRight: 6 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">College Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
              <input
                type="email"
                required
                placeholder="e.g. adarsh.patel@mitsgwl.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
              <input
                type="password"
                required
                placeholder="Enter account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In to Platform'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>
            Register as Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
