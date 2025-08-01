"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  size = "md",
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-4",
    md: "w-12 h-6",
    lg: "w-16 h-8",
  };

  const thumbSizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        checked ? "bg-slate-800 shadow-lg" : "bg-gray-200 shadow-inner",
        className
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out transform",
          thumbSizeClasses[size],
          checked ? "translate-x-full" : "translate-x-0"
        )}
      />
    </button>
  );
};
