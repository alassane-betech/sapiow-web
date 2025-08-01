"use client";
import { DOMAINS, getDomainIcon } from "@/constants/onboarding";
import Image from "next/image";
import React from "react";

interface DomainSelectorProps {
  selectedDomains?: string[];
  selectedDomain?: string | null;
  onDomainSelect: (domainId: string) => void;
  multiSelect?: boolean;
  title: string;
  subtitle?: string | React.ReactNode;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({
  selectedDomains = [],
  selectedDomain = null,
  onDomainSelect,
  multiSelect = false,
  title,
  subtitle,
}) => {
  const isSelected = (domainId: string) => {
    if (multiSelect) {
      return selectedDomains.includes(domainId);
    }
    return selectedDomain === domainId;
  };

  return (
    <>
      <h1 className="text-base sm:text-lg lg:text-xl font-bold text-center mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="w-[295px] mx-auto text-base sm:text-base font-normal my-4 text-center text-ash-gray mb-8 font-inter">
          {subtitle}
        </p>
      )}
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        {DOMAINS.map((domain) => (
          <div
            key={domain.id}
            onClick={() => onDomainSelect(domain.id)}
            className={`flex flex-col items-center justify-center p-4 h-[114px] w-[107px] rounded-[5.13px] cursor-pointer transition-all bg-snow-blue ${
              isSelected(domain.id)
                ? "border-[2.56px] border-cobalt-blue"
                : "hover:border-cobalt-blue"
            }`}
          >
            <div className="mb-2">
              <Image
                src={getDomainIcon(domain.id, isSelected(domain.id))}
                alt={domain.name}
                width={32}
                height={32}
                className="w-8 h-8 mx-auto"
              />
            </div>
            <span
              className={`text-xs font-medium text-center ${
                isSelected(domain.id) ? "text-cobalt-blue" : "text-exford-blue"
              }`}
            >
              {domain.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
