export const DOMAIN_SPECIALTIES: Record<string, string[]> = {
  maison: ["Décoration", "Bricolage", "Jardinage", "Rénovation"],
  business: ["Stratégie", "Comptabilité", "RH", "Marketing", "Juridique"],
  artisanat: ["Couture", "Menuiserie", "Bijouterie", "Céramique"],
  culture: [
    "Cinéma",
    "Radio",
    "Littérature",
    "Musique",
    "Événements",
    "Musée",
    "Mode",
    "Voyage",
  ],
  media: ["Journalisme", "TV", "Podcast", "Réseaux sociaux"],
  glow: ["Beauté", "Bien-être", "Coaching", "Nutrition"],
  sport: ["Football", "Tennis", "Yoga", "Fitness", "Natation"],
};

// Icônes personnalisées SVG
export const DOMAIN_ICONS = {
  maison: {
    inactive: "/assets/icons/home.svg",
    active: "/assets/icons/Homeactif.svg",
  },
  business: {
    inactive: "/assets/icons/business.svg",
    active: "/assets/icons/businessActif.svg",
  },
  artisanat: {
    inactive: "/assets/icons/paintRoller.svg",
    active: "/assets/icons/paintRollerActif.svg",
  },
  culture: {
    inactive: "/assets/icons/culture.svg",
    active: "/assets/icons/cultureActif.svg",
  },
  media: {
    inactive: "/assets/icons/podcast.svg",
    active: "/assets/icons/podcastActifsvg.svg",
  },
  glow: {
    inactive: "/assets/icons/meditation.svg",
    active: "/assets/icons/meditationActifsvg.svg",
  },
  sport: {
    inactive: "/assets/balls.svg",
    active: "/assets/ballsActif.svg",
  },
};

// Fonction utilitaire pour obtenir l'icône appropriée
export const getDomainIcon = (
  domainId: string,
  isActive: boolean = false
): string => {
  const iconPaths = DOMAIN_ICONS[domainId as keyof typeof DOMAIN_ICONS];
  if (!iconPaths) {
    return DOMAIN_ICONS.maison.inactive; // Fallback
  }
  return isActive ? iconPaths.active : iconPaths.inactive;
};

export const DOMAINS = [
  { id: "maison", name: "Maison" },
  { id: "business", name: "Business" },
  { id: "artisanat", name: "Artisanat" },
  { id: "culture", name: "Culture" },
  { id: "media", name: "Media" },
  { id: "glow", name: "Glow" },
  { id: "sport", name: "Sport" },
];
