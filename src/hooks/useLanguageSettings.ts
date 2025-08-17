import { useGetCustomer, useUpdateCustomer } from '@/api/customer/useCustomer';
import { useGetProExpert, useUpdateProExpert } from '@/api/proExpert/useProExpert';
import { useUserStore } from '@/store/useUser';
import { useCallback, useMemo } from 'react';

export interface LanguageSettings {
  currentLanguage: string;
  isLoading: boolean;
  error: string | null;
  handleLanguageChange: (languageId: string) => Promise<void>;
}

/**
 * Hook adaptatif pour gérer les paramètres de langue
 * Détecte automatiquement le type d'utilisateur (client/expert) et utilise l'API appropriée
 */
export const useLanguageSettings = (): LanguageSettings => {
  const { user } = useUserStore();
  const isClient = user.type === 'client';

  // Hooks conditionnels selon le type d'utilisateur
  const customerQuery = useGetCustomer();
  const expertQuery = useGetProExpert();
  const updateCustomerMutation = useUpdateCustomer();
  const updateExpertMutation = useUpdateProExpert();

  // Sélection des données selon le type d'utilisateur
  const userData = isClient ? customerQuery.data : expertQuery.data;
  const isLoading = isClient ? customerQuery.isLoading : expertQuery.isLoading;
  const queryError = isClient ? customerQuery.error : expertQuery.error;
  const updateMutation = isClient ? updateCustomerMutation : updateExpertMutation;

  // État dérivé
  const currentLanguage = userData?.language || 'French'; // Valeur par défaut : français
  const error = queryError?.message || updateMutation.error?.message || null;

  // Fonction pour changer la langue
  const handleLanguageChange = useCallback(
    async (languageId: string) => {
      if (!userData || currentLanguage === languageId) return;

      try {
        await updateMutation.mutateAsync({
          language: languageId,
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la langue:', error);
        throw error;
      }
    },
    [userData, currentLanguage, updateMutation]
  );

  return useMemo(
    () => ({
      currentLanguage,
      isLoading: isLoading || updateMutation.isPending,
      error,
      handleLanguageChange,
    }),
    [currentLanguage, isLoading, updateMutation.isPending, error, handleLanguageChange]
  );
};
