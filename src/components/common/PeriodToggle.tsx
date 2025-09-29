"use client";
import { cn } from "@/lib/utils";
import React from "react";

// Types pour les valeurs possibles
export type PeriodType = "semaine" | "mois";

// Interface pour les props du composant
interface PeriodToggleProps {
  value: PeriodType;
  onChange: (value: PeriodType) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Labels pour l'affichage
const periodLabels: Record<PeriodType, string> = {
  semaine: "Semaine",
  mois: "Mois",
};

export const PeriodToggle: React.FC<PeriodToggleProps> = ({
  value,
  onChange,
  disabled = false,
  className = "",
  size = "md",
}) => {
  const handleToggle = (newValue: PeriodType) => {
    if (!disabled && onChange) {
      onChange(newValue);
    }
  };

  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const containerSizeClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  return (
    <div
      className={cn(
        "inline-flex bg-light-blue-gray rounded-[10.2px] transition-all duration-300 mt-10",
        containerSizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {(["semaine", "mois"] as PeriodType[]).map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => handleToggle(period)}
          disabled={disabled}
          className={cn(
            "relative font-medium rounded-[10.2px] transition-all duration-300 ease-in-out focus:outline-none disabled:cursor-not-allowed cursor-pointer text-exford-blue",
            sizeClasses[size],
            value === period
              ? "bg-white font-bold shadow-md"
              : "bg-transparent hover:text-gray-800",
            !disabled && "hover:bg-white/50"
          )}
        >
          {periodLabels[period]}
        </button>
      ))}
    </div>
  );
};

// Hook personnalisé pour gérer l'état du toggle
export const usePeriodToggle = (initialValue: PeriodType = "semaine") => {
  const [period, setPeriod] = React.useState<PeriodType>(initialValue);

  const toggle = React.useCallback(() => {
    setPeriod((prev) => (prev === "semaine" ? "mois" : "semaine"));
  }, []);

  return {
    period,
    setPeriod,
    toggle,
    isSemaine: period === "semaine",
    isMois: period === "mois",
  };
};
