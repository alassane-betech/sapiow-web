import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = "client" | "expert";

interface UseProtectedPageOptions {
  allowedUserTypes: UserType[];
  redirectTo?: string;
}

/**
 * Hook pour protéger une page selon le type d'utilisateur
 * Évite la redirection pendant le refresh/chargement initial
 * 
 * @example
 * // Dans une page réservée aux experts
 * useProtectedPage({ allowedUserTypes: ["expert"] });
 * 
 * @example
 * // Dans une page réservée aux clients
 * useProtectedPage({ allowedUserTypes: ["client"] });
 */
export const useProtectedPage = ({
  allowedUserTypes,
  redirectTo = "/compte/profile",
}: UseProtectedPageOptions) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Marquer comme initialisé après le premier render
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Ne rediriger que si l'app est initialisée (pas pendant le refresh)
    if (isInitialized && user && !allowedUserTypes.includes(user.type)) {
      router.push(redirectTo);
    }
  }, [user, isInitialized, router, allowedUserTypes, redirectTo]);

  return { user, isInitialized };
};
