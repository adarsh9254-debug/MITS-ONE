import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  RefreshCw,
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  ExternalLink,
  BookOpen,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import api from '../services/api';
import '../styles/ai.css';

const PRESET_QUERIES = [
  'When do Mid-Semester exams begin?',
  'What are Smart India Hackathon (SIH 2026) guidelines?',
  'Where is Computing Lab 3 located?',
  'Discrete Mathematics MAC-301 syllabus topics',
  'Tell me about Google Summer of Code 2026',
];

const INITIAL_MESSAGE = {
  id: 'init-1',
  sender: 'assistant',
  text: `Hello! I am the **MITS ONE AI Assistant**, developed by Team Nexora (Department of Mathematics and Computing).

I am equipped with a **Grounded Retrieval-Augmented Generation (RAG)** engine indexed over official MITS Gwalior circulars, departmental syllabi, exam schedules, and campus facilities.

Ask me any academic or campus question below, or select one of the suggested prompts!`,
  citations: ['MITS Academic Regulations', 'Dept of Mathematics & Computing Handbook'],
  source: 'MITS Grounded Campus Knowledge Base',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (queryToSend) => {
    const query = (queryToSend || inputText).trim();
    if (!query || isLoading) return;

    setError(null);
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/query', { query });
      const { answer, source, citations, matched_records } = response.data;

      const assistantMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        source: source || 'MITS Grounded Campus Knowledge Base',
        citations: citations || [],
        matchedRecords: matched_records || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI Query failed:', err);
      // Fallback response with offline knowledge
      const offlineMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Network Notice**: Unable to reach backend AI service directly. 
        
If you are running the backend locally, please verify that \`uvicorn app.main:app\` is active on \`http://localhost:8000\`.
In offline mode, refer to the **Study Resource Hub** and **Information Hub** for verified documents.`,
        source: 'Client Fallback Safeguard',
        citations: ['Local Cache'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, offlineMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
  };

  return (
    <div className="ai-page">
      <div className="container">
        {/* Page Heading */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#eff6ff',
              color: '#1d4ed8',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} />
            <span>Phase 4 • Intelligence Layer</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
            AI College Assistant
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            Instant answers grounded in official MITS circulars, syllabi, exam schedules, and campus facilities.
          </p>
        </div>

        {/* Chat Container Card */}
        <div className="ai-chat-card">
          {/* Header */}
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <div className="ai-avatar-badge">
                <Bot size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    MITS ONE Query Engine
                  </h2>
                  <span
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Online
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#bfdbfe', marginTop: '2px' }}>
                  Grounded RAG • Google Gemini 2.5 Flash & MITS Knowledge Base
                </div>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="btn btn-sm"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title="Reset conversation"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', opacity: 0.8 }}>
                  {msg.sender === 'assistant' ? (
                    <>
                      <Bot size={13} color="#2563eb" />
                      <strong style={{ color: '#1e40af' }}>MITS ONE Assistant</strong>
                    </>
                  ) : (
                    <>
                      <span>You</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Body */}
                <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </div>

                {/* Grounded Citations & Sources (Assistant Only) */}
                {msg.sender === 'assistant' && msg.citations && msg.citations.length > 0 && (
                  <div className="citation-chip-box">
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Verified Grounded Sources:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {msg.citations.map((cite, idx) => (
                        <span key={idx} className="citation-chip">
                          <FileText size={12} />
                          <span>{cite}</span>
                        </span>
                      ))}
                    </div>
                    {msg.source && (
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                        Engine: <strong>{msg.source}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="message-bubble assistant" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #93c5fd',
                    borderTopColor: '#2563eb',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Retrieving campus knowledge and generating answer...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts */}
          <div className="quick-prompts-bar">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', alignSelf: 'center', whiteSpace: 'nowrap' }}>
              Suggested:
            </span>
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                className="quick-prompt-btn"
                onClick={() => handleSend(preset)}
                disabled={isLoading}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="ai-input-bar">
            <input
              type="text"
              className="ai-query-input"
              placeholder="Ask anything about MITS exams, syllabus, labs, circulars..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              className="btn btn-primary"
              disabled={!inputText.trim() || isLoading}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0 1.25rem' }}
            >
              <span>Ask</span>
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Feature Explainer for Evaluators / Mentor */}
        <div
          style={{
            marginTop: '2rem',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            maxWidth: '900px',
            margin: '2rem auto 0',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} />
            <span>Academic Architecture: How Grounded RAG Works</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
            Unlike generic chat models prone to hallucinations, <strong>MITS ONE AI</strong> uses an institutional 
            <strong> Retrieval-Augmented Generation (RAG)</strong> pipeline. Student queries are vectorized with <strong>Scikit-learn TF-IDF</strong> across verified college circulars, curriculum syllabi, and campus directories. Top-matching segments are passed as grounded context into <strong>Google Gemini 2.5 Flash</strong> to produce accurate answers with verifiable citations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
