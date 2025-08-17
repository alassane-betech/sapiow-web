import { Expert, useListExperts } from "@/api/listExpert/useListExpert";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Professional } from "@/types/professional";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mapping function to convert Expert to Professional format
const mapExpertToProfessional = (expert: Expert): Professional => {
  const categoryMap: Record<string, string> = {
    Media: "media",
    Culture: "culture",
    Business: "business",
    Maison: "maison",
    Artisanat: "artisanat",
    Glow: "glow",
    Sport: "sport",
  };

  // Format avatar URL properly for Next.js Image
  const formatImageUrl = (avatarPath: string | null | undefined) => {
    // Avatar par défaut si pas de photo ou si chemin relatif du backend
    if (
      !avatarPath ||
      avatarPath.trim() === "" ||
      (!avatarPath.startsWith("http://") && !avatarPath.startsWith("https://"))
    ) {
      return "/assets/icons/defaultUser.jpg";
    }

    // Si c'est une URL complète, l'utiliser directement
    return avatarPath;
  };

  return {
    id: expert.id,
    name: `${expert.first_name} ${expert.last_name}`.trim(),
    first_name: expert.first_name,
    last_name: expert.last_name,
    price: expert.sessions[0]?.price,
    image: formatImageUrl(expert.avatar),
    avatar: expert.avatar,
    verified: true,
    category: categoryMap[expert.domains.name] || "business",
    domain: expert.domains.name,
    topExpertise: false,
    description:
      expert.description ||
      `${expert.job || "Expert"} spécialisé en ${expert.domains.name}`,
    linkedin: expert.linkedin,
    job: expert.job,
  };
};

export const useClientHome = () => {
  const router = useRouter();
  const { likedProfs, toggleLike } = useFavorites();

  // États
  const [selectedCategory, setSelectedCategory] = useState("top");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  // Données API
  const { data: expertList, isLoading, error } = useListExperts();

  // Convert API data to Professional format - handle both cases
  const expertsArray = Array.isArray(expertList)
    ? expertList
    : expertList?.data || [];
  const allProfessionals = expertsArray.map(mapExpertToProfessional);

  // Handlers
  const handleToggleLike = (profId: number) => {
    const professional = allProfessionals.find(
      (p: Professional) =>
        (typeof p.id === "string" ? parseInt(p.id, 10) || 0 : p.id) === profId
    );
    if (professional) {
      toggleLike(profId, professional);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Réinitialiser la sous-catégorie quand on change de catégorie
    setSelectedSubCategory(categoryId === "top" ? "tout" : "");
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleSortChange = (sortId: string) => {
    setSortOption(sortId);
  };

  const handleProfessionalClick = (professional: Professional) => {
    // Rediriger vers la page details avec l'ID du professionnel
    router.push(`/details?id=${professional.id}`);
  };

  // Grouper les professionnels par catégorie pour l'affichage "Top"
  const groupedProfessionals = allProfessionals.reduce(
    (acc: Record<string, Professional[]>, prof: Professional) => {
      const category = prof.category || "business";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(prof);
      return acc;
    },
    {} as Record<string, Professional[]>
  );

  // Filtrer les professionnels selon la catégorie sélectionnée
  const filteredProfessionals =
    selectedCategory === "top"
      ? allProfessionals
      : allProfessionals.filter((prof: Professional) => {
          // Filtrer par domain_id (selectedCategory est le domain_id en string)
          const expertWithDomain = expertsArray.find(
            (expert: any) => expert.id === prof.id
          );
          const matches =
            expertWithDomain?.domain_id.toString() === selectedCategory;

          return matches;
        });

  return {
    // États
    selectedCategory,
    selectedSubCategory,
    sortOption,

    // Données
    allProfessionals,
    groupedProfessionals,
    filteredProfessionals,
    likedProfs,

    // États API
    isLoading,
    error,

    // Handlers
    handleCategoryChange,
    handleSubCategoryChange,
    handleSortChange,
    handleToggleLike,
    handleProfessionalClick,
  };
};
