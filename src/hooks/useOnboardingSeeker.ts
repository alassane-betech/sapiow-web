"use client";
import { useGetDomaines } from "@/api/domaine/useDomaine";
import { useOnboardingSeeker as useOnboardingSeekerAPI } from "@/api/onbaording/useOnboarding";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useOnboardingSeeker = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  // États pour les étapes
  const [step, setStep] = useState(1);

  // États pour les données du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<number[]>([]);

  // Hook pour récupérer les domaines
  const {
    data: domains = [],
    isLoading: isLoadingDomains,
    error: domainsError,
  } = useGetDomaines();

  console.log(domains);

  // Hook API pour l'envoi des données
  const {
    mutate: submitOnboarding,
    isPending: isSubmitting,
    error: apiError,
  } = useOnboardingSeekerAPI();

  // État d'erreur local
  const [error, setError] = useState<string | null>(null);

  // Validation des formulaires
  const isFormValid =
    firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "";
  const isDomainValid = selectedDomains.length > 0;

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    if (step === 1 && isFormValid) {
      setStep(2);
      setError(null);
    } else if (step === 1) {
      setError("Veuillez remplir tous les champs requis");
    }
  };

  // Fonction pour gérer la sélection des domaines
  const handleDomainSelect = (domainId: number) => {
    setSelectedDomains((prev) => {
      if (prev.includes(domainId)) {
        return prev.filter((d) => d !== domainId);
      } else {
        return [...prev, domainId];
      }
    });
    setError(null);
  };

  // Fonction pour finaliser l'onboarding
  const completeOnboarding = async () => {
    if (!isDomainValid) {
      setError("Veuillez sélectionner au moins un domaine d'intérêt");
      return;
    }

    try {
      setError(null);

      // Préparation des données pour l'API
      const onboardingData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        domain_id: selectedDomains, // Les IDs sont déjà numériques
      };

      // Appel API
      submitOnboarding(onboardingData, {
        onSuccess: () => {
          // Redirection sera gérée par le composant parent
          router.push("/");
          setUser({
            type: "client",
          });
          console.log("Onboarding seeker completed successfully");
        },
        onError: (error: any) => {
          console.error("Error completing onboarding:", error);
          setError(
            error?.message || "Une erreur est survenue lors de l'inscription"
          );
        },
      });
    } catch (err) {
      console.error("Error in completeOnboarding:", err);
      setError("Une erreur inattendue est survenue");
    }
  };

  return {
    // États
    step,
    firstName,
    lastName,
    email,
    selectedDomains,
    isFormValid,
    isDomainValid,
    isSubmitting,
    error: error || apiError?.message || domainsError?.message,

    // Données des domaines
    domains,
    isLoadingDomains,

    // Setters
    setFirstName,
    setLastName,
    setEmail,

    // Actions
    nextStep,
    handleDomainSelect,
    completeOnboarding,
  };
};
