"use client";
import { useGetProAppointments } from "@/api/appointments/useAppointments";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { ProfileAvatar } from "@/components/common/ProfileAvatar";
import { ShareLinkButton } from "@/components/common/ShareLinkButton";
import { useUserStore } from "@/store/useUser";
import React, { useMemo, useState } from "react";
import { Switch } from "../../ui/switch";

export const Header: React.FC = () => {
  const [isExpertMode, setIsExpertMode] = useState(true);
  const { setUser } = useUserStore();
  const { data: user } = useGetProExpert();
  const { data: appointments } = useGetProAppointments(user?.id?.toString());

  // Calculer le nombre de visios pour aujourd'hui
  const todayVisiosCount = useMemo(() => {
    if (!appointments) return 0;
    
    const today = new Date();
    const todayStr = today.toDateString();
    
    // Gérer différentes structures possibles de la réponse API
    let appointmentsList: any[] = [];
    
    if (Array.isArray(appointments)) {
      appointmentsList = appointments;
    } else if (appointments && typeof appointments === 'object') {
      appointmentsList = (appointments as any).appointments || (appointments as any).data || [];
    }
    
    return appointmentsList.filter((appointment: any) => {
      if (!appointment?.appointment_at) return false;
      const appointmentDate = new Date(appointment.appointment_at);
      return appointmentDate.toDateString() === todayStr;
    }).length;
  }, [appointments]);

  return (
    <header className="container bg-white px-6 py-4">
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
              Vous avez {todayVisiosCount} visio{todayVisiosCount > 1 ? 's' : ''} à venir aujourd'hui
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
              onCheckedChange={setIsExpertMode}
              className="data-[state=checked]:bg-[#1E293B]"
              onClick={() => setUser({ type: "client" })}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
