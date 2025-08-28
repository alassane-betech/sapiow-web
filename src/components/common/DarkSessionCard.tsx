"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { ProfileAvatar } from "./ProfileAvatar";

interface UpcomingVideoCallProps {
  date: string;
  appointmentAt: string; // ISO date string from API
  profileImage: string;
  name: string;
  title: string;
  onViewDetails?: () => void;
  className?: string;
  variant?: "dark" | "light";
  showButton?: boolean;
  sessionTime?: string; // Format: "14h30 - 15h30"
}

// Fonction pour calculer le temps restant
const calculateTimeRemaining = (appointmentAt: string): string => {
  const now = new Date();
  const appointmentDate = new Date(appointmentAt);
  const diffMs = appointmentDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Maintenant";
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `Dans ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return remainingMinutes > 0
      ? `Dans ${diffHours}h${remainingMinutes.toString().padStart(2, "0")}`
      : `Dans ${diffHours}h`;
  } else {
    return `Dans ${diffMinutes} min`;
  }
};

export const UpcomingVideoCall: React.FC<UpcomingVideoCallProps> = ({
  date,
  appointmentAt,
  profileImage,
  name,
  title,
  onViewDetails,
  className = "",
  variant = "dark",
  showButton = true,
  sessionTime,
}) => {
  const isDark = variant === "dark";
  const [timeRemaining, setTimeRemaining] = useState<string>(
    calculateTimeRemaining(appointmentAt)
  );

  // Mettre à jour le temps restant chaque minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(appointmentAt));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [appointmentAt]);

  const cardClasses = isDark
    ? "text-white"
    : "bg-snow-blue text-slate-800 border border-soft-ice-gray shadow-none";

  const cardStyle = isDark
    ? {
        background: "linear-gradient(98deg, #020617 15.14%, #040E37 95.16%)",
        boxShadow: "0 4px 4px 0 #F1F5F9",
      }
    : {};

  const iconFilter = isDark ? "brightness-0 invert" : "opacity-60";

  const textClasses = {
    primary: isDark ? "text-white" : "text-slate-800",
    secondary: isDark ? "text-light-blue-gray" : "text-gray-600",
    dateTime: isDark ? "text-white font-outfit" : "text-slate-700 font-outfit",
  };

  const buttonClasses = isDark
    ? "bg-white hover:bg-white/90 text-exford-blue h-[48px]"
    : "bg-white hover:bg-white/90 text-exford-blue h-[40px] border border-light-blue-gray";
  return (
    <Card
      className={`w-full ${cardClasses}  rounded-[16px] overflow-hidden p-3 ${className}`}
      style={cardStyle}
    >
      {/* En-tête avec date et durée */}
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className={iconFilter}
            />
            <span className={`text-xs font-medium ${textClasses.dateTime}`}>
              {date}
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <Image
              src="/assets/icons/clock.svg"
              alt="clock"
              width={24}
              height={24}
              className={iconFilter}
            />
            <div
              className={`flex items-center gap-2 text-xs font-medium ${textClasses.dateTime}`}
            >
              <span>{timeRemaining}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Contenu principal */}
      <CardContent className="p-0 mb-1 -mt-4.5">
        {/* Profil utilisateur */}
        <div className="flex items-center gap-3">
          {showButton ? (
            <ProfileAvatar
              src={profileImage}
              alt={name}
              size="lg"
              borderColor="border-none"
              borderWidth="1"
            />
          ) : (
            <div
              className="relative overflow-hidden rounded-[8px]"
              style={{ width: "75px", height: "86px" }}
            >
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-base font-bold ${textClasses.primary}`}>
              {name}
            </h3>
            <p className={`text-sm font-semibold ${textClasses.secondary}`}>
              {title}
            </p>
            <p className={`text-lg font-bold ${textClasses.primary} `}>
              {sessionTime}
            </p>
          </div>
        </div>

        {/* Bouton d'action ou informations de session */}
        {showButton && (
          <Button
            label="Voir détail"
            onClick={onViewDetails}
            className={`w-full ${buttonClasses} font-bold rounded-[8px] transition-all duration-200 mt-2.5 mb-1`}
          />
        )}
      </CardContent>
    </Card>
  );
};
