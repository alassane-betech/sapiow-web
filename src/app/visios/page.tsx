"use client";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useCallStore } from "@/store/useCall";
import Client from "./Client";

export default function Visios() {
  const handleNotificationClick = () => {
    console.log("Notifications cliquées");
  };
  const { isVideoCallOpen } = useCallStore();
  return (
    <div className="flex">
      <AppSidebar hideMobileNav={isVideoCallOpen} />
      <div className="w-full flex-1 container pb-10">
        <Client />
        {/* <Expert handleNotificationClick={handleNotificationClick} /> */}
      </div>

      {/* Modal de consultation vidéo */}
    </div>
  );
}
