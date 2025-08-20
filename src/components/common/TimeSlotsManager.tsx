"use client";

import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import { useProExpertStore } from "@/store/useProExpert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApiSchedule,
  convertApiSchedulesToTimeSlots,
  convertTimeSlotsToApiSchedules,
  getDayOfWeekFromDate,
  UITimeSlot,
} from "@/types/schedule";
import { Link, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeSlotsManagerProps {
  selectedDate: Date | null;
}

export default function TimeSlotsManager({
  selectedDate,
}: TimeSlotsManagerProps) {
  const [timeSlots, setTimeSlots] = useState<UITimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store et API
  const { proExpertData, isLoading: isLoadingData, setProExpertData } = useProExpertStore();
  const updateProExpertMutation = useUpdateProExpert();

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

  // Charger les créneaux depuis l'API quand les données ou la date changent
  useEffect(() => {
    if (selectedDate) {
      const dayOfWeek = getDayOfWeekFromDate(selectedDate);
      
      if (proExpertData?.schedules) {
        const apiSchedules = proExpertData.schedules as ApiSchedule[];
        const dayTimeSlots = convertApiSchedulesToTimeSlots(
          apiSchedules,
          dayOfWeek
        );
        
        // Toujours définir les créneaux trouvés, même si c'est un tableau vide
        setTimeSlots(dayTimeSlots);
      } else {
        // Pas de données encore chargées, réinitialiser
        setTimeSlots([]);
      }
    } else {
      // Pas de date sélectionnée, réinitialiser
      setTimeSlots([]);
    }
  }, [proExpertData?.schedules, selectedDate]);

  const addTimeSlot = async () => {
    if (!selectedDate) return;

    const dayOfWeek = getDayOfWeekFromDate(selectedDate);
    const newSlot: UITimeSlot = {
      id: `${dayOfWeek}-${Date.now()}`,
      startTime: "9h00",
      endTime: "9h30",
    };
    
    // Si c'est le premier créneau du jour, on l'ajoute sans sauvegarder
    // Sinon on ajoute à la liste existante et on sauvegarde
    const updatedTimeSlots = timeSlots.length === 0 
      ? [newSlot] 
      : [...timeSlots, newSlot];
      
    setTimeSlots(updatedTimeSlots);

    // Sauvegarder automatiquement
    await saveSchedulesToAPI(updatedTimeSlots);
  };

  const removeTimeSlot = async (id: string) => {
    const updatedTimeSlots = timeSlots.filter((slot) => slot.id !== id);
    setTimeSlots(updatedTimeSlots);

    // Sauvegarder automatiquement
    await saveSchedulesToAPI(updatedTimeSlots);
  };

  // Sauvegarder les schedules vers l'API
  const saveSchedulesToAPI = async (updatedTimeSlots: UITimeSlot[]) => {
    if (!selectedDate || !proExpertData) return;

    try {
      setIsLoading(true);
      setError(null);

      const dayOfWeek = getDayOfWeekFromDate(selectedDate);

      // Convertir les créneaux actuels vers le format API
      const dayApiSchedules = convertTimeSlotsToApiSchedules(
        updatedTimeSlots,
        dayOfWeek
      );

      // Récupérer les schedules existants et filtrer les autres jours
      const existingSchedules =
        (proExpertData.schedules as ApiSchedule[]) || [];
      const otherDaysSchedules = existingSchedules.filter(
        (s) => s.day_of_week !== dayOfWeek
      );

      // Combiner avec les nouveaux schedules du jour courant
      const allSchedules = [...otherDaysSchedules, ...dayApiSchedules];

      // Sauvegarder via l'API
      const updatedData = await updateProExpertMutation.mutateAsync({
        schedules: allSchedules,
      });
      
      // Mettre à jour le store avec les nouvelles données
      if (updatedData && proExpertData) {
        setProExpertData({
          ...proExpertData,
          schedules: allSchedules
        });
      }
    } catch (err) {
      setError("Erreur lors de la sauvegarde des créneaux");
      console.error("Error saving schedules:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTimeSlot = async (
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updatedTimeSlots = timeSlots.map((slot) =>
      slot.id === id ? { ...slot, [field]: value } : slot
    );

    setTimeSlots(updatedTimeSlots);

    // Sauvegarder automatiquement
    await saveSchedulesToAPI(updatedTimeSlots);
  };

  const copyTimeSlot = (slot: UITimeSlot) => {
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

          {/* Message si aucun créneau */}
          {timeSlots.length === 0 && (
            <div className="text-center text-gray-600 py-4">
              Aucun créneau pour ce jour.
            </div>
          )}

          {/* Afficher les créneaux existants */}
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Select
                  value={slot.startTime}
                  onValueChange={(value) =>
                    updateTimeSlot(slot.id, "startTime", value)
                  }
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
                    updateTimeSlot(slot.id, "endTime", value)
                  }
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
                  onClick={() => removeTimeSlot(slot.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          ))}
          
          {/* Bouton pour ajouter une disponibilité - toujours visible */}
          <Button
            variant="ghost"
            onClick={addTimeSlot}
            className="w-full mt-6 py-4 sm:py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Ajouter une disponibilité
          </Button>
        </div>
      </Card>
    </div>
  );
}
