"use client";
import { AuthGuard } from "@/components/common/AuthGuard";
import { OnboardingExpertSteps } from "@/components/onboarding/OnboardingExpertSteps";
import { OnboardingSeekerSteps } from "@/components/onboarding/OnboardingSeekerSteps";
import { UserTypeSelector } from "@/components/onboarding/UserTypeSelector";
import Image from "next/image";
import { useState } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(0); // 0 = choix radio, 1 = étapes
  const [userType, setUserType] = useState("client");

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[630px_1fr] xl:grid-cols-[700px_1fr]">
        {/* Section image - cachée sur mobile et tablette, visible sur desktop */}
        <div className="hidden lg:block relative">
          <Image
            src="/assets/on_boarding.png"
            alt="Background"
            fill
            className="object-contain"
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-col">
          {/* Logo - visible seulement à l'étape 0 */}
          {step === 0 && (
            <div className="mt-14 ml-[42px]">
              <Image src="/assets/logo.png" alt="Logo" width={175} height={100} />
            </div>
          )}
          <div
            className={`flex flex-col justify-center items-center flex-1 px-6 py-8 lg:py-0 ${
              step > 0 ? "sm:-mt-11" : ""
            }`}
          >
            {/* Étape 0 : Choix du type d'utilisateur */}
            {step === 0 && (
              <UserTypeSelector
                userType={userType}
                onUserTypeChange={setUserType}
                onContinue={() => setStep(1)}
              />
            )}
            {/* Étape 1 : OnboardingSeekerSteps */}
            {step === 1 && userType === "client" && <OnboardingSeekerSteps />}
            {/* Étape 1 : OnboardingExpertSteps */}
            {step === 1 && userType === "expert" && <OnboardingExpertSteps />}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
