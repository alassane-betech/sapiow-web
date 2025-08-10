"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

interface Language {
  id: string;
  name: string;
  flagUrl: string;
}

const availableLanguages: Language[] = [
  { id: "fr", name: "Français", flagUrl: "https://flagcdn.com/24x18/fr.png" },
  { id: "en", name: "Anglais", flagUrl: "https://flagcdn.com/24x18/us.png" },
];

export default function LanguePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr");

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  return (
    <AccountLayout>
      <div className="container space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mt-5">Langue</h1>

        <div className="space-y-4">
          {availableLanguages.map((language, index) => (
            <div
              key={language.id}
              className={`flex items-center justify-between py-4 cursor-pointer border-b border-[#D9D9D9] ${
                index === availableLanguages.length - 1 ? "border-b-0" : ""
              }`}
              onClick={() => handleLanguageSelect(language.id)}
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
              </div>

              {/* Indicateur de sélection */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedLanguage === language.id
                    ? "bg-[#0F172A] border-[#0F172A]"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedLanguage === language.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
