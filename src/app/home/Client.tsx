"use client";
import { useClientHome } from "@/hooks/useClientHome";
import CategoryFilter from "./CategoryFilter";
import CategorySection from "./CategorySection";
import ProfessionalCard from "./ProfessionalCard";
import SubCategoryFilter from "./SubCategoryFilter";

export default function Client() {
  const {
    selectedCategory,
    selectedSubCategory,
    groupedProfessionals,
    filteredProfessionals,
    likedProfs,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSortChange,
    handleToggleLike,
    handleProfessionalClick,
    isLoading,
    error,
  } = useClientHome();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-exford-blue"></div>
          <p className="mt-4 text-lg text-exford-blue">
            Chargement des experts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">
            Erreur lors du chargement des experts
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {error.message || "Erreur inconnue"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h2 className="my-2 text-lg lg:text-2xl font-normal text-exford-blue font-figtree">
        Accélérez votre projet, Réservez une Visio.
      </h2>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {selectedCategory !== "top" && (
        <SubCategoryFilter
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSubCategoryChange={handleSubCategoryChange}
          onSortChange={handleSortChange}
        />
      )}

      {selectedCategory === "top" ? (
        // Affichage par sections pour "Top"
        <div className="py-6 ">
          {Object.entries(groupedProfessionals).map(
            ([category, categoryProfessionals]) => (
              <CategorySection
                key={category}
                categoryName={category}
                professionals={categoryProfessionals}
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
              isLiked={
                likedProfs[
                  typeof professional.id === "string"
                    ? parseInt(professional.id, 10) || 0
                    : professional.id
                ] || false
              }
              onToggleLike={handleToggleLike}
              onProfessionalClick={handleProfessionalClick}
              lineClamp={3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
