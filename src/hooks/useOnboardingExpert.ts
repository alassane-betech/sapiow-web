"use client";
import { useGetDomaines, useGetExpertises } from "@/api/domaine/useDomaine";
import { useOnboardingExpertPro } from "@/api/onbaording/useOnboarding";
import { useCreateProSession } from "@/api/sessions/useSessions";
import { useUserStore } from "@/store/useUser";
import { OnboardingExpertData, mapDomainIdToNumeric } from "@/types/onboarding";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface VisioOption {
  duration: number;
  enabled: boolean;
  price: string;
}

export const useOnboardingExpert = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [step, setStep] = useState(1);

  // Hook pour l'appel API
  const onboardingMutation = useOnboardingExpertPro();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([]);
  const [aboutMe, setAboutMe] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [visioOptions, setVisioOptions] = useState<VisioOption[]>([
    { duration: 15, enabled: false, price: "" },
    { duration: 30, enabled: false, price: "" },
    { duration: 45, enabled: false, price: "" },
    { duration: 60, enabled: false, price: "" },
  ]);

  const {
    data: domains = [],
    isLoading: isLoadingDomains,
    error: domainsError,
  } = useGetDomaines();

  const {
    data: expertises = [],
    isLoading: isLoadingExpertises,
    error: expertisesError,
  } = useGetExpertises(selectedDomainId || 0);

  const { mutate: updateProExpert } = useCreateProSession();

  // Validations
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    profession.trim().length > 0;
    // && email.trim().length > 0 &&
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDomainValid = !!selectedDomain;
  const isSpecialtyValid = selectedSpecialties.length > 0;
  // Les sessions ne sont pas obligatoires, donc toujours valide
  const isVisioValid = true;

  // Actions
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const handleSpecialtyToggle = (expertiseId: number) => {
    setSelectedSpecialties((prev) =>
      prev.includes(expertiseId)
        ? prev.filter((id) => id !== expertiseId)
        : [...prev, expertiseId]
    );
  };

  const updateVisioOption = (
    index: number,
    field: keyof VisioOption,
    value: unknown
  ) => {
    setVisioOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return newOptions;
    });
  };

  const handleAvatarChange = (file: File | null) => {
    console.log("🖼️ Avatar sélectionné:", file);
    console.log("🖼️ Détails du fichier:", {
      name: file?.name,
      size: file?.size,
      type: file?.type,
    });
    setAvatar(file);
  };

  // Fonction pour créer seulement l'expert (sans sessions) - utilisée pour "Plus tard"
  const completeOnboardingWithoutSessions = async () => {
    try {
      console.log("Création de l'expert pro sans sessions...");

      // Mapper les spécialités vers le format API attendu
      const expertises = selectedSpecialties.map((expertiseId) => ({
        expertise_id: expertiseId,
      }));

      // Préparer les données pour l'API
      const onboardingData: OnboardingExpertData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        // email: email.trim(),
        domain_id: selectedDomain
          ? mapDomainIdToNumeric(selectedDomain) || 0
          : 0,
        description: aboutMe.trim() || undefined,
        linkedin: linkedinUrl.trim() || undefined,
        website: websiteUrl.trim() || undefined,
        job: profession.trim() || undefined,
        expertises: expertises.length > 0 ? expertises : undefined,
        ...(avatar && { avatar }),
      };

      // Soumettre l'expert à l'API
      const expertResult = await onboardingMutation.mutateAsync(onboardingData);
      console.log("Expert créé avec succès:", expertResult);

      // Rediriger vers la page d'accueil après succès
      console.log("Onboarding expert terminé sans sessions");
      setUser({ type: "expert" });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'onboarding expert:", error);
    }
  };

  // Fonction pour créer l'expert avec les sessions - utilisée pour "Terminer"
  const completeOnboarding = async () => {
    try {
      // ÉTAPE 1: Créer l'expert pro d'abord
      console.log("Étape 1: Création de l'expert pro...");

      // Mapper les spécialités vers le format API attendu
      const expertises = selectedSpecialties.map((expertiseId) => ({
        expertise_id: expertiseId,
      }));

      // Préparer les données pour l'API
      const onboardingData: OnboardingExpertData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        // email: email.trim(),
        domain_id: selectedDomain
          ? mapDomainIdToNumeric(selectedDomain) || 0
          : 0,
        description: aboutMe.trim() || undefined,
        job: profession.trim() || undefined,
        linkedin: linkedinUrl.trim() || undefined,
        website: websiteUrl.trim() || undefined,
        expertises: expertises.length > 0 ? expertises : undefined,
        ...(avatar && { avatar }),
      };

      // Debug: Afficher le payload complet avant envoi
      console.log("📦 PAYLOAD COMPLET à envoyer:", {
        ...onboardingData,
        avatar: avatar
          ? {
              name: avatar.name,
              size: avatar.size,
              type: avatar.type,
              file: avatar,
            }
          : null,
      });

      // Soumettre l'expert à l'API
      const expertResult = await onboardingMutation.mutateAsync(onboardingData);
      console.log("Expert créé avec succès:", expertResult);

      // ÉTAPE 2: Créer les sessions si des options sont configurées
      if (
        (expertResult as any)?.id &&
        visioOptions.some((v) => v.enabled && v.price && Number(v.price) > 0)
      ) {
        console.log("✅ Étape 2: Création des sessions...");

        // Créer une session pour chaque option de visio activée
        const enabledOptions = visioOptions.filter(
          (option) => option.enabled && option.price && Number(option.price) > 0
        );

        for (const option of enabledOptions) {
          const sessionData = {
            price: Number(option.price),
            session_type: `${option.duration}m` as any,
            session_nature: "one_time" as any,
            one_on_one: true,
            video_call: true,
            mentorship: true,
            name: `Consultation ${option.duration} minutes`,
            is_active: true,
          };

          console.log(
            `Création session ${option.duration}m pour ${option.price}€`
          );

          try {
            await new Promise((resolve) => {
              updateProExpert(sessionData, {
                onSuccess: (result) => {
                  resolve(result);
                },
                onError: (error) => {
                  console.error(`Erreur session ${option.duration}m:`, error);
                  resolve(null);
                },
              });
            });
          } catch (sessionError) {
            console.error(
              `Erreur lors de la création de la session ${option.duration}m:`,
              sessionError
            );
          }
        }

        console.log("Toutes les sessions ont été traitées");
      } else {
        console.log("Aucune session à créer (pas d'options configurées)");
      }

      // Rediriger vers la page d'accueil après succès complet
      console.log("Onboarding expert terminé avec succès");
      setUser({ type: "expert" });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'onboarding expert:", error);
    }
  };

  // Fonction pour gérer "Plus tard"
  const handleSkipToLater = () => {
    // Vérifier si les données minimales sont valides
    if (isFormValid && isDomainValid) {
      // Si les données de base sont valides, rediriger vers la racine
      setUser({ type: "expert" });
      router.push("/");
    } else {
      // Sinon, afficher un message d'erreur
      console.error("Données incomplètes pour continuer plus tard");
      // TODO: Afficher un toast d'erreur ou un message à l'utilisateur
      alert(
        "Veuillez remplir au minimum les informations personnelles et sélectionner un domaine avant de continuer."
      );
    }
  };

  return {
    // State
    step,
    firstName,
    lastName,
    profession,
    email,
    selectedDomain,
    selectedSpecialties,
    aboutMe,
    linkedinUrl,
    websiteUrl,
    avatar,
    visioOptions,

    // Validations
    isFormValid,
    isDomainValid,
    isSpecialtyValid,
    isVisioValid,

    // Loading state
    isSubmitting: onboardingMutation.isPending,
    error: onboardingMutation.error,

    // Données des domaines et expertises
    domains,
    isLoadingDomains,
    expertises,
    isLoadingExpertises,
    domainsError,
    expertisesError,

    // Setters
    setFirstName,
    setLastName,
    setProfession,
    setEmail,
    setSelectedDomain: (domain: string | null) => {
      setSelectedDomain(domain);
      // Convertir le string domain en ID numérique pour l'API
      if (domain) {
        const domainId = mapDomainIdToNumeric(domain);
        setSelectedDomainId(domainId);
      } else {
        setSelectedDomainId(null);
      }
    },
    setAboutMe,
    setLinkedinUrl,
    setWebsiteUrl,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    handleSpecialtyToggle,
    handleAvatarChange,
    updateVisioOption,
    completeOnboarding,
    completeOnboardingWithoutSessions,
    handleSkipToLater,
  };
};
