import { useCallback, useRef } from "react";
import { StreamVideoClient, type User } from "@stream-io/video-react-sdk";

interface UseStreamClientOptions {
  apiKey: string;
  user: User;
  token: string;
}

export const useStreamClient = () => {
  const clientRef = useRef<StreamVideoClient | null>(null);

  // Fonction pour obtenir ou créer une instance unique
  const getOrCreateClient = useCallback(
    ({ apiKey, user, token }: UseStreamClientOptions) => {
      // Si on a déjà un client, le réutiliser
      if (clientRef.current) {
        return clientRef.current;
      }

      // Créer un nouveau client
      const newClient = new StreamVideoClient({
        apiKey,
        user,
        token,
      });

      clientRef.current = newClient;
      return newClient;
    },
    []
  );

  // Fonction pour nettoyer le client
  const cleanupClient = useCallback(async () => {
    if (clientRef.current) {
      console.log("🧹 Nettoyage du client Stream...");
      try {
        await clientRef.current.disconnectUser();
        clientRef.current = null;
        console.log("✅ Client nettoyé");
      } catch (err) {
        console.warn("Erreur lors du nettoyage du client:", err);
      }
    }
  }, []);

  // Fonction pour obtenir le client actuel
  const getCurrentClient = useCallback(() => {
    return clientRef.current;
  }, []);

  return {
    getOrCreateClient,
    cleanupClient,
    getCurrentClient,
  };
};
