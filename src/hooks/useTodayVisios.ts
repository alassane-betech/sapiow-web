"use client";
import { useGetProAppointments } from "@/api/appointments/useAppointments";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useMemo } from "react";

export const useTodayVisios = () => {
  const { data: user } = useGetProExpert();
  
  // Filtrer les rendez-vous futurs (>= aujourd'hui à minuit)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();
  
  const { data: appointments } = useGetProAppointments(user?.id?.toString(), {
    gteField: "appointment_at",
    gte: todayISO,
    orderBy: "appointment_at",
    orderDirection: "asc",
  });

  // Calculer le nombre de visios pour aujourd'hui
  const todayVisiosCount = useMemo(() => {
    if (!appointments) return 0;

    const today = new Date();
    const todayStr = today.toDateString();

    // Gérer différentes structures possibles de la réponse API
    let appointmentsList: any[] = [];

    if (Array.isArray(appointments)) {
      appointmentsList = appointments;
    } else if (appointments && typeof appointments === "object") {
      appointmentsList =
        (appointments as any).appointments || (appointments as any).data || [];
    }

    return appointmentsList.filter((appointment: any) => {
      if (!appointment?.appointment_at) return false;
      const appointmentDate = new Date(appointment.appointment_at);
      return appointmentDate.toDateString() === todayStr;
    }).length;
  }, [appointments]);

  return {
    todayVisiosCount,
    user,
  };
};
