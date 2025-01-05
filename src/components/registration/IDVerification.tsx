import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export function IDVerification() {
  const [idImage, setIdImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);

  const handleIDUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIdImage(e.target.files[0]);
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelfieImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">ID Verification</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please upload a clear photo of your government-issued ID
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleIDUpload}
              />
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-600">
                  Upload ID Photo
                </span>
              </div>
            </label>
          </div>
          
          {idImage && (
            <div className="w-24 h-24">
              <img
                src={URL.createObjectURL(idImage)}
                alt="ID Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Selfie Verification</h3>
        <p className="text-sm text-gray-600 mb-4">
          Take a selfie holding your ID next to your face
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleSelfieUpload}
              />
              <div className="text-center">
                <Camera className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-600">
                  Take Selfie
                </span>
              </div>
            </label>
          </div>
          
          {selfieImage && (
            <div className="w-24 h-24">
              <img
                src={URL.createObjectURL(selfieImage)}
                alt="Selfie Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}