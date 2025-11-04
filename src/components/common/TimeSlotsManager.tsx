"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeSlotsManager } from "@/hooks/useTimeSlotsManager";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface TimeSlotsManagerProps {
  selectedDate: Date | null;
}

export default function TimeSlotsManager({
  selectedDate,
}: TimeSlotsManagerProps) {
  const t = useTranslations();
  const [useSpecificSlots, setUseSpecificSlots] = useState(false);

  const {
    timeSlots,
    timeOptions,
    isLoadingAny,
    error,
    isTimeSlotTaken,
    getEndTimeOptions,
    copyTimeSlot,
    handleAddTimeSlot,
    handleUpdateTimeSlot,
    handleRemoveTimeSlot,
    handleSaveToServer,
  } = useTimeSlotsManager({ selectedDate });

  // Affichage de chargement si pas de date sélectionnée
  if (!selectedDate) {
    return (
      <div className="w-full mx-auto p-4 sm:p-6">
        <Card className="p-4 sm:p-6 bg-gray-50 border-gray-200">
          <div className="text-center text-gray-500">
            {t("timeSlotsManager.selectDatePrompt")}
          </div>
        </Card>
      </div>
    );
  }

  // Déterminer automatiquement le type de créneaux affichés
  const hasSpecificSlots = timeSlots.some((slot) => slot.type === "specific");
  const hasRecurringSlots = timeSlots.some((slot) => slot.type === "recurring");
  const hasNewSlots = timeSlots.some((slot) => slot.id.startsWith("temp-"));

  // Si on a des nouveaux créneaux ou des spécifiques, afficher "spécifique"
  const displayedSlotType =
    hasSpecificSlots || hasNewSlots ? "specific" : "recurring";

  return (
    <div className={`w-full mx-auto ${isLoadingAny ? "opacity-50" : ""}`}>
      <Card className="p-4 sm:p-6 border-gray-200">
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Indicateur du type de créneaux */}
          {/* {timeSlots.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              {displayedSlotType === "specific" ? (
                <>
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">
                    📅 Créneaux spécifiques pour cette date uniquement (
                    {selectedDate.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                    )
                  </span>
                </>
              ) : (
                <>
                  <Repeat className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    🔄 Créneaux récurrents (tous les{" "}
                    {selectedDate.toLocaleDateString("fr-FR", {
                      weekday: "long",
                    })}
                    s)
                  </span>
                </>
              )}
            </div>
          )} */}

          {/* Afficher les créneaux existants */}
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Select
                  value={slot.startTime || undefined}
                  onValueChange={(value) =>
                    handleUpdateTimeSlot(slot.id, "startTime", value)
                  }
                >
                  <SelectTrigger className="w-32 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue
                      placeholder={t("timeSlotsManager.selectStartTime")}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto border-none">
                    {timeOptions.map((time) => {
                      const isTaken = isTimeSlotTaken(time, slot.id);
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
                  {t("timeSlotsManager.to")}
                </span>
                <Select
                  value={slot.endTime || undefined}
                  onValueChange={(value) =>
                    handleUpdateTimeSlot(slot.id, "endTime", value)
                  }
                >
                  <SelectTrigger className="w-32 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue
                      placeholder={t("timeSlotsManager.selectEndTime")}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto border-none">
                    {getEndTimeOptions(slot.startTime).map((time) => {
                      const isTaken = isTimeSlotTaken(time, slot.id);
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
              <div className="flex items-center gap-1 sm:gap-2">
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => copyTimeSlot(slot)}
                >
                  <Link className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 cursor-pointer" />
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0 cursor-pointer"
                  onClick={() => handleRemoveTimeSlot(slot.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 cursor-pointer" />
                </Button>
              </div>
            </div>
          ))}

          {/* Bouton pour ajouter une nouvelle disponibilité */}
          <Button
            variant="ghost"
            onClick={handleAddTimeSlot}
            className="w-full mt-6 py-4 sm:py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-sm sm:text-base cursor-pointer"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {t("timeSlotsManager.addAvailability")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
