/**
 * Utilitaires pour gérer l'authentification via localStorage
 */

export const authUtils = {
  /**
   * Stocker les tokens d'authentification
   */
  setTokens: (access_token: string, refreshToken: string, userId: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_id", userId);
  },

  /**
   * Récupérer le token d'accès
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  /**
   * Récupérer le token de rafraîchissement
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refresh_token");
  },

  /**
   * Récupérer l'ID utilisateur
   */
  getUserId: (): string | null => {
    return localStorage.getItem("user_id");
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },

  /**
   * Nettoyer tous les tokens (déconnexion)
   */
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
  },

  /**
   * Récupérer les headers d'authentification pour les requêtes API
   */
  getAuthHeaders: (): Record<string, string> => {
    const access_token = authUtils.getAccessToken();
    return access_token ? { Authorization: `Bearer ${access_token}` } : {};
  },
};
