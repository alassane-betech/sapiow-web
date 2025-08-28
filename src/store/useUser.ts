import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
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
