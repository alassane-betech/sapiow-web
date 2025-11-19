import { create } from "zustand";

interface ProfessionalInfo {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

interface ConversationStore {
  selectedConversation: string | null;
  selectedProfessional: ProfessionalInfo | null;
  setSelectedConversation: (conversationId: string | null) => void;
  setSelectedProfessional: (professional: ProfessionalInfo | null) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  selectedConversation: null,
  selectedProfessional: null,
  setSelectedConversation: (conversationId) =>
    set({ selectedConversation: conversationId }),
  setSelectedProfessional: (professional) =>
    set({ selectedProfessional: professional }),
}));
