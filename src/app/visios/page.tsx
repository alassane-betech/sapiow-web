"use client";
import VideoConsultation from "@/app/VideoCall/video-consultation";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useState } from "react";
import Client from "./Client";

export default function Visios() {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  const handleNotificationClick = () => {
    console.log("Notifications cliquées");
  };

  const handleStartVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full flex-1 container">
        <Client />
        {/* <Expert
          handleNotificationClick={handleNotificationClick}
          handleStartVideoCall={handleStartVideoCall}
        /> */}
      </div>

      <VideoConsultation
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
      />
      {/* Modal de consultation vidéo */}
    </div>
  );
}
