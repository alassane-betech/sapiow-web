import {
  useGetProAppointments,
  useUpdateProAppointment,
} from "@/api/appointments/useAppointments";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useCallStore } from "@/store/useCall";
import { useState } from "react";

export const useVisiosAppointments = () => {
  const { data: proExpert } = useGetProExpert();
  const { data: appointments } = useGetProAppointments(proExpert?.id);
  const { mutateAsync: updateProAppointment } = useUpdateProAppointment();
  const { setAppointmentId } = useCallStore();

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

  const handleStartVideoCall = (appointmentId: string) => {
    setAppointmentId(appointmentId);
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

  return {
    // Data
    proExpert,
    appointments,
    confirmedAppointments,
    pendingAppointments,
    historicAppointments,

    // Loading states
    loadingStates,

    // Actions
    handleConfirmAppointment,
    handleCancelAppointment,
    handleStartVideoCall,
  };
};
