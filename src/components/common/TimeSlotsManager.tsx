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
import { Link, Plus, Trash2 } from "lucide-react";

interface TimeSlotsManagerProps {
  selectedDate: Date | null;
}

export default function TimeSlotsManager({
  selectedDate,
}: TimeSlotsManagerProps) {
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
            Sélectionnez une date pour gérer les créneaux horaires
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <Card className="p-4 sm:p-6 bg-gray-50 border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {isLoadingAny && (
              <div className="text-sm text-blue-600">Sauvegarde...</div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Afficher les créneaux existants */}
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Select
                  value={slot.startTime}
                  onValueChange={(value) =>
                    handleUpdateTimeSlot(slot.id, "startTime", value)
                  }
                  onOpenChange={(open) => {
                    // Ne pas sauvegarder automatiquement le startTime
                    // L'utilisateur doit d'abord remplir endTime
                  }}
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl ">
                    <SelectValue />
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
                  à
                </span>
                <Select
                  value={slot.endTime}
                  onValueChange={(value) =>
                    handleUpdateTimeSlot(slot.id, "endTime", value)
                  }
                  onOpenChange={(open) => {
                    if (!open && slot.startTime && slot.endTime) {
                      // Sauvegarder seulement si les deux heures sont remplies
                      setTimeout(() => {
                        handleSaveToServer();
                      }, 100);
                    }
                  }}
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue />
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => copyTimeSlot(slot)}
                >
                  <Link className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => handleRemoveTimeSlot(slot.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
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
            Ajouter une disponibilité
          </Button>
        </div>
      </Card>
    </div>
  );
}
