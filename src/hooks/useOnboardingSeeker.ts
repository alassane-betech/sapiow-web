"use client";

import { useOnboardingSeeker as useOnboardingSeekerAPI } from "@/api/onbaording/useOnboarding";
import { useUserStore } from "@/store/useUser";
import { OnboardingSeekerData } from "@/types/onboarding";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useOnboardingSeeker = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [step, setStep] = useState(1);

  // Hook pour l'appel API
  const onboardingMutation = useOnboardingSeekerAPI();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Validations
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Actions
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const completeOnboarding = async () => {
    try {
      console.log("Création du profil client...");

      const onboardingData: OnboardingSeekerData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        // Add email if your API expects it
      };

      await onboardingMutation.mutateAsync(onboardingData);

      // Rediriger vers la page d'accueil après succès
      setUser({ type: "client" });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de l'onboarding client:", error);
    }
  };

  return {
    // State
    step,
    firstName,
    lastName,
    email,

    // Validations
    isFormValid,

    // Loading state
    isSubmitting: onboardingMutation.isPending,
    error: onboardingMutation.error,

    // Setters
    setFirstName,
    setLastName,
    setEmail,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
  };
};