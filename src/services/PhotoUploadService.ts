import { v4 as uuidv4 } from 'uuid';

export class PhotoUploadService {
  private static readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  static async uploadPhotos(files: File[], onProgress?: (progress: number) => void): Promise<string[]> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const uploadPromises = files.map(async (file, index) => {
        await this.validatePhoto(file);
        const formData = new FormData();
        const fileName = `${uuidv4()}-${file.name}`;
        formData.append('photo', file, fileName);

        const xhr = new XMLHttpRequest();
        const promise = new Promise<string>((resolve, reject) => {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
              const fileProgress = (event.loaded / event.total) * 100;
              const totalProgress = (index * 100 + fileProgress) / files.length;
              onProgress(Math.round(totalProgress));
            }
          });

          xhr.onload = async () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data.url);
              } catch (error) {
                reject(new Error('Invalid response format'));
              }
            } else {
              reject(new Error('Upload failed'));
            }
          };

          xhr.onerror = () => reject(new Error('Network error'));
        });

        xhr.open('POST', `${this.API_URL}/photos/upload`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);

        return promise;

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Photo upload failed');
        }

        const data = await response.json();
        return data.url;
      });

      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error('Photo upload error:', error);
      throw error;
    }
  }

  static async validatePhoto(file: File): Promise<boolean> {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Only images are allowed.');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit.');
    }

    return true;
  }
}