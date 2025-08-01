"use client";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "top", name: "Top", icon: "/assets/icons/star.svg" },
  { id: "maison", name: "Maison", icon: "/assets/icons/home.svg" },
  { id: "business", name: "Business", icon: "/assets/icons/business.svg" },
  { id: "media", name: "Media", icon: "/assets/icons/podcast.svg" },
  { id: "artisanat", name: "Artisanat", icon: "/assets/icons/paintRoller.svg" },
  { id: "culture", name: "Culture", icon: "/assets/icons/culture.svg" },
  { id: "glow", name: "Glow", icon: "/assets/icons/meditation.svg" },
  { id: "sport", name: "Sport", icon: "/assets/icons/balls.svg" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer`}
        >
          <div
            className={`w-12 h-12 p-[3px] rounded-full flex items-center justify-center ${
              selectedCategory === category.id ? "bg-[#001E44]" : "bg-snow-blue"
            }`}
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={20}
              height={20}
              className={`transition-all duration-200 ${
                selectedCategory === category.id
                  ? "filter brightness-0 invert"
                  : ""
              }`}
            />
          </div>
          <span className="text-xs font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
