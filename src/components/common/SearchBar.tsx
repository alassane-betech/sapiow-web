"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  className = "",
}) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="relative flex items-center bg-gray-100 rounded-[8px] px-4 py-3">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="text-gray-400 mr-3"
        />
        <input
          type="text"
          placeholder={placeholder || t("search.placeholder")}
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};
