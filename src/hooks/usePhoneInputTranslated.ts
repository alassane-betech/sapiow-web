"use client";

import { AsYouType, CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import { useEffect, useRef, useState } from "react";
import {
  Country,
  countries,
  detectCountryFromPhone,
  findCountryByCode,
} from "../constants/countries";
import { searchCountriesTranslated } from "../utils/searchCountriesTranslated";

interface UsePhoneInputTranslatedProps {
  defaultCountry?: string;
  initialValue?: string;
  initialCountryCode?: string;
  onChange?: (value: string, country: Country, formattedValue: string) => void;
  getCountryName: (code: string) => string; // Function to get translated country name
}

export const usePhoneInputTranslated = ({
  defaultCountry = "SN",
  initialValue = "",
  initialCountryCode,
  onChange,
  getCountryName,
}: UsePhoneInputTranslatedProps) => {
  // État pour le pays sélectionné avec détection automatique
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    if (initialValue || initialCountryCode) {
      return detectCountryFromPhone(initialValue, initialCountryCode);
    }
    return findCountryByCode(defaultCountry) || countries[0];
  });

  // État pour la valeur du champ téléphone (sans indicatif)
  const [phoneValue, setPhoneValue] = useState(() => {
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
      const country = findCountryByCode(initialCountryCode);
      if (country) {
        setSelectedCountry(country);
        setPhoneValue(initialValue);

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

  // Filtrer les pays selon la recherche avec traduction
  const filteredCountries = searchCountriesTranslated(searchTerm, getCountryName);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    closeDropdown();

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
    const cleanValue = value.replace(/\D/g, "");
    setPhoneValue(cleanValue);

    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = cleanValue ? formatter.input(cleanValue) : "";
    setFormattedValue(formatted);

    onChange?.(cleanValue, selectedCountry, formatted);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
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

  const setCountry = (countryCode: string) => {
    const country = findCountryByCode(countryCode);
    if (country) {
      setSelectedCountry(country);
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

  const setPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    setPhoneValue(cleanValue);

    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = cleanValue ? formatter.input(cleanValue) : "";
    setFormattedValue(formatted);

    onChange?.(cleanValue, selectedCountry, formatted);
  };

  const reset = () => {
    setPhoneValue("");
    setFormattedValue("");
    setSelectedCountry(findCountryByCode(defaultCountry) || countries[0]);
    closeDropdown();
  };

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
    phoneValue,
    formattedValue,
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
    isPhoneValid,
  };
};
