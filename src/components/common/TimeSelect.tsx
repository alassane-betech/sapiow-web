"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const timeOptions = [
  "08h00",
  "08h30",
  "09h00",
  "09h30",
  "10h00",
  "10h30",
  "11h00",
  "11h30",
  "12h00",
  "12h30",
  "13h00",
  "13h30",
  "14h00",
  "14h30",
  "15h00",
  "15h30",
  "16h00",
  "16h30",
  "17h00",
  "17h30",
  "18h00",
  "18h30",
  "19h00",
  "19h30",
];

export default function TimeSelect({
  value,
  onValueChange,
  className = "w-24 bg-white border border-light-blue-gray text-exford-blue font-bold text-sm",
}: TimeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-sm font-bold bg-white border border-light-blue-gray">
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time} className="cursor-pointer">
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
