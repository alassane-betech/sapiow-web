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
