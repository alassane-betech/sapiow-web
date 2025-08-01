import { SearchBar } from "@/components/common/SearchBar";
import Image from "next/image";
import React from "react";

interface PageHeaderProps {
  title: string;
  onNotificationClick?: () => void;
  searchPlaceholder?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onNotificationClick,
  searchPlaceholder = "Rechercher",
  className = "",
}) => (
  <div
    className={`flex justify-between items-center w-full bg-white px-4 sm:px-6 border-b-2 border-snow-blue py-3 sm:py-[23px] sticky top-0 z-20 ${className}`}
  >
    <h1 className="text-base sm:text-lg font-bold text-cobalt-blue-500 whitespace-nowrap">
      {title}
    </h1>
    <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
      <div className="w-40 sm:w-64 md:w-80">
        <SearchBar onSearch={() => {}} placeholder={searchPlaceholder} />
      </div>
      <button
        onClick={onNotificationClick}
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
