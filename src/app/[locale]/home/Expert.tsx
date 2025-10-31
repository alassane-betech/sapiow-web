"use client";
import {
  useGetProAppointments,
  useUpdateProAppointment,
} from "@/api/appointments/useAppointments";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useGetStatistics } from "@/api/statistics/useStatistics";
import { SessionCard } from "@/components/common/SessionCard";
import { StatsCard } from "@/components/common/StatsCard";
import { useTodayVisios } from "@/hooks/useTodayVisios";
import { useCallStore } from "@/store/useCall";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VideoConsultation from "../VideoCall/video-consultation";

export default function Expert() {
  const router = useRouter();
  const t = useTranslations();

  const { isVideoCallOpen, setIsVideoCallOpen, setAppointmentId } =
    useCallStore();
  const { todayVisiosCount, user } = useTodayVisios();

  const [loadingStates, setLoadingStates] = useState<
    Record<string, "confirming" | "cancelling" | null>
  >({});
  const {
    mutateAsync: updateProAppointment,
    isPending: updateProAppointmentPending,
  } = useUpdateProAppointment();

  const handleStartVideoCall = (appointmentId: string) => {
    setAppointmentId(appointmentId);
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

  const { data: proExpert, isLoading: proExpertLoading } = useGetProExpert();
  const { data: statistics, isLoading: statisticsLoading } = useGetStatistics();
  const { data: appointments } = useGetProAppointments(proExpert?.id);

  // Calculer le nombre de demandes en attente
  const pendingAppointments = Array.isArray(appointments)
    ? appointments.filter(
        (appointment: any) => appointment.status === "pending"
      )
    : [];
  const pendingCount = pendingAppointments.length;

  // Gestion du loading
  if (proExpertLoading || statisticsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-exford-blue"></div>
          <p className="mt-4 text-lg text-exford-blue">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Contenu principal */}
      {isVideoCallOpen ? (
        <VideoConsultation
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
        />
      ) : (
        <div>
          {" "}
          <div>
            <h1 className="text-xl font-semibold text-exford-blue font-figtree mt-5">
              {t("home.hello")}{" "}
              {user ? `${user.first_name} ${user.last_name}` : t("home.user")}
            </h1>
            <p className="text-sm font-medium text-exford-blue font-figtree">
              {t("home.youHave")} {todayVisiosCount}{" "}
              {todayVisiosCount > 1
                ? t("home.visiosTodayPlural")
                : t("home.visiosToday")}
            </p>
          </div>
          <div className="w-full flex gap-x-6 mt-5">
            <StatsCard
              title={t("home.completedVisios")}
              value={statistics?.count ?? 0}
              className="w-full"
            />
            <StatsCard
              title={t("home.earningsSummary")}
              value={statistics?.totalPrice ?? 0}
              currency="€"
              className="w-full"
            />
          </div>
          <div className="lg:hidden w-[90%] mx-auto mt-5 bg-white rounded-[20px] border border-soft-ice-gray px-6">
            <div className="px-6 py-4 flex justify-center items-center gap-x-2">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => router.push("/visios")}
              >
                <Image
                  src="/assets/icons/videorecord.svg"
                  alt="search"
                  width={26}
                  height={26}
                />
                <span className="absolute top-1.5 right-0.5 pt-[1px] bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              </button>
              <p className="text-sm font-bold font-figtree text-cobalt-blue-500">
                {t("home.pendingRequests")}
              </p>
              {pendingCount > 3 && (
                <Link
                  href="/visios"
                  className="flex items-center gap-2 text-black font-figtree"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="hidden lg:flex w-full justify-between gap-2 mb-[10px] mt-[24px]">
            <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500">
              {t("home.pendingRequests")}
            </h1>
            {pendingCount > 3 && (
              <Link
                href="/visios"
                className="flex items-center gap-2 text-cobalt-blue font-figtree"
              >
                {t("home.seeAll")} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
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
                    ? t("today")
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
                        }`.trim() || t("patient")
                      }
                      sessionDescription={
                        appointment.session?.name || t("session")
                      }
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
                {t("home.noPendingRequests")}
              </div>
            )}
          </div>
          <div className="w-full gap-2 mt-5">
            <h1 className="text-lg font-bold font-figtree text-cobalt-blue-500 mb-[11px] mt-[19px]">
              {t("home.nextVisio")}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments
                  .filter(
                    (appointment: any) => appointment.status === "confirmed"
                  )
                  .map((appointment: any) => {
                    const appointmentDate = new Date(
                      appointment.appointment_at
                    );
                    const today = new Date();
                    const isToday =
                      appointmentDate.toDateString() === today.toDateString();
                    const dateDisplay = isToday
                      ? t("today")
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
                          }`.trim() || t("patient")
                        }
                        sessionDescription={
                          appointment.session?.name || t("session")
                        }
                        onAccept={() => handleStartVideoCall(appointment.id)}
                        onViewRequest={() => {}}
                        isComming={true}
                        isUpcoming={true}
                        duration={sessionDuration}
                        classFooter="!flex-col"
                        textButton={t("visios.startVideo")}
                        icon="/assets/icons/videocamera.svg"
                        questions={appointment.appointment_questions || []}
                      />
                    );
                  })
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {t("home.noScheduledVisio")}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
