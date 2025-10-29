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

const API_KEY = "5y5va6wjvxgf";
console.log("API_KEY", API_KEY);

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

    // Utiliser uniquement les données du store (API) ou les variables d'environnement
    const token = streamUser?.token;
    const userId = streamUser?.user?.id;
    const callId = streamUser?.appointmentId;
    const userName = streamUser?.user?.name;

    return {
      token,
      userId,
      callId,
      user: {
        id: userId || "!anon",
        name: userName || "User",
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

      // Validation du token JWT
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
      }

      const apiKey = API_KEY;

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
  }, [
    callConfig.token,
    callConfig.callId,
    call,
    cleanupAllDevices,
    client,
    initializeCall,
  ]);

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
