"use client";
import VideoConsultation from "@/app/VideoCall/video-consultation";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useState } from "react";
import Client from "./Client";

export default function Home() {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <HeaderClient />
        <div className="w-full flex-1 container">
          {/* <Expert /> */}
          <Client />
        </div>
      </div>

      {/* Modal de consultation vidéo */}
      <VideoConsultation
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
      />
    </div>
  );
}
