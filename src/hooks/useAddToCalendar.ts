import { generateICSFile, downloadICSFile, openGoogleCalendar } from "@/utils/calendar";
import { useTranslations } from "next-intl";

interface Appointment {
  id?: string;
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
    console.log("🔍 DEBUG - handleAddToCalendar appelé avec:", appointment);
    
    if (!appointment?.appointment_at) {
      console.error("❌ Pas de appointment_at trouvé");
      return;
    }

    console.log("📅 DEBUG - appointment_at brut:", appointment.appointment_at);
    console.log("📅 DEBUG - Type de appointment_at:", typeof appointment.appointment_at);

    // Créer la date de début à partir de appointment_at
    const startDate = new Date(appointment.appointment_at);
    console.log("📅 DEBUG - startDate créée:", startDate);
    console.log("📅 DEBUG - startDate.toString():", startDate.toString());
    console.log("📅 DEBUG - startDate valide?", !isNaN(startDate.getTime()));

    // Créer la date de fin (60 minutes après)
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 60);
    console.log("📅 DEBUG - endDate créée:", endDate);

    const professionalName =
      `${appointment.pro?.first_name || ""} ${
        appointment.pro?.last_name || ""
      }`.trim() || t("expert");

    const consultationWith = t("consultationWith");
    const videoConsultation = t("videoConsultation");
    const expert = t("expert");

    const title = `${consultationWith} ${professionalName}`;
    const description = `${videoConsultation} ${professionalName} - ${
      appointment.pro?.job || expert
    }`;
    const location = "Visioconférence Sapiow";

    console.log("📝 DEBUG - Données préparées:", { title, description, location, professionalName });

    try {
      console.log("🔧 DEBUG - Tentative de génération du fichier .ics...");
      
      // Générer et télécharger le fichier .ics
      const icsContent = generateICSFile({
        title,
        description,
        location,
        startDate,
        endDate,
        professionalName,
      });
      
      console.log("✅ DEBUG - Fichier .ics généré avec succès");
      console.log("📄 DEBUG - Contenu .ics:", icsContent.substring(0, 200) + "...");
      
      downloadICSFile(icsContent, `consultation-${appointment.id || 'event'}.ics`);
      console.log("✅ DEBUG - Téléchargement du fichier .ics déclenché");
    } catch (error) {
      console.error("❌ DEBUG - Erreur lors de la génération du fichier .ics:", error);
      console.error("❌ DEBUG - Stack trace:", error instanceof Error ? error.stack : "N/A");
      
      // Fallback: Ouvrir Google Calendar
      console.log("🔄 DEBUG - Tentative de fallback vers Google Calendar...");
      openGoogleCalendar({
        title,
        description,
        location,
        startDate,
        endDate,
      });
    }
  };

  return { handleAddToCalendar };
}
