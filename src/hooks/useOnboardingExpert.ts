"use client";
import { useState } from "react";

export interface VisioOption {
  duration: number;
  enabled: boolean;
  price: string;
}

export const useOnboardingExpert = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [visioOptions, setVisioOptions] = useState<VisioOption[]>([
    { duration: 15, enabled: false, price: "" },
    { duration: 30, enabled: false, price: "" },
    { duration: 45, enabled: false, price: "" },
    { duration: 60, enabled: false, price: "" },
  ]);

  // Validations
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    profession.trim().length > 0 &&
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDomainValid = !!selectedDomain;
  const isSpecialtyValid = selectedSpecialties.length > 0;
  const isVisioValid = visioOptions.some(
    (v) =>
      v.enabled && v.price && !isNaN(Number(v.price)) && Number(v.price) > 0
  );

  // Actions
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const goToStep = (stepNumber: number) => setStep(stepNumber);

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
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

  const completeOnboarding = () => {
    // Ici on pourrait envoyer les données à l'API
    console.log("Données de l'onboarding expert:", {
      firstName,
      lastName,
      profession,
      email,
      selectedDomain,
      selectedSpecialties,
      aboutMe,
      linkedinUrl,
      websiteUrl,
      visioOptions: visioOptions.filter((v) => v.enabled),
    });
    alert("Onboarding expert terminé !");
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
    visioOptions,

    // Validations
    isFormValid,
    isDomainValid,
    isSpecialtyValid,
    isVisioValid,

    // Setters
    setFirstName,
    setLastName,
    setProfession,
    setEmail,
    setSelectedDomain,
    setAboutMe,
    setLinkedinUrl,
    setWebsiteUrl,

    // Actions
    nextStep,
    prevStep,
    goToStep,
    handleSpecialtyToggle,
    updateVisioOption,
    completeOnboarding,
  };
};
