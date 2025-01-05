import React, { useState } from 'react';
import { MediaUpload } from './MediaUpload';
import { IDVerification } from './IDVerification';

export function RegistrationForm() {
  const [role, setRole] = useState<'man' | 'woman'>('man');
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role Selection */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setRole('man')}
              className={`px-6 py-2 rounded-lg ${
                role === 'man'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              I am a Man
            </button>
            <button
              type="button"
              onClick={() => setRole('woman')}
              className={`px-6 py-2 rounded-lg ${
                role === 'woman'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              I am a Woman
            </button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="60"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upload Your Photos {role === 'woman' && '& Videos'}
            </h3>
            <MediaUpload
              files={files}
              onFilesChange={setFiles}
              minPhotos={role === 'woman' ? 5 : 1}
              acceptVideo={role === 'woman'}
            />
          </div>

          {/* ID Verification */}
          <IDVerification />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}