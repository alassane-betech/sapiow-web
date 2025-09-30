"use client";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Country } from "../../constants/countries";
import { usePhoneInput } from "../../hooks/usePhoneInput";

interface PhoneInputProps {
  value: string;
  countryCode?: string; // Code du pays sauvegardé
  onChange: (value: string, country: Country, formattedValue?: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultCountry?: string;
  label?: string;
  required?: boolean;
}

const PhoneInput: FC<PhoneInputProps> = ({
  value,
  countryCode,
  onChange,
  onValidationChange,
  placeholder,
  className = "",
  disabled = false,
  defaultCountry = "FR",
  label,
  required = false,
}) => {
  const t = useTranslations();
  const phoneInput = usePhoneInput({
    defaultCountry,
    initialValue: value,
    initialCountryCode: countryCode,
    onChange: (rawValue: string, country: Country, formattedValue: string) => {
      onChange(rawValue, country, formattedValue);
      // Notifier le parent de l'état de validation
      onValidationChange?.(phoneInput.isPhoneValid());
    },
  });

  // Notifier l'état de validation initial et lors des changements
  useEffect(() => {
    onValidationChange?.(phoneInput.isPhoneValid());
  }, [
    phoneInput.phoneValue,
    phoneInput.selectedCountry,
    onValidationChange,
    phoneInput,
  ]);

  // Effet pour déboguer et forcer la mise à jour si nécessaire
  useEffect(() => {
    console.log("PhoneNumber props changed:", { value, countryCode });
    console.log("Hook internal state:", {
      phoneValue: phoneInput.phoneValue,
      formattedValue: phoneInput.formattedValue,
      selectedCountry: phoneInput.selectedCountry.code,
    });
  }, [
    value,
    countryCode,
    phoneInput.phoneValue,
    phoneInput.formattedValue,
    phoneInput.selectedCountry,
  ]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 text-left">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Label flottant - n'apparaît que quand il y a du contenu */}
        {phoneInput.formattedValue && (
          <label className="absolute top-[5px] left-[120px] text-xs font-normal text-slate-gray bg-transparent px-1 transition-all duration-200 pointer-events-none z-10 font-figtree">
            {t("phoneNumber.label")}
          </label>
        )}

        <div className="flex">
          {/* Sélecteur de pays */}
          <div className="relative" ref={phoneInput.dropdownRef}>
            <button
              type="button"
              onClick={() => !disabled && phoneInput.toggleDropdown()}
              disabled={disabled}
              className={`flex items-center px-4 py-3 h-[56px] border rounded-[8px] mr-1 bg-white hover:bg-gray-50 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-all cursor-pointer font-figtree ${
                phoneInput.isFocused
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={phoneInput.getFlagUrl(phoneInput.selectedCountry)}
                alt={phoneInput.selectedCountry.name}
                width={20}
                height={12}
                className="w-5 h-3 mr-2"
              />
              <span className="text-sm font-medium text-exford-blue mr-1">
                {phoneInput.selectedCountry.dialCode}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown */}
            {phoneInput.isOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-[8px] shadow-lg z-50 max-h-60 overflow-hidden">
                {/* Barre de recherche */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder={t("phoneNumber.searchCountry")}
                    value={phoneInput.searchTerm}
                    onChange={(e) =>
                      phoneInput.handleSearchChange(e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Liste des pays */}
                <div className="max-h-48 overflow-y-auto">
                  {phoneInput.filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => phoneInput.handleCountrySelect(country)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-left font-figtree"
                    >
                      <Image
                        src={phoneInput.getFlagUrl(country)}
                        alt={country.name}
                        width={20}
                        height={12}
                        className="w-5 h-3 mr-3"
                      />
                      <span className="flex-1 text-sm text-gray-900 font-figtree">
                        {country.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2 font-figtree">
                        {country.dialCode}
                      </span>
                    </button>
                  ))}

                  {phoneInput.filteredCountries.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500 font-figtree">
                      Aucun pays trouvé
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Champ de saisie du numéro */}
          <input
            type="tel"
            value={phoneInput.formattedValue}
            onChange={(e) => phoneInput.handlePhoneChange(e.target.value)}
            onFocus={phoneInput.handleInputFocus}
            onBlur={phoneInput.handleInputBlur}
            placeholder={placeholder || t("phoneNumber.placeholder")}
            disabled={disabled}
            required={required}
            className={`flex-1 px-4 h-[56px] border rounded-[8px] focus:outline-none text-exford-blue font-medium placeholder-gray-500 text-base disabled:bg-gray-50 disabled:text-gray-500 transition-all ${
              phoneInput.formattedValue ? "pt-6 pb-3" : "py-3"
            } ${
              phoneInput.isFocused
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
