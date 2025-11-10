/**
 * Formate une date en YYYY-MM-DD en utilisant l'heure locale
 * ⚠️ IMPORTANT: N'utilise PAS toISOString() pour éviter les problèmes de timezone
 * 
 * Exemple:
 * - Utilisateur en France sélectionne "11 Nov 2025" (minuit heure locale)
 * - toISOString() donnerait "2025-11-10T23:00:00.000Z" (décalage d'un jour ❌)
 * - Cette fonction donne "2025-11-11" (correct ✅)
 * 
 * @param date - L'objet Date à formater
 * @returns La date au format YYYY-MM-DD (heure locale)
 */
export const formatDateToLocalISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Convertit une date locale (minuit) en UTC pour l'envoi au backend
 * 
 * ⚠️ SOLUTION INTERNATIONALE: Pour une plateforme globale, on doit :
 * 1. Prendre la date sélectionnée par l'utilisateur (ex: "11 Nov 2025")
 * 2. La considérer comme "minuit dans la timezone de l'utilisateur"
 * 3. Convertir ce moment précis en UTC
 * 4. Envoyer au backend qui stockera en UTC
 * 
 * Exemple:
 * - Utilisateur en France (UTC+1) sélectionne "11 Nov 2025"
 * - On crée: "2025-11-11T00:00:00+01:00" (minuit en France)
 * - Conversion UTC: "2025-11-10T23:00:00Z"
 * - Backend stocke: "2025-11-10T23:00:00Z"
 * - Quand on affiche: "11 Nov 2025" en France ✅
 * 
 * - Utilisateur aux USA (UTC-5) sélectionne "11 Nov 2025"
 * - On crée: "2025-11-11T00:00:00-05:00" (minuit aux USA)
 * - Conversion UTC: "2025-11-11T05:00:00Z"
 * - Backend stocke: "2025-11-11T05:00:00Z"
 * - Quand on affiche: "11 Nov 2025" aux USA ✅
 * 
 * @param date - L'objet Date à convertir
 * @returns La date au format ISO 8601 complet avec timezone (pour envoi au backend)
 */
export const formatDateToUTCForBackend = (date: Date): string => {
  // Créer une nouvelle date à minuit dans la timezone locale de l'utilisateur
  const localMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0, // heure: 0
    0, // minute: 0
    0, // seconde: 0
    0  // milliseconde: 0
  );
  
  // Convertir en ISO 8601 complet (avec timezone UTC)
  return localMidnight.toISOString();
};

/**
 * Extrait uniquement la date (YYYY-MM-DD) d'un ISO string UTC
 * 
 * ⚠️ ATTENTION: Cette fonction doit être utilisée UNIQUEMENT pour afficher
 * une date qui a été stockée en UTC par le backend.
 * 
 * Le backend doit renvoyer la date en UTC, et on doit la convertir
 * dans la timezone locale de l'utilisateur pour l'affichage.
 * 
 * @param isoString - Date au format ISO 8601 (ex: "2025-11-10T23:00:00Z")
 * @returns La date au format YYYY-MM-DD dans la timezone locale
 */
export const extractLocalDateFromUTC = (isoString: string): string => {
  const date = new Date(isoString);
  return formatDateToLocalISO(date);
};

/**
 * Parse une date au format YYYY-MM-DD en objet Date (heure locale)
 * 
 * @param dateString - La date au format YYYY-MM-DD
 * @returns L'objet Date correspondant (minuit heure locale)
 */
export const parseDateFromLocalISO = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Compare deux dates (ignore l'heure)
 * 
 * @param date1 - Première date
 * @param date2 - Deuxième date
 * @returns true si les dates sont identiques (même jour, mois, année)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
