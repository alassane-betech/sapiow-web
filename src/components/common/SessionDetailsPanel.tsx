import {
  useCreateProAppointmentBlock,
  useDeleteProAppointmentBlock,
  useGetProAppointmentBlocks,
} from "@/api/appointments/useAppointments";
import { useUpdateProExpert } from "@/api/proExpert/useProExpert";
import { BlockDaySection } from "@/components/common/BlockDaySection";
import { EmptySessionCard } from "@/components/common/EmptySessionCard";
import TimeSlotsManager from "@/components/common/TimeSlotsManager";
import { useProExpertStore } from "@/store/useProExpert";
import { useTimeSlotsStore } from "@/store/useTimeSlotsStore";
import { SessionDetailsData } from "@/types/availability";
import { ApiSchedule, getDayOfWeekFromDate } from "@/types/schedule";
import { formatDateForSession } from "@/utils/dateFormat";
import { useLocale, useTranslations } from "next-intl";
import { SessionPreviewCard } from "./SessionPreviewCard";

interface SessionDetailsPanelProps {
  selectedDate: Date | null;
  showTimeSlotsManager: boolean;
  confirmedAppointments?: any[];
  isMobile?: boolean;
}

export const SessionDetailsPanel = ({
  selectedDate,
  showTimeSlotsManager,
  confirmedAppointments = [],
  isMobile = false,
}: SessionDetailsPanelProps) => {
  const t = useTranslations();
  const currentLocale = useLocale();

  // Stores et API
  const { proExpertData, setProExpertData } = useProExpertStore();
  const { addTimeSlotLocal } = useTimeSlotsStore();
  const updateProExpertMutation = useUpdateProExpert();

  // Hooks pour la gestion des blocs de dates
  const { data: blockedDates, isLoading: isLoadingBlocks } =
    useGetProAppointmentBlocks();
  const createBlockMutation = useCreateProAppointmentBlock();
  const deleteBlockMutation = useDeleteProAppointmentBlock();

  // Vérifier si la date sélectionnée est bloquée
  const isDateBlocked =
    selectedDate && blockedDates && Array.isArray(blockedDates)
      ? blockedDates.some(
          (block: any) =>
            new Date(block.date).toDateString() === selectedDate.toDateString()
        )
      : false;

  // Vérifier s'il y a des créneaux pour la date sélectionnée
  const hasTimeSlotsForDate = (date: Date | null): boolean => {
    if (!date || !proExpertData?.schedules) return false;

    const dayOfWeek = getDayOfWeekFromDate(date);
    const schedules = proExpertData.schedules as ApiSchedule[];
    return schedules.some((schedule) => schedule.day_of_week === dayOfWeek);
  };

  // Fonction pour récupérer les détails des sessions pour une date sélectionnée
  const getSessionDetails = (): SessionDetailsData | null => {
    if (!selectedDate) return null;

    // Filtrer les rendez-vous confirmés pour la date sélectionnée
    const appointmentsForDate = confirmedAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_at);
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (appointmentsForDate.length === 0) return null;

    return {
      date: selectedDate,
      event: { type: "active", users: [] },
      sessions: appointmentsForDate.map((appointment) => ({
        id: appointment.id,
        clientName:
          appointment.patient?.first_name && appointment.patient?.last_name
            ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
            : t("sessionDetailsPanel.client"),
        avatar:
          appointment.patient?.avatar || "/assets/icons/defaultAvatar.png",
        time: new Date(appointment.appointment_at).toLocaleTimeString(
          currentLocale === "fr" ? "fr-FR" : "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        duration: appointment.session?.session_type || "30 min",
        description:
          appointment.session?.name || t("sessionDetailsPanel.consultation"),
        type: "active",
      })),
    };
  };

  const sessionDetails = getSessionDetails();

  // Fonction pour ajouter une disponibilité localement (sans appel réseau)
  const handleAddAvailability = () => {
    if (!selectedDate || !proExpertData?.schedules) return;

    const result = addTimeSlotLocal(proExpertData.schedules, selectedDate);

    // Mettre à jour le store principal avec les nouvelles données locales
    setProExpertData({
      ...proExpertData,
      schedules: result.schedules,
    });
  };

  // Fonction pour gérer le blocage/déblocage de dates
  const handleBlocked = async (checked: boolean) => {
    if (!selectedDate) return;

    // Format de date requis: "YYYY-MM-DD"
    const dateString = selectedDate.toISOString().split("T")[0];

    try {
      if (checked) {
        // Bloquer la date
        await createBlockMutation.mutateAsync({ date: dateString });
      } else {
        // Débloquer la date
        await deleteBlockMutation.mutateAsync({ date: dateString });
      }
    } catch (error) {
      console.error(
        checked
          ? "Erreur lors du blocage de la date: "
          : "Erreur lors du déblocage de la date: ",
        error
      );
    }
  };

  return (
    <div className="w-full">
      {selectedDate ? (
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center gap-2 mb-6">
            <h3 className="text-lg text-center font-semibold text-gray-900">
              {selectedDate.toLocaleDateString(
                currentLocale === "fr" ? "fr-FR" : "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </h3>
          </div>

          {sessionDetails && (
            <div className="space-y-3">
              {sessionDetails.sessions.map((session) => (
                <SessionPreviewCard
                  key={session.id}
                  date={formatDateForSession(sessionDetails.date)}
                  time={session.time}
                  visioDuration={session.duration}
                  participantName={session.clientName}
                  participantAvatar={session.avatar}
                  sessionDescription={session.description}
                  className="w-full"
                />
              ))}
            </div>
          )}

          {showTimeSlotsManager || hasTimeSlotsForDate(selectedDate) ? (
            <div className="w-full">
              <TimeSlotsManager selectedDate={selectedDate} />
            </div>
          ) : (
            <EmptySessionCard
              message={
                <>
                  {t("sessionDetailsPanel.noSessionToday")
                    .split(" ")
                    .map((word, index, array) => {
                      if (index === Math.floor(array.length / 2)) {
                        return (
                          <span key={index}>
                            <br />
                            {word + " "}
                          </span>
                        );
                      }
                      return word + " ";
                    })}
                </>
              }
              buttonLabel={t("sessionDetailsPanel.addAvailability")}
              onAdd={handleAddAvailability}
            />
          )}

          <BlockDaySection
            isBlocked={isDateBlocked}
            onToggle={handleBlocked}
            isMobile={isMobile}
            isLoading={
              createBlockMutation.isPending ||
              deleteBlockMutation.isPending ||
              isLoadingBlocks
            }
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-[100vh]">
          <p className="text-slate-200 text-center text-base font-medium">
            {t("sessionDetailsPanel.selectDateToView")
              .split(" ")
              .map((word, index, array) => {
                if (index === Math.floor(array.length / 2)) {
                  return (
                    <span key={index}>
                      <br />
                      {word + " "}
                    </span>
                  );
                }
                return word + " ";
              })}
          </p>
        </div>
      )}
    </div>
  );
};
