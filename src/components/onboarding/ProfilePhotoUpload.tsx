"use client";
import React from "react";

interface ProfilePhotoUploadProps {
  onPhotoSelect?: (file: File) => void;
  className?: string;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onPhotoSelect,
  className = "",
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPhotoSelect) {
      onPhotoSelect(file);
    }
  };

  return (
    <div className={`flex flex-col items-center mb-8 ${className}`}>
      <div className="relative mb-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <label
          htmlFor="photo-upload"
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-cobalt-blue rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};
