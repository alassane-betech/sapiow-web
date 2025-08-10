"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";

interface SubCategory {
  id: string;
  name: string;
}

const subCategories: Record<string, SubCategory[]> = {
  top: [
    { id: "tout", name: "Tout" },
    { id: "influenceur", name: "Influenceur" },
    { id: "presentateur", name: "Présentateur" },
    { id: "journaliste", name: "Journaliste" },
    { id: "animateur", name: "Animateur radio" },
    { id: "youtubeur", name: "Youtubeur" },
  ],
  maison: [
    { id: "decoration", name: "Décoration" },
    { id: "jardinage", name: "Jardinage" },
    { id: "bricolage", name: "Bricolage" },
    { id: "cuisine", name: "Cuisine" },
  ],
  business: [
    { id: "entrepreneur", name: "Entrepreneur" },
    { id: "consultant", name: "Consultant" },
    { id: "coach", name: "Coach" },
    { id: "finance", name: "Finance" },
  ],
  media: [
    { id: "podcast", name: "Podcast" },
    { id: "radio", name: "Radio" },
    { id: "television", name: "Télévision" },
    { id: "streaming", name: "Streaming" },
  ],
  artisanat: [
    { id: "menuiserie", name: "Menuiserie" },
    { id: "poterie", name: "Poterie" },
    { id: "couture", name: "Couture" },
    { id: "bijouterie", name: "Bijouterie" },
  ],
  culture: [
    { id: "litterature", name: "Littérature" },
    { id: "cinema", name: "Cinéma" },
    { id: "musique", name: "Musique" },
    { id: "theatre", name: "Théâtre" },
  ],
  glow: [
    { id: "beaute", name: "Beauté" },
    { id: "wellness", name: "Wellness" },
    { id: "meditation", name: "Méditation" },
    { id: "fitness", name: "Fitness" },
  ],
  sport: [
    { id: "football", name: "Football" },
    { id: "basketball", name: "Basketball" },
    { id: "tennis", name: "Tennis" },
    { id: "natation", name: "Natation" },
  ],
};

interface SubCategoryFilterProps {
  selectedCategory: string;
  selectedSubCategory: string;
  onSubCategoryChange: (subCategoryId: string) => void;
  onSortChange?: (sortOption: string) => void;
}

const sortOptions = [
  { id: "recommended", name: "Recommandé" },
  { id: "price_low", name: "Prix le plus bas" },
  { id: "price_high", name: "Prix le plus élevé" },
];

export default function SubCategoryFilter({
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange,
  onSortChange,
}: SubCategoryFilterProps) {
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const currentSubCategories = subCategories[selectedCategory] || [];

  if (currentSubCategories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3 px-0 lg:px-6">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide flex-1 min-w-0">
        {currentSubCategories.map((subCategory) => (
          <button
            key={subCategory.id}
            onClick={() => onSubCategoryChange(subCategory.id)}
            className={`text-exford-blue px-4 py-2 rounded-full border border-light-blue-gray text-base font-normal font-figtree transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
              selectedSubCategory === subCategory.id ? "bg-snow-blue" : ""
            }`}
          >
            {subCategory.name}
          </button>
        ))}
      </div>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button className="w-[98px] h-[40px] rounded-[8px] border border-light-blue-gray flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-500 cursor-pointer flex-shrink-0">
            <Image
              src="/assets/icons/sort.svg"
              alt="Sort"
              width={24}
              height={24}
            />
            <span className="text-exford-blue text-base font-bold font-figtree">
              Trier
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className=" bg-white w-56 p-0 rounded-[12px] border border-[#E2E2E2]"
          align="end"
        >
          <div>
            {sortOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedSort(option.id);
                  onSortChange?.(option.id);
                  setIsPopoverOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors border-b border-light-blue-gray cursor-pointer ${
                  index === sortOptions.length - 1 ? "border-b-0" : ""
                }`}
              >
                <span className="text-base font-normal text-gray-900">
                  {option.name}
                </span>
                {selectedSort === option.id && (
                  <Image
                    src="/assets/icons/check.svg"
                    alt="Check"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
