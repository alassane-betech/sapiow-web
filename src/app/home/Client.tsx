"use client";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Professional } from "@/types/professional";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import CategorySection from "./CategorySection";
import ProfessionalCard from "./ProfessionalCard";

const professionals = [
  {
    id: 1,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro2.png",
    verified: false,
    category: "business",
    topExpertise: true,
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 22,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 2,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "glow",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 3,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "media",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 4,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "culture",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 5,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "sport",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 6,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "maison",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 7,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "maison",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 15,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 8,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    category: "top",
    topExpertise: true,
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 9,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 10,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 11,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 12,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 13,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 14,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  // Duplication du tableau avec des IDs uniques
  {
    id: 16,
    name: "Marie-Claire Dubois",
    price: "189.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
    topExpertise: true,
    description:
      "Consultante en stratégie digitale, Ex-Google, Formatrice en innovation",
  },
  {
    id: 17,
    name: "Dr Sophie Martin",
    price: "135.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
    description:
      "Psychologue du travail, Coach certifiée, Spécialiste en développement personnel",
  },
  {
    id: 18,
    name: "Dr Claire Rousseau",
    price: "145.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
    description:
      "Nutritionniste holistique, Autrice bestseller, Experte en bien-être",
  },
  {
    id: 19,
    name: "Thomas Leroy",
    price: "210.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "media",
    description:
      "Journaliste senior, Producteur TV, Consultant en communication",
  },
  {
    id: 20,
    name: "Dr Isabelle Moreau",
    price: "155.00 €",
    image: "/assets/icons/pro1.png",
    verified: false,
    category: "culture",
    description:
      "Historienne de l'art, Curatrice d'expositions, Critique culturelle",
  },
  {
    id: 21,
    name: "Antoine Girard",
    price: "175.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
    description:
      "Coach sportif professionnel, Ex-athlète olympique, Préparateur mental",
  },
  {
    id: 23,
    name: "Dr Nathalie Blanc",
    price: "130.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "maison",
    description: "Architecte d'intérieur, Designer, Experte en feng shui",
  },
  {
    id: 24,
    name: "Dr Caroline Petit",
    price: "125.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "maison",
    description:
      "Décoratrice professionnelle, Styliste maison, Consultante en aménagement",
  },
  {
    id: 25,
    name: "Dr Valérie Roux",
    price: "140.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "top",
    description:
      "Médecin esthétique, Formatrice internationale, Experte anti-âge",
  },
  {
    id: 26,
    name: "Dr Patricia Durand",
    price: "160.00 €",
    image: "/assets/icons/pro2.png",
    category: "top",
    topExpertise: true,
    description:
      "Chirurgienne plasticienne, Pionnière en médecine régénérative",
  },
  {
    id: 27,
    name: "Dr Sylvie Garnier",
    price: "115.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "top",
    description:
      "Dermatologue spécialisée, Chercheuse en cosmétologie, Autrice scientifique",
  },
  {
    id: 28,
    name: "Dr Monique Fabre",
    price: "150.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Endocrinologue, Spécialiste hormones, Experte en santé féminine",
  },
  {
    id: 29,
    name: "Dr Brigitte Simon",
    price: "165.00 €",
    image: "/assets/icons/pro1.png",
    verified: false,
    category: "top",
    description:
      "Gynécologue obstétricienne, Formatrice médicale, Consultante santé",
  },
  {
    id: 30,
    name: "Dr Françoise Bonnet",
    price: "180.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Cardiologue interventionnelle, Chercheuse clinique, Experte prévention",
  },
  {
    id: 31,
    name: "Dr Michèle Laurent",
    price: "170.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "top",
    description:
      "Neurologue spécialisée, Experte en neurosciences, Consultante bien-être mental",
  },
  {
    id: 32,
    name: "Dr Jacqueline Mercier",
    price: "195.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "top",
    description:
      "Oncologue renommée, Chercheuse en immunothérapie, Conférencière internationale",
  },
];

export default function Client() {
  const router = useRouter();
  const { likedProfs, toggleLike } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<string>("top");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>("tout");

  const handleToggleLike = (profId: number) => {
    const professional = professionals.find((p) => p.id === profId);
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

  const handleProfessionalClick = (professional: Professional) => {
    // Rediriger vers la page details avec l'ID du professionnel
    router.push(`/details?id=${professional.id}`);
  };

  // Grouper les professionnels par catégorie pour l'affichage "Top"
  const groupedProfessionals = professionals.reduce((acc, prof) => {
    if (!acc[prof.category]) {
      acc[prof.category] = [];
    }
    acc[prof.category].push(prof);
    return acc;
  }, {} as Record<string, typeof professionals>);

  // Filtrer les professionnels selon la catégorie sélectionnée
  const filteredProfessionals =
    selectedCategory === "top"
      ? professionals
      : professionals.filter((prof) => prof.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <h2 className="my-2 text-2xl font-normal text-exford-blue font-figtree">
        Accélérez votre projet, Réservez une Visio.
      </h2>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {/* <SubCategoryFilter
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onSubCategoryChange={handleSubCategoryChange}
      /> */}

      {selectedCategory === "top" ? (
        // Affichage par sections pour "Top"
        <div className="py-6 ">
          {Object.entries(groupedProfessionals).map(
            ([category, professionals]) => (
              <CategorySection
                key={category}
                categoryName={category}
                professionals={professionals}
                likedProfs={likedProfs}
                onToggleLike={handleToggleLike}
                onProfessionalClick={handleProfessionalClick}
              />
            )
          )}
        </div>
      ) : (
        // Affichage normal pour les autres catégories
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:px-4">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              isLiked={likedProfs[professional.id] || false}
              onToggleLike={handleToggleLike}
              onProfessionalClick={handleProfessionalClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
