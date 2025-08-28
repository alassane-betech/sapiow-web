"use client";
import { ProfileAvatar } from "@/components/common/ProfileAvatar";
import { ShareLinkButton } from "@/components/common/ShareLinkButton";
import { useModeSwitch } from "@/hooks/useModeSwitch";
import { useTodayVisios } from "@/hooks/useTodayVisios";
import React from "react";
import { Switch } from "../../ui/switch";

export const Header: React.FC = () => {
  const { isExpertMode, handleModeSwitch } = useModeSwitch();
  const { todayVisiosCount, user } = useTodayVisios();

  return (
    <header className="container bg-white px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Section gauche - Photo de profil et message */}
        <div className="flex flex-col items-start gap-4">
          {/* Photo de profil */}
          <ProfileAvatar
            src={user?.avatar || "/assets/memoji.jpg"}
            alt="Photo de profil"
            size="lg"
          />

          {/* Message de bienvenue */}
          <div>
            <h1 className="text-xl font-semibold text-exford-blue font-figtree">
              Bonjour{" "}
              {user ? `${user.first_name} ${user.last_name}` : "Utilisateur"}
            </h1>
            <p className="text-sm font-medium text-exford-blue font-figtree">
              Vous avez {todayVisiosCount} visio
              {todayVisiosCount > 1 ? "s" : ""} à venir aujourd'hui
            </p>
          </div>
        </div>

        {/* Section droite - Bouton de partage et switch mode expert */}
        <div className="gap-6 hidden lg:flex items-center">
          {/* Bouton de partage */}
          <ShareLinkButton />

          {/* Mode expert switch */}
          <div className="flex items-center gap-3 bg-exford-blue px-3 py-2 rounded-full">
            <span className="text-white font-bold">Mode expert</span>
            <Switch
              checked={isExpertMode}
              onCheckedChange={handleModeSwitch}
              className="data-[state=checked]:bg-[#1E293B]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
