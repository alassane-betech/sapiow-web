import type { Call } from "@stream-io/video-react-sdk";
import { useCallback, useRef } from "react";

export const useDeviceCleanup = () => {
  const activeStreamsRef = useRef<MediaStream[]>([]);

  const registerStream = useCallback((stream: MediaStream) => {
    activeStreamsRef.current.push(stream);
  }, []);

  const cleanupDevices = useCallback(async (call?: Call | null) => {
    try {
      if (call) {
        try {
          await call.camera.disable();

          await call.microphone.disable();
        } catch (err) {
          console.warn(
            "⚠️ Erreur lors de la désactivation via Stream API:",
            err
          );
        }
      }

      activeStreamsRef.current.forEach((stream) => {
        stream.getTracks().forEach((track) => {
          if (track.readyState === "live") {
            track.stop();
          }
        });
      });

      activeStreamsRef.current = [];

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const constraints = { video: true, audio: true };

          navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
              stream.getTracks().forEach((track) => {
                track.stop();
              });
            })
            .catch(() => {});

          if ((window as any).stream) {
            (window as any).stream
              .getTracks()
              .forEach((track: MediaStreamTrack) => track.stop());
            (window as any).stream = null;
          }
        } catch (err) {
          console.warn("⚠️ Erreur lors du nettoyage agressif:", err);
        }
      }

      try {
        if (window.gc) {
          window.gc();
        }
      } catch (err) {
        console.warn("⚠️ Erreur lors du nettoyage agressif:", err);
      }

      console.log("✅ Nettoyage des périphériques terminé");
    } catch (err) {
      console.error("❌ Erreur lors du nettoyage des périphériques:", err);
    }
  }, []);

  const forceStopAllTracks = useCallback(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        })
        .catch(() => {
          console.log("ℹ️ Aucun nouveau flux à arrêter");
        });
    } catch (err) {
      console.warn("Erreur lors de l'arrêt forcé des flux:", err);
    }
  }, []);

  return {
    registerStream,
    cleanupDevices,
    forceStopAllTracks,
  };
};
