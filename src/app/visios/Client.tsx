"use client";
import { useGetPatientAppointmentsById } from "@/api/appointments/useAppointments";
import { useGetCustomer } from "@/api/customer/useCustomer";
import { UpcomingVideoCall } from "@/components/common/DarkSessionCard";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { SessionDetailSheet } from "@/components/visios/SessionDetailSheet";
import { useState, useMemo } from "react";
import { 
  transformAppointmentToSessionData, 
  filterAndSortAppointments,
  type ApiAppointment,
  type SessionData 
} from "@/utils/appointmentUtils";

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

  const { data: customer } = useGetCustomer();

  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetPatientAppointmentsById(customer?.id || "");

  // Transformation et filtrage des données
  const { upcomingConfirmed, otherUpcoming } = useMemo(() => {
    if (!appointments) return { upcomingConfirmed: [], otherUpcoming: [] };
    return filterAndSortAppointments(appointments as ApiAppointment[]);
  }, [appointments]);

  const upcomingSessionsData = useMemo(() => 
    upcomingConfirmed.map(apt => transformAppointmentToSessionData(apt)),
    [upcomingConfirmed]
  );

  const otherSessionsData = useMemo(() => 
    otherUpcoming.map(apt => transformAppointmentToSessionData(apt)),
    [otherUpcoming]
  );

  if (isLoadingAppointments) {
    return (
      <div>
        <HeaderClient text="Mes visioconférences" />
        <div className="w-full my-4 px-5 pb-10">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Chargement de vos visioconférences...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeaderClient text="Mes visioconférences" />
      <div className="w-full my-4 px-5 pb-10">
        {/* Section Visio à venir */}
        <h2 className="mb-3">Visio à venir</h2>
        {upcomingSessionsData.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {upcomingSessionsData.map((session) => (
              <UpcomingVideoCall
                key={session.id}
                date={session.date}
                duration={session.duration.replace(' minutes', '')}
                profileImage={session.profileImage}
                name={session.professionalName}
                title={session.professionalTitle}
                onViewDetails={() => handleViewDetails(session)}
                variant="dark"
                className="w-full min-w-full md:min-w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:max-w-[324px] lg:min-w-[324px] h-[184px] border-none shadow-none"
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Aucune visioconférence confirmée à venir</p>
          </div>
        )}

        {/* Section Prochaines visios */}
        <h2 className="mb-3 mt-6">Prochaines visios</h2>
        {otherSessionsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {otherSessionsData.map((session) => (
              <UpcomingVideoCall
                key={session.id}
                date={session.date}
                duration={session.duration.replace(' minutes', '')}
                profileImage={session.profileImage}
                name={session.professionalName}
                title={session.professionalTitle}
                onViewDetails={() => handleViewDetails(session)}
                variant="light"
                className="w-full h-[184px]"
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg mb-10">
            <p className="text-gray-500">Aucune autre visioconférence programmée</p>
          </div>
        )}
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
