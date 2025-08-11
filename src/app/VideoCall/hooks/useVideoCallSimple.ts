"use client";
import { useCallStore } from "@/store/useCall";
import { StreamUserResponse } from "@/types/call";
import {
  StreamVideoClient,
  type Call,
  type User,
} from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaCleanup } from "./useMediaCleanup";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// Données de test pour développement sans backend
const MOCK_DATA = {
  API_KEY: "mmhfdzb5evj2", // Clé API Stream de test publique
  TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0x1eHVyaW91c19TYW5kd2ljaCIsInVzZXJfaWQiOiJMdXh1cmlvdXNfU2FuZHdpY2giLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc1NDM0MDQ1NCwiZXhwIjoxNzU0OTQ1MjU0fQ.Rrq32NkywVL7u--Z38Km_OgBaqk6YquKPJc6o3q_Jwg", // Token JWT de test
  USER_ID: "Luxurious_Sandwich",
  CALL_ID: "hhKzhYQZ4BiKL58OEN39w",
  USER_NAME: "Dr. Sarah Martin",
};

interface UseVideoCallReturn {
  client: StreamVideoClient | null;
  call: Call | null;
  error: string | null;
  isConnecting: boolean;
  isEndingCall: boolean;
  initializeCall: () => Promise<void>;
  endCall: () => Promise<void>;
  handleRetry: () => void;
}

export const useVideoCallSimple = (): UseVideoCallReturn => {
  const { callData, setCallData, setIsVideoCallActive } = useCallStore();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEndingCall, setIsEndingCall] = useState(false);

  const { cleanupAllDevices } = useMediaCleanup();

  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);

  const callConfig = useMemo(() => {
    // Utiliser proStreamUser ou patientStreamUser selon ce qui est disponible
    const streamUser = callData?.proStreamUser || callData?.patientStreamUser;

    // Utiliser les données du store si disponibles, sinon les variables d'environnement, sinon les données de test
    const token =
      streamUser?.token ||
      process.env.NEXT_PUBLIC_STREAM_TOKEN ||
      MOCK_DATA.TOKEN;
    const userId =
      streamUser?.user?.id ||
      process.env.NEXT_PUBLIC_STREAM_USER_ID ||
      MOCK_DATA.USER_ID;
    const callId =
      streamUser?.appointmentId ||
      process.env.NEXT_PUBLIC_STREAM_CALL_ID ||
      MOCK_DATA.CALL_ID;
    const userName =
      streamUser?.user?.name ||
      process.env.NEXT_PUBLIC_STREAM_USER_NAME ||
      MOCK_DATA.USER_NAME;

    return {
      token,
      userId,
      callId,
      user: {
        id: userId || "!anon",
        name: userName,
      } as User,
    };
  }, [callData]);

  const initializeCall = useCallback(async () => {
    if (isConnecting || hasInitializedRef.current) {
      console.log("🔄 Initialisation déjà en cours ou terminée");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      hasInitializedRef.current = true;

      const { token, callId, user } = callConfig;

      if (!token || !callId) {
        throw new Error("Token ou ID d'appel manquant");
      }

      // Validation du token JWT uniquement s'il ne s'agit pas du token de test
      if (token !== MOCK_DATA.TOKEN) {
        try {
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (tokenPayload.exp < currentTime) {
            throw new Error(
              "Le token JWT a expiré. Veuillez générer un nouveau token."
            );
          }
        } catch (tokenErr) {
          console.warn("⚠️ Erreur de validation du token:", tokenErr);
          // Continuer avec le token de test si la validation échoue
        }
      }

      const apiKey = API_KEY || MOCK_DATA.API_KEY;

      if (!apiKey) {
        throw new Error("Clé API Stream manquante");
      }

      const videoClient = new StreamVideoClient({
        apiKey,
        user,
        token,
      });

      const videoCall = videoClient.call("default", callId);

      await videoCall.join({ create: true });

      setClient(videoClient);
      setCall(videoCall);

      console.log("✅ Connexion réussie à l'appel");
    } catch (err: any) {
      console.error("❌ Erreur de connexion:", err);
      setError(err.message || "Erreur de connexion à l'appel vidéo");
      hasInitializedRef.current = false;
    } finally {
      setIsConnecting(false);
    }
  }, [callConfig, isConnecting]);

  const endCall = useCallback(async () => {
    if (isEndingCall) return;

    try {
      setIsEndingCall(true);
      console.log("🔚 Début de la fin d'appel...");

      if (call) {
        await cleanupAllDevices(call);
      }

      if (call) {
        try {
          await call.camera.disable();
          await call.microphone.disable();
          console.log("✅ Périphériques désactivés");

          if (call.state.callingState !== "left") {
            await call.leave();
          }
        } catch (callErr) {
          console.warn("⚠️ Erreur lors de la gestion de l'appel:", callErr);
        }

        setCallData({
          patientStreamUser: undefined,
          proStreamUser: undefined,
        } as StreamUserResponse);
      }

      if (client) {
        try {
          await client.disconnectUser();
        } catch (clientErr) {
          // Ignore les erreurs de déconnexion au démontage
        }

        setCallData({} as StreamUserResponse);
      }

      setClient(null);
      setCall(null);
      setIsVideoCallActive(false);
      hasInitializedRef.current = false;
    } catch (err: any) {
      setError("Erreur lors de la fin de l'appel: " + err.message);
    } finally {
      setIsEndingCall(false);
    }
  }, [
    call,
    client,
    isEndingCall,
    setCallData,
    setIsVideoCallActive,
    cleanupAllDevices,
  ]);

  // Fonction de retry
  const handleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    hasInitializedRef.current = false;
    setError(null);

    retryTimeoutRef.current = setTimeout(() => {
      initializeCall();
    }, 100);
  }, [initializeCall]);

  // Effet d'initialisation simple
  useEffect(() => {
    if (callConfig.token && callConfig.callId && !hasInitializedRef.current) {
      initializeCall();
    }

    // Nettoyage au démontage
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      // Nettoyage simple au démontage
      if (call || client) {
        console.log("🧹 Nettoyage au démontage du composant");

        if (call) {
          cleanupAllDevices(call).catch(console.warn);
          call.leave().catch(() => {
            // Ignore les erreurs de déconnexion au démontage
          });
        }

        if (client) {
          client.disconnectUser().catch(() => {
            // Ignore les erreurs de déconnexion au démontage
          });
        }
      }
    };
  }, [callConfig.token, callConfig.callId, call, cleanupAllDevices, client, initializeCall]);

  return {
    client,
    call,
    error,
    isConnecting,
    isEndingCall,
    initializeCall,
    endCall,
    handleRetry,
  };
};
