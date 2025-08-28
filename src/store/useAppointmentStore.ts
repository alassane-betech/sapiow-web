import { create } from "zustand";

type Appointment = {
  id: string;
  patient_id: string;
  pro_id: string;
  session_id: string;
  appointment_at: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type Payment = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
};

type AppointmentState = {
  appointment: Appointment | null;
  payment: Payment | null;
  setAppointmentData: (appointment: Appointment, payment: Payment) => void;
  clearAppointmentData: () => void;
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointment: null,
  payment: null,
  setAppointmentData: (appointment, payment) => set({ appointment, payment }),
  clearAppointmentData: () => set({ appointment: null, payment: null }),
}));
