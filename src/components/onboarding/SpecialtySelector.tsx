"use client";
import { Expertise } from "@/api/domaine/useDomaine";
import { getDomainIcon } from "@/constants/onboarding";
import Image from "next/image";
import React from "react";

interface SpecialtySelectorProps {
  selectedDomain: string;
  selectedSpecialties: number[];
  expertises: Expertise[];
  isLoadingExpertises: boolean;
  onSpecialtyToggle: (expertiseId: number) => void;
}

export const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  selectedDomain,
  selectedSpecialties,
  expertises,
  isLoadingExpertises,
  onSpecialtyToggle,
}) => {
  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px] flex flex-col items-center">
      {/* Domaine sélectionné */}
      <div className="flex flex-col items-center justify-center w-[82.75px] h-[86.75px] rounded-full bg-snow-blue mx-auto">
        <Image
          src={getDomainIcon(selectedDomain)}
          alt={selectedDomain}
          width={30}
          height={30}
          className="mb-2"
        />
        <span className="text-xs font-medium text-cobalt-blue text-center">
          {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)}
        </span>
      </div>

      <h2 className="text-xl font-bold text-center mt-4.5 mb-6.5">
        Choisissez vos spécialités
      </h2>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {isLoadingExpertises ? (
          <div className="text-center py-4">
            <div className="text-ash-gray">Chargement des expertises...</div>
          </div>
        ) : expertises.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-ash-gray">
              Aucune expertise disponible pour ce domaine
            </div>
          </div>
        ) : (
          expertises.map((expertise) => (
            <button
              key={expertise.id}
              type="button"
              onClick={() => onSpecialtyToggle(expertise.id)}
              className={`px-5 py-2 rounded-full border text-base font-medium transition-all cursor-pointer ${
                selectedSpecialties.includes(expertise.id)
                  ? "bg-snow-blue text-dark-blue border-light-blue-gray"
                  : "bg-white text-exford-blue border-gray-300 hover:border-cobalt-blue"
              }`}
            >
              {expertise.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
