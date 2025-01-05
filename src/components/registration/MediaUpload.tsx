import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface MediaUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  minPhotos: number;
  maxFiles?: number;
  acceptVideo?: boolean;
}

export function MediaUpload({ 
  files, 
  onFilesChange, 
  minPhotos, 
  maxFiles = 10,
  acceptVideo = false 
}: MediaUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || (acceptVideo && isVideo);
    });
    
    onFilesChange([...files, ...droppedFiles].slice(0, maxFiles));
  }, [files, maxFiles, acceptVideo, onFilesChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesChange([...files, ...newFiles].slice(0, maxFiles));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div 
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your {acceptVideo ? 'photos/videos' : 'photos'} here, or
          <label className="ml-1 text-red-500 hover:text-red-600 cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              multiple
              accept={acceptVideo ? "image/*,video/*" : "image/*"}
              onChange={handleFileInput}
            />
          </label>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {acceptVideo ? 'Images (PNG, JPG) or videos (MP4, max 30s)' : 'PNG, JPG up to 5MB'}
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-600">
        {files.length < minPhotos ? (
          <p className="text-red-500">
            Please upload at least {minPhotos} photo{minPhotos > 1 ? 's' : ''}
          </p>
        ) : (
          <p>
            {files.length} of {maxFiles} files uploaded
          </p>
        )}
      </div>
    </div>
  );
}