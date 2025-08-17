"use client";

import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguageSettings } from "@/hooks/useLanguageSettings";
import AccountLayout from "../AccountLayout";

interface Language {
  id: string;
  name: string;
  flagUrl: string;
}

const availableLanguages: Language[] = [
  { id: "French", name: "Français", flagUrl: "https://flagcdn.com/24x18/fr.png" },
  { id: "English", name: "Anglais", flagUrl: "https://flagcdn.com/24x18/us.png" },
];

export default function LanguePage() {
  const {
    currentLanguage,
    isLoading,
    error,
    handleLanguageChange,
  } = useLanguageSettings();

  const [updatingLanguage, setUpdatingLanguage] = useState<string | null>(null);

  const handleLanguageSelect = async (languageId: string) => {
    if (currentLanguage === languageId) return;
    
    setUpdatingLanguage(languageId);
    try {
      await handleLanguageChange(languageId);
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
    } finally {
      setUpdatingLanguage(null);
    }
  };

  // Loading initial seulement si on n'a pas encore de données
  if (isLoading && !currentLanguage) {
    return (
      <AccountLayout>
        <div className="container px-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 mt-5">Langue</h1>
          <div className="text-center py-8">
            <p className="text-gray-600">Chargement des paramètres...</p>
          </div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="container px-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mt-5">Langue</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {availableLanguages.map((language, index) => {
            const isUpdating = updatingLanguage === language.id;
            const isSelected = currentLanguage === language.id;
            
            return (
              <div
                key={language.id}
                className={`flex items-center justify-between py-4 cursor-pointer border-b border-[#D9D9D9] ${
                  index === availableLanguages.length - 1 ? "border-b-0" : ""
                } ${isUpdating ? "opacity-70" : ""} transition-opacity duration-200`}
                onClick={() => !isUpdating && handleLanguageSelect(language.id)}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={language.flagUrl}
                    alt={`Drapeau ${language.name}`}
                    width={24}
                    height={18}
                    className="rounded-sm"
                  />
                  <span className="text-base font-medium text-gray-900">
                    {language.name}
                  </span>
                  {isUpdating && (
                    <Loader2 className="w-4 h-4 text-gray-500 animate-spin ml-2" />
                  )}
                </div>

                {/* Indicateur de sélection */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-[#0F172A] border-[#0F172A]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && !isUpdating && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                  {isUpdating && (
                    <Loader2 className="w-3 h-3 text-white animate-spin" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AccountLayout>
  );
}
