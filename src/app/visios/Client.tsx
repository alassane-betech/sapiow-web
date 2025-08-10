"use client";
import { UpcomingVideoCall } from "@/components/common/DarkSessionCard";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { SessionDetailSheet } from "@/components/visios/SessionDetailSheet";
import { useState } from "react";

interface SessionData {
  professionalName: string;
  professionalTitle: string;
  profileImage: string;
  sessionType: string;
  duration: string;
  date: string;
  time: string;
}

export default function Client() {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null
  );

  const handleViewDetails = (sessionData: SessionData) => {
    setSelectedSession(sessionData);
  };

  const handleCloseDetails = () => {
    setSelectedSession(null);
  };
  return (
    <div>
      <HeaderClient text="Mes visioconférences" />
      <div className="w-full my-4 px-5 pb-10">
        <h2 className="mb-3">Visio à venir</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide ">
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="dark"
            className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="dark"
            className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="dark"
            className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="dark"
            className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
          />
        </div>
        <h2 className="mb-3 mt-3">Prochaines visios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
          <UpcomingVideoCall
            date="Lun, 11 juin 2025"
            duration="30"
            profileImage="/assets/icons/pro1.png"
            name="Jean-Pierre Fauch"
            title="Entrepreneur"
            onViewDetails={() =>
              handleViewDetails({
                professionalName: "Jean-Pierre Fauch",
                professionalTitle: "Entrepreneur",
                profileImage: "/assets/icons/pro1.png",
                sessionType: "Session rapide visio",
                duration: "30 minutes",
                date: "Lundi, 11 juin 2025",
                time: "9h - 10h",
              })
            }
            variant="light"
            className="w-full h-[184px]"
          />
        </div>
      </div>

      {/* Sheet modal de détails de session */}
      <SessionDetailSheet
        session={selectedSession}
        isOpen={!!selectedSession}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
