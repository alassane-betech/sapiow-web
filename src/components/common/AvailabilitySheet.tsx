"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [availability, setAvailability] = useState<DayAvailability[]>([
    {
      day: "Dimanche",
      available: false,
      sessions: [],
    },
    {
      day: "Lundi",
      available: true,
      sessions: [
        { id: "1", startTime: "10h30", endTime: "11h00" },
        { id: "2", startTime: "12h00", endTime: "12h30" },
      ],
    },
    {
      day: "Mardi",
      available: true,
      sessions: [{ id: "3", startTime: "10h30", endTime: "11h00" }],
    },
    {
      day: "Mercredi",
      available: false,
      sessions: [],
    },
    {
      day: "Jeudi",
      available: false,
      sessions: [],
    },
    {
      day: "Vendredi",
      available: false,
      sessions: [],
    },
    {
      day: "Samedi",
      available: false,
      sessions: [],
    },
  ]);

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

  const toggleDayAvailability = (dayIndex: number) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, available: !day.available } : day
      )
    );
  };

  const addSession = (dayIndex: number) => {
    const newSession: TimeSlot = {
      id: Date.now().toString(),
      startTime: "10h30",
      endTime: "11h00",
    };

    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              sessions: [...day.sessions, newSession],
            }
          : day
      )
    );
  };

  const removeSession = (dayIndex: number, sessionId: string) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              sessions: day.sessions.filter(
                (session) => session.id !== sessionId
              ),
            }
          : day
      )
    );
  };

  const updateSessionTime = (
    dayIndex: number,
    sessionId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              sessions: day.sessions.map((session) =>
                session.id === sessionId
                  ? { ...session, [field]: value }
                  : session
              ),
            }
          : day
      )
    );
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
                            className="w-full h-10 justify-center items-center text-base text-exford-blue font-bold font-outfit bg-white border border-light-blue-gray mt-3 mb-[13px] cursor-pointer"
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
