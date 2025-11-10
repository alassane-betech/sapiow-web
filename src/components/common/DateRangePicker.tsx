"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  /** Contrôle l'affichage du picker */
  isOpen: boolean;
  /** Callback pour fermer le picker */
  onClose: () => void;
  /** Callback appelé quand une plage complète est sélectionnée */
  onRangeSelect: (range: DateRange) => void;
  /** Plage de dates actuellement sélectionnée */
  selectedRange?: DateRange;
  /** Position du picker (top, bottom, left, right) */
  position?: "top" | "bottom" | "left" | "right";
  /** Classe CSS personnalisée pour le conteneur */
  className?: string;
}

export default function DateRangePicker({
  isOpen,
  onClose,
  onRangeSelect,
  selectedRange,
  position = "bottom",
  className = "",
}: DateRangePickerProps) {
  const t = useTranslations();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: selectedRange?.from,
    to: selectedRange?.to,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelecting, setIsSelecting] = useState(false);

  // Réinitialiser quand le picker s'ouvre
  useEffect(() => {
    if (isOpen) {
      setDateRange({
        from: selectedRange?.from,
        to: selectedRange?.to,
      });
      setCurrentMonth(selectedRange?.from || new Date());
    }
  }, [isOpen, selectedRange]);

  // Fermer le picker quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        // Ne fermer que si aucune sélection en cours OU si la plage est complète
        if (!isSelecting) {
          onClose();
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isSelecting, onClose]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convertir dimanche (0) en 7 pour avoir lundi = 1
    return day === 0 ? 6 : day - 1;
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      // Première sélection ou réinitialisation
      setDateRange({ from: selectedDate, to: undefined });
      setIsSelecting(true);
    } else if (dateRange.from && !dateRange.to) {
      // Deuxième sélection
      if (selectedDate < dateRange.from) {
        setDateRange({ from: selectedDate, to: dateRange.from });
      } else {
        setDateRange({ from: dateRange.from, to: selectedDate });
      }
      setIsSelecting(false);

      // Appeler le callback avec la plage complète
      const finalRange = selectedDate < dateRange.from
        ? { from: selectedDate, to: dateRange.from }
        : { from: dateRange.from, to: selectedDate };
      
      onRangeSelect(finalRange);
      
      // Fermer après un délai
      setTimeout(() => onClose(), 300);
    }
  };

  const isDateInRange = (day: number): boolean => {
    if (!dateRange.from || !dateRange.to) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= dateRange.from && date <= dateRange.to;
  };

  const isDateSelected = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (dateRange.from && date.getTime() === dateRange.from.getTime()) return true;
    if (dateRange.to && date.getTime() === dateRange.to.getTime()) return true;
    return false;
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Jours vides avant le premier jour du mois
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const inRange = isDateInRange(day);
      const isSelected = isDateSelected(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`text-center py-2 rounded font-medium transition-colors ${
            isSelected
              ? "bg-exford-blue text-white"
              : inRange
                ? "bg-exford-blue/20 text-exford-blue"
                : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "JJ/MM/AAAA";
    return date.toLocaleDateString(
      t("revenue.locale") === "fr" ? "fr-FR" : "en-US"
    );
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Déterminer la position du picker
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2";
      case "left":
        return "right-full mr-2";
      case "right":
        return "left-full ml-2";
      case "bottom":
      default:
        return "top-full mt-2";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={pickerRef}
      className={`absolute ${getPositionClasses()} left-0 p-4 bg-white rounded-lg border border-gray-200 shadow-lg w-fit z-50 ${className}`}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-charcoal-blue">
          {t("revenue.selectCustomPeriod")}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation du mois */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h2 className="text-base font-semibold text-gray-900">
          {currentMonth.toLocaleDateString(
            t("revenue.locale") === "fr" ? "fr-FR" : "en-US",
            { month: "long", year: "numeric" }
          )}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      {/* En-têtes des jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-2 mb-4">{renderDays()}</div>

      {/* Message d'aide quand seule la date de début est sélectionnée */}
      {dateRange.from && !dateRange.to && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 flex items-center gap-2">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sélectionnez la date de fin</span>
        </div>
      )}

      {/* Affichage de la période complète sélectionnée */}
      {dateRange.from && dateRange.to && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <strong>{t("revenue.selectedPeriod")}</strong>
          </div>
          <div className="ml-7">
            {t("revenue.from")} <strong>{formatDate(dateRange.from)}</strong>{" "}
            {t("revenue.to")} <strong>{formatDate(dateRange.to)}</strong>
          </div>
        </div>
      )}

      {/* Bouton de réinitialisation */}
      {(dateRange.from || dateRange.to) && (
        <button
          onClick={() => setDateRange({ from: undefined, to: undefined })}
          className="w-full mt-4 py-2 text-sm font-medium text-exford-blue hover:bg-exford-blue/10 rounded transition-colors"
        >
          Réinitialiser les dates
        </button>
      )}
    </div>
  );
}
