"use client";
import {
  useGetFavorites,
  useRemoveFavorite,
} from "@/api/favorites/useFavorites";
import ProfessionalCard from "@/app/home/ProfessionalCard";
import { AppSidebar } from "@/components/layout/Sidebare";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { Professional } from "@/types/professional";
import { withAuth } from "@/components/common/withAuth";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

// Fonction pour convertir les données API en format Professional
const mapFavoriteToProfessional = (favorite: any): Professional => {
  const pro = favorite.pros;

  const formatImageUrl = (avatarPath: string | null | undefined) => {
    if (
      !avatarPath ||
      avatarPath.trim() === "" ||
      (!avatarPath.startsWith("http://") && !avatarPath.startsWith("https://"))
    ) {
      return "/assets/icons/defaultUser.jpg";
    }
    return avatarPath;
  };

  const categoryMap: Record<string, string> = {
    Media: "media",
    Culture: "culture",
    Business: "business",
    Maison: "maison",
    Artisanat: "artisanat",
    Glow: "glow",
    Sport: "sport",
  };

  return {
    id: pro.id,
    name: `${pro.first_name} ${pro.last_name}`.trim(),
    first_name: pro.first_name,
    last_name: pro.last_name,
    price: pro.sessions?.[0]?.price,
    image: formatImageUrl(pro.avatar),
    avatar: pro.avatar,
    verified: true,
    category: categoryMap[pro.domains?.name] || "business",
    domain: pro.domains?.name,
    topExpertise: false,
    description:
      pro.description ||
      `${pro.job || "Expert"} spécialisé en ${pro.domains?.name}`,
    linkedin: pro.linkedin,
    job: pro.job,
  };
};

function Favori() {
  const { data: favoritesData, isLoading, error } = useGetFavorites();
  const removeFavoriteMutation = useRemoveFavorite();
  const router = useRouter();

  // Convertir les favoris API en format Professional
  const favoriteProfessionals = useMemo(() => {
    if (!favoritesData || !Array.isArray(favoritesData)) return [];
    return favoritesData.map(mapFavoriteToProfessional);
  }, [favoritesData]);

  const handleToggleLike = async (profId: string) => {
    try {
      await removeFavoriteMutation.mutateAsync(profId);
    } catch (error) {
      console.error("Erreur lors de la suppression du favori:", error);
    }
  };

  const handleProfessionalClick = (professional: Professional) => {
    router.push(`/details?id=${professional.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex">
        <AppSidebar />
        <div className="w-full flex-1">
          <HeaderClient text="Mes Favoris" isBack={true} />
          <div className="container">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-exford-blue mx-auto"></div>
              <p className="mt-4 text-gray-500">Chargement de vos favoris...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <AppSidebar />
        <div className="w-full flex-1">
          <HeaderClient text="Mes Favoris" isBack={true} />
          <div className="container">
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">
                Erreur lors du chargement des favoris
              </div>
              <p className="text-gray-400">
                {error.message || "Erreur inconnue"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full flex-1">
        <HeaderClient text="Mes Favoris" isBack={true} />
        <div className="container">
          {favoriteProfessionals.length === 0 ? (
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
              {favoriteProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  isLiked={true} // Tous sont favoris dans cette page
                  onToggleLike={(id) => handleToggleLike(id)}
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

export default withAuth(Favori);
