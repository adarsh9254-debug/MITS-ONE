import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Shield,
  Bell,
  BookOpen,
  Briefcase,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  FileText
} from 'lucide-react';
import { mockDepartments } from '../../data/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('publish_notice'); // 'publish_notice' | 'upload_resource' | 'post_opportunity'
  const [stats, setStats] = useState(null);
  const [statusToast, setStatusToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form 1: Notice
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'Academic',
    is_urgent: false,
    content: '',
    attachment_name: '',
    attachment_size: '',
  });

  // Form 2: Resource
  const [resourceForm, setResourceForm] = useState({
    title: '',
    dept: 'MAC',
    semester: 4,
    subject_code: 'MAC-402',
    subject_name: 'Design & Analysis of Algorithms',
    resource_type: 'Notes',
    file_format: 'PDF',
    file_size: '3.5 MB',
    description: '',
    preview_summary: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Form 3: Opportunity
  const [oppForm, setOppForm] = useState({
    title: '',
    organization: '',
    type: 'Internship',
    location: 'Remote / Hybrid',
    stipend_or_prize: '₹20,000 / month',
    deadline: '2026-12-15',
    required_skills: 'Python, SQL',
    eligibility: 'B.Tech All Branches',
    description: '',
    apply_url: 'https://mitsgwl.ac.in',
  });

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data.metrics);
    } catch (err) {
      console.warn("Could not load backend stats, showing defaults", err);
      setStats({
        total_students: 2,
        total_notices: 3,
        total_resources: 2,
        total_opportunities: 2,
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const triggerToast = (msg, isError = false) => {
    setStatusToast({ msg, isError });
    setTimeout(() => setStatusToast(null), 4000);
  };

  // Submit Notice
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/admin/notices', noticeForm);
      triggerToast(`Notice "${noticeForm.title}" published successfully!`);
      setNoticeForm({
        title: '',
        category: 'Academic',
        is_urgent: false,
        content: '',
        attachment_name: '',
        attachment_size: '',
      });
      fetchStats();
    } catch (err) {
      triggerToast(err.response?.data?.detail || "Failed to publish notice", true);
    }
    setSubmitting(false);
  };

  // Submit Resource with Document Upload
  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalFileSize = resourceForm.file_size;
      let finalFormat = resourceForm.file_format;

      // If physical file was selected, upload via multipart
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append('file', selectedFile);
        const uploadRes = await api.post('/admin/upload-document', fileData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        finalFileSize = uploadRes.data.file_size;
        finalFormat = uploadRes.data.file_format;
      }

      await api.post('/admin/resources', {
        ...resourceForm,
        file_size: finalFileSize,
        file_format: finalFormat,
        semester: parseInt(resourceForm.semester, 10),
      });

      triggerToast(`Study material "${resourceForm.title}" added to repository!`);
      setSelectedFile(null);
      setResourceForm({
        title: '',
        dept: 'MAC',
        semester: 4,
        subject_code: '',
        subject_name: '',
        resource_type: 'Notes',
        file_format: 'PDF',
        file_size: '3.5 MB',
        description: '',
        preview_summary: '',
      });
      fetchStats();
    } catch (err) {
      triggerToast(err.response?.data?.detail || "Failed to upload study resource", true);
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header-row">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#b45309', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <Shield size={16} />
              <span>Institutional Administration Control Center</span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a' }}>
              Administrative Portal
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Welcome, <strong>{user?.full_name}</strong> • Role: <span className="badge badge-warning">Admin</span>
            </p>
          </div>

          <div className="admin-badge-indicator">
            <Shield size={14} />
            <span>Role-Based Access Verified (Admin)</span>
          </div>
        </div>

        {/* Toast */}
        {statusToast && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              background: statusToast.isError ? '#fef2f2' : '#ecfdf5',
              border: `1px solid ${statusToast.isError ? '#fecaca' : '#6ee7b7'}`,
              color: statusToast.isError ? '#991b1b' : '#065f46',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {statusToast.isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{statusToast.msg}</span>
          </div>
        )}

        {/* Platform Metrics Row */}
        {stats && (
          <div className="metrics-row" style={{ marginBottom: '2rem' }}>
            <div className="metric-card">
              <div>
                <div className="metric-number">{stats.total_students}</div>
                <div className="metric-label">Registered Students</div>
              </div>
              <div className="metric-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <Users size={24} />
              </div>
            </div>

            <div className="metric-card">
              <div>
                <div className="metric-number">{stats.total_notices}</div>
                <div className="metric-label">Published Notices</div>
              </div>
              <div className="metric-icon-box" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Bell size={24} />
              </div>
            </div>

            <div className="metric-card">
              <div>
                <div className="metric-number">{stats.total_resources}</div>
                <div className="metric-label">Curriculum Resources</div>
              </div>
              <div className="metric-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
                <BookOpen size={24} />
              </div>
            </div>

            <div className="metric-card">
              <div>
                <div className="metric-number">{stats.total_opportunities}</div>
                <div className="metric-label">Vetted Opportunities</div>
              </div>
              <div className="metric-icon-box" style={{ background: '#faf5ff', color: '#9333ea' }}>
                <Briefcase size={24} />
              </div>
            </div>
          </div>
        )}

        {/* Admin Section Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'publish_notice' ? 'active' : ''}`}
            onClick={() => setActiveTab('publish_notice')}
          >
            <Bell size={16} />
            <span>Publish Notice</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'upload_resource' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload_resource')}
          >
            <Upload size={16} />
            <span>Upload Study Resource</span>
          </button>
        </div>

        {/* Tab 1: Publish Notice Form */}
        {activeTab === 'publish_notice' && (
          <div className="admin-form-card">
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Publish Official Campus Notice
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Publishes circulars to the Smart Information Hub and student dashboards in real time.
            </p>

            <form onSubmit={handleNoticeSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for End-Semester Practical Examinations 2026"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="dept-select"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Placement">Placement</option>
                    <option value="Events">Events</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="form-group" style={{ justifyContent: 'center' }}>
                  <label className="form-label">Priority</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={noticeForm.is_urgent}
                      onChange={(e) => setNoticeForm({ ...noticeForm, is_urgent: e.target.checked })}
                      style={{ width: 18, height: 18 }}
                    />
                    <span style={{ fontWeight: 600, color: '#ef4444' }}>Mark as URGENT (High Priority Banner)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notice Content & Instructions</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed notification body, instructions, and dates..."
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="form-input"
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Attachment File Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Practical_Exam_Schedule_2026.pdf"
                    value={noticeForm.attachment_name}
                    onChange={(e) => setNoticeForm({ ...noticeForm, attachment_name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">File Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.2 MB"
                    value={noticeForm.attachment_size}
                    onChange={(e) => setNoticeForm({ ...noticeForm, attachment_size: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.75rem', marginTop: '1rem' }}
                disabled={submitting}
              >
                {submitting ? 'Publishing...' : 'Publish Official Notice'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Upload Study Resource Form */}
        {activeTab === 'upload_resource' && (
          <div className="admin-form-card">
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Upload Study Resource into Academic Repository
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Add lecture notes, previous year question papers, or lab manuals mapped to Department and Semester.
            </p>

            <form onSubmit={handleResourceSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linear Algebra & Differential Equations — Unit 3 Notes"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    value={resourceForm.dept}
                    onChange={(e) => setResourceForm({ ...resourceForm, dept: e.target.value })}
                    className="dept-select"
                  >
                    {mockDepartments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Semester</label>
                  <select
                    value={resourceForm.semester}
                    onChange={(e) => setResourceForm({ ...resourceForm, semester: e.target.value })}
                    className="dept-select"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Sem {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Resource Type</label>
                  <select
                    value={resourceForm.resource_type}
                    onChange={(e) => setResourceForm({ ...resourceForm, resource_type: e.target.value })}
                    className="dept-select"
                  >
                    <option value="Notes">Lecture Notes</option>
                    <option value="PYQ">Previous Year Paper (PYQ)</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Study PDF">Study PDF</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MAC-402"
                    value={resourceForm.subject_code}
                    onChange={(e) => setResourceForm({ ...resourceForm, subject_code: e.target.value })}
                    className="form-input"
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Design & Analysis of Algorithms"
                    value={resourceForm.subject_name}
                    onChange={(e) => setResourceForm({ ...resourceForm, subject_name: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Physical Document File Upload Zone */}
              <div className="form-group">
                <label className="form-label">Document File Upload (.PDF, .DOCX, max 25MB)</label>
                <div className="file-dropzone" onClick={() => document.getElementById('resFileInput').click()}>
                  <Upload size={32} color="#2563eb" style={{ margin: '0 auto 0.5rem' }} />
                  {selectedFile ? (
                    <div>
                      <strong style={{ color: '#065f46' }}>✓ File Selected: {selectedFile.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e3a8a' }}>
                        Click to choose official syllabus / study file
                      </div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Supported extensions: PDF, DOCX, PPTX (Validated server-side)
                      </span>
                    </div>
                  )}
                  <input
                    id="resFileInput"
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Syllabus Coverage</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline topics, chapters, and references covered in this resource..."
                  value={resourceForm.description}
                  onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                  className="form-input"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-accent"
                style={{ padding: '0.75rem', marginTop: '1rem' }}
                disabled={submitting}
              >
                {submitting ? 'Uploading & Processing Document...' : 'Upload Document to Repository'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
