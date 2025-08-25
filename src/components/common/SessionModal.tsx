"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { LoadingSpinner } from "./LoadingSpinner";

interface AppointmentQuestion {
  id: number | string;
  question: string;
  created_at: string;
  updated_at: string;
  appointment_id: number | string;
}

interface SessionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  profileImage: string;
  name: string;
  sessionDescription: string;
  isUpcoming?: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
  questions?: AppointmentQuestion[];
  loadingState?: "confirming" | "cancelling" | null;
}

export const SessionModal: React.FC<SessionModalProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  profileImage,
  name,
  sessionDescription,
  isUpcoming = false,
  onAccept,
  onCancel,
  questions = [],
  loadingState = null,
}) => {
  // Détermine le titre du modal selon le contexte
  const modalTitle = isUpcoming ? "Détail de la visio" : "Demande en attente";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[478px] p-0 !bg-white [&>button]:hidden border-l border-light-blue-gray shadow-none"
      >
        <SheetHeader className="p-6 pb-4 border-b border-light-blue-gray bg-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              {modalTitle}
            </SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4 cursor-pointer" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="p-6 space-y-6 bg-white min-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Requested by section */}
          <div>
            <p className="text-sm text-slate-gray font-medium font-outfit mb-3">
              Requested by :
            </p>
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
                <p className="font-bold text-gunmetal-gray text-sm font-outfit">
                  {name}
                </p>
                {/* <p className="text-xs font-medium text-bluish-gray font-figtree mt-1">
                  Student, ESOC
                </p> */}
              </div>
            </div>
          </div>

          {/* Session details */}
          <div>
            <p className="text-xs font-outfit font-medium text-slate-gray mb-2">
              Session name :
            </p>
            <p className="text-sm text-gunmetal-gray font-bold font-figtree">
              {sessionDescription}
            </p>
          </div>

          {/* Questions section */}
          {questions.length > 0 && (
            <div>
              <p className="text-xs font-outfit font-medium text-slate-gray mb-2">
                Questions ou commentaires
              </p>
              <div className="space-y-3">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-snow-blue rounded-[8px] p-4"
                  >
                    <p className="text-sm text-gray-700 font-figtree font-normal leading-relaxed">
                      {question.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                    onOpenChange(false);
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
                  onClick={() => onOpenChange(false)}
                >
                  Annuler
                </ButtonUI>
              </>
            ) : (
              // Modal pour "En attente" - Refuser + Accepter côte à côte
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 text-charcoal-blue font-figtree font-bold text-xs md:text-base border-none shadow-none hover:bg-gray-50 bg-transparent h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    onCancel?.();
                    onOpenChange(false);
                  }}
                  disabled={loadingState === "cancelling"}
                  label={
                    loadingState === "cancelling" ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Annulation...
                      </div>
                    ) : (
                      "Refuser"
                    )
                  }
                />

                <Button
                  className="flex-1 bg-cobalt-blue hover:bg-cobalt-blue/80 rounded-[8px] shadow-none text-white font-figtree font-bold text-xs md:text-base h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    onAccept?.();
                    onOpenChange(false);
                  }}
                  disabled={loadingState === "confirming"}
                  label={
                    loadingState === "confirming" ? (
                      <div className="flex items-center gap-2">
                        <LoadingSpinner size="sm" />
                        Confirmation...
                      </div>
                    ) : (
                      "Accepter"
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
