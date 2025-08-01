"use client";
import { Button } from "@/components/common/Button";
import { usePlaningStore } from "@/store/usePlaning";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface VisioPlanningCalendarProps {
  onDateTimeSelect?: (date: Date, time: string, duration: number) => void;
  className?: string;
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

const durations = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

const timeSlots = [
  { time: "10:30", available: true, status: "Complet" },
  { time: "13:00", available: true },
  { time: "15:30", available: true, selected: true },
  { time: "17:00", available: true },
  { time: "18:30", available: true },
];

export default function VisioPlanningCalendar({
  onDateTimeSelect,
  className = "",
}: VisioPlanningCalendarProps) {
  const { setIsPlaning } = usePlaningStore();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // Avril 2025
  const [selectedDate, setSelectedDate] = useState(4); // 4 avril sélectionné par défaut
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedTime, setSelectedTime] = useState("15:30");

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
            {durations.map((duration) => (
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
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
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
            <span className="text-xl font-bold text-gray-900">120 €</span>
          </div>

          <Button
            label="Réserver"
            onClick={handleReserve}
            className="w-full h-12 bg-cobalt-blue hover:bg-cobalt-blue/90 text-white font-medium rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
