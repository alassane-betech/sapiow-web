"use client";
import { Header } from "@/components/layout/header/Header";
import { HeaderVisio } from "@/components/layout/header/HeaderVisio";
import { VisiosTabs } from "@/components/visios/VisiosTabs";
import { useCallStore } from "@/store/useCall";
import VideoConsultation from "../VideoCall/video-consultation";

interface ExpertProps {
  handleNotificationClick: () => void;
}

export default function Expert({ handleNotificationClick }: ExpertProps) {
  const { isVideoCallOpen, setIsVideoCallOpen, appointmentId, callCreatorName, setCallCreatorName } = useCallStore();

  const handleStartVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  const handleCloseVideoCall = () => {
    setIsVideoCallOpen(false);
    // Nettoyer le nom du patient quand l'appel est terminé
    setCallCreatorName(null);
  };
  console.log(appointmentId);
  return (
    <div>
      {/* Header Visio */}
      {isVideoCallOpen ? (
        <HeaderVisio
          handleNotificationClick={handleNotificationClick}
          title={callCreatorName ? `Session avec ${callCreatorName}` : "Session en cours"}
        />
      ) : (
        <Header isBorder />
      )}

      {/* Onglets des visios */}
      {isVideoCallOpen ? (
        <VideoConsultation
          isOpen={isVideoCallOpen}
          onClose={handleCloseVideoCall}
        />
      ) : (
        <VisiosTabs onStartVideoCall={handleStartVideoCall} />
      )}
    </div>
  );
}
