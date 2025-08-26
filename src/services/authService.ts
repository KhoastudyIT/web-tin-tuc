import api from './api';
import { User, UserCreate, UserLogin, UserUpdate } from '../types/user';

export const authService = {
  // Đăng ký người dùng mới
  registerUser: async (userData: UserCreate): Promise<User> => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  // Đăng nhập
  loginUser: async (email: string, password: string): Promise<{ access_token: string; user: User }> => {
    const response = await api.post('/api/auth/login', { email, password });
    // Backend trả về { access_token, token_type }, cần lấy user từ /me
    const userResponse = await api.get('/api/auth/me');
    return {
      access_token: response.data.access_token,
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
