import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import { useProExpertStore } from "@/store/useProExpert";
import { useTimeSlotsStore } from "@/store/useTimeSlotsStore";
import { useEffect, useRef, useState } from "react";

interface UseTimeSlotsManagerProps {
  selectedDate: Date | null;
}

export const useTimeSlotsManager = ({
  selectedDate,
}: UseTimeSlotsManagerProps) => {
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

  // Convertir une heure en nombre pour comparaison (ex: "9h30" -> 9.5)
  const timeToNumber = (time: string): number => {
    const [hour, minutes] = time.replace("h", ":").split(":");
    return parseInt(hour) + parseInt(minutes || "0") / 60;
  };

  // Générer les options de endTime filtrées selon startTime
  const getEndTimeOptions = (startTime: string): string[] => {
    if (!startTime) return generateTimeOptions();

    const startTimeNum = timeToNumber(startTime);
    return generateTimeOptions().filter((time) => {
      const timeNum = timeToNumber(time);
      return timeNum > startTimeNum;
    });
  };

  // Vérifier si une heure est déjà prise
  const isTimeSlotTaken = (time: string, currentSlotId?: string): boolean => {
    return timeSlots.some(
      (slot) =>
        slot.id !== currentSlotId &&
        (slot.startTime === time ||
          (slot.startTime &&
            slot.endTime &&
            timeToNumber(time) > timeToNumber(slot.startTime) &&
            timeToNumber(time) < timeToNumber(slot.endTime)))
    );
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
            const result = await updateProExpertMutation.mutateAsync(
              updateData
            );
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

  // États dérivés
  const isLoadingAny =
    isLoading || isLoadingData || updateProExpertMutation.isPending;

  return {
    // États
    timeSlots,
    timeOptions,
    isLoadingAny,
    error,

    // Fonctions utilitaires
    isTimeSlotTaken,
    getEndTimeOptions,
    copyTimeSlot,

    // Actions
    handleAddTimeSlot,
    handleUpdateTimeSlot,
    handleRemoveTimeSlot,
    handleSaveToServer,
  };
};
