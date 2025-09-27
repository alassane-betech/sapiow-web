"use client";

import { Button } from "@/components/common/Button";
import { Calendar } from "@/components/ui/calendar";
import { getFilterOptions } from "@/data/mockRevenue";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";

interface RevenueFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function RevenueFilters({
  activeFilter,
  onFilterChange,
}: RevenueFiltersProps) {
  const t = useI18n();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const filterOptions = getFilterOptions(t);

  const handleFilterChange = (filter: string) => {
    onFilterChange(filter);
    if (filter === "Personnalisé") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  // Fermer le calendrier quand on clique dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
        if (activeFilter === "Personnalisé") {
          onFilterChange("Ce mois-ci");
        }
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar, activeFilter, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-3 relative">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          label={option.label}
          variant={option.value === "Ce mois-ci" ? "default" : "ghost"}
          onClick={() => handleFilterChange(option.value)}
          className={`rounded-full px-2 text-exford-blue text-xs font-figtree ${
            option.value === "Personnalisé" ? "flex items-center gap-2" : ""
          } ${
            activeFilter === option.value
              ? "bg-pale-blue-gray hover:bg-blue-200"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          icon={
            option.value === "Personnalisé" ? (
              <Image
                src="/assets/icons/calendar.svg"
                alt={t("revenue.calendarAlt")}
                width={20}
                height={20}
              />
            ) : undefined
          }
        />
      ))}

      {/* Calendar for custom date selection */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-lg w-fit z-50"
        >
          <h3 className="text-sm font-medium text-charcoal-blue mb-3">
            {t("revenue.selectCustomPeriod")}
          </h3>
          <Calendar
            mode="range"
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
            className="rounded-md border w-fit"
            numberOfMonths={2}
          />
          {selectedDateRange?.from && selectedDateRange?.to && (
            <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-700">
              <strong>{t("revenue.selectedPeriod")}</strong>
              <br />
              {t("revenue.from")} {selectedDateRange.from.toLocaleDateString("fr-FR")} {t("revenue.to")}{" "}
              {selectedDateRange.to.toLocaleDateString("fr-FR")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
