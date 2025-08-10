"use client";
import BookedSessionCard from "@/components/common/BookedSessionCard";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { Button } from "../common/Button";

interface SessionData {
  professionalName: string;
  professionalTitle: string;
  profileImage: string;
  sessionType: string;
  duration: string;
  date: string;
  time: string;
}

interface SessionDetailSheetProps {
  session: SessionData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SessionDetailSheet({
  session,
  isOpen,
  onClose,
}: SessionDetailSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[478px] p-0 !bg-white [&>button]:hidden border-l border-light-blue-gray shadow-none"
      >
        <SheetHeader className="p-6 pb-4 border-b border-light-blue-gray bg-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Détails
            </SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4 cursor-pointer" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {session && (
          <>
            <div className="px-6 space-y-6 bg-white min-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Card de session réservée */}
              <div>
                <BookedSessionCard
                  professionalName={session.professionalName}
                  professionalTitle={session.professionalTitle}
                  profileImage={session.profileImage}
                  sessionType={session.sessionType}
                  duration={session.duration}
                  date={session.date}
                  time={session.time}
                  className="max-w-[446px]"
                />
              </div>

              {/* Section questions */}
              <div>
                <div className="bg-[#E8F2FF] rounded-[8px] p-4">
                  <h1 className="text-exford-blue text-base font-bold font-figtree">
                    N'hésitez pas à poser vos questions avant la session
                  </h1>
                  <p className="text-sm text-exford-blue font-figtree font-normal leading-relaxed">
                    Vous avez la possibilité de soumettre vos questions à
                    l'avance afin que l'expert puisse mieux se préparer pour
                    vous.
                  </p>
                  <Button
                    label="Soumettre mes questions"
                    className="h-[40px] w-full rounded-[8px] mt-2 text-base font-bold font-figtree"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-none">
              <div className="flex flex-col space-y-3">
                <ButtonUI
                  variant="outline"
                  className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                  onClick={onClose}
                >
                  Ajouter au calendrier
                </ButtonUI>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
