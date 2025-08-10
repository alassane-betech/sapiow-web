"use client";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  currency?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  currency,
  className = "",
}) => {
  // Extraire la valeur numérique et la devise si elles sont dans la même chaîne
  const valueStr = value.toString();
  const hasEuroSymbol = valueStr.includes("€");

  let numericValue = valueStr;
  let currencySymbol = currency;

  if (hasEuroSymbol && !currency) {
    numericValue = valueStr.replace("€", "").trim();
    currencySymbol = "€";
  }

  return (
    <div
      className={`bg-soft-ice-gray rounded-[20px] p-4 lg:p-6 border border-gray-100 ${className}`}
    >
      <h3 className="text-xs lg:text-xl font-medium text-cobalt-blue-500 mb-3 font-figtree">
        {title}
      </h3>
      <div className="flex items-start">
        <div className="text-[40px] lg:text-6xl font-bold text-cobalt-blue font-figtree">
          {numericValue}
        </div>
        {currencySymbol && (
          <div className="text-[20px] lg:text-2xl font-bold text-cobalt-blue ml-1 mt-1">
            {currencySymbol}
          </div>
        )}
      </div>
    </div>
  );
};
