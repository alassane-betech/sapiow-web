"use client";

import { Button } from "@/components/common/Button";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

interface RevenueFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onCustomDateRangeChange?: (range: DateRange | undefined) => void;
}

export default function RevenueFilters({
  activeFilter,
  onFilterChange,
  onCustomDateRangeChange,
}: RevenueFiltersProps) {
  const t = useTranslations();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  // Options de filtre avec traductions
  const filterOptions = [
    { label: t("revenue.thisMonth"), value: "Ce mois-ci" },
    { label: t("revenue.thisQuarter"), value: "Ce trimestre" },
    { label: t("revenue.custom"), value: "Personnalisé" },
  ];

  const handleFilterChange = (filter: string) => {
    onFilterChange(filter);
    if (filter === "Personnalisé") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  };

  // Gérer la sélection d'une plage de dates
  const handleRangeSelect = (range: DateRange) => {
    setSelectedDateRange(range);
    if (onCustomDateRangeChange) {
      onCustomDateRangeChange(range);
    }
  };

  // Gérer la fermeture du calendrier
  const handleClosePicker = () => {
    setShowCalendar(false);
    // Revenir au filtre par défaut si aucune plage n'est sélectionnée
    if (activeFilter === "Personnalisé" && !selectedDateRange?.to) {
      onFilterChange("Ce mois-ci");
    }
  };

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

      {/* Date Range Picker */}
      <DateRangePicker
        isOpen={showCalendar}
        onClose={handleClosePicker}
        onRangeSelect={handleRangeSelect}
        selectedRange={selectedDateRange}
        position="bottom"
      />
    </div>
  );
}
