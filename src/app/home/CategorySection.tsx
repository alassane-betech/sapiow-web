"use client";
import { Professional } from "@/types/professional";
import ProfessionalCard from "./ProfessionalCard";

interface CategorySectionProps {
  categoryName: string;
  professionals: Professional[];
  likedProfs: Record<number, boolean>;
  onToggleLike: (id: number) => void;
  onProfessionalClick?: (professional: Professional) => void;
}

const categoryDisplayNames: Record<string, string> = {
  maison: "Maison",
  business: "Business",
  media: "Media",
  culture: "Culture",
  glow: "Glow",
  sport: "Sport",
  artisanat: "Artisanat",
};

export default function CategorySection({
  categoryName,
  professionals,
  likedProfs,
  onToggleLike,
  onProfessionalClick,
}: CategorySectionProps) {
  if (professionals.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-exford-blue font-figtree">
          {categoryDisplayNames[categoryName] || categoryName}
        </h2>
        <button className="text-xs text-cobalt-blue font-medium cursor-pointer">
          Voir tout →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            isLiked={likedProfs[professional.id] || false}
            onToggleLike={onToggleLike}
            onProfessionalClick={onProfessionalClick}
          />
        ))}
      </div>
    </div>
  );
}
