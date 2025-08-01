"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface ProfilePhotoUploadProps {
  onPhotoSelect?: (file: File) => void;
  className?: string;
  isCompte?: boolean;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onPhotoSelect,
  className = "",
  isCompte = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Créer une URL temporaire pour afficher l'image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      if (onPhotoSelect) {
        onPhotoSelect(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center mb-1 ${className}`}>
      <div className="relative mb-4">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-light-blue-gray overflow-hidden ${
            isCompte ? "ml-4" : ""
          }`}
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="photo-profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-12 h-12">
              <Image
                src={"/assets/icons/user.svg"}
                alt="user-icon"
                width={30}
                height={30}
                className="mb-2 w-full h-full"
              />
            </div>
          )}
        </div>
        {!isCompte && (
          <>
            {" "}
            <label
              htmlFor="photo-upload"
              className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center cursor-pointer"
            >
              <Image
                src={"/assets/icons/camera.svg"}
                alt="upload-icon"
                width={30}
                height={30}
                className="mb-2"
              />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </>
        )}
        {isCompte && (
          <>
            <button
              type="button"
              className="text-sm mt-2 w-full max-w-[140px] text-exford-blue font-bold bg-white rounded-full px-3 py-2 border border-light-blue-gray"
              onClick={handleButtonClick}
            >
              Changer de photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </>
        )}
      </div>
    </div>
  );
};
