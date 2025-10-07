import { addToCalendar } from "@/utils/calendar";
import { useTranslations } from "next-intl";

interface Appointment {
  appointment_at: string;
  pro?: {
    first_name?: string;
    last_name?: string;
    job?: string;
  };
}

export function useAddToCalendar() {
  const t = useTranslations("sessionDetail");

  const handleAddToCalendar = (appointment: Appointment | undefined) => {
    console.log("🗓️ Clic sur Ajouter au calendrier");
    console.log("📅 Appointment:", appointment);

    if (!appointment?.appointment_at) {
      console.error("❌ Pas de appointment_at trouvé");
      return;
    }

    console.log("📅 appointment_at:", appointment.appointment_at);

    // Créer la date de début à partir de appointment_at
    const startDate = new Date(appointment.appointment_at);
    console.log("📅 Start date:", startDate);

    // Créer la date de fin (60 minutes après)
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 60);
    console.log("📅 End date:", endDate);

    const professionalName =
      `${appointment.pro?.first_name || ""} ${
        appointment.pro?.last_name || ""
      }`.trim() || t("expert");
    console.log("📅 Professional name:", professionalName);

    const consultationWith = t("consultationWith");
    const videoConsultation = t("videoConsultation");
    const expert = t("expert");

    const eventData = {
      title: `${consultationWith} ${professionalName}`,
      description: `${videoConsultation} ${professionalName} - ${
        appointment.pro?.job || expert
      }`,
      location: "Visioconférence Sapiow",
      startDate,
      endDate,
      professionalName,
    };
    console.log("📅 Event data:", eventData);

    addToCalendar(eventData);
    console.log("✅ Fonction addToCalendar appelée");
  };

  return { handleAddToCalendar };
}
