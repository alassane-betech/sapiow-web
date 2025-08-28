"use client";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useModeSwitch = () => {
  const [isExpertMode, setIsExpertMode] = useState(true);
  const { setUser } = useUserStore();
  const { data: customer } = useGetCustomer();
  const router = useRouter();

  // Fonction pour vérifier si les données client sont vides
  const checkIfCustomerEmpty = (data: any): boolean => {
    if (!data) return true;
    if (data.error === "Cannot coerce the result to a single JSON object") return true;
    if (Array.isArray(data) && data.length === 0) return true;
    if (data.data && Array.isArray(data.data) && data.data.length === 0) return true;
    if (data.success === false) return true;
    return false;
  };

  // Fonction pour gérer le changement de mode
  const handleModeSwitch = (checked: boolean) => {
    if (checked) {
      // Mode expert activé
      setIsExpertMode(true);
      setUser({ type: "expert" });
    } else {
      // Mode expert désactivé -> passer en mode client
      const isCustomerEmpty = checkIfCustomerEmpty(customer);
      
      if (isCustomerEmpty) {
        // Pas de profil client -> rediriger vers onboarding
        sessionStorage.setItem("fromModeSwitch", "true");
        router.push("/onboarding");
      } else {
        // Profil client existe -> passer en mode client
        setIsExpertMode(false);
        setUser({ type: "client" });
      }
    }
  };

  return {
    isExpertMode,
    handleModeSwitch,
  };
};
