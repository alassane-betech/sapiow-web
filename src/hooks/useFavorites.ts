"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFavoriActive, setIsFavoriActive] = useState(false);
  const [previousPath, setPreviousPath] = useState("/");

  // Fonction pour vérifier si on est sur la page favori (avec support des locales)
  const isFavoriPage = (path: string) => {
    return path.endsWith("/favori") || path === "/favori";
  };

  // Sauvegarder le chemin précédent et mettre à jour l'état
  useEffect(() => {
    if (pathname) {
      const isOnFavoriPage = isFavoriPage(pathname);
      
      if (!isOnFavoriPage) {
        setPreviousPath(pathname);
      }
      
      setIsFavoriActive(isOnFavoriPage);
    }
  }, [pathname]);

  const handleFavoriToggle = () => {
    if (isFavoriActive) {
      // Si les favoris sont actifs, retourner à la page précédente
      setIsFavoriActive(false);
      router.push(previousPath);
    } else {
      // Si les favoris ne sont pas actifs, aller à la page favori
      // Extraire la locale du pathname actuel pour construire la bonne route
      const locale = pathname.split('/')[1]; // ex: 'fr' ou 'en'
      const favoriPath = `/${locale}/favori`;
      setIsFavoriActive(true);
      router.push(favoriPath);
    }
  };

  return {
    isFavoriActive,
    handleFavoriToggle,
  };
};
