"use client";
import {
  useGoogleCalendarDisconnect,
  useGoogleCalendarStatus,
} from "@/api/google-calendar-sync/useGoogleCalendarSync";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { AvailabilityButtons } from "@/components/common/AvailabilityButtons";
import AvailabilitySheet from "@/components/common/AvailabilitySheet";
import CustomCalendar from "@/components/common/CustomCalendar";
import GoogleCalendarConnectButton from "@/components/common/GoogleCalendarConnectButton";
import { PeriodToggle, PeriodType } from "@/components/common/PeriodToggle";
import { SessionDetailsPanel } from "@/components/common/SessionDetailsPanel";
import SyncedCalendarsSheet from "@/components/common/SyncedCalendarsSheet";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useVisiosAppointments } from "@/hooks/useVisiosAppointments";
import { useCalendarStore } from "@/store/useCalendar";
import { useProExpertStore } from "@/store/useProExpert";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountLayout from "../AccountLayout";

export default function Disponibilites() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("semaine");
  const { selectedDate } = useCalendarStore();
  // Supprimé car maintenant calculé dynamiquement avec isDateBlocked
  const [showTimeSlotsManager, setShowTimeSlotsManager] = useState(false);
  const [showAvailabilitySheet, setShowAvailabilitySheet] = useState(false);
  const [showSessionDetailsSheet, setShowSessionDetailsSheet] = useState(false);
  const [showSyncedCalendarsSheet, setShowSyncedCalendarsSheet] =
    useState(false);

  // Hooks Google Calendar
  const { data: googleStatus, isLoading: isGoogleStatusLoading } =
    useGoogleCalendarStatus();

  const disconnectMutation = useGoogleCalendarDisconnect();

  // États dérivés
  const isGoogleConnected = googleStatus?.connected || false;
  const isGoogleLoading = disconnectMutation.isPending;

  // API et Store pour synchroniser les données proExpert
  const { data: proExpertData, isLoading: isLoadingApi } = useGetProExpert();
  const { setProExpertData, setLoading } = useProExpertStore();

  // Hook pour récupérer les rendez-vous confirmés
  const { confirmedAppointments } = useVisiosAppointments();

  // Fonction réutilisable pour éviter la duplication mobile/desktop
  const renderSessionDetailsPanel = (isMobile: boolean = false) => (
    <SessionDetailsPanel
      selectedDate={selectedDate}
      showTimeSlotsManager={showTimeSlotsManager}
      confirmedAppointments={confirmedAppointments}
      isMobile={isMobile}
    />
  );

  // Synchroniser les données API avec le store
  useEffect(() => {
    setLoading(isLoadingApi);
    if (proExpertData) {
      setProExpertData(proExpertData);
    }
  }, [proExpertData, isLoadingApi, setProExpertData, setLoading]);

  const handleDisconnectGoogle = () => {
    disconnectMutation.mutate();
  };

  const handleAddAvailability = () => {
    setShowTimeSlotsManager(true);
  };
  const handleManageAvailability = () => {
    setShowAvailabilitySheet(true);
  };

  const handleSyncCalendars = () => {
    // Ouvrir le sheet des calendriers synchronisés
    setShowSyncedCalendarsSheet(true);
  };

  // Ouvrir automatiquement le sheet sur mobile seulement quand une date est sélectionnée
  useEffect(() => {
    if (
      selectedDate &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      console.log("Date sélectionnée sur mobile:", selectedDate);
      setShowSessionDetailsSheet(true);
    }
  }, [selectedDate]);

  // Afficher un loader si les données essentielles se chargent
  if (isLoadingApi || isGoogleStatusLoading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">{t("loading")}</p>
          </div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout className="">
      <AvailabilitySheet
        isOpen={showAvailabilitySheet}
        onClose={() => setShowAvailabilitySheet(false)}
      />

      <SyncedCalendarsSheet
        isOpen={showSyncedCalendarsSheet}
        onClose={() => setShowSyncedCalendarsSheet(false)}
        connectedEmail={googleStatus?.email}
        isConnected={isGoogleConnected}
      />

      {/* Sheet pour mobile/tablette */}
      <Sheet
        open={showSessionDetailsSheet}
        onOpenChange={setShowSessionDetailsSheet}
      >
        <SheetContent
          side="bottom"
          className="h-[80vh] overflow-y-auto bg-white"
        >
          <SheetHeader>
            <SheetTitle>
              {selectedDate
                ? selectedDate.toLocaleDateString(
                    currentLocale === "fr" ? "fr-FR" : "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : t("disponibilites.sessionDetails")}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col items-center justify-center">
            {renderSessionDetailsPanel(true)}
          </div>
        </SheetContent>
      </Sheet>

      <div className="space-y-0 w-full container px-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] lg:grid-cols-[1fr_2px_1fr] gap-x-4 md:gap-x-6 lg:gap-x-0 gap-y-8 md:gap-y-0">
          <div className="w-full space-y-0 max-w-[414px] relative">
            <div className="w-full flex items-center justify-center">
              <PeriodToggle
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                size="sm"
              />
            </div>
            <div className="w-full mx-auto">
              <CustomCalendar
                confirmedAppointments={confirmedAppointments}
                schedules={proExpertData?.schedules || []}
              />
            </div>
            {/* Section Gestion des disponibilités */}
            <div className="space-y-4 w-full lg:-ml-2 xl:ml-4 pb-6">
              <AvailabilityButtons
                onManageAvailability={handleManageAvailability}
                onSyncCalendars={handleSyncCalendars}
              />

              {/* Afficher la card de connexion seulement si Google Calendar n'est pas connecté */}
              {!isGoogleConnected && (
                <Card className="w-full fixed bottom-16 lg:bottom-0 max-w-[380px] bg-white border-none shadow-none h-[183px] mt-4">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="text-base font-bold font-figtree text-black">
                        {t("disponibilites.googleCalendarSync")}
                      </h4>
                      <p className="text-sm font-medium font-figtree text-slate-600">
                        {t("disponibilites.googleCalendarDescription")}
                      </p>
                    </div>
                    <div className="flex justify-between items-center border border-frost-gray rounded-[12px] p-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/assets/icons/googleCalendar.svg"}
                          width={41}
                          height={41}
                          alt="google"
                        />
                        <div>
                          <p className="text-sm font-medium font-figtree text-slate-600">
                            {t("disponibilites.googleCalendar")}
                          </p>
                          <p className="text-sm font-medium font-figtree text-slate-600">
                            {t("disponibilites.notConnected")}
                          </p>
                        </div>
                      </div>
                      <GoogleCalendarConnectButton
                        isLoading={isGoogleLoading}
                        className="text-sm font-bold font-figtree"
                      >
                        {t("disponibilites.connect")}
                      </GoogleCalendarConnectButton>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Divider vertical - visible sur tablettes et plus */}
          <div className="hidden md:block bg-soft-ice-gray w-[1px] min-h-screen lg:mr-2"></div>

          {/* Panneau de détails des sessions - visible sur tablettes et plus */}
          <div className="hidden md:flex flex-col justify-between items-end mt-7 w-full max-w-[414px] ml-auto">
            {renderSessionDetailsPanel(false)}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
