"use client";
import type { Call } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useRef } from "react";

// Interface pour étendre Window avec les propriétés média
declare global {
  interface Window {
    streamTracks?: MediaStreamTrack[];
  }
}

export const useMediaCleanup = () => {
  const activeTracksRef = useRef<MediaStreamTrack[]>([]);

  // Fonction pour enregistrer un track
  const registerTrack = useCallback((track: MediaStreamTrack) => {
    activeTracksRef.current.push(track);

    // Aussi l'enregistrer globalement pour un nettoyage plus robuste
    if (!window.streamTracks) {
      window.streamTracks = [];
    }
    window.streamTracks.push(track);
  }, []);

  // Fonction pour arrêter tous les tracks
  const stopAllTracks = useCallback(() => {
    console.log("🧹 Arrêt de tous les tracks média...");

    // 1. Arrêter les tracks enregistrés localement
    activeTracksRef.current.forEach((track, index) => {
      if (track.readyState === "live") {
        console.log(
          `🛑 Arrêt du track ${index}: ${track.kind} - ${track.label}`
        );
        track.stop();
      }
    });

    // 2. Arrêter les tracks globaux
    if (window.streamTracks) {
      window.streamTracks.forEach((track, index) => {
        if (track.readyState === "live") {
          console.log(
            `🛑 Arrêt du track global ${index}: ${track.kind} - ${track.label}`
          );
          track.stop();
        }
      });
      window.streamTracks = [];
    }

    // 3. Vider la liste locale
    activeTracksRef.current = [];

    console.log("✅ Tous les tracks ont été arrêtés");
  }, []);

  // Fonction pour nettoyer complètement les périphériques
  const cleanupAllDevices = useCallback(
    async (call?: Call | null) => {
      console.log("🧹 Début du nettoyage complet des périphériques...");

      try {
        // 1. Désactiver via l'API Stream
        if (call) {
          console.log("📹 Désactivation via Stream API...");
          try {
            await call.camera.disable();
            await call.microphone.disable();
            console.log("✅ Périphériques Stream désactivés");
          } catch (err) {
            console.warn("⚠️ Erreur Stream API:", err);
          }
        }

        // 2. Arrêter tous les tracks enregistrés
        stopAllTracks();

        // 3. Méthode agressive : obtenir et arrêter immédiatement tous les nouveaux flux
        console.log("🔍 Nettoyage agressif des flux média...");

        try {
          // Créer un flux temporaire pour forcer l'arrêt de tous les flux actifs
          const tempStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          console.log("🎯 Flux temporaire créé, arrêt immédiat...");
          tempStream.getTracks().forEach((track) => {
            console.log(`🛑 Arrêt immédiat: ${track.kind} - ${track.label}`);
            track.stop();
          });
        } catch (err) {
          console.log("ℹ️ Aucun nouveau flux à créer/arrêter");
        }

        // 4. Forcer le nettoyage du cache des périphériques
        try {
          // Réinitialiser les permissions si possible
          if (navigator.permissions) {
            const cameraPermission = await navigator.permissions.query({
              name: "camera" as PermissionName,
            });
            const micPermission = await navigator.permissions.query({
              name: "microphone" as PermissionName,
            });

            console.log(`📹 Permission caméra: ${cameraPermission.state}`);
            console.log(`🎤 Permission micro: ${micPermission.state}`);
          }
        } catch (err) {
          console.log("ℹ️ Impossible de vérifier les permissions");
        }

        console.log("✅ Nettoyage complet terminé");
      } catch (err) {
        console.error("❌ Erreur lors du nettoyage:", err);
      }
    },
    [stopAllTracks]
  );

  // Nettoyage automatique au démontage
  useEffect(() => {
    return () => {
      console.log("🧹 Nettoyage automatique au démontage...");
      stopAllTracks();
    };
  }, [stopAllTracks]);

  return {
    registerTrack,
    stopAllTracks,
    cleanupAllDevices,
  };
};
