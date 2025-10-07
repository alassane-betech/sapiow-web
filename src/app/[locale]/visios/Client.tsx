"use client";
import { useGetPatientAppointmentsById } from "@/api/appointments/useAppointments";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { UpcomingVideoCall } from "@/components/common/DarkSessionCard";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { SessionDetailSheet } from "@/components/visios/SessionDetailSheet";
import { useCallStore } from "@/store/useCall";
import {
  filterAndSortAppointments,
  transformAppointmentToSessionData,
  type ApiAppointment,
  type SessionData,
} from "@/utils/appointmentUtils";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import VideoConsultation from "../VideoCall/video-consultation";

export default function Client() {
  const t = useTranslations();
  const { setAppointmentId } = useCallStore();
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(
    null
  );

  const { isVideoCallOpen, setIsVideoCallOpen } = useCallStore();

  const handleViewDetails = (sessionData: SessionData) => {
    setSelectedSession(sessionData);
  };

  const handleCloseDetails = () => {
    setSelectedSession(null);
  };

  const handleStartVideoCall = (appointmentId: string) => {
    setAppointmentId(appointmentId);
    setIsVideoCallOpen(true);
    setSelectedSession(null); // Fermer le sheet modal
  };

  const { data: customer } = useGetCustomer();

  const { data: appointments, isLoading: isLoadingAppointments, refetch } =
    useGetPatientAppointmentsById(customer?.id || "");

  // Écouteur d'événement pour l'annulation de rendez-vous
  useEffect(() => {
    const handleAppointmentCancelled = () => {
      // Rafraîchir les données après l'annulation
      refetch();
    };

    window.addEventListener('appointment-cancelled', handleAppointmentCancelled);
    
    return () => {
      window.removeEventListener('appointment-cancelled', handleAppointmentCancelled);
    };
  }, [refetch]);

  // Transformation et filtrage des données
  const { upcomingConfirmed, otherUpcoming } = useMemo(() => {
    if (!appointments) return { upcomingConfirmed: [], otherUpcoming: [] };
    return filterAndSortAppointments(appointments as ApiAppointment[]);
  }, [appointments]);

  const otherSessionsData = useMemo(
    () => otherUpcoming.map((apt) => transformAppointmentToSessionData(apt)),
    [otherUpcoming]
  );

  if (isLoadingAppointments) {
    return (
      <div>
        <HeaderClient text={t("visios.myVideoConferences")} />
        <div className="w-full my-4 px-5 pb-10">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">
              {t("visios.loadingVideoConferences")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      {isVideoCallOpen ? (
        <HeaderClient text={t("visios.sessionInProgress")} />
      ) : (
        <HeaderClient text={t("visios.myVideoConferences")} />
      )}

      {/* Contenu principal */}
      {isVideoCallOpen ? (
        <VideoConsultation
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
        />
      ) : (
        <div className="w-full my-4 px-5 pb-10">
          {/* Section Visio à venir */}
          <h2 className="mb-3">{t("visios.upcomingVideo")}</h2>
          {upcomingConfirmed.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {upcomingConfirmed.map((appointment: ApiAppointment) => {
                const sessionData =
                  transformAppointmentToSessionData(appointment);
                return (
                  <UpcomingVideoCall
                    key={appointment.id}
                    date={sessionData.date}
                    appointmentAt={appointment.appointment_at}
                    profileImage={sessionData.profileImage}
                    name={sessionData.professionalName}
                    title={sessionData.professionalTitle}
                    onViewDetails={() => handleViewDetails(sessionData)}
                    variant="dark"
                    className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
              <p className="text-gray-500">{t("visios.noConfirmedUpcoming")}</p>
            </div>
          )}

          {/* Section Prochaines visios */}
          <h2 className="mb-3 mt-6">{t("visios.nextVideos")}</h2>
          {otherSessionsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {otherUpcoming.map((appointment: ApiAppointment) => {
                const sessionData =
                  transformAppointmentToSessionData(appointment);
                return (
                  <UpcomingVideoCall
                    key={appointment.id}
                    date={sessionData.date}
                    appointmentAt={appointment.appointment_at}
                    profileImage={sessionData.profileImage}
                    name={sessionData.professionalName}
                    title={sessionData.professionalTitle}
                    onViewDetails={() => handleViewDetails(sessionData)}
                    variant="light"
                    className="w-full h-[184px]"
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg mb-10">
              <p className="text-gray-500">{t("visios.noOtherScheduled")}</p>
            </div>
          )}
        </div>
      )}

      {/* Sheet modal de détails de session */}
      <SessionDetailSheet
        session={selectedSession}
        isOpen={!!selectedSession}
        onClose={handleCloseDetails}
        onStartVideoCall={handleStartVideoCall}
      />
    </div>
  );
}
