"use client";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { Button as ButtonUI } from "@/components/ui/button";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderClientProps {
  isBack?: boolean;
  text?: string;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ isBack, text }) => {
  const router = useRouter();
  const [isFavoriActive, setIsFavoriActive] = useState(false);
  const [previousPath, setPreviousPath] = useState("/");

  // Sauvegarder le chemin précédent quand on n'est pas sur la page favori
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== "/favori") {
        setPreviousPath(currentPath);
      }
      // Vérifier si on est sur la page favori pour mettre à jour l'état
      setIsFavoriActive(currentPath === "/favori");
    }
  }, []);

  const handleFavoriToggle = () => {
    if (isFavoriActive) {
      router.back();
      // Si les favoris sont actifs, retourner à la page précédente
      setIsFavoriActive(false);
      router.push(previousPath);
    } else {
      // Si les favoris ne sont pas actifs, aller à la page favori
      setIsFavoriActive(true);
      router.push("/favori");
    }
  };

  return (
    <header className="container border-b-2 border-snow-blue py-4 sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between">
        {/* Section gauche - Photo de profil et message */}
        <div className="w-full max-w-[320px] flex flex-col items-start gap-4">
          {isBack ? (
            <div className="flex items-center gap-2">
              <ButtonUI
                onClick={() => router.back()}
                className="w-12 h-12 p-[3px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-none bg-snow-blue"
              >
                <ChevronLeft />
              </ButtonUI>
              <h1 className="text-base font-bold text-cobalt-blue-500 whitespace-nowrap">
                {text}
              </h1>
            </div>
          ) : (
            <FormField
              label="Rechercher"
              name="search"
              type="text"
              placeholder="Rechercher"
              leftIcon={<Search className="w-6 h-6 text-slate-gray" />}
              className="h-[56px] w-[320px] bg-snow-blue border-none shadow-none placeholder:text-slate-gray text-base"
            />
          )}
        </div>

        {/* Section droite - Bouton de partage et switch mode expert */}
        <div className="gap-6 hidden lg:flex items-center">
          <Button
            label="Devenir un expert"
            className="text-base text-exford-blue font-bold bg-white max-w-[163px] h-[48px] border border-light-blue-gray rounded-[8px] font-figtree"
          />
          <div className="flex items-center gap-2">
            {" "}
            <ButtonUI
              onClick={handleFavoriToggle}
              className={`w-12 h-12 p-[3px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 bg-snow-blue hover:bg-snow-blue/80 shadow-none`}
            >
              <Image
                src="/assets/icons/heartfavori.svg"
                alt="heart"
                width={20}
                height={20}
                className={`transition-all duration-200 ${
                  isFavoriActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                src="/assets/icons/heartblack.svg"
                alt="heart"
                width={20}
                height={20}
                className={`transition-all duration-200 absolute ${
                  isFavoriActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </ButtonUI>
            <ButtonUI
              className={`w-12 h-12 p-[3px] rounded-full flex items-center justify-center bg-snow-blue hover:bg-snow-blue/80 shadow-none cursor-pointer`}
            >
              <Image
                src="/assets/icons/bell.svg"
                alt="heart"
                width={20}
                height={20}
                className={`transition-all duration-200 `}
              />
            </ButtonUI>
          </div>
        </div>
      </div>
    </header>
  );
};
