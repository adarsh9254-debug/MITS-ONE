import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Bell,
  Compass,
  Briefcase,
  Calendar,
  Bot,
  Shield,
  LogIn,
  CheckCircle2,
  XCircle,
  Menu,
  X
} from 'lucide-react';
import { checkSystemHealth } from '../../services/api';

const Navbar = () => {
  const location = useLocation();
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const res = await checkSystemHealth();
      if (isMounted) {
        setBackendStatus({ online: res.online, checking: false });
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 15000); // Check every 15s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: 'Notices', path: '/notices', icon: Bell },
    { label: 'Study Resources', path: '/resources', icon: BookOpen },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Events & Clubs', path: '/events', icon: Calendar },
    { label: 'Campus Map', path: '/campus', icon: Compass },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot, isSpecial: true },
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand & Logo */}
        <Link to="/" className="brand-wrapper">
          <img src="/mits-logo.svg" alt="MITS ONE Logo" className="brand-logo-img" />
          <div className="brand-info">
            <div className="brand-title-group">
              <span className="brand-name">MITS ONE</span>
              <span className="badge badge-primary">v1.0</span>
            </div>
            <span className="brand-college-tag">Madhav Institute of Technology and Science</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                style={item.isSpecial ? { color: '#2563eb', fontWeight: 600 } : {}}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Live Status Indicator */}
        <div className="navbar-actions">
          {/* Live System Health Pill */}
          <div
            className={`status-indicator ${backendStatus.online ? 'online' : 'offline'}`}
            title={backendStatus.online ? 'FastAPI Backend Connected' : 'FastAPI Backend Disconnected'}
          >
            <span className={`status-dot ${backendStatus.online ? 'online' : 'offline'}`}></span>
            <span>{backendStatus.online ? 'API Online' : 'Connecting...'}</span>
          </div>

          <Link to="/login" className="btn btn-outline btn-sm">
            <LogIn size={15} />
            <span>Login</span>
          </Link>

          <Link to="/admin" className="btn btn-primary btn-sm" title="Restricted to Faculty & Administrators">
            <Shield size={15} />
            <span>Admin</span>
          </Link>

          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="nav-link-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
