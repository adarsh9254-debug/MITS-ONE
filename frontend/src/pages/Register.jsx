import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Key, Hash, GraduationCap, AlertCircle } from 'lucide-react';
import { mockDepartments } from '../data/mockData';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    enrollment_number: '',
    department_code: 'MAC',
    semester: 4,
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await register({
      ...formData,
      semester: parseInt(formData.semester, 10),
    });
    setSubmitting(false);

    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setErrorMsg(res.error || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        <div className="auth-header">
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <UserPlus size={24} />
          </div>
          <h1 className="auth-title">Create Student Account</h1>
          <p className="auth-subtitle">Join MITS ONE — Centralized Student Opportunity Platform</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            <AlertCircle size={16} style={{ display: 'inline', marginRight: 6 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
              <input
                type="text"
                name="full_name"
                required
                placeholder="e.g. Atul Kushwah"
                value={formData.full_name}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">College Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@mitsgwl.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Enrollment Number</label>
              <div style={{ position: 'relative' }}>
                <Hash size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
                <input
                  type="text"
                  name="enrollment_number"
                  required
                  placeholder="e.g. BTMC25O1034"
                  value={formData.enrollment_number}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', textTransform: 'uppercase' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department_code"
                value={formData.department_code}
                onChange={handleChange}
                className="dept-select"
                style={{ padding: '0.65rem 0.85rem' }}
              >
                {mockDepartments.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="dept-select"
                style={{ padding: '0.65rem 0.85rem' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Sem {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
              <input
                type="password"
                name="password"
                required
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-accent"
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={submitting}
          >
            {submitting ? 'Creating Student Account...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
