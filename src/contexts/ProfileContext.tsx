import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { ProfileService } from '../services/ProfileService';

interface ProfileContextType {
  profile: User | null;
  loading: boolean;
  error: string | null;
  updateProfile: (userId: string, params: any) => Promise<void>;
  toggleVisibility: (userId: string) => Promise<void>;
  searchProfiles: (query: string) => Promise<User[]>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (userId: string, params: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedProfile = await ProfileService.updateProfile(userId, params);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedProfile = await ProfileService.toggleVisibility(userId);
      setProfile(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle visibility');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchProfiles = async (query: string): Promise<User[]> => {
    try {
      setLoading(true);
      setError(null);
      return await ProfileService.searchProfiles(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        toggleVisibility,
        searchProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}