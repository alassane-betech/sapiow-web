"use client";

import { Domain } from "@/api/domaine/useDomaine";
import { getDomainIcon } from "@/constants/onboarding";
import { useTranslations } from "next-intl";
import { useDomainDropdown } from "@/hooks/useDomainDropdown";
import Image from "next/image";

interface DomainDropdownProps {
  domains: Domain[];
  selectedDomainId?: number | null;
  onDomainSelect: (domainId: number, domainName: string) => void;
  label: string;
  placeholder: string;
  isLoading?: boolean;
}

export const DomainDropdown: React.FC<DomainDropdownProps> = ({
  domains = [],
  selectedDomainId,
  onDomainSelect,
  label,
  placeholder,
  isLoading = false,
}) => {
  const t = useTranslations();

  // Hook personnalisé pour la logique du dropdown
  const { isOpen, selectedDomain, dropdownRef, toggleDropdown, handleSelect } =
    useDomainDropdown({
      domains,
      selectedDomainId,
      onDomainSelect,
    });

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-exford-blue mb-2">
        {label}
      </label>

      {/* Bouton principal */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={isLoading}
        className="w-full h-[56px] px-4 flex items-center justify-between bg-white border border-gray-300 rounded-lg hover:border-cobalt-blue focus:outline-none focus:ring-2 focus:ring-cobalt-blue transition-all"
      >
        {selectedDomain ? (
          <div className="flex items-center gap-3">
            <Image
              src={getDomainIcon(selectedDomain.name.toLowerCase())}
              alt={selectedDomain.name}
              width={24}
              height={24}
            />
            <span className="text-exford-blue font-medium">
              {selectedDomain.name}
            </span>
          </div>
        ) : (
          <span className="text-slate-gray">{placeholder}</span>
        )}

        <Image
          src="/assets/icons/pensquare.svg"
          alt="dropdown"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-slate-gray">
              {t("loading")}
            </div>
          ) : domains.length === 0 ? (
            <div className="p-4 text-center text-slate-gray">
              {t("profile.noDomains")}
            </div>
          ) : (
            <div className="p-2">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => handleSelect(domain)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-snow-blue transition-colors ${
                    selectedDomainId === domain.id
                      ? "bg-snow-blue border-2 border-cobalt-blue"
                      : ""
                  }`}
                >
                  <Image
                    src={getDomainIcon(domain.name.toLowerCase())}
                    alt={domain.name}
                    width={32}
                    height={32}
                  />
                  <span
                    className={`font-medium ${
                      selectedDomainId === domain.id
                        ? "text-cobalt-blue"
                        : "text-exford-blue"
                    }`}
                  >
                    {domain.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
