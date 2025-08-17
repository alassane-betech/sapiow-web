import { useState, useMemo } from 'react';
import { useGetExpertises } from "@/api/domaine/useDomaine";
import { Professional } from "@/types/professional";

/**
 * Hook pour isoler la logique métier de la page details
 */
export const useDetailsLogic = (expertData: any) => {
  // États UI
  const [isOfferSheetOpen, setIsOfferSheetOpen] = useState(false);
  const [likedProfs, setLikedProfs] = useState<Record<string, boolean>>({});
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Récupérer les expertises pour le mapping
  const { data: expertises } = useGetExpertises(
    Number(expertData?.domain_id) || 0
  );

  // Mapper les expertise_id vers les noms des expertises
  const expertiseNames = useMemo(() => {
    if (!expertData?.pro_expertises || !expertises) return [];

    return expertData.pro_expertises.map((proExpertise: any) => {
      const expertise = expertises.find(
        (exp: any) => exp.id === proExpertise.expertise_id
      );
      return expertise
        ? expertise.name
        : `Expertise ${proExpertise.expertise_id}`;
    });
  }, [expertData?.pro_expertises, expertises]);

  // Transformer les données de l'expert en Professional
  const professional: Professional | null = useMemo(() => {
    if (!expertData) return null;

    return {
      id: expertData.id,
      name: `${expertData.first_name} ${expertData.last_name}`.trim(),
      first_name: expertData.first_name,
      last_name: expertData.last_name,
      price: expertData.sessions?.[0]?.price
        ? `${expertData.sessions[0].price} €`
        : "Non défini",
      image:
        expertData.avatar && expertData.avatar.startsWith("http")
          ? expertData.avatar
          : "/assets/icons/defaultUser.jpg",
      avatar: expertData.avatar,
      verified: true,
      category: "business",
      domain: "Expert",
      topExpertise: false,
      description:
        expertData.description || `Expert spécialisé en consultation`,
      linkedin: expertData.linkedin,
      job: expertData.job,
    };
  }, [expertData]);

  // Fonction pour gérer les likes
  const toggleLike = (profId: string) => {
    setLikedProfs((prev) => ({
      ...prev,
      [profId]: !prev[profId],
    }));
  };

  // Fonction pour vérifier si un professionnel est liké
  const isLiked = (profId: string) => {
    return likedProfs[profId] || false;
  };

  // Actions pour la modal d'offre
  const openOfferSheet = () => setIsOfferSheetOpen(true);
  const closeOfferSheet = () => setIsOfferSheetOpen(false);

  // Actions pour la description
  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return {
    // Données transformées
    professional,
    expertiseNames,
    
    // États UI
    isOfferSheetOpen,
    likedProfs,
    isDescriptionExpanded,
    
    // Actions
    toggleLike,
    isLiked,
    openOfferSheet,
    closeOfferSheet,
    setIsOfferSheetOpen,
    toggleDescriptionExpanded,
    setIsDescriptionExpanded,
  };
};
