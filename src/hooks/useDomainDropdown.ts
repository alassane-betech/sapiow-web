import { Domain } from "@/api/domaine/useDomaine";
import { useState, useRef, useEffect, useCallback } from "react";

interface UseDomainDropdownProps {
  domains: Domain[];
  selectedDomainId?: number | null;
  onDomainSelect: (domainId: number, domainName: string) => void;
}

export const useDomainDropdown = ({
  domains,
  selectedDomainId,
  onDomainSelect,
}: UseDomainDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Trouver le domaine sélectionné
  const selectedDomain = domains.find((d) => d.id === selectedDomainId);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Fermer dropdown
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Ouvrir dropdown
  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Gérer la sélection d'un domaine
  const handleSelect = useCallback(
    (domain: Domain) => {
      onDomainSelect(domain.id, domain.name);
      setIsOpen(false);
    },
    [onDomainSelect]
  );

  return {
    // États
    isOpen,
    selectedDomain,
    dropdownRef,

    // Actions
    toggleDropdown,
    closeDropdown,
    openDropdown,
    handleSelect,
  };
};
