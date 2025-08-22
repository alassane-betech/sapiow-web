"use client";
import {
  useGetProAppointments,
  useUpdateProAppointment,
} from "@/api/appointments/useAppointments";
import { useListExperts } from "@/api/listExpert/useListExpert";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useGetStatistics } from "@/api/statistics/useStatistics";
import { SessionCard } from "@/components/common/SessionCard";
import { StatsCard } from "@/components/common/StatsCard";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Expert() {
  const { data: expertList } = useListExperts();

  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [loadingStates, setLoadingStates] = useState<
    Record<string, "confirming" | "cancelling" | null>
  >({});
  const {
    mutateAsync: updateProAppointment,
    isPending: updateProAppointmentPending,
  } = useUpdateProAppointment();

  const handleStartVideoCall = (appointmentId: string) => {
    console.log(
      "🎬 Expert handleStartVideoCall - appointmentId:",
      appointmentId
    );
    console.log("🎬 Expert handleStartVideoCall - type:", typeof appointmentId);
    setSelectedAppointmentId(appointmentId);
    setIsVideoCallOpen(true);
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    setLoadingStates((prev) => ({ ...prev, [appointmentId]: "confirming" }));
    try {
      await updateProAppointment({
        appointmentId,
        updateData: {
          status: "confirmed",
        },
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: null }));
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    setLoadingStates((prev) => ({ ...prev, [appointmentId]: "cancelling" }));
    try {
      await updateProAppointment({
        appointmentId,
        updateData: {
          status: "cancelled",
        },
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [appointmentId]: null }));
    }
  };

  const { data: proExpert } = useGetProExpert();
  const { data: statistics } = useGetStatistics();
  const { data: appointments } = useGetProAppointments(proExpert?.id);

  return (
    <>
      <div>
        {" "}
        <div className="w-full flex gap-x-6 mt-5">
          <StatsCard
            title="Visios completées"
            value={statistics?.count ?? 0}
            className="w-full"
          />
          <StatsCard
            title="Résumer de gain"
            value={statistics?.totalPrice ?? 0}
            currency="€"
            className="w-full"
          />
        </div>
        <div className="lg:hidden w-[90%] mx-auto mt-5 bg-white rounded-[20px] border border-soft-ice-gray px-6">
          <div className="px-6 py-4 flex justify-center items-center gap-x-2">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Image
                src="/assets/icons/videorecord.svg"
                alt="search"
                width={26}
                height={26}
              />
              <span className="absolute top-1.5 right-0.5 pt-[1px] bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <p className="text-sm font-bold font-figtree text-cobalt-blue-500">
              Demandes en attente
            </p>
            <Link
              href="/home/requests"
              className="flex items-center gap-2 text-black font-figtree"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex w-full justify-between gap-2 mb-[10px] mt-[24px]">
          <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500">
            Demandes en attente
          </h1>
          <Link
            href="/home/requests"
            className="flex items-center gap-2 text-cobalt-blue font-figtree"
          >
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
          {Array.isArray(appointments) && appointments.length > 0 ? (
            appointments
              .filter((appointment: any) => appointment.status === "pending")
              .map((appointment: any) => {
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
                    onAccept={() => handleConfirmAppointment(appointment.id)}
                    onCancel={() => handleCancelAppointment(appointment.id)}
                    onViewRequest={() => {}}
                    isFlex1={true}
                    questions={appointment.appointment_questions || []}
                    loadingState={loadingStates[appointment.id] || null}
                  />
                );
              })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucune demande en attente
            </div>
          )}
        </div>
        <div className="w-full gap-2 mt-5">
          <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500 mb-[11px] mt-[19px]">
            Prochaine visio
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {Array.isArray(appointments) && appointments.length > 0 ? (
              appointments
                .filter(
                  (appointment: any) => appointment.status === "confirmed"
                )
                .map((appointment: any) => {
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
                  const sessionDuration =
                    appointment.session?.session_type || "30mn";

                  console.log("📋 Appointment data:", {
                    id: appointment.id,
                    idType: typeof appointment.id,
                    fullAppointment: appointment,
                  });
                  return (
                    <SessionCard
                      key={appointment.id}
                      date={dateDisplay}
                      time={timeDisplay}
                      profileImage={
                        appointment.patient?.avatar !== "undefined"
                          ? appointment.patient?.avatar
                          : "/assets/prof.jpg"
                      }
                      name={
                        `${appointment.patient?.first_name || ""} ${
                          appointment.patient?.last_name || ""
                        }`.trim() || "Patient"
                      }
                      sessionDescription={
                        appointment.session?.name || "Session"
                      }
                      onAccept={() => handleStartVideoCall(appointment.id)}
                      onViewRequest={() => {}}
                      isComming={true}
                      duration={sessionDuration}
                      classFooter="!flex-col"
                      textButton="Commencer la visio"
                      icon="/assets/icons/videocamera.svg"
                      questions={appointment.appointment_questions || []}
                    />
                  );
                })
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucune visio programmée
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
