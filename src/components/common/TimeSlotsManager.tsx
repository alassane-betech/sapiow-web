"use client";

import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProExpertStore } from "@/store/useProExpert";
import { useTimeSlotsStore } from "@/store/useTimeSlotsStore";
import { Link, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TimeSlotsManagerProps {
  selectedDate: Date | null;
}

export default function TimeSlotsManager({
  selectedDate,
}: TimeSlotsManagerProps) {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);

  // Store et API
  const {
    proExpertData,
    isLoading: isLoadingData,
    setProExpertData,
  } = useProExpertStore();

  const {
    isLoading,
    error,
    getTimeSlotsForDate,
    addTimeSlotLocal,
    updateTimeSlotLocal,
    saveSchedulesToServer,
    removeTimeSlot,
  } = useTimeSlotsStore();

  const updateProExpertMutation = useUpdateProExpert();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Générer les options d'heures (de 8h00 à 20h00 par tranches de 30 minutes)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      times.push(`${hour}h00`);
      if (hour < 20) {
        times.push(`${hour}h30`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Charger les créneaux depuis le store quand les données ou la date changent
  useEffect(() => {
    if (selectedDate && proExpertData?.schedules) {
      const slots = getTimeSlotsForDate(proExpertData.schedules, selectedDate);
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, proExpertData?.schedules, getTimeSlotsForDate]);

  const handleRemoveTimeSlot = async (slotId: string) => {
    if (!selectedDate || !proExpertData?.schedules) return;

    try {
      const updatedSchedules = await removeTimeSlot(
        proExpertData.schedules,
        selectedDate,
        slotId,
        async (updateData: any) => {
          const result = await updateProExpertMutation.mutateAsync(updateData);
          return result.data;
        }
      );

      // Mettre à jour le store principal
      setProExpertData({
        ...proExpertData,
        schedules: updatedSchedules,
      });
    } catch (error) {
      console.error("Error removing time slot:", error);
    }
  };

  // Mettre à jour localement sans sauvegarde
  const handleUpdateTimeSlot = (
    slotId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    if (!selectedDate || !proExpertData?.schedules) return;

    const updatedSchedules = updateTimeSlotLocal(
      proExpertData.schedules,
      selectedDate,
      slotId,
      field,
      value
    );

    // Mettre à jour le store principal localement
    setProExpertData({
      ...proExpertData,
      schedules: updatedSchedules,
    });
  };

  // Ajouter un nouveau créneau localement
  const handleAddTimeSlot = () => {
    if (!selectedDate || !proExpertData?.schedules) return;

    const result = addTimeSlotLocal(proExpertData.schedules, selectedDate);

    // Mettre à jour le store principal
    setProExpertData({
      ...proExpertData,
      schedules: result.schedules,
    });
  };

  // Sauvegarder sur le serveur avec debouncing pour éviter les doublons
  const handleSaveToServer = async () => {
    if (!proExpertData?.schedules) return;
    
    // Annuler le timeout précédent s'il existe
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Programmer la sauvegarde avec un délai
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveSchedulesToServer(
          proExpertData.schedules || [],
          async (updateData: any) => {
            const result = await updateProExpertMutation.mutateAsync(updateData);
            return result.data;
          }
        );
      } catch (error) {
        console.error("Error saving to server:", error);
      }
    }, 500); // Attendre 500ms avant de sauvegarder
  };

  // Nettoyer le timeout au démontage du composant
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const copyTimeSlot = (slot: any) => {
    const text = `${slot.startTime} à ${slot.endTime}`;
    navigator.clipboard.writeText(text);
  };

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
            {(isLoading ||
              isLoadingData ||
              updateProExpertMutation.isPending) && (
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
                    if (!open && slot.endTime) {
                      // Sauvegarder seulement si endTime est rempli
                      handleSaveToServer();
                    }
                  }}
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
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
                    if (!open) {
                      // Attendre un peu pour que la valeur soit mise à jour, puis sauvegarder
                      setTimeout(() => {
                        handleSaveToServer();
                      }, 100);
                    }
                  }}
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
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
