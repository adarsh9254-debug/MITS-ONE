import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  MapPin,
  Clock,
  Building,
  CheckCircle,
  Phone,
  Navigation,
  Layers,
  Sparkles
} from 'lucide-react';
import { mockCampusLocations } from '../data/mockData';

const CampusNavigator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Department', 'Laboratory', 'Library', 'Auditorium', 'Admin'];

  const filteredLocations = useMemo(() => {
    return mockCampusLocations.filter((loc) => {
      const matchCat = selectedCategory === 'All' || loc.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        loc.name.toLowerCase().includes(q) ||
        loc.buildingBlock.toLowerCase().includes(q) ||
        loc.floor.toLowerCase().includes(q) ||
        loc.facilities.some((f) => f.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="campus-page">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <Compass size={16} />
            <span>Interactive Campus Wayfinding</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Campus Navigator
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '720px' }}>
            Locate academic departments, high-performance computing labs, faculty chambers, and administrative offices across the MITS Gwalior campus.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by facility, block, or room (e.g. 'Mathematics', 'Lab 3', 'Library', 'Exam Cell')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', marginRight: '0.5rem' }}>
              Facility Category:
            </span>
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-pill ${selectedCategory === c ? 'active' : ''}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </button>
            ))}

            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, background: 'none', cursor: 'pointer' }}
              >
                Clear Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          Showing <strong>{filteredLocations.length}</strong> campus facilities
        </div>

        {/* Locations Grid */}
        <div className="campus-grid">
          {filteredLocations.map((loc) => {
            const badgeClass =
              loc.category === 'Department'
                ? 'loc-dept'
                : loc.category === 'Laboratory'
                ? 'loc-lab'
                : loc.category === 'Library'
                ? 'loc-lib'
                : loc.category === 'Auditorium'
                ? 'loc-aud'
                : 'loc-admin';

            return (
              <div key={loc.id} className="campus-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className={`loc-badge ${badgeClass}`}>{loc.category}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: 4 }}>
                      {loc.floor}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    {loc.name}
                  </h2>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building size={15} color="#2563eb" />
                    <span>{loc.buildingBlock}</span>
                  </div>

                  {/* Directions Banner */}
                  <div style={{ background: '#f8fafc', borderLeft: '4px solid #2563eb', padding: '0.85rem 1rem', borderRadius: '0 8px 8px 0', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Navigation size={13} />
                      <span>Walking Directions</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                      {loc.directions}
                    </p>
                  </div>

                  {/* Facilities list */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Available Facilities
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {loc.facilities.map((fac, idx) => (
                        <span key={idx} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                          ✓ {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: '#64748b' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} color="#f59e0b" />
                    <span>{loc.timings}</span>
                  </span>
                  <span>Contact: {loc.leadPerson}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampusNavigator;
