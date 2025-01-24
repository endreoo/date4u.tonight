import React, { useState } from 'react';
import { AIProfileService } from '../../services/AIProfileService';
import { Profile } from '../../types/profile';

interface AIProfileGeneratorProps {
  onProfileGenerated: (profile: Partial<Profile>) => void;
  gender: 'man' | 'woman';
}

export function AIProfileGenerator({ onProfileGenerated, gender }: AIProfileGeneratorProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && keywords.length < 5) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleGenerateProfile = async () => {
    if (keywords.length < 2) {
      setError('Please add at least 2 keywords');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const generatedProfile = await AIProfileService.generateProfile({
        keywords,
        gender,
        ageRange: { min: 18, max: 45 }
      });
      onProfileGenerated(generatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={currentKeyword}
          onChange={(e) => setCurrentKeyword(e.target.value)}
          placeholder="Enter a keyword"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
        />
        <button
          onClick={handleAddKeyword}
          disabled={keywords.length >= 5}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
          >
            {keyword}
            <button
              onClick={() => handleRemoveKeyword(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        onClick={handleGenerateProfile}
        disabled={loading || keywords.length < 2}
        className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400"
      >
        {loading ? 'Generating...' : 'Generate Profile'}
      </button>

      <p className="text-sm text-gray-500">
        Add 2-5 keywords that describe your personality and interests.
        Our AI will generate a profile that matches your characteristics.
      </p>
    </div>
  );
}