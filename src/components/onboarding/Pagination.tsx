"use client";
import React from "react";

interface PaginationProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  return (
    <div className={`flex justify-center space-x-2 mb-8 ${className}`}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`w-2 h-2 rounded-full ${
            currentStep === step ? "bg-black" : "bg-[#999999]"
          }`}
        />
      ))}
    </div>
  );
};
