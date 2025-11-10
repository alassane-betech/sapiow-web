"use client";

import { Expertise } from "@/api/domaine/useDomaine";
import { useTranslations } from "next-intl";
import React from "react";

interface ExpertiseSelectorProps {
  selectedExpertises: number[]; // IDs des expertises sélectionnées
  expertises: Expertise[];
  isLoadingExpertises: boolean;
  onExpertiseToggle: (expertiseId: number) => void;
}

export const ExpertiseSelector: React.FC<ExpertiseSelectorProps> = ({
  selectedExpertises,
  expertises,
  isLoadingExpertises,
  onExpertiseToggle,
}) => {
  const t = useTranslations();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {t("profile.specialties")}
      </label>

      <div className="flex flex-wrap gap-2">
        {isLoadingExpertises ? (
          <div className="text-center py-4 w-full">
            <div className="text-gray-500">
              {t("profile.loadingExpertises")}
            </div>
          </div>
        ) : expertises.length === 0 ? (
          <div className="text-center py-4 w-full">
            <div className="text-gray-500">
              {t("profile.noExpertisesAvailable")}
            </div>
          </div>
        ) : (
          expertises.map((expertise) => (
            <button
              key={expertise.id}
              type="button"
              onClick={() => onExpertiseToggle(expertise.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                selectedExpertises.includes(expertise.id)
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              {expertise.name}
            </button>
          ))
        )}
      </div>

      {selectedExpertises.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          {selectedExpertises.length} {t("profile.specialtiesSelected")}
        </div>
      )}
    </div>
  );
};
