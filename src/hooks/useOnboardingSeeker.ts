"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useOnboardingSeeker = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const router = useRouter();

  // Validations
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDomainValid = selectedDomains.length > 0;

  // Actions
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const completeOnboarding = () => {
    router.push("/home");
  };

  return {
    // State
    step,
    firstName,
    lastName,
    email,
    selectedDomains,

    // Validations
    isFormValid,
    isDomainValid,

    // Setters
    setFirstName,
    setLastName,
    setEmail,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    handleDomainSelect,
    completeOnboarding,
  };
};
