"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // Utiliser le hook de next-intl
  const [isFavoriActive, setIsFavoriActive] = useState(false);
  const [previousPath, setPreviousPath] = useState(`/${locale}/home`);

  // Fonction pour vérifier si on est sur la page favori (avec support des locales)
  const isFavoriPage = (path: string) => {
    return path.endsWith("/favori") || path === "/favori";
  };

  // Sauvegarder le chemin précédent et mettre à jour l'état
  useEffect(() => {
    if (pathname) {
      const isOnFavoriPage = isFavoriPage(pathname);
      
      if (!isOnFavoriPage) {
        // Construire le chemin complet avec la locale
        const fullPath = `/${locale}${pathname}`;
        setPreviousPath(fullPath);
      }
      
      setIsFavoriActive(isOnFavoriPage);
    }
  }, [pathname, locale]);

  const handleFavoriToggle = () => {
    if (isFavoriActive) {
      // Si les favoris sont actifs, retourner à la page précédente
      setIsFavoriActive(false);
      router.replace(previousPath);
    } else {
      // Si les favoris ne sont pas actifs, aller à la page favori
      // Utiliser la locale du hook next-intl pour construire la bonne route
      const favoriPath = `/${locale}/favori`;
      setIsFavoriActive(true);
      router.replace(favoriPath);
    }
  };

  return {
    isFavoriActive,
    handleFavoriToggle,
  };
};
