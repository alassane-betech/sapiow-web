"use client";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useCallStore } from "@/store/useCall";
import { useUserStore } from "@/store/useUser";
import Client from "./Client";
import Expert from "./Expert";

export default function Visios() {
  const handleNotificationClick = () => {
    console.log("Notifications cliquées");
  };
  const { isVideoCallOpen } = useCallStore();
  const { user } = useUserStore();
  return (
    <div className="flex">
      <AppSidebar hideMobileNav={isVideoCallOpen} />
      <div className="w-full flex-1 container pb-10">
        {/* <Client /> */}
        {user.type === "client" ? (
          <Client />
        ) : (
          <Expert handleNotificationClick={handleNotificationClick} />
        )}
      </div>

      {/* Modal de consultation vidéo */}
    </div>
  );
}
