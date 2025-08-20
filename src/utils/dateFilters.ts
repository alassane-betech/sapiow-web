/**
 * Utilitaires pour calculer les plages de dates des filtres de revenus
 */

export interface DateRange {
  start: string;
  end: string;
}

/**
 * Calcule la plage de dates pour "Ce mois-ci"
 * @returns DateRange avec le premier jour du mois courant et le dernier jour du mois
 */
export const getCurrentMonthRange = (): DateRange => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return {
    start: startOfMonth.toISOString().split('T')[0], // Format YYYY-MM-DD
    end: endOfMonth.toISOString().split('T')[0]
  };
};

/**
 * Calcule la plage de dates pour "Ce trimestre"
 * @returns DateRange avec le premier jour du trimestre courant et aujourd'hui
 */
export const getCurrentQuarterRange = (): DateRange => {
  const now = new Date();
  const currentMonth = now.getMonth();
  
  // Détermine le premier mois du trimestre (0, 3, 6, 9)
  const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
  const startOfQuarter = new Date(now.getFullYear(), quarterStartMonth, 1);
  
  return {
    start: startOfQuarter.toISOString().split('T')[0], // Format YYYY-MM-DD
    end: now.toISOString().split('T')[0]
  };
};

/**
 * Obtient la plage de dates selon le type de filtre
 * @param filterType - Type de filtre ("Ce mois-ci", "Ce trimestre", "Personnalisé")
 * @param customRange - Plage personnalisée optionnelle pour le filtre "Personnalisé"
 * @returns DateRange ou undefined pour le filtre personnalisé sans plage
 */
export const getDateRangeByFilter = (
  filterType: string,
  customRange?: DateRange
): DateRange | undefined => {
  switch (filterType) {
    case "Ce mois-ci":
      return getCurrentMonthRange();
    case "Ce trimestre":
      return getCurrentQuarterRange();
    case "Personnalisé":
      return customRange;
    default:
      return undefined;
  }
};
