"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const CONTROLS_HIDE_TIMEOUT = 3000;

interface UseCallControlsReturn {
  showControls: boolean;
  isFullscreen: boolean;
  handleMouseMove: () => void;
  toggleFullscreen: () => void;
}

export const useCallControls = (): UseCallControlsReturn => {
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Référence pour le timeout des contrôles
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Gestionnaire de mouvement de souris mémoïsé
  const handleMouseMove = useCallback(() => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, CONTROLS_HIDE_TIMEOUT);
  }, []);

  // Gestionnaire de plein écran mémoïsé
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return {
    showControls,
    isFullscreen,
    handleMouseMove,
    toggleFullscreen,
  };
};
