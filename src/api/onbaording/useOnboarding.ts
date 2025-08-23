import { apiClient } from "@/lib/api-client";
import {
  isOnboardingExpertDataValid,
  isOnboardingSeekerDataValid,
  OnboardingExpertData,
  OnboardingExpertError,
  OnboardingExpertResponse,
  OnboardingSeekerData,
  OnboardingSeekerError,
  OnboardingSeekerResponse,
  transformOnboardingExpertToFormData,
  transformOnboardingSeekerToFormData,
} from "@/types/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook pour l'onboarding des seekers via multipart/form-data
 */
export const useOnboardingSeeker = () => {
  return useMutation<
    OnboardingSeekerResponse,
    OnboardingSeekerError,
    OnboardingSeekerData
  >({
    mutationFn: async (data: OnboardingSeekerData) => {
      // Validation des données avant envoi
      if (!isOnboardingSeekerDataValid(data)) {
        throw new Error(
          "Données invalides. Veuillez vérifier tous les champs requis."
        );
      }

      // Transformation en FormData pour multipart/form-data
      const formData = transformOnboardingSeekerToFormData(data);

      try {
        // Utilisation du client API centralisé avec FormData
        const response =
          await apiClient.fetchFormData<OnboardingSeekerResponse>(
            "patient",
            formData
          );

        return response;
      } catch (error: any) {
        console.error("Erreur lors de l'onboarding seeker:", error);

        // Re-throw avec un message utilisateur approprié
        const userError: OnboardingSeekerError = {
          message:
            error.message || "Une erreur est survenue lors de l'inscription",
          status: error.status,
        };

        throw userError;
      }
    },
  });
};

/**
 * Hook pour l'onboarding des experts via multipart/form-data
 */
export const useOnboardingExpertPro = () => {
  const queryClient = useQueryClient();
  return useMutation<
    OnboardingExpertResponse,
    OnboardingExpertError,
    OnboardingExpertData
  >({
    mutationFn: async (data: OnboardingExpertData) => {
      // Validation des données avant envoi
      if (!isOnboardingExpertDataValid(data)) {
        throw new Error(
          "Données invalides. Veuillez vérifier tous les champs requis."
        );
      }

      try {
        // Toujours utiliser JSON pour préserver les types numériques
        const jsonData: any = {
          first_name: data.first_name.trim(),
          last_name: data.last_name.trim(),
          domain_id: data.domain_id, // Garder comme number
          ...(data.description && { description: data.description.trim() }),
          ...(data.job && { job: data.job.trim() }),
          ...(data.linkedin && { linkedin: data.linkedin.trim() }),
          ...(data.website && { website: data.website.trim() }),
        };

        // Si avatar est une string (URL), l'inclure dans les données JSON
        if (typeof data.avatar === 'string') {
          jsonData.avatar = data.avatar;
        }

        const response = await apiClient.post<OnboardingExpertResponse>(
          "pro",
          jsonData
        );

        // Si avatar est un File, l'uploader séparément après la création du profil
        if (data.avatar instanceof File) {
          const avatarFormData = new FormData();
          avatarFormData.append("avatar", data.avatar);
          
          // Assuming we need to update the profile with avatar after creation
          // You might need to adjust this endpoint based on your API
          await apiClient.fetchFormData("pro/avatar", avatarFormData);
        }

        return response;
      } catch (error: any) {
        console.error("Erreur lors de l'onboarding expert:", error);

        // Re-throw avec un message utilisateur approprié
        const userError: OnboardingExpertError = {
          message:
            error.message || "Une erreur est survenue lors de l'inscription",
          status: error.status,
        };

        throw userError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proExpert"] });
    },
  });
};

/**
 * Hook pour l'onboarding des professionnels (pour compatibilité)
 * @deprecated Utiliser le hook spécifique selon les besoins
 */
export const useOnboardingClient = useOnboardingSeeker;
