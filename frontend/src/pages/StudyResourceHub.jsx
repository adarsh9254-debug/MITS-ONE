import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Layers,
  CheckCircle2,
  X,
  Calendar,
  UserCheck,
  HardDrive,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { mockDepartments, mockSubjects, mockResources } from '../data/mockData';

const StudyResourceHub = () => {
  // Cascading Filter States
  const [selectedDept, setSelectedDept] = useState('MAC');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Document Preview Modal State
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  // Available Semesters
  const semesters = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];
  const resourceTypes = ['All', 'Notes', 'PYQ', 'Lab Manual', 'Study PDF'];

  // Dynamically compute subjects based on selected Department & Semester
  const availableSubjects = useMemo(() => {
    return mockSubjects.filter((subj) => {
      const matchDept = subj.dept === selectedDept;
      const matchSem = selectedSemester === 'All' || subj.semester === parseInt(selectedSemester, 10);
      return matchDept && matchSem;
    });
  }, [selectedDept, selectedSemester]);

  // Filter resources based on Department -> Semester -> Subject -> Type + Search Query
  const filteredResources = useMemo(() => {
    return mockResources.filter((res) => {
      const matchDept = res.dept === selectedDept;
      const matchSem = selectedSemester === 'All' || res.semester === parseInt(selectedSemester, 10);
      const matchSubject = selectedSubject === 'All' || res.subjectCode === selectedSubject;
      const matchType = selectedType === 'All' || res.resourceType.toLowerCase() === selectedType.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        res.title.toLowerCase().includes(q) ||
        res.subjectCode.toLowerCase().includes(q) ||
        res.subjectName.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q);

      return matchDept && matchSem && matchSubject && matchType && matchSearch;
    });
  }, [selectedDept, selectedSemester, selectedSubject, selectedType, searchQuery]);

  const handleDownload = (doc) => {
    // Increment local download count
    doc.downloadCount += 1;
    setDownloadToast(`Preparing download: "${doc.title}" (${doc.fileSize})...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  const resetFilters = () => {
    setSelectedSemester('All');
    setSelectedSubject('All');
    setSelectedType('All');
    setSearchQuery('');
  };

  return (
    <div className="resources-page">
      <div className="container">
        {/* Page Header */}
        <div className="res-header-box">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            <BookOpen size={16} />
            <span>Academic Curriculum Repository</span>
          </div>
          <h1 className="res-title">Study Resource Hub</h1>
          <p className="res-subtitle">
            Curated lecture notes, past examination papers, syllabus PDFs, and lab manuals organized by
            Department → Semester → Subject.
          </p>
        </div>

        {/* Download Toast Notification */}
        {downloadToast && (
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
            <span>{downloadToast}</span>
          </div>
        )}

        {/* Multi-Tier Filter Control Panel */}
        <div className="res-filter-panel">
          {/* Row 1: Department Selector & Keyword Search */}
          <div className="filter-row-top">
            <div>
              <div className="filter-group-label">
                <GraduationCap size={15} />
                <span>1. Select Academic Department</span>
              </div>
              <div className="dept-select-wrap">
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedSubject('All'); // Reset subject when department changes
                  }}
                  className="dept-select"
                >
                  {mockDepartments.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="filter-group-label">
                <Search size={15} />
                <span>Quick Document Search</span>
              </div>
              <div className="search-input-wrap">
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '0.85rem', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search by topic, keyword, or course code (e.g. 'Graph Theory', 'MAC-301')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-res"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Semester Filter */}
          <div>
            <div className="filter-group-label">
              <Calendar size={15} />
              <span>2. Filter by Semester</span>
            </div>
            <div className="semester-pills-wrap">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  className={`sem-pill ${selectedSemester === sem ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSemester(sem);
                    setSelectedSubject('All');
                  }}
                >
                  {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Available Subjects (Contextual to Selected Dept & Semester) */}
          {availableSubjects.length > 0 && (
            <div>
              <div className="filter-group-label">
                <Layers size={15} />
                <span>3. Specific Course Subject</span>
              </div>
              <div className="subject-chips-row">
                <button
                  className={`subject-chip ${selectedSubject === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedSubject('All')}
                >
                  All Courses
                </button>
                {availableSubjects.map((sub) => (
                  <button
                    key={sub.code}
                    className={`subject-chip ${selectedSubject === sub.code ? 'active' : ''}`}
                    onClick={() => setSelectedSubject(sub.code)}
                  >
                    <strong>{sub.code}:</strong> {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Row 4: Resource Types */}
          <div className="type-pills-wrap">
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#475569', marginRight: '0.5rem' }}>
              Resource Type:
            </span>
            {resourceTypes.map((type) => (
              <button
                key={type}
                className={`type-pill ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                <span>{type === 'All' ? 'All Formats' : type}</span>
              </button>
            ))}

            {(selectedSemester !== 'All' || selectedSubject !== 'All' || selectedType !== 'All' || searchQuery !== '') && (
              <button
                onClick={resetFilters}
                style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, background: 'none', cursor: 'pointer' }}
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          <span>
            Showing <strong>{filteredResources.length}</strong> study documents for{' '}
            <strong>{mockDepartments.find((d) => d.code === selectedDept)?.name}</strong>
          </span>
          <span style={{ fontSize: '0.8rem' }}>Verified Academic Material</span>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="resources-grid">
            {filteredResources.map((doc) => {
              // Type Badge Colors
              const typeBadgeClass =
                doc.resourceType === 'Notes'
                  ? 'badge-primary'
                  : doc.resourceType === 'PYQ'
                  ? 'badge-warning'
                  : doc.resourceType === 'Lab Manual'
                  ? 'badge-success'
                  : 'badge-accent';

              return (
                <div key={doc.id} className="resource-card">
                  <div className="res-card-top">
                    <div className="res-badge-group">
                      <span className="res-subject-code">{doc.subjectCode}</span>
                      <span className={`badge ${typeBadgeClass}`}>{doc.resourceType}</span>
                    </div>

                    <h2 className="res-title" style={{ fontSize: '1.15rem' }}>{doc.title}</h2>
                    <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {doc.subjectName} (Sem {doc.semester})
                    </div>
                    <p className="res-desc">{doc.description}</p>
                  </div>

                  <div>
                    <div className="res-meta-specs">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <HardDrive size={13} />
                        <span>{doc.fileSize}</span>
                      </span>
                      <span>•</span>
                      <span>{doc.fileFormat}</span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Download size={13} />
                        <span>{doc.downloadCount} downloads</span>
                      </span>
                    </div>

                    <div className="res-card-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => setPreviewDoc(doc)}
                      >
                        <Eye size={14} />
                        <span>Preview</span>
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => handleDownload(doc)}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '3.5rem', textAlign: 'center' }}>
            <FileText size={42} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No Study Documents Found
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
              No resources match your current selection for {selectedDept} (Semester {selectedSemester}). Try selecting "All Semesters" or clearing search keywords.
            </p>
            <button className="btn btn-outline btn-sm" onClick={resetFilters}>
              Clear All Active Filters
            </button>
          </div>
        )}

        {/* Document Preview Modal */}
        {previewDoc && (
          <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className="res-subject-code">{previewDoc.subjectCode}</span>
                    <span className="badge badge-primary">{previewDoc.resourceType}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    {previewDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: 8, marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Curriculum Content Outline
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#1e3a8a', lineHeight: 1.5 }}>
                    {previewDoc.previewSummary}
                  </p>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Description
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                    {previewDoc.description}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 8, fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>File Format:</span><br />
                    <strong>{previewDoc.fileFormat} Document</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Size:</span><br />
                    <strong>{previewDoc.fileSize}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Uploaded By:</span><br />
                    <strong>{previewDoc.uploadedBy}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setPreviewDoc(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    handleDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                >
                  <Download size={14} />
                  <span>Download Document ({previewDoc.fileSize})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyResourceHub;
