"use client";
import { AvailabilityButtons } from "@/components/common/AvailabilityButtons";
import AvailabilitySheet from "@/components/common/AvailabilitySheet";
import { BlockDaySection } from "@/components/common/BlockDaySection";
import { Button } from "@/components/common/Button";
import CustomCalendar from "@/components/common/CustomCalendar";
import { PeriodToggle, PeriodType } from "@/components/common/PeriodToggle";
import { SessionDetailsPanel } from "@/components/common/SessionDetailsPanel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCalendarStore } from "@/store/useCalendar";
import { formatFullDate } from "@/utils/dateFormat";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccountLayout from "../AccountLayout";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useProExpertStore } from "@/store/useProExpert";

export default function Disponibilites() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("semaine");
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const { selectedDate } = useCalendarStore();
  const [isBlocked, setIsBlocked] = useState(false);
  const [showTimeSlotsManager, setShowTimeSlotsManager] = useState(false);
  const [showAvailabilitySheet, setShowAvailabilitySheet] = useState(false);
  const [showSessionDetailsSheet, setShowSessionDetailsSheet] = useState(false);

  // API et Store pour synchroniser les données proExpert
  const { data: proExpertData, isLoading: isLoadingApi } = useGetProExpert();
  const { setProExpertData, setLoading } = useProExpertStore();

  // Synchroniser les données API avec le store
  useEffect(() => {
    setLoading(isLoadingApi);
    if (proExpertData) {
      setProExpertData(proExpertData);
    }
  }, [proExpertData, isLoadingApi, setProExpertData, setLoading]);

  const handleConnectGoogle = () => {
    // Logique de connexion Google Agenda
    setIsGoogleConnected(true);
  };

  const handleBlocked = (checked: boolean) => {
    setIsBlocked(checked);
  };

  const handleAddAvailability = () => {
    setShowTimeSlotsManager(true);
  };

  const handleManageAvailability = () => {
    setShowAvailabilitySheet(true);
  };

  const handleSyncCalendars = () => {
    setShowAvailabilitySheet(true);
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
        <SheetContent
          side="bottom"
          className="h-[80vh] overflow-y-auto bg-white"
        >
          <SheetHeader>
            <SheetTitle>
              {selectedDate
                ? formatFullDate(selectedDate)
                : "Détails de la session"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col items-center justify-center">
            <SessionDetailsPanel
              selectedDate={selectedDate}
              showTimeSlotsManager={showTimeSlotsManager}
              onAddAvailability={handleAddAvailability}
            />
            {selectedDate && (
              <BlockDaySection
                isBlocked={isBlocked}
                onToggle={handleBlocked}
                isMobile={true}
              />
            )}
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
            <div className="w-full max-w-[414px] lg:max-w-[400px]">
              <CustomCalendar />
            </div>
            {/* Section Gestion des disponibilités */}
            <div className="space-y-4 w-full lg:-ml-2 xl:ml-4 pb-6">
              <AvailabilityButtons
                onManageAvailability={handleManageAvailability}
                onSyncCalendars={handleSyncCalendars}
              />

              <Card className="w-full fixed bottom-16 lg:bottom-0 max-w-[380px] bg-white border-none shadow-none h-[183px] mt-4">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="text-base font-bold font-figtree text-black">
                      Synchronisation avec Google Agenda
                    </h4>
                    <p className="text-sm font-medium font-figtree text-slate-600">
                      Connectez votre compte Google pour éviter les réservations
                      en double.
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
                          Google Agenda
                        </p>
                        <p className="text-sm font-medium font-figtree text-slate-600">
                          Non connecté
                        </p>
                      </div>
                    </div>
                    <Button
                      label="Connecter"
                      className="text-sm font-bold font-figtree text-white"
                      onClick={handleConnectGoogle}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Divider vertical - visible sur tablettes et plus */}
          <div className="hidden md:block bg-soft-ice-gray w-[1px] min-h-screen lg:mr-2"></div>

          {/* Panneau de détails des sessions - visible sur tablettes et plus */}
          <div className="hidden md:flex flex-col justify-between items-end mt-7 w-full max-w-[414px] ml-auto">
            <SessionDetailsPanel
              selectedDate={selectedDate}
              showTimeSlotsManager={showTimeSlotsManager}
              onAddAvailability={handleAddAvailability}
            />
            {selectedDate && (
              <BlockDaySection
                isBlocked={isBlocked}
                onToggle={handleBlocked}
                isMobile={false}
              />
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
