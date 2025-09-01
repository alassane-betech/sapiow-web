"use client";

import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useProExpertStore } from "@/store/useProExpert";
import { useTimeSlotsStore } from "@/store/useTimeSlotsStore";
import { ApiSchedule } from "@/types/schedule";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DatePicker from "./DatePicker";
import TimeSelect from "./TimeSelect";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  day: string;
  available: boolean;
  sessions: TimeSlot[];
}

interface AvailabilitySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AvailabilitySheet({
  isOpen,
  onClose,
}: AvailabilitySheetProps) {
  // Stores et API
  const { proExpertData, setProExpertData } = useProExpertStore();
  const {
    addTimeSlotLocal,
    updateTimeSlotLocal,
    saveSchedulesToServer,
    removeTimeSlot,
    getTimeSlotsForDate,
  } = useTimeSlotsStore();
  const updateProExpertMutation = useUpdateProExpert();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Convertir une heure en nombre pour comparaison (ex: "9h30" -> 9.5)
  const timeToNumber = (time: string): number => {
    const [hour, minutes] = time.replace("h", ":").split(":");
    return parseInt(hour) + parseInt(minutes || "0") / 60;
  };

  // Générer les options de endTime filtrées selon startTime
  const getEndTimeOptions = (startTime: string): string[] => {
    const timeOptions = [
      "08h00",
      "08h30",
      "09h00",
      "09h30",
      "10h00",
      "10h30",
      "11h00",
      "11h30",
      "12h00",
      "12h30",
      "13h00",
      "13h30",
      "14h00",
      "14h30",
      "15h00",
      "15h30",
      "16h00",
      "16h30",
      "17h00",
      "17h30",
      "18h00",
      "18h30",
      "19h00",
      "19h30",
    ];

    if (!startTime) return timeOptions;

    const startTimeNum = timeToNumber(startTime);
    return timeOptions.filter((time) => {
      const timeNum = timeToNumber(time);
      return timeNum > startTimeNum;
    });
  };

  // Détecter les conflits d'horaires dans une journée
  const getConflictTimes = (
    dayIndex: number,
    currentSessionId: string,
    field: "startTime" | "endTime"
  ): string[] => {
    const dayData = availability[dayIndex];
    if (!dayData) return [];

    const conflictTimes: string[] = [];
    const otherSessions = dayData.sessions.filter(
      (s) => s.id !== currentSessionId && s.startTime && s.endTime
    );

    // Seulement détecter les conflits s'il y a d'autres sessions complètes
    if (otherSessions.length === 0) return [];

    const timeOptions = [
      "08h00",
      "08h30",
      "09h00",
      "09h30",
      "10h00",
      "10h30",
      "11h00",
      "11h30",
      "12h00",
      "12h30",
      "13h00",
      "13h30",
      "14h00",
      "14h30",
      "15h00",
      "15h30",
      "16h00",
      "16h30",
      "17h00",
      "17h30",
      "18h00",
      "18h30",
      "19h00",
      "19h30",
    ];

    timeOptions.forEach((time) => {
      const timeNum = timeToNumber(time);

      for (const session of otherSessions) {
        const sessionStart = timeToNumber(session.startTime);
        const sessionEnd = timeToNumber(session.endTime);

        // Vérifier si le temps créerait un conflit réel
        let hasConflict = false;

        if (field === "startTime") {
          // Conflit si le startTime est strictement dans une plage existante
          hasConflict = timeNum > sessionStart && timeNum < sessionEnd;
        } else if (field === "endTime") {
          // Conflit si le endTime est strictement dans une plage existante
          hasConflict = timeNum > sessionStart && timeNum < sessionEnd;
        }

        if (hasConflict) {
          conflictTimes.push(time);
          break; // Pas besoin de vérifier les autres sessions pour ce temps
        }
      }
    });

    return conflictTimes;
  };

  // Mapping des jours vers les données API
  const dayMapping = {
    Dimanche: "sunday",
    Lundi: "monday",
    Mardi: "tuesday",
    Mercredi: "wednesday",
    Jeudi: "thursday",
    Vendredi: "friday",
    Samedi: "saturday",
  } as const;

  // Générer les données de disponibilité depuis les schedules API
  const generateAvailabilityFromSchedules = (): DayAvailability[] => {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];

    return days.map((day) => {
      const apiDay = dayMapping[day as keyof typeof dayMapping];
      const schedules = (proExpertData?.schedules as ApiSchedule[]) || [];
      const daySchedules = schedules.filter((s) => s.day_of_week === apiDay);

      const sessions = daySchedules.map((schedule, index) => ({
        id: `${apiDay}-${schedule.id || index}`,
        startTime: schedule.start_time.substring(0, 5).replace(":", "h"),
        endTime: schedule.end_time.substring(0, 5).replace(":", "h"),
      }));

      return {
        day,
        available: sessions.length > 0,
        sessions,
      };
    });
  };

  // État des disponibilités basé sur les données API
  const [availability, setAvailability] = useState<DayAvailability[]>([]);

  // Ref pour éviter les boucles de mise à jour
  const isUpdatingRef = useRef(false);

  // Mettre à jour les disponibilités quand les schedules changent
  useEffect(() => {
    if (proExpertData?.schedules && !isUpdatingRef.current) {
      console.log(
        "AvailabilitySheet: useEffect triggered, updating availability"
      );
      const newAvailability = generateAvailabilityFromSchedules();
      setAvailability(newAvailability);
    }
  }, [proExpertData?.schedules]);

  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [availabilityPeriod, setAvailabilityPeriod] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    displayText: "3 mois",
  });

  const calculateMonthsDifference = (
    startDate: Date,
    endDate: Date
  ): string => {
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (monthsDiff === 0) return "Moins d'un mois";
    if (monthsDiff === 1) return "1 mois";
    return `${monthsDiff} mois`;
  };

  useEffect(() => {
    if (availabilityPeriod.startDate && availabilityPeriod.endDate) {
      const monthsText = calculateMonthsDifference(
        availabilityPeriod.startDate,
        availabilityPeriod.endDate
      );
      setAvailabilityPeriod((prev) => ({ ...prev, displayText: monthsText }));
    }
  }, [availabilityPeriod.startDate, availabilityPeriod.endDate]);

  // Sauvegarder sur le serveur avec debouncing
  const handleSaveToServer = async () => {
    if (!proExpertData?.schedules) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveSchedulesToServer(
          proExpertData.schedules || [],
          async (updateData: any) => {
            const result = await updateProExpertMutation.mutateAsync(
              updateData
            );
            return result.data;
          }
        );
      } catch (error) {
        console.error("Error saving to server:", error);
      }
    }, 500);
  };

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const toggleDayAvailability = (dayIndex: number) => {
    const dayData = availability[dayIndex];
    if (!dayData || !proExpertData?.schedules) return;

    const apiDay = dayMapping[dayData.day as keyof typeof dayMapping];

    if (dayData.available) {
      // Supprimer tous les créneaux de ce jour
      const updatedSchedules = (
        proExpertData.schedules as ApiSchedule[]
      ).filter((s) => s.day_of_week !== apiDay);

      setProExpertData({
        ...proExpertData,
        schedules: updatedSchedules,
      });
    }

    // La mise à jour de l'état local se fera via useEffect
  };

  const addSession = (dayIndex: number) => {
    const dayData = availability[dayIndex];
    if (!dayData || !proExpertData?.schedules) return;

    const apiDay = dayMapping[dayData.day as keyof typeof dayMapping];

    // Créer une date fictive pour ce jour
    const today = new Date();
    const daysToAdd = Object.keys(dayMapping).indexOf(dayData.day);
    const fakeDate = new Date(today);
    fakeDate.setDate(today.getDate() + (daysToAdd - today.getDay()));

    const result = addTimeSlotLocal(proExpertData.schedules, fakeDate);

    setProExpertData({
      ...proExpertData,
      schedules: result.schedules,
    });
  };

  const removeSession = async (dayIndex: number, sessionId: string) => {
    const dayData = availability[dayIndex];
    if (!dayData || !proExpertData?.schedules) return;

    const apiDay = dayMapping[dayData.day as keyof typeof dayMapping];

    // Créer une date fictive pour ce jour
    const today = new Date();
    const daysToAdd = Object.keys(dayMapping).indexOf(dayData.day);
    const fakeDate = new Date(today);
    fakeDate.setDate(today.getDate() + (daysToAdd - today.getDay()));

    try {
      const updatedSchedules = await removeTimeSlot(
        proExpertData.schedules,
        fakeDate,
        sessionId,
        async (updateData: any) => {
          const result = await updateProExpertMutation.mutateAsync(updateData);
          return result.data;
        }
      );

      setProExpertData({
        ...proExpertData,
        schedules: updatedSchedules,
      });
    } catch (error) {
      console.error("Error removing session:", error);
    }
  };

  const updateSessionTime = (
    dayIndex: number,
    sessionId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    console.log(`AvailabilitySheet.updateSessionTime appelé:`, {
      dayIndex,
      sessionId,
      field,
      value,
      currentAvailability: availability[dayIndex]?.sessions.find(
        (s) => s.id === sessionId
      ),
    });

    const dayData = availability[dayIndex];
    if (!dayData || !proExpertData?.schedules) {
      console.log(`AvailabilitySheet.updateSessionTime: Pas de données`, {
        dayData: !!dayData,
        schedules: !!proExpertData?.schedules,
      });
      return;
    }

    // Marquer qu'on est en cours de mise à jour pour éviter le re-render du useEffect
    isUpdatingRef.current = true;

    // Créer une date fictive pour ce jour
    const today = new Date();
    const daysToAdd = Object.keys(dayMapping).indexOf(dayData.day);
    const fakeDate = new Date(today);
    fakeDate.setDate(today.getDate() + (daysToAdd - today.getDay()));

    console.log(
      `AvailabilitySheet.updateSessionTime: Avant updateTimeSlotLocal`
    );
    const updatedSchedules = updateTimeSlotLocal(
      proExpertData.schedules,
      fakeDate,
      sessionId,
      field,
      value
    );

    console.log(
      `AvailabilitySheet.updateSessionTime: Après updateTimeSlotLocal, mise à jour du state`
    );
    setProExpertData({
      ...proExpertData,
      schedules: updatedSchedules,
    });

    // Mettre à jour immédiatement l'état local availability pour éviter le re-render
    setAvailability((prevAvailability) => {
      const newAvailability = [...prevAvailability];
      const sessionIndex = newAvailability[dayIndex].sessions.findIndex(
        (s) => s.id === sessionId
      );
      if (sessionIndex !== -1) {
        newAvailability[dayIndex].sessions[sessionIndex] = {
          ...newAvailability[dayIndex].sessions[sessionIndex],
          [field]: value,
        };
      }
      return newAvailability;
    });

    // Sauvegarder seulement si les deux champs sont remplis
    const session = dayData.sessions.find((s) => s.id === sessionId);
    const updatedSession = { ...session, [field]: value };

    if (updatedSession.startTime && updatedSession.endTime) {
      handleSaveToServer();
    }

    // Permettre les futurs useEffect après un délai
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);

    console.log(`AvailabilitySheet.updateSessionTime: Terminé`);
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
              Gérer mes disponibilités
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-8 px-6">
            {/* Available Period */}
            <div>
              <h2 className="text-base font-medium text-slate-800 mb-2.5">
                Période disponible
              </h2>
              <Card className="border border-gray-200 h-fit p-0">
                <CardContent className="h-fit">
                  {!isEditingPeriod ? (
                    <div className="flex items-center justify-between h-14">
                      <div className="flex justify-between ">
                        <div className="font-semibold text-gray-900">
                          Disponibilité
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
                          Disponibilité {availabilityPeriod.displayText}
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
                          label="Date début"
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
                          label="Date fin"
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

            {/* Available Days */}
            <div>
              <h2 className="text-base font-medium text-slate-800 mb-2.5">
                Jours disponible
              </h2>
              <div className="space-y-4">
                {availability.map((dayData, dayIndex) => (
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
                          {dayData.available ? (
                            <div className="text-sm text-slate-gray mb-2">
                              {dayData.sessions.length} session
                              {dayData.sessions.length > 1 ? "s" : ""}
                            </div>
                          ) : (
                            <div className="text-sm text-slate-gray">
                              Indisponible
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={dayData.available}
                            onCheckedChange={() =>
                              toggleDayAvailability(dayIndex)
                            }
                            className="data-[state=checked]:bg-gray-900 p-0"
                          />
                        </div>
                      </div>

                      {dayData.available && (
                        <div className="space-y-3">
                          {dayData.sessions.map((session) => (
                            <div
                              key={session.id}
                              className="flex items-center gap-3"
                            >
                              <TimeSelect
                                value={session.startTime}
                                onValueChange={(value) =>
                                  updateSessionTime(
                                    dayIndex,
                                    session.id,
                                    "startTime",
                                    value
                                  )
                                }
                                conflictOptions={getConflictTimes(
                                  dayIndex,
                                  session.id,
                                  "startTime"
                                )}
                              />

                              <span className="text-base text-slate-gray">
                                à
                              </span>

                              <TimeSelect
                                value={session.endTime}
                                onValueChange={(value) =>
                                  updateSessionTime(
                                    dayIndex,
                                    session.id,
                                    "endTime",
                                    value
                                  )
                                }
                                options={getEndTimeOptions(session.startTime)}
                                conflictOptions={getConflictTimes(
                                  dayIndex,
                                  session.id,
                                  "endTime"
                                )}
                              />

                              <Button
                                variant="secondary"
                                size="icon"
                                onClick={() =>
                                  removeSession(dayIndex, session.id)
                                }
                                className="text-gray-400 hover:text-gray-600 ml-auto cursor-pointer"
                              >
                                <Image
                                  src="/assets/icons/trash.svg"
                                  alt="trash"
                                  width={20}
                                  height={20}
                                />
                              </Button>
                            </div>
                          ))}

                          <Button
                            variant="secondary"
                            onClick={() => addSession(dayIndex)}
                            className="w-full h-10 justify-center items-center text-base text-exford-blue font-bold font-figtree bg-white border border-light-blue-gray mt-3 mb-[13px] font-figtree cursor-pointer"
                          >
                            <Image
                              src="/assets/icons/add.svg"
                              alt="plus"
                              width={20}
                              height={20}
                            />
                            Ajouter une session
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
