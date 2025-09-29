"use client";
import { Professional } from "@/types/professional";
import ProfessionalCard from "./ProfessionalCard";
import { useI18n } from "@/locales/client";

interface CategorySectionProps {
  category: string;
  professionals: Professional[];
  likedProfs: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onProfessionalClick?: (professional: Professional) => void;
  isMutatingFavorite?: boolean;
}

export default function CategorySection({
  category,
  professionals,
  likedProfs,
  onToggleLike,
  onProfessionalClick,
  isMutatingFavorite = false,
}: CategorySectionProps) {
  const t = useI18n();

  // Fonction pour obtenir le nom traduit de la catégorie
  const getCategoryDisplayName = (categoryKey: string) => {
    const categoryTranslations: Record<string, string> = {
      maison: t("categories.maison"),
      business: t("categories.business"),
      media: t("categories.media"),
      culture: t("categories.culture"),
      glow: t("categories.glow"),
      sport: t("categories.sport"),
      artisanat: t("categories.artisanat"),
    };
    
    return categoryTranslations[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  };
  if (professionals.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-exford-blue font-figtree">
          {getCategoryDisplayName(category)}
        </h2>
        <button className="text-xs text-cobalt-blue font-medium cursor-pointer pr-4">
          {t("expertDetails.seeAll")} →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
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
