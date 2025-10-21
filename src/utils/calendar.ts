/**
 * Génère un fichier .ics (iCalendar) pour ajouter un événement au calendrier
 */
export function generateICSFile({
  title,
  description,
  location,
  startDate,
  endDate,
  professionalName,
}: {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  professionalName?: string;
}) {
  console.log("🔧 generateICSFile - Paramètres reçus:", { title, description, location, startDate, endDate, professionalName });
  
  // Formater les dates au format iCalendar (YYYYMMDDTHHMMSSZ)
  const formatDate = (date: Date) => {
    console.log("📅 formatDate - Date à formater:", date);
    console.log("📅 formatDate - Date valide?", !isNaN(date.getTime()));
    
    if (isNaN(date.getTime())) {
      console.error("❌ formatDate - Date invalide détectée!");
      throw new Error(`Date invalide: ${date}`);
    }
    
    const isoString = date.toISOString();
    console.log("📅 formatDate - ISO string:", isoString);
    
    const formatted = isoString
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
    console.log("📅 formatDate - Résultat formaté:", formatted);
    
    return formatted;
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sapiow//Consultation//FR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description || "Consultation vidéo avec " + professionalName}
LOCATION:${location || "Visioconférence Sapiow"}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Rappel: ${title}
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

/**
 * Télécharge un fichier .ics
 */
export function downloadICSFile(icsContent: string, filename: string = "consultation.ics") {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Ouvre Google Calendar pour ajouter un événement
 */
export function openGoogleCalendar({
  title,
  description,
  location,
  startDate,
  endDate,
}: {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
}) {
  console.log("🌐 openGoogleCalendar - Paramètres reçus:", { title, description, location, startDate, endDate });
  
  // Format des dates pour Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatGoogleDate = (date: Date) => {
    console.log("📅 formatGoogleDate - Date à formater:", date);
    console.log("📅 formatGoogleDate - Date valide?", !isNaN(date.getTime()));
    
    if (isNaN(date.getTime())) {
      console.error("❌ formatGoogleDate - Date invalide détectée!");
      throw new Error(`Date invalide pour Google Calendar: ${date}`);
    }
    
    const formatted = date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    console.log("📅 formatGoogleDate - Résultat formaté:", formatted);
    return formatted;
  };

  const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
  googleCalendarUrl.searchParams.append("action", "TEMPLATE");
  googleCalendarUrl.searchParams.append("text", title);
  googleCalendarUrl.searchParams.append("dates", `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`);
  
  if (description) {
    googleCalendarUrl.searchParams.append("details", description);
  }
  
  if (location) {
    googleCalendarUrl.searchParams.append("location", location);
  }

  console.log("🔗 Ouverture de Google Calendar:", googleCalendarUrl.toString());
  window.open(googleCalendarUrl.toString(), "_blank");
}

/**
 * Ajoute un événement au calendrier (télécharge le fichier .ics)
 */
export function addToCalendar({
  title,
  description,
  location,
  startDate,
  endDate,
  professionalName,
}: {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  professionalName?: string;
}) {
  console.log("📅 addToCalendar appelée avec:", {
    title,
    description,
    location,
    startDate,
    endDate,
    professionalName,
  });

  // Ouvrir Google Calendar directement
  openGoogleCalendar({
    title,
    description,
    location,
    startDate,
    endDate,
  });

  console.log("✅ Google Calendar ouvert");
}
