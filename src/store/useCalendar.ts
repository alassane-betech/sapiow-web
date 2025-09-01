import { create } from "zustand";

interface CalendarStore {
  selectedDate: Date | null;
  currentDate: Date;
  setSelectedDate: (date: Date | null) => void;
  setCurrentDate: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
  clearSelection: () => void;
  navigateMonth: (direction: "prev" | "next") => void;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  selectedDate: null,
  currentDate: new Date(),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setCurrentDate: (date) => set({ currentDate: date }),

  isDateSelected: (date) => {
    const { selectedDate } = get();
    if (!selectedDate) return false;

    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  },

  clearSelection: () => set({ selectedDate: null }),

  navigateMonth: (direction) => {
    const { currentDate } = get();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    set({ currentDate: newDate });
  },
}));
