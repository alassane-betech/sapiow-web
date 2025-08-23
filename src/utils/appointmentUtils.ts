import { format, isThisWeek, isToday, isTomorrow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

// Types pour les données API
export interface AppointmentQuestion {
  id: number;
  question: string;
  created_at: string;
  updated_at: string;
  appointment_id: string;
}

export interface ApiAppointment {
  id: string;
  appointment_at: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  patient: {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  pro: {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    job: string;
    domains: {
      name: string;
    };
  };
  session: {
    id: string;
    name: string;
    session_type: string;
    price: number;
  };
  appointment_questions?: AppointmentQuestion[];
}

// Interface pour les données transformées
export interface SessionData {
  id: string;
  professionalName: string;
  professionalTitle: string;
  profileImage: string;
  sessionType: string;
  duration: string;
  date: string;
  time: string;
  status: string;
  price: number;
  appointment_questions?: AppointmentQuestion[];
}

/**
 * Transforme les données API en format pour UpcomingVideoCall
 */
export function transformAppointmentToSessionData(
  appointment: ApiAppointment
): SessionData {
  const appointmentDate = parseISO(appointment.appointment_at);

  // Formatage de la date
  let formattedDate = "";
  if (isToday(appointmentDate)) {
    formattedDate = "Aujourd'hui";
  } else if (isTomorrow(appointmentDate)) {
    formattedDate = "Demain";
  } else if (isThisWeek(appointmentDate)) {
    formattedDate = format(appointmentDate, "EEEE", { locale: fr });
  } else {
    formattedDate = format(appointmentDate, "EEE, dd MMM yyyy", { locale: fr });
  }

  // Formatage de l'heure
  const timeRange = format(appointmentDate, "HH:mm", { locale: fr });

  // Conversion du type de session en durée
  const durationMap: Record<string, string> = {
    "15m": "15",
    "30m": "30",
    "45m": "45",
    "60m": "60",
    "90m": "90",
    "120m": "120",
  };

  const duration = durationMap[appointment.session.session_type] || "30";

  // Gestion de l'avatar avec fallback
  let profileImage = appointment.pro.avatar;
  if (profileImage && !profileImage.startsWith("http")) {
    profileImage = `https://ncvpplapgfqsgowtkrbw.supabase.co/storage/v1/object/public/${profileImage}`;
  }

  return {
    id: appointment.id,
    professionalName:
      `${appointment.pro.first_name} ${appointment.pro.last_name}`.trim(),
    professionalTitle:
      appointment.pro.job || appointment.pro.domains?.name || "Expert",
    profileImage: profileImage || "/assets/icons/pro1.png",
    sessionType: appointment.session.name,
    duration: `${duration} minutes`,
    date: formattedDate,
    time: `${timeRange} - ${format(
      new Date(appointmentDate.getTime() + parseInt(duration) * 60000),
      "HH:mm"
    )}`,
    status: appointment.status,
    price: appointment.session.price,
    appointment_questions: appointment.appointment_questions || [],
  };
}

/**
 * Filtre les appointments par statut et les trie par date
 */
export function filterAndSortAppointments(appointments: ApiAppointment[]) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Séparer les appointments confirmés (aujourd'hui ou à venir dans les 7 prochains jours)
  const upcomingConfirmed = appointments
    .filter((apt) => {
      const aptDate = parseISO(apt.appointment_at);
      const isConfirmed = apt.status === "confirmed";
      const isTodayOrLater = aptDate >= startOfToday; // Inclut aujourd'hui même si passé
      const isWithinWeek = aptDate <= sevenDaysFromNow;

      console.log(`Appointment ${apt.id}:`, {
        date: aptDate.toISOString(),
        status: apt.status,
        isConfirmed,
        isTodayOrLater,
        isWithinWeek,
        includeInUpcoming: isConfirmed && isTodayOrLater && isWithinWeek,
      });

      return isConfirmed && isTodayOrLater && isWithinWeek;
    })
    .sort(
      (a, b) =>
        new Date(a.appointment_at).getTime() -
        new Date(b.appointment_at).getTime()
    );

  // Autres appointments (en attente, aujourd'hui ou à venir)
  const otherUpcoming = appointments
    .filter((apt) => {
      const aptDate = parseISO(apt.appointment_at);
      const isTodayOrLater = aptDate >= startOfToday;
      const isValidStatus = ["confirmed", "pending"].includes(apt.status);
      const isNotInUpcomingConfirmed = !upcomingConfirmed.find(
        (confirmed) => confirmed.id === apt.id
      );

      return isTodayOrLater && isValidStatus && isNotInUpcomingConfirmed;
    })
    .sort(
      (a, b) =>
        new Date(a.appointment_at).getTime() -
        new Date(b.appointment_at).getTime()
    );

  return {
    upcomingConfirmed,
    otherUpcoming,
  };
}

/**
 * Formate la date pour l'affichage dans les cartes
 */
export function formatDateForCard(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "EEE, dd MMM yyyy", { locale: fr });
}
