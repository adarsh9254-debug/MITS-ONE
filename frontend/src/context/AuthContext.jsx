import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mits_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify session on page load
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('mits_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          setToken(storedToken);
        } catch (err) {
          console.error("Session verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token, user: loggedUser } = res.data;

      localStorage.setItem('mits_token', access_token);
      localStorage.setItem('mits_user', JSON.stringify(loggedUser));
      setToken(access_token);
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (err) {
      const message = err.response?.data?.detail || "Authentication failed";
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      const { access_token, user: newUser } = res.data;

      localStorage.setItem('mits_token', access_token);
      localStorage.setItem('mits_user', JSON.stringify(newUser));
      setToken(access_token);
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      const message = err.response?.data?.detail || "Registration failed";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mits_token');
    localStorage.removeItem('mits_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
