"use client";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { Button as ButtonUI } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFavorites } from "@/hooks/useFavorites";
import { useExpertModeSwitch } from "@/hooks/useExpertModeSwitch";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface HeaderClientProps {
  isBack?: boolean;
  text?: string;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ isBack, text }) => {
  const router = useRouter();
  const { isFavoriActive, handleFavoriToggle } = useFavorites();
  const { handleExpertModeSwitch, handleModeSwitch, hasExpertProfile, isExpertMode } = useExpertModeSwitch();

  return (
    <header className="container lg:border-b-2 lg:border-snow-blue py-4 sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between px-4">
        {/* Section gauche - Photo de profil et message */}
        <div className="w-full max-w-[320px] flex flex-col items-start gap-4">
          {isBack || text ? (
            <div className="flex items-center gap-2">
              {isBack && (
                <ButtonUI
                  onClick={() => router.back()}
                  className="w-12 h-12 p-[3px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-none bg-snow-blue"
                >
                  <ChevronLeft />
                </ButtonUI>
              )}
              <h1 className="text-base font-bold text-cobalt-blue-500 whitespace-nowrap">
                {text}
              </h1>
            </div>
          ) : (
            <>
              <FormField
                label="Rechercher"
                name="search"
                type="text"
                placeholder="Rechercher"
                leftIcon={
                  <Search className="w-6 h-6 text-slate-gray cursor-pointer hidden lg:block" />
                }
                className="h-[56px] w-[320px] bg-snow-blue border-none shadow-none placeholder:text-slate-gray text-base hidden lg:block"
              />
              <Image
                src="/assets/logo_name.svg"
                alt="search"
                width={100}
                height={30}
                quality={100}
                className="w-[138px] h-[30px] text-slate-gray cursor-pointer lg:hidden"
              />
            </>
          )}
        </div>

        {/* Section droite - Bouton de partage et switch mode expert */}
        <div className="gap-6 flex items-center">
          {hasExpertProfile ? (
            <div className="flex items-center gap-3 bg-exford-blue px-3 py-2 rounded-full">
              <span className="text-white font-bold">
                {isExpertMode ? "Mode expert" : "Mode client"}
              </span>
              <Switch
                checked={isExpertMode}
                onCheckedChange={handleModeSwitch}
                className="data-[state=checked]:bg-[#1E293B]"
              />
            </div>
          ) : (
            <Button
              label="Devenir un expert"
              onClick={handleExpertModeSwitch}
              className="text-base text-exford-blue font-bold bg-white max-w-[163px] h-[48px] border border-light-blue-gray rounded-[8px] font-figtree hidden lg:flex"
            />
          )}
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
