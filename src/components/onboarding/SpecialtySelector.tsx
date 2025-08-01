"use client";
import { DOMAIN_SPECIALTIES, getDomainIcon } from "@/constants/onboarding";
import Image from "next/image";
import React from "react";

interface SpecialtySelectorProps {
  selectedDomain: string;
  selectedSpecialties: string[];
  onSpecialtyToggle: (specialty: string) => void;
}

export const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  selectedDomain,
  selectedSpecialties,
  onSpecialtyToggle,
}) => {
  const specialties = DOMAIN_SPECIALTIES[selectedDomain] || [];

  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px] flex flex-col items-center">
      {/* Domaine sélectionné */}
      <div className="flex flex-col items-center justify-center w-[82.75px] h-[86.75px] rounded-full bg-snow-blue mx-auto">
        <Image
          src={getDomainIcon(selectedDomain, true)}
          alt={selectedDomain}
          width={30}
          height={30}
          className="mb-2"
        />
        <span className="text-xs font-medium text-cobalt-blue text-center font-inter">
          {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)}
        </span>
      </div>

      <h2 className="text-xl font-bold text-center mt-4.5 mb-6.5">
        Choisissez vos spécialités
      </h2>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {specialties.map((spec) => (
          <button
            key={spec}
            type="button"
            onClick={() => onSpecialtyToggle(spec)}
            className={`px-5 py-2 rounded-full border text-base font-medium transition-all ${
              selectedSpecialties.includes(spec)
                ? "bg-snow-blue text-dark-blue border-light-blue-gray"
                : "bg-white text-exford-blue border-gray-300 hover:border-cobalt-blue"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
};
