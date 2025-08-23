import { authUtils } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (token: string, refreshToken: string, userId: string) => void;
  logout: () => void;
}

/**
 * Hook pour gérer l'état d'authentification
 */
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = authUtils.getAccessToken();
    const user = authUtils.getUserId();
    
    if (token && user) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserId(user);
    } else {
      setIsAuthenticated(false);
      setAccessToken(null);
      setUserId(null);
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string, refreshToken: string, userId: string) => {
    authUtils.setTokens(token, refreshToken, userId);
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserId(userId);
  };

  const logout = () => {
    authUtils.clearTokens();
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserId(null);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    accessToken,
    userId,
    login,
    logout,
  };
};
