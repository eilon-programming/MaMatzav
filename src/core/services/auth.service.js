// Business Layer for Authentication
// Executes functional business workflows, validations, and coordinates through the Repository layer.

import { AuthRepository } from '../repositories/auth.repository';

export const AuthService = {
  async initiateClientLogin(identifier) {
    if (!identifier || identifier.trim().length < 5) {
      throw new Error('Please enter a valid phone number or email.');
    }
    
    // Transform or sanitize identifier if needed
    const sanitized = identifier.trim().toLowerCase();
    
    const response = await AuthRepository.loginClient(sanitized);
    return response;
  },

  async verifyClient(otp) {
    if (!otp || otp.length < 4) {
      throw new Error('Invalid OTP format.');
    }
    
    const response = await AuthRepository.verifyClientOtp(otp);
    if (response.success && response.token) {
      AuthRepository.saveToken(response.token);
      AuthRepository.saveUser(response.user);
    }
    return response;
  },

  async adminLogin(username, password, totp) {
    if (!username || !password || !totp) {
      throw new Error('All fields are required for admin access.');
    }

    try {
      const response = await AuthRepository.loginAdmin({ username, password, totp });
      if (response.success && response.token) {
        AuthRepository.saveToken(response.token);
        AuthRepository.saveUser(response.user);
      }
      return response;
    } catch (error) {
      throw new Error(error.message || 'Authentication failed');
    }
  },

  logout() {
    AuthRepository.clearToken();
    AuthRepository.clearUser();
  },

  getStoredSession() {
    const token = AuthRepository.getToken();
    const user = AuthRepository.getUser();
    
    if (token && user) {
      return { isAuthenticated: true, user, token };
    }
    return { isAuthenticated: false, user: null, token: null };
  }
};
