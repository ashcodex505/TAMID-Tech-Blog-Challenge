import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import apiClient from '../lib/api';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;
    
    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images per post.`);
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image file.`);
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 5MB.`);
          continue;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await apiClient.post('/images/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
              }
            },
          });

          newImages.push(response.data.imageUrl);
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          alert(`Failed to upload ${file.name}. Please try again.`);
        }
      }

      // Update images array
      onImagesChange([...images, ...newImages]);
    } finally {
      setUploading(false);
      setUploadProgress({});
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Extract filename from URL for deletion
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Remove from backend storage
      await apiClient.delete(`/images/${fileName}`);
      
      // Remove from local state
      const updatedImages = images.filter((_, i) => i !== index);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Still remove from local state even if backend deletion fails
      const updatedImages = images.filter((_, i) => i !== index);
      onImagesChange(updatedImages);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-gray-300 text-sm font-medium flex items-center">
          <ImageIcon className="w-4 h-4 mr-2 text-[#31B4EF]" />
          Images ({images.length}/{maxImages})
        </label>
        
        {images.length < maxImages && (
          <motion.button
            type="button"
            onClick={triggerFileInput}
            disabled={uploading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-[#31B4EF] hover:bg-[#31B4EF]/90 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? 'Uploading...' : 'Add Images'}
          </motion.button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              <div className="aspect-square bg-[#333333] rounded-lg overflow-hidden border border-[#444444]">
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.button
                type="button"
                onClick={() => handleRemoveImage(imageUrl, index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-[#333333] rounded-full h-2">
                <div
                  className="bg-[#31B4EF] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Upload up to {maxImages} images. Supported formats: JPG, PNG, GIF. Max size: 5MB per image.
      </p>
    </div>
  );
};

export default ImageUpload; 