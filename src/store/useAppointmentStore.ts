import { create } from "zustand";

interface PaymentData {
  publishableKey: string;
  paymentIntent: string;
}

interface AppointmentStore {
  payment: PaymentData | null;
  setPayment: (payment: PaymentData) => void;
  clearPayment: () => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  payment: null,
  setPayment: (payment) => set({ payment }),
  clearPayment: () => set({ payment: null }),
}));
