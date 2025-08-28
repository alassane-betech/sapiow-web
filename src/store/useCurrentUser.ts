import { create } from "zustand";
import { useUserStore } from "./useUser";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { useEffect } from "react";

interface CurrentUserStore {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  isLoading: boolean;
  error: string | null;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  isLoading: false,
  error: null,
}));

// Hook personnalisé pour gérer automatiquement la récupération des données utilisateur
export const useCurrentUserData = () => {
  const { user } = useUserStore();
  const { currentUser, setCurrentUser } = useCurrentUser();
  
  // Hooks conditionnels basés sur le type d'utilisateur
  const { 
    data: proData, 
    isLoading: proLoading, 
    error: proError 
  } = useGetProExpert();
  
  const { 
    data: customerData, 
    isLoading: customerLoading, 
    error: customerError 
  } = useGetCustomer();

  useEffect(() => {
    if (user.type === "expert" && proData) {
      setCurrentUser({
        ...proData,
        userType: "expert"
      });
    } else if (user.type === "client" && customerData) {
      setCurrentUser({
        ...customerData,
        userType: "client"
      });
    }
  }, [user.type, proData, customerData, setCurrentUser]);

  // Déterminer l'état de chargement et d'erreur basé sur le type d'utilisateur
  const isLoading = user.type === "expert" ? proLoading : customerLoading;
  const error = user.type === "expert" ? proError : customerError;

  return {
    currentUser,
    isLoading,
    error,
    userType: user.type,
  };
};
