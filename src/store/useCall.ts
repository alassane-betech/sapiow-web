import { StreamUserResponse } from "@/types/call";
import { create } from "zustand";

interface CallStore {
  callData: StreamUserResponse | null;
  isVideoCallActive: boolean;
  isVideoCallOpen: boolean;
  appointmentId: string | null;
  callCreatorName: string | null; // Nom du patient/créateur de l'appel
  setCallData: (data: StreamUserResponse) => void;
  setIsVideoCallActive: (active: boolean) => void;
  setIsVideoCallOpen: (open: boolean) => void;
  setAppointmentId: (appointmentId: string | null) => void;
  setCallCreatorName: (name: string | null) => void;
}

export const useCallStore = create<CallStore>((set) => ({
  callData: null,
  isVideoCallActive: false,
  isVideoCallOpen: false,
  appointmentId: null,
  callCreatorName: null,
  setCallData: (data) => set({ callData: data }),
  setIsVideoCallActive: (active) => set({ isVideoCallActive: active }),
  setIsVideoCallOpen: (open) => set({ isVideoCallOpen: open }),
  setAppointmentId: (appointmentId) => set({ appointmentId }),
  setCallCreatorName: (name) => set({ callCreatorName: name }),
}));
