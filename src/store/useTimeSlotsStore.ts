import { create } from "zustand";
import { 
  ApiSchedule, 
  convertApiSchedulesToTimeSlots, 
  convertTimeSlotsToApiSchedules,
  getDayOfWeekFromDate,
  UITimeSlot 
} from "@/types/schedule";

interface TimeSlotsStore {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Actions pour les créneaux horaires
  getTimeSlotsForDate: (schedules: any[], date: Date) => UITimeSlot[];
  addTimeSlotLocal: (schedules: any[], date: Date) => { schedules: any[], newSlot: UITimeSlot };
  saveSchedulesToServer: (
    schedules: any[], 
    updateFunction: (data: { schedules: any[] }) => Promise<any>
  ) => Promise<any[]>;
  removeTimeSlot: (
    schedules: any[], 
    date: Date, 
    slotId: string, 
    updateFunction: (data: { schedules: any[] }) => Promise<any>
  ) => Promise<any[]>;
  updateTimeSlotLocal: (
    schedules: any[], 
    date: Date, 
    slotId: string, 
    field: "startTime" | "endTime", 
    value: string
  ) => any[];
}

export const useTimeSlotsStore = create<TimeSlotsStore>((set, get) => ({
  isLoading: false,
  error: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Récupérer les créneaux pour une date donnée
  getTimeSlotsForDate: (schedules: any[], date: Date): UITimeSlot[] => {
    if (!schedules) return [];
    
    const dayOfWeek = getDayOfWeekFromDate(date);
    const apiSchedules = schedules as ApiSchedule[];
    return convertApiSchedulesToTimeSlots(apiSchedules, dayOfWeek);
  },

  // Ajouter un nouveau créneau localement (sans sauvegarde)
  addTimeSlotLocal: (schedules: any[], date: Date): { schedules: any[], newSlot: UITimeSlot } => {
    const dayOfWeek = getDayOfWeekFromDate(date);
    const currentTimeSlots = get().getTimeSlotsForDate(schedules, date);
    
    const newSlot: UITimeSlot = {
      id: `${dayOfWeek}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startTime: "9h00",
      endTime: "", // Ne pas pré-remplir le endTime
    };

    const updatedTimeSlots = [...currentTimeSlots, newSlot];

    // Convertir vers le format API
    const dayApiSchedules = convertTimeSlotsToApiSchedules(updatedTimeSlots, dayOfWeek);

    // Récupérer les schedules existants et filtrer les autres jours
    const existingSchedules = (schedules as ApiSchedule[]) || [];
    const otherDaysSchedules = existingSchedules.filter(s => s.day_of_week !== dayOfWeek);
    
    // Combiner avec les nouveaux schedules
    const allSchedules = [...otherDaysSchedules, ...dayApiSchedules];

    return { schedules: allSchedules, newSlot };
  },

  // Sauvegarder les schedules sur le serveur
  saveSchedulesToServer: async (
    schedules: any[], 
    updateFunction: (data: { schedules: any[] }) => Promise<any>
  ): Promise<any[]> => {
    try {
      set({ isLoading: true, error: null });
      
      // Sauvegarder via l'API
      await updateFunction({ schedules });

      return schedules;
      
    } catch (error) {
      set({ error: "Erreur lors de la sauvegarde" });
      console.error("Error saving schedules:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Supprimer un créneau
  removeTimeSlot: async (
    schedules: any[], 
    date: Date, 
    slotId: string, 
    updateFunction: (data: { schedules: any[] }) => Promise<any>
  ): Promise<any[]> => {
    try {
      set({ isLoading: true, error: null });

      const dayOfWeek = getDayOfWeekFromDate(date);
      const currentTimeSlots = get().getTimeSlotsForDate(schedules, date);
      const updatedTimeSlots = currentTimeSlots.filter(slot => slot.id !== slotId);

      // Convertir vers le format API
      const dayApiSchedules = convertTimeSlotsToApiSchedules(updatedTimeSlots, dayOfWeek);

      // Récupérer les schedules existants et filtrer les autres jours
      const existingSchedules = (schedules as ApiSchedule[]) || [];
      const otherDaysSchedules = existingSchedules.filter(s => s.day_of_week !== dayOfWeek);
      
      // Combiner avec les nouveaux schedules
      const allSchedules = [...otherDaysSchedules, ...dayApiSchedules];

      // Sauvegarder via l'API
      await updateFunction({ schedules: allSchedules });

      return allSchedules;
      
    } catch (error) {
      set({ error: "Erreur lors de la suppression du créneau" });
      console.error("Error removing time slot:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Mettre à jour un créneau localement (sans sauvegarde)
  updateTimeSlotLocal: (
    schedules: any[], 
    date: Date, 
    slotId: string, 
    field: "startTime" | "endTime", 
    value: string
  ): any[] => {
    const dayOfWeek = getDayOfWeekFromDate(date);
    const currentTimeSlots = get().getTimeSlotsForDate(schedules, date);
    const updatedTimeSlots = currentTimeSlots.map(slot =>
      slot.id === slotId ? { ...slot, [field]: value } : slot
    );

    // Convertir vers le format API
    const dayApiSchedules = convertTimeSlotsToApiSchedules(updatedTimeSlots, dayOfWeek);

    // Récupérer les schedules existants et filtrer les autres jours
    const existingSchedules = (schedules as ApiSchedule[]) || [];
    const otherDaysSchedules = existingSchedules.filter(s => s.day_of_week !== dayOfWeek);
    
    // Combiner avec les nouveaux schedules
    const allSchedules = [...otherDaysSchedules, ...dayApiSchedules];

    return allSchedules;
  },
}));
