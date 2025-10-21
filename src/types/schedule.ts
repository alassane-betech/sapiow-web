// Types pour la gestion des schedules

export interface ApiSchedule {
  id: number;
  pro_id: string;
  day_of_week:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start_time: string; // Format: "09:00:00+00"
  end_time: string; // Format: "17:00:00+00"
  created_at: string;
  updated_at: string;
}

export interface UITimeSlot {
  id: string;
  startTime: string; // Format: "9h00"
  endTime: string; // Format: "9h30"
}

export interface DaySchedule {
  day_of_week: string;
  timeSlots: UITimeSlot[];
}

// Fonction pour convertir un jour Date vers le nom du jour en anglais
export const getDayOfWeekFromDate = (
  date: Date
): ApiSchedule["day_of_week"] => {
  const days: ApiSchedule["day_of_week"][] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
};

// Fonction pour convertir le format UI (9h00) vers le format API (09:00:00+00)
export const convertUITimeToApiTime = (uiTime: string): string => {
  // Si la valeur est vide, null ou undefined, retourner une chaîne vide
  if (!uiTime || uiTime.trim() === "") {
    return "";
  }
  
  // Vérifier si la valeur contient déjà "NaN"
  if (uiTime.includes("NaN")) {
    console.error(`❌ Invalid time format (contains NaN): ${uiTime}`);
    return "";
  }
  
  // Convertir "9h00" en "09:00:00+00"
  const [hours, minutes] = uiTime.replace("h", ":").split(":");
  
  // Valider que hours et minutes sont des nombres valides
  const hourNum = parseInt(hours, 10);
  const minNum = parseInt(minutes || "0", 10);
  
  if (isNaN(hourNum) || isNaN(minNum)) {
    console.error(`❌ Invalid time format (failed to parse): ${uiTime}`, {
      hours,
      minutes,
      hourNum,
      minNum
    });
    return "";
  }
  
  const formattedHours = hourNum.toString().padStart(2, "0");
  const formattedMinutes = minNum.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:00+00`;
};

// Fonction pour convertir le format API (09:00:00+00) vers le format UI (9h00)
export const convertApiTimeToUITime = (apiTime: string): string => {
  // Si la valeur est vide, null ou undefined, retourner une chaîne vide
  if (!apiTime || apiTime.trim() === "") {
    return "";
  }
  
  // Convertir "09:00:00+00" en "9h00"
  const [hours, minutes] = apiTime.split(":");
  const hourNum = parseInt(hours, 10);
  const minNum = parseInt(minutes, 10);

  // Valider que les nombres sont valides
  if (isNaN(hourNum) || isNaN(minNum)) {
    console.error(`❌ Invalid API time format: ${apiTime}`);
    return "";
  }

  if (minNum === 0) {
    return `${hourNum}h00`;
  } else {
    return `${hourNum}h${minNum.toString().padStart(2, "0")}`;
  }
};

// Fonction pour convertir les créneaux UI vers les schedules API (format pour création)
// Cette version NE FILTRE PAS les créneaux vides - utilisée pour la gestion locale
export const convertTimeSlotsToApiSchedules = (
  timeSlots: UITimeSlot[],
  dayOfWeek: ApiSchedule["day_of_week"]
): Omit<ApiSchedule, "id" | "pro_id" | "created_at" | "updated_at">[] => {
  return timeSlots.map((slot) => ({
    day_of_week: dayOfWeek,
    start_time: convertUITimeToApiTime(slot.startTime),
    end_time: convertUITimeToApiTime(slot.endTime),
  }));
};

// Fonction pour convertir les schedules API vers les créneaux UI pour un jour donné
export const convertApiSchedulesToTimeSlots = (
  apiSchedules: ApiSchedule[],
  dayOfWeek: ApiSchedule["day_of_week"]
): UITimeSlot[] => {
  return apiSchedules
    .filter((schedule) => schedule.day_of_week === dayOfWeek)
    .map((schedule, index) => {
      const startTime = convertApiTimeToUITime(schedule.start_time);
      const endTime = convertApiTimeToUITime(schedule.end_time);
      
      return {
        id: `${dayOfWeek}-${schedule.id || `temp-${index}`}`,
        startTime,
        endTime,
      };
    })
    .filter((slot) => {
      // Filtrer les slots invalides (ceux qui ont des valeurs vides après conversion)
      // On garde les slots vides pour l'édition, mais on exclut les slots corrompus
      const isValid = slot.startTime !== "" || slot.endTime !== "";
      if (!isValid) {
        console.warn(`⚠️ Slot invalide filtré:`, slot);
      }
      return isValid || (slot.startTime === "" && slot.endTime === "");
    });
};
