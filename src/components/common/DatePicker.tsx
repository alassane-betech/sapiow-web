"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
interface DatePickerProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
  label: string;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
  label,
  disabled,
  className = "",
}: DatePickerProps) {
  return (
    <div className={`relative ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-6 w-full py-5 px-0 text-left font-normal border border-light-blue-gray cursor-pointer"
          >
            <div className="w-full flex items-center justify-between px-4">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={24}
                height={24}
                className="p-0"
              />
              <div className="text-base text-gray-500 mb-1">
                {selectedDate ? (
                  <span className="text-xs text-gray-500">
                    {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
                  </span>
                ) : (
                  label
                )}
              </div>
              <Image
                src="/assets/icons/dropdown.svg"
                alt="chevron-down"
                width={24}
                height={24}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="end">
          <Calendar
            className="bg-white border-none"
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={disabled}
            initialFocus
            locale={fr}
            classNames={{
              button_previous: "cursor-pointer",
              button_next: "cursor-pointer",
              day_button: "cursor-pointer",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
