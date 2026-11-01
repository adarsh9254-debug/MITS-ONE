import axios from 'axios';

// Create configured Axios instance
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Bearer Token if present in local storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mits_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Uniform error handling & 401 redirection
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      localStorage.removeItem('mits_token');
      localStorage.removeItem('mits_user');
    }
    return Promise.reject(error);
  }
);

// Helper function to check system health
export const checkSystemHealth = async () => {
  try {
    const response = await api.get('/health');
    return { online: true, data: response.data };
  } catch (err) {
    return { online: false, error: err.message };
  }
};

export default api;
