import { StreamUserResponse } from "@/types/call";
import { create } from "zustand";

interface CallStore {
  callData: StreamUserResponse | null;
  isVideoCallActive: boolean;
  setCallData: (data: StreamUserResponse) => void;
  setIsVideoCallActive: (active: boolean) => void;
  setIsVideoCallOpen: (open: boolean) => void;
  isVideoCallOpen: boolean;
}

export const useCallStore = create<CallStore>((set) => ({
  callData: null,
  isVideoCallActive: false,
  setCallData: (data) => set({ callData: data }),
  setIsVideoCallActive: (active) => set({ isVideoCallActive: active }),
  setIsVideoCallOpen: (open) => set({ isVideoCallOpen: open }),
  isVideoCallOpen: false,
}));
