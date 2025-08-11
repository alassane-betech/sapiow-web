import { create } from "zustand";
import { persist } from "zustand/middleware";

type userType = {
  type: "client" | "expert";
};

interface UserStore {
  user: userType;
  setUser: (user: userType) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: { type: "client" },
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // nom unique pour le localStorage
    }
  )
);
