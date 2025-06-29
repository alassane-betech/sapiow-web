"use client";
import { Button } from "@/components/common/Button";
import OTPInput from "@/components/common/OTPInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  console.log(formattedPhone);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Récupérer le numéro de téléphone depuis localStorage
  useEffect(() => {
    const savedPhone = localStorage.getItem("phoneNumber");
    const savedFormatted = localStorage.getItem("formattedPhone");

    if (savedPhone) {
      setPhoneNumber(savedPhone);
      setFormattedPhone(savedFormatted || savedPhone);
    } else {
      // Rediriger vers la page de login si pas de numéro sauvegardé
      router.push("/login");
    }
  }, [router]);

  // Vérifier si le code est complet
  useEffect(() => {
    setIsCodeComplete(code.length === 6);
  }, [code]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      // Simuler l'appel API pour renvoyer le code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Code renvoyé au numéro:", phoneNumber);
      // Ici vous pourrez ajouter la logique d'appel API
    } catch (error) {
      console.error("Erreur lors du renvoi du code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeNumber = () => {
    // Rediriger vers la page de login sans supprimer les données
    // pour permettre de pré-remplir le champ téléphone
    router.push("/login");
  };

  const handleContinue = async () => {
    if (isCodeComplete) {
      setIsLoading(true);

      try {
        // Simuler la vérification du code
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Code de vérification:", code);
        console.log("Numéro vérifié:", phoneNumber);

        // Nettoyer les données temporaires après vérification réussie
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("formattedPhone");

        // Rediriger vers la page d'onboarding
        router.push("/onboarding");
      } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        // Gérer l'erreur (code incorrect, etc.)
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[630px_1fr] xl:grid-cols-[700px_1fr]">
      {/* Section image - cachée sur mobile et tablette, visible sur desktop */}
      <div className="hidden lg:block relative">
        <Image
          src="/assets/bg_onboarding.png"
          alt="Background"
          fill
          className="object-scale-down"
          priority
        />
      </div>

      {/* Section contenu principal */}
      <div className="flex flex-col min-h-screen lg:min-h-auto">
        {/* Logo - responsive positioning */}
        <div className="mt-14 ml-[42px]">
          <Image src="/assets/logo.jpg" alt="Logo" width={100} height={100} />
        </div>

        {/* Contenu principal - centré verticalement */}
        <div className="flex flex-col justify-center items-center flex-1 px-6 py-8 lg:py-0">
          <div className="w-full max-w-[350px] sm:max-w-[380px] lg:max-w-[391px]">
            {/* Titre */}
            <h1 className="text-2xl sm:text-[26px] lg:text-[28px] leading-[32px] sm:leading-[34px] lg:leading-[36px] font-bold text-center lg:text-left">
              Entrez le code a 6 chiffres reçu par SMS
            </h1>

            {/* Composant OTP */}
            <div className="flex justify-center my-9">
              <OTPInput
                value={code}
                onChange={handleCodeChange}
                disabled={isLoading}
                maxLength={6}
              />
            </div>

            {/* Liens d'action */}
            <div className="text-center space-y-3">
              <p className="text-sm font-normal text-heather-gray mb-7">
                Vous n&rsquo;avez pas reçu le code ?{" "}
                <button
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-cyan-cobalt hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer underline"
                >
                  {isLoading ? "Envoi..." : "Renvoyer"}
                </button>
              </p>

              <button
                onClick={handleChangeNumber}
                disabled={isLoading}
                className="text-cobalt-blue hover:underline text-sm block mx-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold underline mb-5.5"
              >
                Changer de numéro
              </button>
            </div>

            {/* Bouton Continuer */}
            <Button
              label={isLoading ? "Vérification..." : "Continuer"}
              className="w-full rounded-[8px] h-[56px] text-base font-medium"
              disabled={!isCodeComplete || isLoading}
              onClick={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
