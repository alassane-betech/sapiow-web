"use client";
import { Professional } from "@/types/professional";
import ProfessionalCard from "./ProfessionalCard";

interface CategorySectionProps {
  category: string;
  professionals: Professional[];
  likedProfs: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onProfessionalClick?: (professional: Professional) => void;
  isMutatingFavorite?: boolean;
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
  category,
  professionals,
  likedProfs,
  onToggleLike,
  onProfessionalClick,
  isMutatingFavorite = false,
}: CategorySectionProps) {
  if (professionals.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-exford-blue font-figtree">
          {categoryDisplayNames[category] || category}
        </h2>
        <button className="text-xs text-cobalt-blue font-medium cursor-pointer">
          Voir tout →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {professionals.map((professional) => {
          const profIdString = professional.id.toString();
          const isLiked = likedProfs[profIdString] || false;

          return (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              isLiked={isLiked}
              onToggleLike={onToggleLike}
              onProfessionalClick={onProfessionalClick}
              isLoadingFavorite={isMutatingFavorite}
              lineClamp={3}
            />
          );
        })}
      </div>
    </div>
  );
}
