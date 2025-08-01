"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./Button";
import { ProfileAvatar } from "./ProfileAvatar";

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
  const modalTitle = isUpcoming ? "Détail de la visio" : "Demande en attente";

  return (
    <Card
      className={`w-full bg-white shadow-sm border border-soft-ice-gray rounded-[12px] ${className}`}
    >
      {/* En-tête avec date et heure */}
      <CardHeader>
        <div className="flex items-center justify-between gap-2 border-b border-light-blue-gray pb-4">
          <div className="flex items-center gap-2">
            <div className="w-4.5 h-4.5 flex items-center justify-center">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
              />
            </div>
            <span className="text-sm lg:text-base font-medium text-gray-900">
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
              <span className="text-sm lg:text-base font-medium text-gray-900">
                visio de {duration}
              </span>
            </div>
          )}{" "}
        </div>
      </CardHeader>

      {/* Profil utilisateur */}
      <CardContent>
        <div className="flex items-center gap-4">
          <ProfileAvatar
            src={profileImage}
            alt={name}
            size="md"
            borderColor="border-gray-200"
            borderWidth="2"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-gray-600 text-base">{sessionDescription}</p>
          </div>
        </div>
      </CardContent>

      {/* Boutons d'action */}
      <CardFooter>
        <div
          className={`flex gap-4 w-full flex-col lg:flex-row ${classFooter}`}
        >
          <Button
            onClick={onAccept}
            label={textButton}
            icon={icon}
            className="flex-1 py-3 px-6 rounded-xl font-medium text-base"
            disabled={buttonStates.acceptDisabled}
          />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                onClick={handleViewRequest}
                label={viewButtonText}
                className="flex-1 text-gray-700 py-3 px-6 rounded-xl font-medium border border-light-blue-gray bg-white text-base hover:bg-gray-200"
                disabled={buttonStates.viewDisabled}
              />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 !bg-white"
            >
              <SheetHeader className="p-6 pb-4 border-b border-light-blue-gray bg-white">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold text-gray-900">
                    {modalTitle}
                  </SheetTitle>
                </div>
              </SheetHeader>

              <div className="p-6 space-y-6 bg-white min-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Requested by section */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Requested by :</p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback>
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{name}</p>
                      <p className="text-sm text-gray-600">Student, ESOC</p>
                    </div>
                  </div>
                </div>

                {/* Session details */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Session name :</p>
                  <p className="font-medium text-gray-900">
                    Session rapide visio - 60 minutes
                  </p>
                </div>

                {/* Questions section */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Questions ou commentaires
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Je veux savoir comment transformer mon idée de SaaS B2B en
                    100M $ ARR
                  </p>
                </div>
              </div>

              {/* Action buttons - Fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-none">
                <div className="flex flex-col space-y-3">
                  {isUpcoming ? (
                    // Modal pour "A venir" - Bouton Commencer la visio + Annuler
                    <>
                      <ButtonUI
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                        onClick={() => {
                          onAccept?.();
                          setIsOpen(false);
                        }}
                      >
                        <Image
                          src="/assets/icons/videocamera.svg"
                          alt="camera"
                          width={24}
                          height={24}
                        />
                        Commencer la visio
                      </ButtonUI>
                      <ButtonUI
                        variant="outline"
                        className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Annuler
                      </ButtonUI>
                    </>
                  ) : (
                    // Modal pour "En attente" - Refuser + Accepter côte à côte
                    <div className="flex space-x-3">
                      <ButtonUI
                        variant="outline"
                        className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Refuser la demande
                      </ButtonUI>
                      <ButtonUI
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          onAccept?.();
                          setIsOpen(false);
                        }}
                      >
                        Accepter la demande
                      </ButtonUI>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardFooter>
    </Card>
  );
};
