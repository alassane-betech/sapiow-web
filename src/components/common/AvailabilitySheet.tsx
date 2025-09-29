"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useTimeSlotsManager } from "@/hooks/useTimeSlotsManager";
import { useI18n } from "@/locales/client";
import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import DatePicker from "./DatePicker";

interface DayAvailability {
  day: string;
  dayOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  available: boolean;
}

interface AvailabilitySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AvailabilitySheet({
  isOpen,
  onClose,
}: AvailabilitySheetProps) {
  const t = useI18n();
  
  // Définir les jours de la semaine
  const weekDays: DayAvailability[] = [
    { day: t("availabilitySheet.sunday"), dayOfWeek: "sunday", available: false },
    { day: t("availabilitySheet.monday"), dayOfWeek: "monday", available: true },
    { day: t("availabilitySheet.tuesday"), dayOfWeek: "tuesday", available: true },
    { day: t("availabilitySheet.wednesday"), dayOfWeek: "wednesday", available: false },
    { day: t("availabilitySheet.thursday"), dayOfWeek: "thursday", available: true },
    { day: t("availabilitySheet.friday"), dayOfWeek: "friday", available: true },
    { day: t("availabilitySheet.saturday"), dayOfWeek: "saturday", available: false },
  ];

  // Créer des dates fictives pour chaque jour de la semaine (pour utiliser le hook)
  const weekDates = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1); // Lundi de cette semaine

    return {
      sunday: new Date(monday.getTime() - 24 * 60 * 60 * 1000),
      monday: new Date(monday),
      tuesday: new Date(monday.getTime() + 24 * 60 * 60 * 1000),
      wednesday: new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000),
      thursday: new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000),
      friday: new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000),
      saturday: new Date(monday.getTime() + 5 * 24 * 60 * 60 * 1000),
    };
  }, []);

  // Hooks pour chaque jour de la semaine
  const sundayManager = useTimeSlotsManager({ selectedDate: weekDates.sunday });
  const mondayManager = useTimeSlotsManager({ selectedDate: weekDates.monday });
  const tuesdayManager = useTimeSlotsManager({
    selectedDate: weekDates.tuesday,
  });
  const wednesdayManager = useTimeSlotsManager({
    selectedDate: weekDates.wednesday,
  });
  const thursdayManager = useTimeSlotsManager({
    selectedDate: weekDates.thursday,
  });
  const fridayManager = useTimeSlotsManager({ selectedDate: weekDates.friday });
  const saturdayManager = useTimeSlotsManager({
    selectedDate: weekDates.saturday,
  });

  // Mapper les managers par jour
  const dayManagers = {
    sunday: sundayManager,
    monday: mondayManager,
    tuesday: tuesdayManager,
    wednesday: wednesdayManager,
    thursday: thursdayManager,
    friday: fridayManager,
    saturday: saturdayManager,
  };

  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [availabilityPeriod, setAvailabilityPeriod] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    displayText: t("availabilitySheet.threeMonths"),
  });

  // Obtenir le manager pour un jour donné
  const getManagerForDay = (dayOfWeek: DayAvailability["dayOfWeek"]) => {
    return dayManagers[dayOfWeek];
  };

  // Vérifier si un jour a des créneaux (donc disponible)
  const isDayAvailable = (dayOfWeek: DayAvailability["dayOfWeek"]) => {
    const manager = getManagerForDay(dayOfWeek);
    return manager.timeSlots.length > 0;
  };

  // Basculer la disponibilité d'un jour
  const toggleDayAvailability = (dayOfWeek: DayAvailability["dayOfWeek"]) => {
    const manager = getManagerForDay(dayOfWeek);

    if (isDayAvailable(dayOfWeek)) {
      // Si le jour est disponible, supprimer tous les créneaux
      manager.timeSlots.forEach((slot) => {
        manager.handleRemoveTimeSlot(slot.id);
      });
    } else {
      // Si le jour n'est pas disponible, ajouter un créneau par défaut
      manager.handleAddTimeSlot();
    }
  };

  // Ajouter une session à un jour
  const addSession = (dayOfWeek: DayAvailability["dayOfWeek"]) => {
    const manager = getManagerForDay(dayOfWeek);
    manager.handleAddTimeSlot();
  };

  // Supprimer une session
  const removeSession = (
    dayOfWeek: DayAvailability["dayOfWeek"],
    sessionId: string
  ) => {
    const manager = getManagerForDay(dayOfWeek);
    manager.handleRemoveTimeSlot(sessionId);
  };

  // Mettre à jour l'heure d'une session
  const updateSessionTime = (
    dayOfWeek: DayAvailability["dayOfWeek"],
    sessionId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const manager = getManagerForDay(dayOfWeek);
    manager.handleUpdateTimeSlot(sessionId, field, value);

    // Sauvegarder si les deux heures sont remplies
    const slot = manager.timeSlots.find((s) => s.id === sessionId);
    if (slot && slot.startTime && slot.endTime) {
      setTimeout(() => {
        manager.handleSaveToServer();
      }, 100);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[478px] overflow-y-auto bg-white border-none"
        >
          <SheetHeader className="pb-6">
            <SheetTitle className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
              {t("availabilitySheet.title")}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-8 px-6">
            {/* Période disponible */}
            <div>
              <h2 className="text-base font-medium text-slate-800 mb-2.5">
                {t("availabilitySheet.availablePeriod")}
              </h2>
              <Card className="border border-gray-200 h-fit p-0">
                <CardContent className="h-fit">
                  {!isEditingPeriod ? (
                    <div className="flex items-center justify-between h-14">
                      <div className="flex justify-between ">
                        <div className="font-semibold text-gray-900">
                          {t("availabilitySheet.availability")}
                        </div>
                        <div className="text-gray-500 ml-3">
                          {availabilityPeriod.displayText}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-600 border-none cursor-pointer"
                        onClick={() => setIsEditingPeriod(true)}
                      >
                        <Image
                          src="/assets/icons/edit.svg"
                          alt="edit"
                          width={20}
                          height={20}
                        />
                      </Button>
                    </div>
                  ) : (
                    <div className="pb-4 pt-0">
                      <div className="flex items-center justify-between mb-6">
                        <div className="font-semibold text-gray-900">
                          {t("availabilitySheet.availability")} {availabilityPeriod.displayText}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700 border-none cursor-pointer"
                          onClick={() => setIsEditingPeriod(false)}
                        >
                          <Check className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 -mt-4.5">
                        <DatePicker
                          selectedDate={availabilityPeriod.startDate}
                          onDateSelect={(date) =>
                            setAvailabilityPeriod((prev) => ({
                              ...prev,
                              startDate: date,
                            }))
                          }
                          label={t("availabilitySheet.startDate")}
                          disabled={(date) => date < new Date()}
                        />

                        <DatePicker
                          selectedDate={availabilityPeriod.endDate}
                          onDateSelect={(date) =>
                            setAvailabilityPeriod((prev) => ({
                              ...prev,
                              endDate: date,
                            }))
                          }
                          label={t("availabilitySheet.endDate")}
                          disabled={(date) =>
                            date < new Date() ||
                            (availabilityPeriod.startDate
                              ? date <= availabilityPeriod.startDate
                              : false)
                          }
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Jours disponibles */}
            <div>
              <h2 className="text-base font-medium text-slate-800 mb-2.5">
                {t("availabilitySheet.availableDays")}
              </h2>
              <div className="space-y-4">
                {weekDays.map((dayData) => {
                  const manager = getManagerForDay(dayData.dayOfWeek);
                  const isAvailable = isDayAvailable(dayData.dayOfWeek);

                  return (
                    <Card
                      key={dayData.day}
                      className="border border-gray-200 p-0 m-0 min-h-[70px] mb-[13px]"
                    >
                      <CardContent className="px-[13px]">
                        <div className="flex items-center justify-between h-full pt-[7px]">
                          <div>
                            <div className="text-base font-bold text-exford-blue">
                              {dayData.day}
                            </div>
                            {isAvailable ? (
                              <div className="text-sm text-slate-gray mb-2">
                                {manager.timeSlots.length} {manager.timeSlots.length > 1 ? t("availabilitySheet.sessions") : t("availabilitySheet.session")}
                              </div>
                            ) : (
                              <div className="text-sm text-slate-gray">
                                {t("availabilitySheet.unavailable")}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-center">
                            <Switch
                              checked={isAvailable}
                              onCheckedChange={() =>
                                toggleDayAvailability(dayData.dayOfWeek)
                              }
                              className="data-[state=checked]:bg-gray-900 p-0"
                            />
                          </div>
                        </div>

                        {manager.error && (
                          <div className="p-2 bg-red-100 border border-red-300 rounded-md mb-3">
                            <p className="text-red-700 text-xs">
                              {manager.error}
                            </p>
                          </div>
                        )}

                        {isAvailable && (
                          <div className="space-y-3">
                            {manager.timeSlots.map((session) => (
                              <div
                                key={session.id}
                                className="flex items-center gap-2 sm:gap-4"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <Select
                                    value={session.startTime}
                                    onValueChange={(value) =>
                                      updateSessionTime(
                                        dayData.dayOfWeek,
                                        session.id,
                                        "startTime",
                                        value
                                      )
                                    }
                                    onOpenChange={(open) => {
                                      // Ne pas sauvegarder automatiquement le startTime
                                      // L'utilisateur doit d'abord remplir endTime
                                    }}
                                  >
                                    <SelectTrigger className="w-20 sm:w-24 bg-white border-[#E2E8F0] rounded-xl">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-60 overflow-y-auto border-none">
                                      {manager.timeOptions.map((time) => {
                                        const isTaken = manager.isTimeSlotTaken(
                                          time,
                                          session.id
                                        );
                                        return (
                                          <SelectItem
                                            key={time}
                                            value={time}
                                            disabled={isTaken}
                                            className={`${
                                              isTaken
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-900"
                                            } hover:bg-gray-50 border-b border-[#E2E8F0]`}
                                          >
                                            {time}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <span className="text-gray-500 text-sm whitespace-nowrap">
                                    {t("availabilitySheet.to")}
                                  </span>
                                  <Select
                                    value={session.endTime}
                                    onValueChange={(value) =>
                                      updateSessionTime(
                                        dayData.dayOfWeek,
                                        session.id,
                                        "endTime",
                                        value
                                      )
                                    }
                                    onOpenChange={(open) => {
                                      if (
                                        !open &&
                                        session.startTime &&
                                        session.endTime
                                      ) {
                                        // Sauvegarder seulement si les deux heures sont remplies
                                        setTimeout(() => {
                                          manager.handleSaveToServer();
                                        }, 100);
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="w-20 sm:w-24 bg-white border-[#E2E8F0] rounded-xl">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-60 overflow-y-auto border-none">
                                      {manager
                                        .getEndTimeOptions(session.startTime)
                                        .map((time) => {
                                          const isTaken =
                                            manager.isTimeSlotTaken(
                                              time,
                                              session.id
                                            );
                                          return (
                                            <SelectItem
                                              key={time}
                                              value={time}
                                              disabled={isTaken}
                                              className={`${
                                                isTaken
                                                  ? "text-gray-400 cursor-not-allowed"
                                                  : "text-gray-900"
                                              } hover:bg-gray-50 border-b border-[#E2E8F0]`}
                                            >
                                              {time}
                                            </SelectItem>
                                          );
                                        })}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      removeSession(
                                        dayData.dayOfWeek,
                                        session.id
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 h-8 w-8"
                                    disabled={manager.isLoadingAny}
                                  >
                                    <Image
                                      src="/assets/icons/trash.svg"
                                      alt="trash"
                                      width={24}
                                      height={24}
                                    />
                                  </Button>
                                </div>
                              </div>
                            ))}

                            <Button
                              variant="outline"
                              onClick={() => addSession(dayData.dayOfWeek)}
                              className="w-full h-10 justify-center items-center text-exford-blue font-bold border-[#E2E8F0] mt-3 mb-[13px] cursor-pointer"
                              disabled={manager.isLoadingAny}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {t("availabilitySheet.addSession")}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
