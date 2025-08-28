"use client";
import { Professional } from "@/types/professional";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: Professional[];
  likedProfs: Record<number, boolean>;
  addToFavorites: (professional: Professional) => void;
  removeFromFavorites: (professionalId: number) => void;
  toggleLike: (professionalId: number, professional?: Professional) => void;
  isFavorite: (professionalId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Professional[]>([]);
  const [likedProfs, setLikedProfs] = useState<Record<number, boolean>>({});

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      const savedLikedProfs = localStorage.getItem("likedProfs");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      if (savedLikedProfs) {
        setLikedProfs(JSON.parse(savedLikedProfs));
      }
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("likedProfs", JSON.stringify(likedProfs));
    }
  }, [favorites, likedProfs]);

  const addToFavorites = (professional: Professional) => {
    setFavorites((prev) => {
      if (!prev.find((fav) => fav.id === professional.id)) {
        return [...prev, professional];
      }
      return prev;
    });
  };

  const removeFromFavorites = (professionalId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== professionalId));
  };

  const toggleLike = (professionalId: number, professional?: Professional) => {
    setLikedProfs((prev) => {
      const newLikedProfs = {
        ...prev,
        [professionalId]: !prev[professionalId],
      };

      // Si on aime le professionnel et qu'on a les données, l'ajouter aux favoris
      if (newLikedProfs[professionalId] && professional) {
        addToFavorites(professional);
      }
      // Si on n'aime plus le professionnel, le retirer des favoris
      else if (!newLikedProfs[professionalId]) {
        removeFromFavorites(professionalId);
      }

      return newLikedProfs;
    });
  };

  const isFavorite = (professionalId: number) => {
    return likedProfs[professionalId] || false;
  };

  const value: FavoritesContextType = {
    favorites,
    likedProfs,
    addToFavorites,
    removeFromFavorites,
    toggleLike,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
