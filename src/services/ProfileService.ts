import { User, UserRole } from '../types';

interface UpdateProfileParams {
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  role?: UserRole;
  bio?: string;
  photos?: string[];
  isVisible?: boolean;
}

export class ProfileService {
  private static readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  static async getProfile(userId: string): Promise<User> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.API_URL}/profiles/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      const profile = await response.json();
      return profile;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  }

  static async updateProfile(userId: string, params: UpdateProfileParams): Promise<User> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.API_URL}/profiles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      return updatedProfile;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  static async toggleVisibility(userId: string): Promise<User> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.API_URL}/profiles/${userId}/visibility`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to toggle profile visibility');
      }

      const updatedProfile = await response.json();
      return updatedProfile;
    } catch (error) {
      console.error('Profile visibility toggle error:', error);
      throw error;
    }
  }

  static async searchProfiles(query: string): Promise<User[]> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.API_URL}/profiles/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to search profiles');
      }

      const profiles = await response.json();
      return profiles;
    } catch (error) {
      console.error('Profile search error:', error);
      throw error;
    }
  }
}