"use client";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { Textarea } from "@/components/ui/textarea";
import { DOMAIN_ID_MAPPING } from "@/constants/onboarding";
import { useOnboardingExpert } from "@/hooks/useOnboardingExpert";
import { useI18n } from "@/locales/client";
import React from "react";
import { DomainSelector } from "./DomainSelector";
import { Pagination } from "./Pagination";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { SpecialtySelector } from "./SpecialtySelector";
import { VisioConfiguration } from "./VisioConfiguration";

export const OnboardingExpertSteps: React.FC = () => {
  const t = useI18n();
  const {
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
    isFormValid,
    isDomainValid,
    isSpecialtyValid,
    isVisioValid,
    domains,
    isLoadingDomains,
    expertises,
    isLoadingExpertises,
    setFirstName,
    setLastName,
    setProfession,
    setEmail,
    setSelectedDomain,
    setAboutMe,
    setLinkedinUrl,
    setWebsiteUrl,
    nextStep,
    handleSpecialtyToggle,
    handleAvatarChange,
    updateVisioOption,
    completeOnboarding,
    completeOnboardingWithoutSessions,
    isSubmitting,
  } = useOnboardingExpert();

  // Étape 1 : Formulaire expert
  if (step === 1) {
    return (
      <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px]">
        <h1 className="text-2xl sm:text-lg lg:text-xl font-bold text-center mb-2">
          {t("onboarding.letsGetAcquainted")}
        </h1>
        <p className="text-base sm:text-base font-normal my-4 text-center text-ash-gray mb-8">
          {t("onboarding.createExpertAccount")}
        </p>
        <div className="space-y-6 mb-8">
          <FormField
            type="text"
            placeholder={t("onboarding.firstName")}
            label={t("onboarding.firstName")}
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
          <FormField
            type="text"
            placeholder={t("onboarding.lastName")}
            label={t("onboarding.lastName")}
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
          <FormField
            type="text"
            placeholder={t("onboarding.profession")}
            label={t("onboarding.profession")}
            value={profession}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfession(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
          <FormField
            type="email"
            placeholder={t("onboarding.email")}
            label={t("onboarding.email")}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
        </div>
        <Pagination currentStep={1} totalSteps={5} />
        <Button
          label={t("onboarding.next")}
          className="w-full rounded-[8px] h-[56px] text-base font-medium"
          disabled={!isFormValid}
          onClick={nextStep}
        />
      </div>
    );
  }

  // Étape 2 : Domaine d'exercice
  if (step === 2) {
    return (
      <div className="w-full max-w-[343px] sm:max-w-[380px] lg:max-w-[343px]">
        <DomainSelector
          title={t("onboarding.exerciseDomain")}
          subtitle={t("onboarding.needDomainInfo")}
          domains={domains}
          isLoading={isLoadingDomains}
          selectedDomain={
            selectedDomain ? DOMAIN_ID_MAPPING[selectedDomain] : null
          }
          onDomainSelect={(domainId: number) => {
            // Convert numeric ID back to string ID
            const stringId = Object.keys(DOMAIN_ID_MAPPING).find(
              (key) => DOMAIN_ID_MAPPING[key] === domainId
            );
            if (stringId) {
              setSelectedDomain(stringId);
            }
          }}
          multiSelect={false}
        />
        <Pagination currentStep={2} totalSteps={5} />
        <Button
          label={t("onboarding.next")}
          className="w-full rounded-[8px] h-[56px] text-base font-medium"
          disabled={!isDomainValid}
          onClick={nextStep}
        />
      </div>
    );
  }

  // Étape 3 : Choix des spécialités
  if (step === 3 && selectedDomain) {
    return (
      <div className="w-full max-w-[343px] sm:max-w-[380px] lg:max-w-[343px]">
        <SpecialtySelector
          selectedDomain={selectedDomain}
          selectedSpecialties={selectedSpecialties}
          expertises={expertises}
          isLoadingExpertises={isLoadingExpertises}
          onSpecialtyToggle={handleSpecialtyToggle}
        />
        <Pagination currentStep={3} totalSteps={5} />
        <div className="flex gap-4 w-full">
          <Button
            label={t("onboarding.later")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium bg-white border border-gray-300 text-exford-blue hover:bg-gray-50"
            variant="outline"
            onClick={nextStep}
          />
          <Button
            label={t("onboarding.next")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium"
            disabled={!isSpecialtyValid}
            onClick={nextStep}
          />
        </div>
      </div>
    );
  }

  // Étape 4 : Terminez votre profil
  if (step === 4) {
    return (
      <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px]">
        <h1 className="text-base sm:text-lg lg:text-xl font-bold text-center mb-2">
          {t("onboarding.completeProfile")}
        </h1>
        <p className="text-sm sm:text-base font-normal my-4 text-center text-gray-600 mb-8">
          {t("onboarding.describeYourself")}
        </p>

        <ProfilePhotoUpload onPhotoSelect={handleAvatarChange} />

        <div className="space-y-6 mb-8">
          <Textarea
            placeholder={t("onboarding.aboutMePlaceholder")}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            rows={6}
            className="w-full h-[190px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
          <FormField
            type="url"
            placeholder={t("onboarding.linkedinUrl")}
            label={t("onboarding.linkedinUrl")}
            value={linkedinUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinkedinUrl(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
          <FormField
            type="url"
            placeholder={t("onboarding.websiteUrl")}
            label={t("onboarding.websiteUrl")}
            value={websiteUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWebsiteUrl(e.target.value)
            }
            className="w-full h-[56px] px-4 font-medium text-exford-blue placeholder-slate-gray"
          />
        </div>

        <Pagination currentStep={4} totalSteps={5} />
        <div className="flex gap-4 w-full">
          <Button
            label={t("onboarding.later")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium bg-white border border-gray-300 text-exford-blue hover:bg-gray-50"
            variant="outline"
            onClick={nextStep}
          />
          <Button
            label={t("onboarding.next")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium"
            onClick={nextStep}
          />
        </div>
      </div>
    );
  }

  // Étape 5 : Ajout de la première visio
  if (step === 5) {
    return (
      <div className="w-full max-w-[343px] sm:max-w-[380px] lg:max-w-[343px]">
        <VisioConfiguration
          visioOptions={visioOptions}
          onUpdateVisioOption={updateVisioOption}
        />
        <Pagination currentStep={5} totalSteps={5} />
        <div className="flex gap-4 w-full">
          <Button
            label={t("onboarding.later")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium bg-white border border-gray-300 text-exford-blue hover:bg-gray-50"
            variant="outline"
            onClick={completeOnboardingWithoutSessions}
          />
          <Button
            label={isSubmitting ? t("loading") : t("onboarding.finish")}
            className="w-1/2 rounded-[8px] h-[56px] text-base font-medium"
            disabled={!isVisioValid || isSubmitting}
            onClick={completeOnboarding}
          />
        </div>
      </div>
    );
  }

  return null;
};
