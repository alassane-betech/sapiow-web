"use client";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { useOnboardingSeeker } from "@/hooks/useOnboardingSeeker";
import React from "react";
import { DomainSelector } from "./DomainSelector";
import { Pagination } from "./Pagination";

export const OnboardingSeekerSteps: React.FC = () => {
  const {
    step,
    firstName,
    lastName,
    email,
    selectedDomains,
    isFormValid,
    isDomainValid,
    isSubmitting,
    error,
    domains,
    isLoadingDomains,
    setFirstName,
    setLastName,
    setEmail,
    nextStep,
    handleDomainSelect,
    completeOnboarding,
  } = useOnboardingSeeker();

  return (
    <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px]">
      {/* Étape 1 : Infos personnelles */}
      {step === 1 && (
        <>
          <h1 className="text-2xl sm:text-lg lg:text-xl font-bold text-center mb-2">
            Faisons connaissance
          </h1>
          <p className="text-base sm:text-base font-normal my-4 text-center text-ash-gray mb-8 font-inter">
            Nous avons besoin de quelques <br /> informations pour personnaliser
            votre <br /> expérience.
          </p>
          <div className="space-y-6 mb-8">
            <FormField
              type="text"
              placeholder="Votre prénom"
              label="Votre prénom"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
            />
            <FormField
              type="text"
              placeholder="Votre nom de famille"
              label="Votre nom de famille"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
            />
            <FormField
              type="email"
              placeholder="Votre Email"
              label="Votre email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
            />
          </div>
          <Pagination currentStep={1} totalSteps={2} />
          <Button
            label="Suivant"
            className="w-full rounded-[8px] h-[56px] text-base font-medium"
            disabled={!isFormValid || isSubmitting}
            onClick={nextStep}
          />
        </>
      )}

      {/* Étape 2 : Domaine préféré */}
      {step === 2 && (
        <div className="w-full max-w-[343px] sm:max-w-[380px] lg:max-w-[343px]">
          <DomainSelector
            title="Votre domaine préféré ?"
            subtitle={
              <>
                Nous allons mettre en avant les <br /> experts qui vous
                intéressent le plus.
              </>
            }
            domains={domains}
            selectedDomains={selectedDomains}
            onDomainSelect={handleDomainSelect}
            multiSelect={true}
            isLoading={isLoadingDomains}
          />
          <Pagination currentStep={2} totalSteps={2} />

          {/* Affichage des erreurs */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[8px]">
              <p className="text-sm text-red-600 text-center">
                {error || "Une erreur est survenue lors de l'inscription"}
              </p>
            </div>
          )}

          <Button
            label={isSubmitting ? "Inscription en cours..." : "Confirmer"}
            className="w-full rounded-[8px] h-[56px] text-base font-medium"
            disabled={!isDomainValid || isSubmitting}
            onClick={completeOnboarding}
          />
        </div>
      )}
    </div>
  );
};
