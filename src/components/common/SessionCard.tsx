"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./Button";
import { ProfileAvatar } from "./ProfileAvatar";
import { SessionModal } from "./SessionModal";

interface SessionCardProps {
  date: string;
  time: string;
  duration?: string;
  isComming?: boolean;
  profileImage: string;
  name: string;
  textButton?: string;
  sessionDescription: string;
  onAccept?: () => void;
  onViewRequest?: () => void;
  className?: string;
  icon?: string;
  classFooter?: string;
  buttonStates?: {
    acceptDisabled?: boolean;
    viewDisabled?: boolean;
  };
  isUpcoming?: boolean; // Pour distinguer l'onglet "A venir"
  isFlex1?: boolean;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  date,
  time,
  profileImage,
  name,
  sessionDescription,
  onAccept,
  onViewRequest,
  className = "",
  icon,
  classFooter = "",
  duration,
  isComming = false,
  textButton = "Accepter",
  buttonStates = { acceptDisabled: false, viewDisabled: false },
  isUpcoming = false,
  isFlex1 = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewRequest = () => {
    setIsOpen(true);
    if (onViewRequest) {
      onViewRequest();
    }
  };

  // Détermine le texte du bouton et le titre du modal selon le contexte
  const viewButtonText = isUpcoming ? "Voir détails" : "Voir la demande";

  return (
    <Card
      className={`w-full max-w-[370px] bg-snow-blue shadow-none border border-soft-ice-gray rounded-[12px] p-0 ${className}`}
    >
      {/* En-tête avec date et heure */}
      <CardHeader className="m-0">
        <div className="flex items-center justify-between gap-2 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-4.5 h-4.5 flex items-center justify-center">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
              />
            </div>
            <span className="text-xs font-outfit  font-medium text-gray-900">
              {date}, {time}
            </span>
          </div>
          {isComming && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4.5 h-4.5 flex items-center justify-center">
                <Image
                  src="/assets/icons/clock.svg"
                  alt="clock"
                  width={18}
                  height={18}
                />
              </div>
              <span className="text-xs font-outfit font-medium text-gray-900">
                visio de {duration}
              </span>
            </div>
          )}{" "}
        </div>
      </CardHeader>

      {/* Profil utilisateur */}
      <CardContent className="-mt-5">
        <div className="flex items-center gap-4">
          <ProfileAvatar
            src={profileImage}
            alt={name}
            size="md"
            borderColor="border-gray-200"
            borderWidth="2"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 lg:text-[16px] xl:text-xl font-figtree truncate">
              {name}
            </h3>
            <p className="text-gray-600 text-base lg:text-[13px] xl:text-base font-figtree truncate">
              {sessionDescription}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Boutons d'action */}
      <CardFooter className="pb-3">
        <div
          className={`flex gap-4 w-full flex-col lg:flex-row ${classFooter}`}
        >
          <Button
            onClick={onAccept}
            label={textButton}
            icon={icon}
            className={`h-[40px] px-6 rounded-[8px] font-bold font-figtree text-base lg:text-[13px] xl:text-base ${
              isFlex1 ? "flex-1" : ""
            }`}
            disabled={buttonStates.acceptDisabled}
          />

          <SessionModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            profileImage={profileImage}
            name={name}
            isUpcoming={isUpcoming}
            onAccept={onAccept}
            trigger={
              <Button
                onClick={handleViewRequest}
                label={viewButtonText}
                className={`text-exford-blue h-[40px] font-bold font-figtree px-6 rounded-[8px] border border-light-blue-gray bg-white text-base lg:text-[13px] xl:text-base hover:bg-gray-200 ${
                  isFlex1 ? "flex-1" : ""
                }`}
                disabled={buttonStates.viewDisabled}
              />
            }
          />
        </div>
      </CardFooter>
    </Card>
  );
};
