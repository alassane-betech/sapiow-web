"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const router = useRouter();
  const [isFavoriActive, setIsFavoriActive] = useState(false);
  const [previousPath, setPreviousPath] = useState("/");

  // Sauvegarder le chemin précédent quand on n'est pas sur la page favori
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath !== "/favori") {
        setPreviousPath(currentPath);
      }
      // Vérifier si on est sur la page favori pour mettre à jour l'état
      setIsFavoriActive(currentPath === "/favori");
    }
  }, []);

  const handleFavoriToggle = () => {
    if (isFavoriActive) {
      router.back();
      // Si les favoris sont actifs, retourner à la page précédente
      setIsFavoriActive(false);
      router.push(previousPath);
    } else {
      // Si les favoris ne sont pas actifs, aller à la page favori
      setIsFavoriActive(true);
      router.push("/favori");
    }
  };

  return {
    isFavoriActive,
    handleFavoriToggle,
  };
};
