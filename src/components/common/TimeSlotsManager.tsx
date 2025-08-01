"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export default function TimeSlotsManager() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", startTime: "10h30", endTime: "11h00" },
    { id: "2", startTime: "12h00", endTime: "12h30" },
  ]);

  // Générer les options d'heures (de 8h00 à 20h00 par tranches de 30 minutes)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      times.push(`${hour}h00`);
      if (hour < 20) {
        times.push(`${hour}h30`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: "9h00",
      endTime: "9h30",
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const updateTimeSlot = (
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    );
  };

  const copyTimeSlot = (slot: TimeSlot) => {
    const text = `${slot.startTime} à ${slot.endTime}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <Card className="p-4 sm:p-6 bg-gray-50 border-gray-200">
        <div className="space-y-4">
          {timeSlots.map((slot) => (
            <div key={slot.id} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Select
                  value={slot.startTime}
                  onValueChange={(value) =>
                    updateTimeSlot(slot.id, "startTime", value)
                  }
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-500 text-sm whitespace-nowrap">
                  à
                </span>
                <Select
                  value={slot.endTime}
                  onValueChange={(value) =>
                    updateTimeSlot(slot.id, "endTime", value)
                  }
                >
                  <SelectTrigger className="w-20 sm:w-32 bg-white border-gray-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => copyTimeSlot(slot)}
                >
                  <Link className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
                  onClick={() => removeTimeSlot(slot.id)}
                  disabled={timeSlots.length === 1}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={addTimeSlot}
            className="w-full mt-6 py-4 sm:py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Ajouter une disponibilité
          </Button>
        </div>
      </Card>
    </div>
  );
}
