"use client";

import { AsYouType, CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import {
  Country,
  countries,
  detectCountryFromPhone,
  findCountryByCode,
  searchCountries,
} from "../constants/countries";

interface UsePhoneInputProps {
  defaultCountry?: string;
  initialValue?: string;
  initialCountryCode?: string; // Code du pays sauvegardé
  onChange?: (value: string, country: Country, formattedValue: string) => void;
}

export const usePhoneInput = ({
  defaultCountry = "SN",
  initialValue = "",
  initialCountryCode,
  onChange,
}: UsePhoneInputProps = {}) => {
  // État pour le pays sélectionné avec détection automatique
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    // Si on a une valeur initiale ou un code de pays, détecter automatiquement
    if (initialValue || initialCountryCode) {
      return detectCountryFromPhone(initialValue, initialCountryCode);
    }
    return findCountryByCode(defaultCountry) || countries[0];
  });

  // État pour la valeur du champ téléphone (sans indicatif)
  const [phoneValue, setPhoneValue] = useState(() => {
    // Maintenant initialValue devrait toujours être sans indicatif
    return initialValue || "";
  });

  // État pour la valeur formatée du numéro
  const [formattedValue, setFormattedValue] = useState(() => {
    if (initialValue && initialCountryCode) {
      const country =
        findCountryByCode(initialCountryCode) ||
        detectCountryFromPhone(initialValue, initialCountryCode);
      if (initialValue) {
        const formatter = new AsYouType(country.code as CountryCode);
        return formatter.input(initialValue);
      }
    }
    return "";
  });

  // État pour le dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fonctions utilitaires
  const openDropdown = () => {
    setIsOpen(true);
    setIsFocused(true);
  };
  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setIsFocused(false);
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Écouter les changements des props pour mettre à jour les valeurs
  useEffect(() => {
    if (initialValue !== undefined && initialCountryCode) {
      // Utiliser le code de pays fourni pour définir le pays
      const country = findCountryByCode(initialCountryCode);
      if (country) {
        setSelectedCountry(country);

        // Mettre à jour les valeurs (initialValue est déjà sans indicatif)
        setPhoneValue(initialValue);

        // Formater le numéro
        if (initialValue) {
          const formatter = new AsYouType(country.code as CountryCode);
          const formatted = formatter.input(initialValue);
          setFormattedValue(formatted);
        } else {
          setFormattedValue("");
        }
      }
    }
  }, [initialValue, initialCountryCode]);

  // Filtrer les pays selon la recherche
  const filteredCountries = searchCountries(searchTerm);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    closeDropdown();

    // Reformater le numéro existant avec le nouveau pays
    if (phoneValue) {
      const formatter = new AsYouType(country.code as CountryCode);
      const newFormattedValue = formatter.input(phoneValue);
      setFormattedValue(newFormattedValue);
      onChange?.(phoneValue, country, newFormattedValue);
    } else {
      onChange?.(phoneValue, country, "");
    }
  };

  const handlePhoneChange = (value: string) => {
    // Nettoyer la valeur entrée (garder seulement les chiffres)
    const cleanValue = value.replace(/\D/g, "");
    setPhoneValue(cleanValue);

    // Formater automatiquement avec libphonenumber-js
    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = cleanValue ? formatter.input(cleanValue) : "";
    setFormattedValue(formatted);

    onChange?.(cleanValue, selectedCountry, formatted);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Délai pour permettre au dropdown de gérer le focus
    setTimeout(() => {
      if (!isOpen) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Fonction pour définir le pays programmatiquement
  const setCountry = (countryCode: string) => {
    const country = findCountryByCode(countryCode);
    if (country) {
      setSelectedCountry(country);
      // Reformater avec le nouveau pays
      if (phoneValue) {
        const formatter = new AsYouType(country.code as CountryCode);
        const newFormattedValue = formatter.input(phoneValue);
        setFormattedValue(newFormattedValue);
        onChange?.(phoneValue, country, newFormattedValue);
      } else {
        onChange?.(phoneValue, country, "");
      }
    }
  };

  // Fonction pour définir la valeur du téléphone programmatiquement
  const setPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    setPhoneValue(cleanValue);

    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = cleanValue ? formatter.input(cleanValue) : "";
    setFormattedValue(formatted);

    onChange?.(cleanValue, selectedCountry, formatted);
  };

  // Fonction pour réinitialiser le composant
  const reset = () => {
    setPhoneValue("");
    setFormattedValue("");
    setSelectedCountry(findCountryByCode(defaultCountry) || countries[0]);
    closeDropdown();
  };

  // Validation du format du numéro selon le pays
  const isPhoneValid = () => {
    if (!phoneValue || phoneValue.trim().length === 0) {
      return false;
    }

    try {
      const fullNumber = `${selectedCountry.dialCode}${phoneValue}`;
      return isValidPhoneNumber(
        fullNumber,
        selectedCountry.code as CountryCode
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    // État
    selectedCountry,
    phoneValue, // Valeur brute (chiffres seulement)
    formattedValue, // Valeur formatée pour l'affichage
    isOpen,
    searchTerm,
    filteredCountries,
    dropdownRef,
    isFocused,

    // Actions
    handleCountrySelect,
    handlePhoneChange,
    handleSearchChange,
    handleInputFocus,
    handleInputBlur,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    setCountry,
    setPhone,
    reset,

    // Utilitaires
    getFlagUrl: (country: Country) =>
      `https://flagcdn.com/w20/${country.flag}.png`,
    getFullPhoneNumber: () => `${selectedCountry.dialCode}${phoneValue}`,
    getFormattedFullNumber: () =>
      formattedValue
        ? `${selectedCountry.dialCode} ${formattedValue}`
        : selectedCountry.dialCode,
    isValidPhone: () => phoneValue.trim().length > 0,
    isPhoneValid, // Nouvelle fonction de validation selon le format du pays
  };
};
