import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import { ProfileService } from '../../services/ProfileService';

export function ViewProfile() {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { loading } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      try {
        const profileData = await ProfileService.getProfile(id);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Failed to fetch profile');
        }
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center p-4">Profile not found</div>;
  }

  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-48 bg-indigo-600">
          {profile.photos && profile.photos[0] && (
            <img
              src={profile.photos[0]}
              alt="Profile cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-center">
            <div className="-mt-16">
              <div className="inline-block h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                {profile.photos && profile.photos[1] ? (
                  <img
                    src={profile.photos[1]}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl text-gray-600">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => navigate(`/profile/edit/${profile.id}`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600 mt-1">{profile.age} years old</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">About</h2>
            <p className="mt-2 text-gray-600">{profile.bio || 'No bio available'}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            {isOwnProfile && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.phone}</p>
                </div>
              </>
            )}          
          </div>

          {profile.photos && profile.photos.length > 2 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-3 gap-4">
                {profile.photos.slice(2).map((photo, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1">
                    <img
                      src={photo}
                      alt={`Photo ${index + 3}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}