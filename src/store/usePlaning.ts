import { create } from "zustand";

interface PlaningStore {
  isPlaning: boolean;
  setIsPlaning: (planing: boolean) => void;
}

export const usePlaningStore = create<PlaningStore>((set) => ({
  isPlaning: false,
  setIsPlaning: (planing) => set({ isPlaning: planing }),
}));
