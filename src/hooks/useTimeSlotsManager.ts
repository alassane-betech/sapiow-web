import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import {
  useCreateProAppointmentAllowDay,
  useGetProAppointmentAllowDays,
  useUpdateProAppointmentAllowDay,
  useDeleteProAppointmentAllowDay,
} from "@/api/appointments/useProAppointmentAllowDay";
import { useProExpertStore } from "@/store/useProExpert";
import { useTimeSlotsStore } from "@/store/useTimeSlotsStore";
import { getDayOfWeekFromDate } from "@/types/schedule";
import { useEffect, useRef, useState } from "react";

interface UseTimeSlotsManagerProps {
  selectedDate: Date | null;
  autoSave?: boolean; // Par défaut true pour compatibilité avec les usages existants
}

export const useTimeSlotsManager = ({
  selectedDate,
  autoSave = true, // Par défaut true pour ne pas casser les usages existants
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

  // Hooks pour les créneaux spécifiques (Allow Days)
  const { data: allowDays, isLoading: isLoadingAllowDays } =
    useGetProAppointmentAllowDays();
  const createAllowDayMutation = useCreateProAppointmentAllowDay();
  const updateAllowDayMutation = useUpdateProAppointmentAllowDay();
  const deleteAllowDayMutation = useDeleteProAppointmentAllowDay();

  // Générer les options d'heures (de 00h00 à 23h30 par tranches de 30 minutes)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour <= 23; hour++) {
      times.push(`${hour}h00`);
      if (hour < 23) {
        times.push(`${hour}h30`);
      }
    }
    times.push("23h30"); // Ajouter le dernier créneau
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
      // 1. Chercher d'abord les créneaux spécifiques (Allow Days) pour cette date
      const dateString = selectedDate.toISOString().split("T")[0];
      const specificSlots = allowDays?.filter((slot) => {
        const slotDate = new Date(slot.start_date).toISOString().split("T")[0];
        return slotDate === dateString;
      });

      // 2. Si créneaux spécifiques trouvés, les utiliser
      if (specificSlots && specificSlots.length > 0) {
        const formattedSlots = specificSlots.map((slot) => {
          // Extraire l'heure de la date ISO
          const startDate = new Date(slot.start_date);
          const endDate = new Date(slot.end_date);
          
          // Formater en "Xh00" ou "XhYY"
          const startHour = startDate.getUTCHours();
          const startMinute = startDate.getUTCMinutes();
          const endHour = endDate.getUTCHours();
          const endMinute = endDate.getUTCMinutes();
          
          const startTime = `${startHour}h${startMinute.toString().padStart(2, '0')}`;
          const endTime = `${endHour}h${endMinute.toString().padStart(2, '0')}`;
          
          return {
            id: `allow-${slot.id}`,
            startTime,
            endTime,
            type: "specific",
            allowDayId: slot.id, // Déjà un string
          };
        });
        setTimeSlots(formattedSlots);
        console.log("📅 Créneaux spécifiques chargés:", formattedSlots);
      } else {
        // 3. Sinon, utiliser les schedules récurrents
        const slots = getTimeSlotsForDate(proExpertData.schedules, selectedDate);
        setTimeSlots(slots.map((slot) => ({ ...slot, type: "recurring" })));
        console.log("🔄 Créneaux récurrents chargés:", slots);
      }
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, proExpertData?.schedules, allowDays, getTimeSlotsForDate]);

  const handleRemoveTimeSlot = async (slotId: string) => {
    if (!selectedDate || !proExpertData?.schedules) return;

    // Vérifier si c'est un créneau temporaire (pas encore sauvegardé)
    const isTempSlot = slotId.startsWith("temp-");
    
    if (isTempSlot) {
      // Supprimer localement uniquement (pas encore dans la BDD)
      console.log("🗑️ Suppression d'un créneau temporaire:", slotId);
      setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId));
      return;
    }

    // Vérifier si c'est un créneau spécifique (Allow Day)
    const isSpecificSlot = slotId.startsWith("allow-");

    if (isSpecificSlot) {
      // Supprimer un créneau spécifique via l'API Allow Days
      const allowDayId = slotId.replace("allow-", "");
      console.log("🗑️ Suppression d'un créneau spécifique:", allowDayId);
      
      try {
        await deleteAllowDayMutation.mutateAsync(allowDayId);
        console.log("✅ Créneau spécifique supprimé");
      } catch (error) {
        console.error("❌ Erreur lors de la suppression du créneau spécifique:", error);
      }
      return;
    }

    // Si c'est un créneau récurrent (Schedule)
    // Si autoSave est désactivé, supprimer localement uniquement
    if (!autoSave) {
      console.log("⏸️ Suppression locale uniquement (autoSave désactivé)");
      const dayOfWeek = getDayOfWeekFromDate(selectedDate);
      const currentTimeSlots = getTimeSlotsForDate(
        proExpertData.schedules,
        selectedDate
      );
      const updatedTimeSlots = currentTimeSlots.filter(
        (slot) => slot.id !== slotId
      );

      // Convertir vers le format API
      const { convertTimeSlotsToApiSchedules } = await import(
        "@/types/schedule"
      );
      const dayApiSchedules = convertTimeSlotsToApiSchedules(
        updatedTimeSlots,
        dayOfWeek
      );

      // Récupérer les schedules existants et filtrer les autres jours
      const otherDaysSchedules = proExpertData.schedules.filter(
        (s: any) => s.day_of_week !== dayOfWeek
      );

      // Combiner avec les nouveaux schedules
      const allSchedules = [...otherDaysSchedules, ...dayApiSchedules];

      // Mettre à jour le store principal localement
      setProExpertData({
        ...proExpertData,
        schedules: allSchedules,
      });
      return;
    }

    // Si autoSave est activé, supprimer et sauvegarder immédiatement
    try {
      console.log("💾 Suppression avec sauvegarde automatique");
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
    if (!selectedDate) return;

    // Récupérer le créneau AVANT modification
    const currentSlot = timeSlots.find((slot) => slot.id === slotId);
    const wasComplete =
      currentSlot && currentSlot.startTime && currentSlot.endTime;

    console.log("🔄 Mise à jour du créneau:", {
      slotId,
      field,
      oldValue: currentSlot?.[field],
      newValue: value,
      wasComplete,
      slotType: currentSlot?.type,
    });

    // Mettre à jour localement dans l'état
    const updatedSlots = timeSlots.map((slot) =>
      slot.id === slotId ? { ...slot, [field]: value } : slot
    );
    setTimeSlots(updatedSlots);

    // Vérifier si le créneau est maintenant complet
    const updatedSlot = updatedSlots.find((slot) => slot.id === slotId);
    const isNowComplete =
      updatedSlot && updatedSlot.startTime && updatedSlot.endTime;

    // Vérifier que startTime < endTime
    const isValid =
      isNowComplete &&
      timeToNumber(updatedSlot.startTime) < timeToNumber(updatedSlot.endTime);

    console.log("✅ État après mise à jour:", {
      isNowComplete,
      isValid,
      startTime: updatedSlot?.startTime,
      endTime: updatedSlot?.endTime,
      autoSave,
    });

    // Sauvegarder automatiquement si le créneau est complet et valide
    if (isValid && autoSave) {
      console.log("💾 Création d'un créneau spécifique (Allow Day)");
      handleSaveSpecificSlot(updatedSlot);
    } else if (isValid && !autoSave) {
      console.log(
        "⏸️ Sauvegarde automatique désactivée - changements en local uniquement"
      );
    }
  };

  // Sauvegarder un créneau spécifique (Allow Day)
  const handleSaveSpecificSlot = async (slot: any) => {
    if (!selectedDate || !slot.startTime || !slot.endTime) return;

    try {
      // Convertir les heures en format ISO
      const dateString = selectedDate.toISOString().split("T")[0];
      const startTime = slot.startTime.replace("h", ":");
      const endTime = slot.endTime.replace("h", ":");
      
      const startDate = `${dateString}T${startTime}:00Z`;
      const endDate = `${dateString}T${endTime}:00Z`;

      // Vérifier si c'est une mise à jour (allowDayId existe) ou une création
      if (slot.allowDayId) {
        // UPDATE - Le créneau existe déjà
        console.log("🔄 Mise à jour créneau spécifique:", { 
          id: slot.allowDayId, // Déjà un string
          startDate, 
          endDate 
        });
        
        const result = await updateAllowDayMutation.mutateAsync({
          id: slot.allowDayId, // Déjà un string
          start_date: startDate,
          end_date: endDate,
        });
        
        console.log("✅ Créneau spécifique mis à jour:", result);
      } else {
        // CREATE - Nouveau créneau
        console.log("📅 Création créneau spécifique:", { startDate, endDate });
        
        const result = await createAllowDayMutation.mutateAsync({
          start_date: startDate,
          end_date: endDate,
        });
        
        console.log("✅ Créneau spécifique créé:", result);
        
        // Mettre à jour le slot local avec l'ID retourné par l'API
        // La réponse peut être result.id ou result.data.id selon apiClient
        const newId = (result as any)?.id || (result as any)?.data?.id;
        
        if (newId) {
          const updatedSlots = timeSlots.map((s) =>
            s.id === slot.id
              ? {
                  ...s,
                  id: `allow-${newId}`,
                  allowDayId: newId,
                }
              : s
          );
          setTimeSlots(updatedSlots);
          console.log("🔄 Slot mis à jour avec l'ID:", newId);
        } else {
          console.warn("⚠️ Impossible de récupérer l'ID du créneau créé:", result);
        }
      }
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde du créneau spécifique:", error);
    }
  };

  // Ajouter un nouveau créneau localement
  const handleAddTimeSlot = () => {
    if (!selectedDate) return;

    // Trouver le dernier créneau pour suggérer une heure de début
    let suggestedStartTime = "9h00"; // Valeur par défaut
    let suggestedEndTime = "10h00";

    if (timeSlots.length > 0) {
      // Prendre l'heure de fin du dernier créneau comme heure de début suggérée
      const lastSlot = timeSlots[timeSlots.length - 1];
      if (lastSlot.endTime) {
        suggestedStartTime = lastSlot.endTime;
        
        // Calculer l'heure de fin suggérée (+1 heure)
        const endTimeNum = timeToNumber(suggestedStartTime) + 1;
        const endHour = Math.floor(endTimeNum);
        const endMinute = (endTimeNum % 1) * 60;
        suggestedEndTime = `${endHour}h${endMinute.toString().padStart(2, '0')}`;
      }
    }

    // Créer un nouveau créneau avec des valeurs par défaut
    const newSlot = {
      id: `temp-${Date.now()}`,
      startTime: suggestedStartTime,
      endTime: suggestedEndTime,
      type: "specific", // Toujours créer comme spécifique dans TimeSlotsManager
    };

    setTimeSlots([...timeSlots, newSlot]);
    console.log("➕ Nouveau créneau ajouté (type: specific):", {
      startTime: suggestedStartTime,
      endTime: suggestedEndTime,
    });
    
    // Note : La sauvegarde se fera automatiquement quand l'utilisateur modifie les heures via handleUpdateTimeSlot
  };

  // Wrapper pour la compatibilité (pas utilisé dans TimeSlotsManager mais gardé pour autres usages)
  const handleSaveToServer = async () => {
    console.log("⚠️ handleSaveToServer appelé - Non utilisé dans TimeSlotsManager");
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
