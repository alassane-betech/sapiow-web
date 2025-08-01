"use client";
import AvailabilitySheet from "@/components/common/AvailabilitySheet";
import { Button } from "@/components/common/Button";
import CustomCalendar from "@/components/common/CustomCalendar";
import { EmptySessionCard } from "@/components/common/EmptySessionCard";
import { PeriodToggle, PeriodType } from "@/components/common/PeriodToggle";
import { SessionPreviewCard } from "@/components/common/SessionPreviewCard";
import { Switch } from "@/components/common/Switch";
import TimeSlotsManager from "@/components/common/TimeSlotsManager";
import { Button as ButtonUI } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCalendarStore } from "@/store/useCalendar";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountLayout from "../AccountLayout";

// Données d'exemple pour les événements avec les vrais avatars
const events = {
  6: {
    type: "active",
    users: [
      {
        id: 1,
        name: "Marie Dubois",
        avatar: "/assets/prof.jpg",
        time: "10:00",
        description: "60-minute Deep Dive",
        duration: "60mn",
      },
      {
        id: 2,
        name: "Jean Martin",
        avatar: "/assets/prof1.jpg",
        time: "14:00",
        description: "Session développement personnel",
        duration: "45mn",
      },
    ],
  },
  8: {
    type: "unavailable",
    users: [],
  },
  9: {
    type: "active",
    users: [
      {
        id: 3,
        name: "Sophie Leroy",
        avatar: "/assets/prof.jpg",
        time: "09:00",
        description: "Entretien d'orientation",
        duration: "30mn",
      },
      {
        id: 4,
        name: "Pierre Dupont",
        avatar: "/assets/prof1.jpg",
        time: "16:00",
        description: "Coaching professionnel",
        duration: "60mn",
      },
    ],
  },
  11: {
    type: "unavailable",
    users: [],
  },
  12: {
    type: "unavailable",
    users: [],
  },
  13: {
    type: "unavailable",
    users: [],
  },
  14: {
    type: "unavailable",
    users: [],
  },
  15: {
    type: "unavailable",
    users: [],
  },
  19: {
    type: "complete",
    users: [
      {
        id: 5,
        name: "Lucien Moreau",
        avatar: "/assets/prof.jpg",
        time: "11:00",
        description: "Session de suivi",
        duration: "45mn",
      },
      {
        id: 6,
        name: "Camille Petit",
        avatar: "/assets/prof1.jpg",
        time: "15:00",
        description: "Consultation spécialisée",
        duration: "90mn",
      },
    ],
  },
  22: {
    type: "unavailable",
    users: [],
  },
  29: {
    type: "unavailable",
    users: [],
  },
};

export default function Disponibilites() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("semaine");
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTimeSlotsManager, setShowTimeSlotsManager] = useState(false);
  const [showAvailabilitySheet, setShowAvailabilitySheet] = useState(false);
  const [showSessionDetailsSheet, setShowSessionDetailsSheet] = useState(false);

  const handleConnectGoogle = () => {
    // Logique de connexion Google Agenda
    setIsGoogleConnected(true);
  };

  const handleManageAvailability = () => {
    // Logique pour gérer les disponibilités
    console.log("Gérer mes disponibilités");
  };

  const handleSyncCalendars = () => {
    // Logique pour synchroniser les calendriers
    console.log("Calendriers synchronisés");
  };

  const handleBlocked = (checked: boolean) => {
    setIsBlocked(checked);
  };

  const handleAddAvailability = () => {
    setShowTimeSlotsManager(true);
  };

  const handleCloseTimeSlotsManager = () => {
    setShowTimeSlotsManager(false);
  };

  // Ouvrir automatiquement le sheet sur mobile/tablette quand une date est sélectionnée
  useEffect(() => {
    if (
      selectedDate &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      console.log("Date sélectionnée sur mobile/tablette:", selectedDate);
      setShowSessionDetailsSheet(true);
    }
  }, [selectedDate]);

  // Fonction pour récupérer les détails des sessions pour une date sélectionnée
  const getSessionDetails = () => {
    if (!selectedDate) return null;

    const dayOfMonth = selectedDate.getDate();
    const event = events[dayOfMonth as keyof typeof events];

    if (!event || event.users.length === 0) return null;

    return {
      date: selectedDate,
      event: event,
      sessions: event.users.map((user) => ({
        id: user.id,
        clientName: user.name,
        avatar: user.avatar,
        time: user.time,
        duration: user.duration,
        description: user.description,
        type: event.type,
      })),
    };
  };

  const formatDateForSession = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    } else {
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  };

  const formatTimeForSession = (time: string) => {
    // Convertir "10:00" en "10h00"
    return time.replace(":", "h");
  };

  const sessionDetails = getSessionDetails();

  // Composant pour le contenu des détails de session (réutilisé dans desktop et mobile)
  const SessionDetailsContent = () => (
    <div className="w-full">
      {selectedDate ? (
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center gap-2 mb-6">
            <h3 className="text-lg text-center font-semibold text-gray-900">
              {selectedDate.toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>

          {sessionDetails && (
            <div className="space-y-3">
              {sessionDetails.sessions.map((session) => (
                <SessionPreviewCard
                  key={session.id}
                  date={formatDateForSession(sessionDetails.date)}
                  time={formatTimeForSession(session.time)}
                  visioDuration={session.duration}
                  participantName={session.clientName}
                  participantAvatar={session.avatar}
                  sessionDescription={session.description}
                  className="w-full"
                />
              ))}
            </div>
          )}

          {showTimeSlotsManager ? (
            <div className="w-full">
              <TimeSlotsManager />
            </div>
          ) : (
            <EmptySessionCard
              message={
                <>
                  Aucune session n'est <br /> prévue pour aujourd'hui.
                </>
              }
              buttonLabel="Ajouter une disponibilité"
              onAdd={handleAddAvailability}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-[200px]">
          <p className="text-slate-200 text-center text-base font-medium">
            Sélectionnez une date pour
            <br /> voir les détails.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <AccountLayout>
      <AvailabilitySheet
        isOpen={showAvailabilitySheet}
        onClose={() => setShowAvailabilitySheet(false)}
      />

      {/* Sheet pour mobile/tablette */}
      <Sheet
        open={showSessionDetailsSheet}
        onOpenChange={setShowSessionDetailsSheet}
      >
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedDate
                ? selectedDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Détails de la session"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <SessionDetailsContent />
            {selectedDate && (
              <div className="w-full flex items-center justify-between mt-6 p-4 border-t">
                <div>
                  <h1 className="text-lg font-semibold text-charcoal-blue">
                    Bloquer cette journée ?
                  </h1>
                  <p className="text-sm font-normal text-gray-500">
                    Il n'est pas possible d'avoir une session à cette date.
                  </p>
                </div>
                <Switch
                  checked={isBlocked}
                  onChange={(checked) => handleBlocked(checked)}
                  className="data-[state=checked]:bg-[#1E293B]"
                />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className="space-y-0 w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-x-8 gap-y-8 lg:gap-y-0">
          <div className="w-full space-y-0 lg:ml-7">
            <div className="w-full flex items-center justify-center lg:-ml-16">
              <PeriodToggle
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                size="sm"
              />
            </div>
            <div className="w-full max-w-[375px] lg:ml-5">
              <CustomCalendar />
            </div>
            {/* Section Gestion des disponibilités */}
            <div className="space-y-4 w-full lg:ml-4">
              <ButtonUI
                onClick={() => setShowAvailabilitySheet(true)}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full max-w-[381px] h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={"/assets/icons/calendar.svg"}
                    width={20}
                    height={20}
                    alt="calendar"
                  />
                  <span className="text-base font-medium text-gray-900">
                    Gérer mes disponibilités
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </ButtonUI>

              <ButtonUI
                onClick={() => setShowAvailabilitySheet(true)}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-full max-w-[381px] h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={"/assets/icons/calendar.svg"}
                    width={20}
                    height={20}
                    alt="calendar"
                  />
                  <span className="text-base font-medium text-gray-900">
                    Synchroniser mes calendriers
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </ButtonUI>

              <Card className="w-full max-w-[381px] bg-white border border-gray-200 rounded-lg h-[136px]">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      Google Agenda
                    </h4>
                    <Button
                      label={isGoogleConnected ? "Déconnecter" : "Connecter"}
                      onClick={handleConnectGoogle}
                      className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isGoogleConnected
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Divider vertical - visible seulement sur grands écrans */}
          <div className="hidden lg:block bg-gray-400 w-[2px] min-h-screen"></div>

          {/* Panneau de détails des sessions - visible seulement sur desktop */}
          <div className="hidden lg:flex flex-col justify-between items-end mt-7 w-[93%]">
            <SessionDetailsContent />
            {selectedDate && (
              <div className="w-full flex items-center justify-between sticky bottom-5">
                <div>
                  <h1 className="text-lg font-semibold text-charcoal-blue">
                    Bloquer cette journée ?
                  </h1>
                  <p className="text-sm font-normal text-gray-500">
                    Il n'est pas possible d'avoir une session à <br /> cette
                    date.
                  </p>
                </div>
                <Switch
                  checked={isBlocked}
                  onChange={(checked) => handleBlocked(checked)}
                  className="data-[state=checked]:bg-[#1E293B]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
