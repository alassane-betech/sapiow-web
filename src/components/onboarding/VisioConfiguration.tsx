"use client";
import { VisioOption } from "@/hooks/useOnboardingExpert";
import React from "react";

interface VisioConfigurationProps {
  visioOptions: VisioOption[];
  onUpdateVisioOption: (
    index: number,
    field: keyof VisioOption,
    value: unknown
  ) => void;
}

export const VisioConfiguration: React.FC<VisioConfigurationProps> = ({
  visioOptions,
  onUpdateVisioOption,
}) => {
  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px] flex flex-col items-center">
      <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-center mb-8">
        Ajoutez votre première visio
      </h2>

      <div className="w-full space-y-4 mb-8">
        {visioOptions.map((option, idx) => (
          <div
            key={option.duration}
            className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-[12px] px-4 py-3"
          >
            <span className="text-base font-medium text-exford-blue w-24">
              {option.duration} minutes
            </span>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Prix</span>
              <input
                type="number"
                min="0"
                disabled={!option.enabled}
                value={option.price}
                onChange={(e) =>
                  onUpdateVisioOption(idx, "price", e.target.value)
                }
                className="w-16 h-9 rounded-md border border-gray-300 px-2 text-base text-exford-blue focus:border-cobalt-blue focus:outline-none focus:ring-2 focus:ring-cobalt-blue/20 disabled:bg-gray-100 disabled:text-gray-400"
              />
              <span className="text-gray-400 text-lg font-bold">€</span>
            </div>

            <button
              type="button"
              onClick={() =>
                onUpdateVisioOption(idx, "enabled", !option.enabled)
              }
              className={`ml-4 w-10 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
                option.enabled ? "bg-cobalt-blue" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block w-5 h-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  option.enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
