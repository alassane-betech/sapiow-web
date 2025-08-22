"use client";
import {
  useGetProAppointments,
  useUpdateProAppointment,
} from "@/api/appointments/useAppointments";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import CustomCalendar from "../common/CustomCalendar";
import { SessionCard } from "../common/SessionCard";

interface VisiosTabsProps {
  onStartVideoCall?: () => void;
}

export const VisiosTabs: React.FC<VisiosTabsProps> = ({ onStartVideoCall }) => {
  const { data: proExpert } = useGetProExpert();
  const { data: appointments } = useGetProAppointments(proExpert?.id);
  const { mutateAsync: updateProAppointment } = useUpdateProAppointment();
  const [loadingStates, setLoadingStates] = useState<
    Record<string, "confirming" | "cancelling" | null>
  >({});

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: "confirming" }));
      await updateProAppointment({
        appointmentId,
        updateData: {
          status: "confirmed",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la confirmation:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: null }));
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: "cancelling" }));
      await updateProAppointment({
        appointmentId,
        updateData: {
          status: "cancelled",
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: null }));
    }
  };

  // Organiser les appointments par statut
  const confirmedAppointments = Array.isArray(appointments)
    ? appointments.filter((apt: any) => apt.status === "confirmed")
    : [];

  const pendingAppointments = Array.isArray(appointments)
    ? appointments.filter((apt: any) => apt.status === "pending")
    : [];

  const historicAppointments = Array.isArray(appointments)
    ? appointments.filter(
        (apt: any) => apt.status === "cancelled" || apt.status === "completed"
      )
    : [];
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 mt-3 px-4 pb-20">
      <Tabs defaultValue="a-venir" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b-2 border-light-blue-gray h-auto p-0 rounded-none relative">
          <TabsTrigger
            value="a-venir"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            A venir
          </TabsTrigger>
          <TabsTrigger
            value="en-attente"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            En attente
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </TabsTrigger>
          <TabsTrigger
            value="historique"
            className="relative px-4 py-4 text-lg font-bold text-slate-400 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none data-[state=active]:rounded-none hover:text-slate-900 transition-colors data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-[-3px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-slate-900"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="a-venir" className="mt-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
            {confirmedAppointments.length > 0 ? (
              confirmedAppointments.map((appointment: any) => {
                const appointmentDate = new Date(appointment.appointment_at);
                const today = new Date();
                const isToday =
                  appointmentDate.toDateString() === today.toDateString();
                const dateDisplay = isToday
                  ? "Aujourd'hui"
                  : appointmentDate.toLocaleDateString("fr-FR");
                const timeDisplay = appointmentDate.toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <SessionCard
                    key={appointment.id}
                    date={dateDisplay}
                    time={timeDisplay}
                    profileImage={
                      appointment.patient?.avatar || "/assets/prof.jpg"
                    }
                    name={
                      `${appointment.patient?.first_name || ""} ${
                        appointment.patient?.last_name || ""
                      }`.trim() || "Patient"
                    }
                    sessionDescription={appointment.session?.name || "Session"}
                    onAccept={onStartVideoCall}
                    onViewRequest={() => {}}
                    isComming={true}
                    duration="45mn"
                    classFooter="!flex-col"
                    textButton="Commencer la visio"
                    icon="/assets/icons/videocamera.svg"
                    isUpcoming={true}
                    questions={appointment.appointment_questions || []}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucune visio confirmée à venir
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="en-attente" className="mt-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
            {pendingAppointments.length > 0 ? (
              pendingAppointments.map((appointment: any) => {
                const appointmentDate = new Date(appointment.appointment_at);
                const today = new Date();
                const isToday =
                  appointmentDate.toDateString() === today.toDateString();
                const dateDisplay = isToday
                  ? "Aujourd'hui"
                  : appointmentDate.toLocaleDateString("fr-FR");
                const timeDisplay = appointmentDate.toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                const loadingState = loadingStates[appointment.id];

                return (
                  <SessionCard
                    key={appointment.id}
                    date={dateDisplay}
                    time={timeDisplay}
                    profileImage={
                      appointment.patient?.avatar || "/assets/prof.jpg"
                    }
                    name={
                      `${appointment.patient?.first_name || ""} ${
                        appointment.patient?.last_name || ""
                      }`.trim() || "Patient"
                    }
                    sessionDescription={appointment.session?.name || "Session"}
                    onAccept={() => handleConfirmAppointment(appointment.id)}
                    onCancel={() => handleCancelAppointment(appointment.id)}
                    onViewRequest={() => {}}
                    textButton="Accepter"
                    questions={appointment.appointment_questions || []}
                    loadingState={loadingState}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucune demande en attente
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="historique" className="mt-6">
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
            {historicAppointments.length > 0 ? (
              historicAppointments.map((appointment: any) => {
                const appointmentDate = new Date(appointment.appointment_at);
                const dateDisplay = appointmentDate.toLocaleDateString("fr-FR");
                const timeDisplay = appointmentDate.toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <SessionCard
                    key={appointment.id}
                    date={dateDisplay}
                    time={timeDisplay}
                    profileImage={
                      appointment.patient?.avatar || "/assets/prof.jpg"
                    }
                    name={
                      `${appointment.patient?.first_name || ""} ${
                        appointment.patient?.last_name || ""
                      }`.trim() || "Patient"
                    }
                    sessionDescription={appointment.session?.name || "Session"}
                    onViewRequest={() => {}}
                    textButton={
                      appointment.status === "cancelled" ? "Annulé" : "Terminé"
                    }
                    buttonStates={{ acceptDisabled: true, viewDisabled: false }}
                    isUpcoming={true}
                    questions={appointment.appointment_questions || []}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucun historique disponible
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <CustomCalendar className="hidden xl:block" />
    </div>
  );
};
