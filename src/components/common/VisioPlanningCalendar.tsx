"use client";
import { Button } from "@/components/common/Button";
import { usePlaningStore } from "@/store/usePlaning";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

interface VisioPlanningCalendarProps {
  onDateTimeSelect?: (date: Date, time: string, duration: number) => void;
  className?: string;
  expertData?: any; // Données de l'expert depuis l'API
  professionalName?: string; // Nom de l'expert
}

const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

// Mapping des jours de la semaine
const dayOfWeekMapping = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

// Fonction pour générer les créneaux horaires basés sur les schedules
const generateTimeSlots = (
  schedules: any[],
  selectedDate: Date,
  duration: number
) => {
  if (!schedules || schedules.length === 0) return [];

  const dayOfWeek =
    dayOfWeekMapping[selectedDate.getDay() as keyof typeof dayOfWeekMapping];

  // Trouver les schedules pour ce jour
  const daySchedules = schedules.filter(
    (schedule) => schedule.day_of_week === dayOfWeek
  );

  if (daySchedules.length === 0) return [];

  const timeSlots: any[] = [];

  daySchedules.forEach((schedule) => {
    // Parser les heures de début et fin
    let startTime = new Date(
      `1970-01-01T${schedule.start_time.replace("+00", "Z")}`
    );
    let endTime = new Date(
      `1970-01-01T${schedule.end_time.replace("+00", "Z")}`
    );

    // Gérer les créneaux qui traversent minuit (end_time < start_time)
    if (endTime < startTime) {
      // L'heure de fin est le lendemain, ajouter 24 heures
      endTime = new Date(endTime.getTime() + 24 * 60 * 60 * 1000);
    }

    // Validation : s'assurer que nous avons maintenant un créneau valide
    if (startTime >= endTime) {
      console.warn(
        `Schedule invalide ignoré: ${schedule.start_time} - ${schedule.end_time}`
      );
      return; // Ignorer ce schedule
    }

    // Générer les créneaux selon la durée sélectionnée
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const nextTime = new Date(currentTime.getTime() + duration * 60 * 1000);

      // Vérifier qu'il reste assez de temps pour ce créneau
      if (nextTime <= endTime) {
        const timeString = currentTime.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        timeSlots.push({
          time: timeString,
          available: true,
          status: null,
        });
      }

      // Passer au créneau suivant (espacé de la durée)
      currentTime = nextTime;
    }
  });

  // Trier les créneaux par heure
  return timeSlots.sort((a, b) => a.time.localeCompare(b.time));
};

export default function VisioPlanningCalendar({
  onDateTimeSelect,
  className = "",
  expertData,
  professionalName = "Expert",
}: VisioPlanningCalendarProps) {
  const { setIsPlaning } = usePlaningStore();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // Avril 2025
  const [selectedDate, setSelectedDate] = useState(4); // 4 avril sélectionné par défaut

  // Créer les durées dynamiques basées sur les sessions de l'expert
  const availableDurations = expertData?.sessions?.map((session: any) => ({
    label:
      session.session_type === "15m"
        ? "15 min"
        : session.session_type === "30m"
        ? "30 min"
        : session.session_type === "45m"
        ? "45 min"
        : session.session_type === "60m"
        ? "60 min"
        : `${session.session_type}`,
    value: parseInt(session.session_type.replace("m", "")),
    price: session.price,
    sessionId: session.id,
  })) || [
    { label: "15 min", value: 15, price: 120, sessionId: null },
    { label: "30 min", value: 30, price: 120, sessionId: null },
    { label: "45 min", value: 45, price: 120, sessionId: null },
    { label: "60 min", value: 60, price: 120, sessionId: null },
  ];

  const [selectedDuration, setSelectedDuration] = useState(
    availableDurations[0]?.value || 15
  );
  const [selectedTime, setSelectedTime] = useState("");

  // Prix de la session sélectionnée
  const selectedSession = availableDurations.find(
    (d: any) => d.value === selectedDuration
  );
  const sessionPrice = selectedSession?.price || 120;

  // Générer les créneaux horaires dynamiquement
  const timeSlots = useMemo(() => {
    const selectedDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDate
    );
    const slots = generateTimeSlots(
      expertData?.schedules || [],
      selectedDateTime,
      selectedDuration
    );

    // Définir le premier créneau comme sélectionné par défaut si pas encore sélectionné
    if (!selectedTime && slots.length > 0) {
      setSelectedTime(slots[0].time);
    }

    return slots;
  }, [expertData?.schedules, currentDate, selectedDate, selectedDuration]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    // Réinitialiser le temps sélectionné quand on change de date
    setSelectedTime("");
  };

  const handleReserve = () => {
    if (onDateTimeSelect && selectedDate) {
      const selectedDateTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        selectedDate
      );
      onDateTimeSelect(selectedDateTime, selectedTime, selectedDuration);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Jours vides du début du mois
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const isClickable = day >= 1 && day <= 16; // Jours disponibles

      days.push(
        <div
          key={day}
          className={`
            p-2 text-center cursor-pointer rounded-lg transition-all duration-200
            ${
              isSelected
                ? "bg-exford-blue text-white font-bold"
                : isClickable
                ? "hover:bg-gray-100 text-gray-900"
                : "text-gray-300 cursor-not-allowed"
            }
          `}
          onClick={() => isClickable && handleDateClick(day)}
        >
          <span className="text-sm font-medium">{day}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`bg-white rounded-lg max-w-md mx-auto ${className}`}>
      {/* Header avec retour */}
      <div className="h-[70px] flex items-center border-b border-gray-200">
        <ArrowLeft
          className="w-6 h-6 text-black cursor-pointer ml-10"
          onClick={() => setIsPlaning(false)}
        />
        <h2 className="text-xl font-bold text-black px-6">
          Planifier votre visio
        </h2>
      </div>

      <div className="p-6">
        {/* Sélection de durée */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#1F2937] mb-3">
            Durée de la visio
          </h3>
          <div className="flex gap-2">
            {availableDurations.map((duration: any) => (
              <button
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                className={`
                rounded-lg text-base font-bold transition-colors w-[80px] h-[40px] cursor-pointer
                ${
                  selectedDuration === duration.value
                    ? "bg-cobalt-blue text-white"
                    : "bg-[#F0F6FF] text-[#003B87] hover:bg-[#F0F6FF]"
                }
              `}
              >
                {duration.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation du calendrier */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 text-center">
              <span className="text-xs font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Grille du calendrier */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {renderCalendarDays()}
        </div>

        {/* Créneaux horaires */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#1F2937] mb-3">
            Créneaux disponibles
          </h3>
          {timeSlots.length > 0 ? (
            <div
              className="max-h-[110px] overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="grid grid-cols-3 justify-center gap-2 time-slots-grid">
                {timeSlots.map((slot: any) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                  relative p-3 rounded-lg text-sm font-medium transition-all w-[110px]
                  ${
                    selectedTime === slot.time
                      ? "bg-exford-blue text-white"
                      : slot.available
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }
                ${slot.status === "Complet" ? "text-left" : ""}`}
                  >
                    {slot.time}
                    {slot.status && (
                      <span className="absolute top-3 left-[41%] w-[57px] h-[22px] bg-[#94A3B8] text-white text-[10px] font-bold rounded-[8px] flex justify-center items-center">
                        {slot.status}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Aucun créneau disponible pour ce jour.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Veuillez sélectionner une autre date.
              </p>
            </div>
          )}
        </div>

        {/* Résumé et bouton de réservation */}
        <div className="border-t pt-4">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Session rapide visio - {selectedDuration} minutes
            </h4>
            <p className="text-sm text-gray-600">
              Ven {selectedDate} {months[currentDate.getMonth()].toLowerCase()}{" "}
              {currentDate.getFullYear()} à {selectedTime}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">
              {sessionPrice} €
            </span>
          </div>

          <Button
            label="Réserver"
            onClick={handleReserve}
            disabled={timeSlots.length === 0 || !selectedTime}
            className={`w-full h-12 font-medium rounded-lg ${
              timeSlots.length === 0 || !selectedTime
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cobalt-blue hover:bg-cobalt-blue/90 text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
