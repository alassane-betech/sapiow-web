"use client";
import {
  useGetFavorites,
  useRemoveFavorite,
} from "@/api/favorites/useFavorites";
import { withAuth } from "@/components/common/withAuth";
import { AppSidebar } from "@/components/layout/Sidebare";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { useUserStore } from "@/store/useUser";
import { Professional } from "@/types/professional";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import ProfessionalCard from "../home/ProfessionalCard";
import { useI18n } from "@/locales/client";

// Fonction pour convertir les données API en format Professional
const mapFavoriteToProfessional = (favorite: any, t: any): Professional => {
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

  // Fonction pour obtenir le nom traduit de la catégorie
  const getCategoryDisplayName = (domainName: string) => {
    const categoryKey = categoryMap[domainName];
    if (categoryKey) {
      return t(`categories.${categoryKey}`);
    }
    return domainName; // Fallback au nom original si pas de traduction
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
      `${pro.job || t("expertDetails.expert")} ${t("categories.specializedIn")} ${getCategoryDisplayName(pro.domains?.name)}`,
    linkedin: pro.linkedin,
    job: pro.job,
  };
};

function Favori() {
  const t = useI18n();
  const { user: userClient } = useUserStore();
  const { data: favoritesData, isLoading, error } = useGetFavorites();
  const removeFavoriteMutation = useRemoveFavorite();
  const router = useRouter();

  // Convertir les favoris API en format Professional
  const favoriteProfessionals = useMemo(() => {
    if (!favoritesData || !Array.isArray(favoritesData)) return [];
    return favoritesData.map((favorite) => mapFavoriteToProfessional(favorite, t));
  }, [favoritesData, t]);

  const handleToggleLike = async (profId: string) => {
    try {
      await removeFavoriteMutation.mutateAsync(profId);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleProfessionalClick = (professional: Professional) => {
    router.push(`/details?id=${professional.id}`);
  };

  useEffect(() => {
    if (userClient.type === "expert") {
      router.push("/");
    }
  }, [userClient, router]);

  if (isLoading) {
    return (
      <div className="flex">
        <AppSidebar />
        <div className="w-full flex-1">
          <HeaderClient
            text={t("favorites.title")}
            isBack={true}
            classNameIsBack="py-1"
          />
          <div className="container">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-exford-blue mx-auto"></div>
              <p className="mt-4 text-gray-500">{t("favorites.loading")}</p>
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
          <HeaderClient
            text={t("favorites.title")}
            isBack={true}
            classNameIsBack="py-1"
          />
          <div className="container">
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">
                {t("favorites.error")}
              </div>
              <p className="text-gray-400">
                {error.message || t("favorites.unknownError")}
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
        <HeaderClient text={t("favorites.title")} isBack={true} classNameIsBack="py-1" />
        <div className="container">
          {favoriteProfessionals.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                {t("favorites.noFavorites")}
              </div>
              <p className="text-gray-400">
                {t("favorites.noFavoritesDescription")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:px-4">
              {favoriteProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  isLiked={true} // Tous sont favoris dans cette page
                  onToggleLike={(id) => handleToggleLike(id)}
                  onProfessionalClick={handleProfessionalClick}
                  isLoadingFavorite={removeFavoriteMutation.isPending}
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
