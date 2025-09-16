"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/useCalendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  className?: string;
  confirmedAppointments?: any[];
}

// Plus de données statiques - utilisation des vraies données d'API

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

export default function CustomCalendar({
  className,
  confirmedAppointments = [],
}: CustomCalendarProps) {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    isDateSelected,
    navigateMonth,
  } = useCalendarStore();

  // Créer les événements à partir des rendez-vous confirmés uniquement
  const getMergedEvents = () => {
    const mergedEvents: any = {};

    confirmedAppointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.appointment_at);
      const day = appointmentDate.getDate();
      const isCurrentMonth =
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear();

      if (isCurrentMonth) {
        const appointmentUser = {
          id: appointment.id,
          name:
            appointment.patient?.first_name && appointment.patient?.last_name
              ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
              : "Client",
          avatar:
            appointment.patient?.avatar || "/assets/icons/defaultAvatar.png",
          time: new Date(appointment.appointment_at).toLocaleTimeString(
            "fr-FR",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          duration: appointment.session?.session_type || "30 min",
          description: appointment.session?.name || "Consultation",
        };

        if (mergedEvents[day]) {
          mergedEvents[day].users.push(appointmentUser);
        } else {
          mergedEvents[day] = {
            type: "active",
            users: [appointmentUser],
          };
        }
      }
    });

    return mergedEvents;
  };

  const allEvents = getMergedEvents();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    // Si la date cliquée est déjà sélectionnée, la désélectionner
    if (isDateSelected(clickedDate)) {
      setSelectedDate(null);
    } else {
      // Sinon, la sélectionner
      setSelectedDate(clickedDate);
    }
  };

  const isClickable = (day: number) => {
    const event = allEvents[day as keyof typeof allEvents];
    // Les dates indisponibles ne sont pas cliquables
    return event?.type !== "unavailable";
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Jours du mois précédent
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0
    );
    const daysInPrevMonth = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${daysInPrevMonth - i}`}
          className="bg-gray-100 relative"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex p-2 flex-col justify-between items-start flex-1 self-stretch h-[60px] relative">
            <span
              className="text-xs font-bold leading-4 tracking-wide"
              style={{
                color: "#CBD5E1",
                fontFamily: "Figtree",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "16px",
                letterSpacing: "0.04px",
              }}
            >
              {daysInPrevMonth - i}
            </span>
            <div className="flex flex-col items-start"></div>
          </div>
        </div>
      );
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const event = allEvents[day as keyof typeof allEvents];
      const todayIndicator = isToday(day);
      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected = isDateSelected(clickedDate);
      const clickable = isClickable(day);

      days.push(
        <div
          key={day}
          className={`bg-gray-100 relative ${
            clickable ? "cursor-pointer" : ""
          }`}
          style={{ borderRadius: "2px" }}
          onClick={() => clickable && handleDateClick(day)}
        >
          <div
            className={`
            flex p-2 flex-col justify-between items-start flex-1 self-stretch h-[60px] relative
            transition-all duration-200
            
            ${event?.type === "active" ? "bg-blue-600 text-white" : ""}
            ${event?.type === "complete" ? " text-gray-700" : ""}
            ${event?.type === "unavailable" ? "bg-white" : ""}
            ${!event && !todayIndicator ? "text-gray-900" : ""}
            ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""}
            ${clickable ? "hover:bg-opacity-80" : ""}
          `}
            style={{
              borderRadius: "2px",
              ...(event?.type === "unavailable" && {
                backgroundColor: "#FFF",
                border: "1px solid #F8FAFC",
                borderRadius: "2px",
                position: "relative",
              }),
              ...(isSelected && {
                boxShadow: "0 0 0 2px #3B82F6",
              }),
            }}
          >
            <span
              className={`text-xs font-bold leading-4 tracking-wide ${
                todayIndicator
                  ? "bg-[#0F172A] min-w-[17px] h-[16px] flex items-center justify-center text-xs font-bold text-white rounded-full px-1"
                  : ""
              }`}
              style={{
                color:
                  todayIndicator || event?.type === "active"
                    ? "white"
                    : event?.type === "unavailable"
                    ? "#CBD5E1"
                    : "#020617",
                fontFamily: "Figtree",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "16px",
                letterSpacing: "0.04px",
              }}
            >
              {day}
            </span>

            {/* Indicateur de sélection */}
            {isSelected && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}

            {/* Barre oblique pour les dates indisponibles */}
            {event?.type === "unavailable" && (
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  background: `linear-gradient(128deg, transparent calc(50% - 0.5px), #F1F5F9 calc(50% - 0.5px), #F1F5F9 calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
                }}
              />
            )}

            <div className="flex flex-col items-start">
              {event?.users && event.users.length > 0 && (
                <div className="flex -space-x-1">
                  {event.users.slice(0, 2).map((user: any, index: number) => (
                    <Avatar
                      key={user.id}
                      className="w-3.5 h-3.5 border-2 border-white"
                    >
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600 font-semibold">
                        {user.name
                          ? user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}

              {event?.type === "complete" && (
                <span className="w-[150px] text-[8px] mt-1"></span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Jours du mois suivant
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="bg-gray-100 relative"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex p-2 flex-col justify-between items-start flex-1 self-stretch h-[60px] relative">
            <span
              className="text-xs font-bold leading-4 tracking-wide"
              style={{
                color: "#CBD5E1",
                fontFamily: "Figtree",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "16px",
                letterSpacing: "0.04px",
              }}
            >
              {day}
            </span>
            <div className="flex flex-col items-start"></div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 bg-white ${className}`}>
      {/* En-tête avec navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("prev")}
          className="h-8 w-8 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-2xl font-bold text-gray-900 font-figtree">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("next")}
          className="h-8 w-8 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-12 flex items-center justify-center text-gray-500 font-medium font-figtree"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
}
