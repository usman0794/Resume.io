import type { User } from '@/types/user.types';

export interface AuthResponse {
  token: string;
  user: User;
}

/** Demo admin credentials — only this exact combo signs in as admin. */
const ADMIN_EMAIL = 'admin@resumeio.com';
const ADMIN_PASSWORD = 'admin123';

const mockAdminUser: User = {
  id: 1,
  name: 'Admin',
  email: ADMIN_EMAIL,
  role: 'admin',
  created_at: new Date().toISOString()
};

const mockRegularUser: User = {
  id: 2,
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user',
  created_at: new Date().toISOString()
};

const authService = {
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    await new Promise(r => setTimeout(r, 500));
    const isAdmin = credentials.email.trim().toLowerCase() === ADMIN_EMAIL
      && credentials.password === ADMIN_PASSWORD;
    const user = isAdmin ? mockAdminUser : { ...mockRegularUser, email: credentials.email };
    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  async register(userData: { name: string; email: string; password: string; password_confirmation: string }): Promise<AuthResponse> {
    await new Promise(r => setTimeout(r, 500));
    const token = 'mock-jwt-token';
    // Signups are always regular users — admin access isn't self-service.
    const newUser: User = { ...mockRegularUser, name: userData.name, email: userData.email };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { token, user: newUser };
  },

  async socialLogin(idToken: string, provider: string): Promise<AuthResponse> {
    await new Promise(r => setTimeout(r, 500));
    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mockRegularUser));
    return { token, user: mockRegularUser };
  },

  async me(): Promise<User> {
    await new Promise(r => setTimeout(r, 500));
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : mockRegularUser;
  },

  async logout(): Promise<void> {
    await new Promise(r => setTimeout(r, 300));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
