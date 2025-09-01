import api from './api';
import axios from 'axios';
import { User, UserCreate, UserLogin, UserUpdate } from '../types/user';

export const authService = {
  // Đăng ký người dùng mới
  registerUser: async (userData: UserCreate): Promise<User> => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  // Đăng nhập
  loginUser: async (email: string, password: string): Promise<{ access_token: string; user: User }> => {
    // Bước 1: Đăng nhập để lấy token
    const loginResponse = await api.post('/api/auth/login', { email, password });
    
    const accessToken = loginResponse.data.access_token;
    if (!accessToken) {
      throw new Error('No access token received from server');
    }
    
    // Bước 2: Sử dụng token để lấy thông tin user
    const userResponse = await axios.get('http://localhost:8000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      access_token: accessToken,
      user: userResponse.data
    };
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Cập nhật thông tin người dùng
  updateUser: async (userId: number, userData: UserUpdate): Promise<User> => {
    const response = await api.put(`/api/users/${userId}`, userData);
    return response.data;
  },

  // Thay đổi mật khẩu
  changePassword: async (userId: number, oldPassword: string, newPassword: string): Promise<boolean> => {
    await api.post(`/api/users/${userId}/change-password`, {
      old_password: oldPassword,
      new_password: newPassword
    });
    return true;
  },

  // Quên mật khẩu
  forgotPassword: async (email: string): Promise<boolean> => {
    await api.post('/api/users/forgot-password', { email });
    return true;
  },

  // Reset mật khẩu
  resetPassword: async (token: string, newPassword: string): Promise<boolean> => {
    await api.post('/api/users/reset-password', {
      token,
      new_password: newPassword
    });
    return true;
  },

  // Xác thực token
  verifyToken: async (): Promise<boolean> => {
    try {
      await api.get('/api/auth/me');
      return true;
    } catch {
      return false;
    }
  }
};
