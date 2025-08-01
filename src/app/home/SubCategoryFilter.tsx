"use client";
import Image from "next/image";

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
}

export default function SubCategoryFilter({
  selectedCategory,
  selectedSubCategory,
  onSubCategoryChange,
}: SubCategoryFilterProps) {
  const currentSubCategories = subCategories[selectedCategory] || [];

  if (currentSubCategories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 py-3 px-6 bg-gray-50">
      {currentSubCategories.map((subCategory) => (
        <button
          key={subCategory.id}
          onClick={() => onSubCategoryChange(subCategory.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedSubCategory === subCategory.id
              ? "bg-[#001E44] text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {subCategory.name}
        </button>
      ))}
      <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500">
        <span>Trier</span>
        <Image
          src="/assets/icons/sort.svg"
          alt="Sort"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
