import { User, UserRole } from '../types';

interface RegisterParams {
  name: string;
  email: string;
  phone: string;
  age: number;
  role: UserRole;
  bio?: string;
  photos: string[];
}

export class AuthService {
  private static readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  static async register(params: RegisterParams): Promise<User> {
    try {
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async verifyToken(token: string): Promise<User> {
    try {
      const response = await fetch(`${this.API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  }
}