import axios from 'axios';

const API_URL = 'http://localhost:5000/auth2'; // Adjust based on your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  signup: (userData) => api.post('/signup', userData),
  login: (credentials) => api.post('/login', credentials),
  forgotPassword: (email) => api.post('/forgotPassword', { email }),
  resetPassword: (token, passwords) => api.patch(`/resetPassword/${token}`, passwords),
  getOtp: (emailId) => api.post('/getotp', { emailId }),
  verifyOtp: (userOtp) => api.post('/verifyotp', { userOtp }),
  getCurrentUser: () => api.get('/getCurrentUser'),
};

export default api;