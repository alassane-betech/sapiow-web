"use client";
import ProfessionalCard from "@/app/home/ProfessionalCard";
import { AppSidebar } from "@/components/layout/Sidebare";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRouter } from "next/navigation";

export default function Favori() {
  const { favorites, toggleLike, isFavorite } = useFavorites();
  const router = useRouter();

  const handleProfessionalClick = (professional: any) => {
    router.push(`/details?id=${professional.id}`);
  };

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full flex-1">
        <HeaderClient text="Mes Favoris" isBack={true} />
        <div className=" container">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                Aucun professionnel en favori pour le moment
              </div>
              <p className="text-gray-400">
                Ajoutez des professionnels à vos favoris en cliquant sur le cœur
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:px-4">
              {favorites.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  isLiked={isFavorite(professional.id)}
                  onToggleLike={(id) => toggleLike(id, professional)}
                  onProfessionalClick={handleProfessionalClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
