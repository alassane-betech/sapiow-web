"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl" | "xl2";
  className?: string;
  borderColor?: string;
  borderWidth?: "1" | "2" | "3";
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  alt,
  size = "md",
  className = "",
  borderColor = "border-lavender-mist",
  borderWidth = "3",
}) => {
  const sizeClasses = {
    sm: "w-10 h-10", // 40px
    md: "w-14 h-14", // 56px
    lg: "w-16 h-16", // 64px
    xl: "w-20 h-20", // 80px
    xl2: "w-28 h-28", // 96px
  };

  const sizeValues = {
    sm: { width: 40, height: 40 },
    md: { width: 56, height: 56 },
    lg: { width: 64, height: 64 },
    xl: { width: 80, height: 80 },
    xl2: { width: 112, height: 112 },
  };

  const borderClasses = {
    "1": "border-1",
    "2": "border-2",
    "3": "border-3",
  };

  const isValidAvatarUrl = (url?: string): boolean => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        borderClasses[borderWidth],
        borderColor,
        "rounded-full overflow-hidden",
        className
      )}
    >
      <Image
        src={isValidAvatarUrl(src) ? src : "/assets/memoji.jpg"}
        alt={alt}
        width={sizeValues[size].width}
        height={sizeValues[size].height}
        className="w-full h-full object-cover"
        quality={100}
      />
    </div>
  );
};
