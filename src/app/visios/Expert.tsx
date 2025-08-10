"use client";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { HeaderVisio } from "@/components/layout/header/HeaderVisio";
import { VisiosTabs } from "@/components/visios/VisiosTabs";
import { useCallStore } from "@/store/useCall";
import VideoConsultation from "../VideoCall/video-consultation";

interface ExpertProps {
  handleNotificationClick: () => void;
}

export default function Expert({ handleNotificationClick }: ExpertProps) {
  const { isVideoCallOpen, setIsVideoCallOpen } = useCallStore();

  const handleStartVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  return (
    <div>
      {/* Header Visio */}
      {isVideoCallOpen ? (
        <HeaderVisio
          handleNotificationClick={handleNotificationClick}
          title="Session avec Moussa Diagne"
        />
      ) : (
        <HeaderClient />
      )}

      {/* Onglets des visios */}
      {isVideoCallOpen ? (
        <VideoConsultation
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
        />
      ) : (
        <VisiosTabs onStartVideoCall={handleStartVideoCall} />
      )}
    </div>
  );
}
