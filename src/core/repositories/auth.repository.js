// Data/Infrastructure Layer for Authentication
// Encapsulates raw HTTP requests and local caching storage logic.

import axios from 'axios';

// A mock base URL or an environment variable should be used
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const AuthRepository = {
  async loginClient(phoneOrEmail) {
    // In a real app: return await apiClient.post('/auth/client/login', { identifier: phoneOrEmail });
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: 'OTP sent' }), 800);
    });
  },

  async verifyClientOtp(otp) {
    // In a real app: return await apiClient.post('/auth/client/verify', { otp });
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, token: 'client-jwt-token-123', user: { id: 1, role: 'client' } }), 800);
    });
  },

  async loginAdmin(credentials) {
    // In a real app: return await apiClient.post('/auth/admin/login', credentials);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin' && credentials.totp === '123456') {
          resolve({ success: true, token: 'admin-jwt-token-456', user: { id: 99, role: 'admin' } });
        } else {
          reject(new Error('Invalid credentials or TOTP'));
        }
      }, 1000);
    });
  },

  saveToken(token) {
    localStorage.setItem('auth_token', token);
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  clearToken() {
    localStorage.removeItem('auth_token');
  },

  saveUser(user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  clearUser() {
    localStorage.removeItem('auth_user');
  }
};
