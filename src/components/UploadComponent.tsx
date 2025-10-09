import React, { useRef, useState } from 'react';

interface UploadComponentProps {
  onImageUpload: (imageUrl: string, fileName: string, file: File) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WEBP)');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string, file.name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-white/80 backdrop-blur-sm
          ${isDragging 
            ? 'border-indigo-600 bg-indigo-50/50 scale-102' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {isDragging ? 'Drop your photo here' : 'Upload your photo'}
            </p>
            <p className="text-gray-500 text-sm">
              Drag and drop or click to browse
            </p>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>Supported formats: JPEG, PNG, WEBP</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;

