import type { ProExpert } from "@/api/proExpert/useProExpert";
import { create } from "zustand";

interface ProExpertStore {
  proExpertData: ProExpert | null;
  isLoading: boolean;
  error: string | null;
  setProExpertData: (data: ProExpert | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProExpertStore = create<ProExpertStore>((set) => ({
  proExpertData: null,
  isLoading: false,
  error: null,
  setProExpertData: (data) => set({ proExpertData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
