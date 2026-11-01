import React, { useState, useMemo } from 'react';
import {
  Bell,
  Search,
  Filter,
  Download,
  AlertCircle,
  Calendar,
  Building2,
  FileText,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { mockNotices } from '../data/mockData';

const InformationHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloadFeedback, setDownloadFeedback] = useState(null);

  const categories = ['All', 'Academic', 'Examination', 'Placement', 'Events', 'General', 'Urgent'];

  const filteredNotices = useMemo(() => {
    return mockNotices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.publishedBy.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'All') return matchesSearch;
      if (selectedCategory === 'Urgent') return matchesSearch && notice.isUrgent;
      return matchesSearch && notice.category.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [searchQuery, selectedCategory]);

  const handleDownload = (filename) => {
    setDownloadFeedback(`Downloading official document: ${filename}`);
    setTimeout(() => {
      setDownloadFeedback(null);
    }, 3500);
  };

  return (
    <div className="notices-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header-box">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <Bell size={16} />
            <span>Central Circular Archive</span>
          </div>
          <h1 className="page-title">Smart Information Hub</h1>
          <p className="page-subtitle">
            Stay updated with official institutional notifications, exam announcements, and academic circulars from MITS Gwalior.
          </p>
        </div>

        {/* Temporary Download Feedback Alert */}
        {downloadFeedback && (
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
            <span>{downloadFeedback}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          {/* Search Row */}
          <div className="search-box-row">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search circulars by subject, keyword, or authority (e.g., 'Exam', 'Hackathon', 'Dean')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="notices-search-input"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills-row">
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#64748b', marginRight: '0.5rem' }}>
              Categories:
            </span>
            {categories.map((cat) => {
              const isUrgentBtn = cat === 'Urgent';
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  className={`cat-pill ${isUrgentBtn ? 'urgent-pill' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {isUrgentBtn && <AlertCircle size={13} />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notices Feed List */}
        <div className="notices-list">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div key={notice.id} className={`notice-card ${notice.isUrgent ? 'urgent' : ''}`}>
                <div className="notice-card-header">
                  <div className="notice-badges">
                    {notice.isUrgent && (
                      <span className="badge badge-warning" style={{ background: '#fef2f2', color: '#b91c1c' }}>
                        URGENT
                      </span>
                    )}
                    <span className="badge badge-primary">{notice.category}</span>
                  </div>

                  <div className="notice-meta">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      <span>{notice.publishedDate}</span>
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Building2 size={14} />
                      <span>{notice.publishedBy}</span>
                    </span>
                  </div>
                </div>

                <h2 className="notice-title">{notice.title}</h2>
                <p className="notice-content">{notice.content}</p>

                <div className="notice-footer">
                  {notice.attachmentName ? (
                    <button
                      className="attachment-chip"
                      onClick={() => handleDownload(notice.attachmentName)}
                      title="Download official PDF attachment"
                    >
                      <Download size={14} />
                      <span>{notice.attachmentName}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({notice.attachmentSize})</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No document attachment</span>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Notice link copied to clipboard!');
                      }}
                      title="Share Notice"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '3rem', textAlign: 'center' }}>
              <AlertCircle size={36} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Circulars Found</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                No notifications match your current filter criteria: "{searchQuery}".
              </p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationHub;
