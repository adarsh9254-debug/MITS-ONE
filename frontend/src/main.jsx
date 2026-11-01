import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/components.css';
import './styles/navbar.css';
import './styles/landing.css';
import './styles/dashboard.css';
import './styles/notices.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
