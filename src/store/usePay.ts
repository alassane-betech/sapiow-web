import { create } from "zustand";

interface PayStore {
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
}

export const usePayStore = create<PayStore>((set) => ({
  isPaid: false,
  setIsPaid: (paid) => set({ isPaid: paid }),
}));
