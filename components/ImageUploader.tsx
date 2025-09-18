import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(Array.from(files).filter(file => file.type.startsWith('image/')));
      // Reset the input value to allow uploading the same file again
      e.target.value = '';
    }
  };
  
  const handleClick = () => {
      fileInputRef.current?.click();
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <button 
        onClick={handleClick}
        className="w-full bg-emerald-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-emerald-600 transition-all duration-300 text-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        <UploadIcon className="w-6 h-6" />
        Upload Photos
      </button>
    </div>
  );
};

export default ImageUploader;