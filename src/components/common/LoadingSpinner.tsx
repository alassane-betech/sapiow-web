import React from "react";
import { useTranslations } from "next-intl";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "text-white",
  className = "",
}) => {
  const t = useTranslations();
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${color} ${className}`}
      role="status"
      aria-label={t("loading")}
    >
      <span className="sr-only">{t("loading")}...</span>
    </div>
  );
};
