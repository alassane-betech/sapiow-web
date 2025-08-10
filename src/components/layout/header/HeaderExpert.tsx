"use client";
import { SearchBar } from "@/components/common/SearchBar";
import Image from "next/image";

interface HeaderExpertProps {
  handleNotificationClick: () => void;
}

export default function HeaderExpert({
  handleNotificationClick,
}: HeaderExpertProps) {
  return (
    <div className="hidden lg:flex justify-between items-baseline w-full bg-white px-6 border-b-2 border-snow-blue py-[23px] sticky top-0 z-20">
      <h1 className="text-lg font-bold text-cobalt-blue-500">Mes Visios</h1>
      <div className="flex items-center gap-4">
        <SearchBar onSearch={() => {}} placeholder="Rechercher" />
        <button
          onClick={handleNotificationClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Image
            src="/assets/icons/notif.svg"
            alt="notifications"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
