import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Award,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { mockOpportunities, mockStudentProfile } from '../data/mockData';

const OpportunityRadar = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [applyToast, setApplyToast] = useState(null);

  const types = ['All', 'Internship', 'Job', 'Hackathon', 'Competition', 'Scholarship'];

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate skill match percentage against Adarsh's profile
  const calculateMatch = (reqSkills) => {
    if (!reqSkills || reqSkills.length === 0) return 0;
    const studentSkillsLower = mockStudentProfile.skills.map((s) => s.toLowerCase());
    const matchedCount = reqSkills.filter((s) => studentSkillsLower.includes(s.toLowerCase())).length;
    return Math.round((matchedCount / reqSkills.length) * 100);
  };

  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter((opp) => {
      const matchType = selectedType === 'All' || opp.type.toLowerCase() === selectedType.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.requiredSkills.some((s) => s.toLowerCase().includes(q));

      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  const handleApply = (opp) => {
    setApplyToast(`Redirecting to official portal for "${opp.title}"...`);
    setTimeout(() => {
      setApplyToast(null);
      window.open(opp.applyUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="opp-page">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <Briefcase size={16} />
            <span>Career & Competition Radar</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Opportunity Radar
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '700px' }}>
            Discover vetted engineering internships, national hackathons, research fellowships, and campus drives matched with your skill profile.
          </p>
        </div>

        {/* Apply Feedback Toast */}
        {applyToast && (
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
            <span>{applyToast}</span>
          </div>
        )}

        {/* Toolbar */}
        <div className="opp-toolbar">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by role, company, or required skill (e.g. 'Python', 'SIH', 'TCS')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', marginRight: '0.5rem' }}>
              Filter By Type:
            </span>
            {types.map((t) => (
              <button
                key={t}
                className={`cat-pill ${selectedType === t ? 'active' : ''}`}
                onClick={() => setSelectedType(t)}
              >
                {t}
              </button>
            ))}

            {(selectedType !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => { setSelectedType('All'); setSearchQuery(''); }}
                style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, background: 'none', cursor: 'pointer' }}
              >
                Clear Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Opportunities List */}
        <div className="opp-grid">
          {filteredOpportunities.map((opp) => {
            const matchScore = calculateMatch(opp.requiredSkills);
            const isBookmarked = bookmarkedIds.includes(opp.id);

            return (
              <div key={opp.id} className={`opp-card ${opp.featured ? 'featured' : ''}`}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span className="badge badge-primary">{opp.type}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`opp-match-pill ${matchScore >= 70 ? 'opp-match-high' : 'opp-match-med'}`}>
                        <Sparkles size={12} />
                        <span>{matchScore}% Profile Match</span>
                      </span>
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked ? '#2563eb' : '#94a3b8' }}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Opportunity'}
                      >
                        {isBookmarked ? <BookmarkCheck size={20} color="#2563eb" /> : <Bookmark size={20} />}
                      </button>
                    </div>
                  </div>

                  <h2 className="opp-title">{opp.title}</h2>
                  <div className="opp-org">{opp.organization}</div>

                  <div className="opp-perks-row">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#0f172a' }}>
                      <DollarSign size={14} color="#10b981" />
                      <span>{opp.stipendOrPrize}</span>
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} color="#64748b" />
                      <span>{opp.location}</span>
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#b91c1c', fontWeight: 600 }}>
                      <Clock size={14} />
                      <span>Deadline: {opp.deadline}</span>
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55, marginBottom: '1rem' }}>
                    {opp.description}
                  </p>

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Target Skills
                  </div>
                  <div className="opp-skills-list">
                    {opp.requiredSkills.map((skill, idx) => {
                      const isMatched = mockStudentProfile.skills
                        .map((s) => s.toLowerCase())
                        .includes(skill.toLowerCase());
                      return (
                        <span key={idx} className={`opp-skill-chip ${isMatched ? 'matched' : ''}`}>
                          {isMatched ? `✓ ${skill}` : skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Eligibility: {opp.eligibility}
                  </span>
                  <button
                    className="btn btn-accent btn-sm"
                    onClick={() => handleApply(opp)}
                  >
                    <span>Apply Now</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpportunityRadar;
