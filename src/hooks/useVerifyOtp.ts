import { useGetCustomer } from "@/api/customer/useCustomer";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { supabase } from "@/lib/supabase/client";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseVerifyOtpReturn {
  code: string;
  isCodeComplete: boolean;
  phoneNumber: string;
  formattedPhone: string;
  isLoading: boolean;
  error: string | null;
  handleCodeChange: (value: string) => void;
  handleResendCode: () => Promise<void>;
  handleChangeNumber: () => void;
  handleContinue: () => Promise<void>;
}

export function useVerifyOtp(): UseVerifyOtpReturn {
  const [code, setCode] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: proExpert } = useGetProExpert();
  const { data: customer } = useGetCustomer();

  const router = useRouter();
  const { setUser } = useUserStore();

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
    // Réinitialiser l'erreur quand l'utilisateur tape
    if (error) {
      setError(null);
    }
  };

  const handleResendCode = async () => {
    if (!phoneNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (authError) {
        console.error("Erreur lors du renvoi:", authError);
        setError(authError.message);
      }
    } catch (err) {
      console.error("Erreur inattendue lors du renvoi:", err);
      setError("Erreur lors du renvoi du code. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeNumber = () => {
    router.push("/login");
  };

  const handleContinue = async () => {
    if (!isCodeComplete || !phoneNumber) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: code,
        type: "sms",
      });

      if (authError) {
        console.error("Erreur de vérification:", authError);
        setError(authError.message);
        return;
      }

      if (data.user && data.session) {
        console.log("Utilisateur authentifié:", data.user);

        // Nettoyer les données temporaires après vérification réussie
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("formattedPhone");

        // Vérifier les données et rediriger
        const isProEmpty = checkIfEmpty(proExpert);
        const isCustomerEmpty = checkIfEmpty(customer);

        if (isProEmpty && isCustomerEmpty) {
          router.push("/onboarding");
          console.log({
            isProEmpty,
            isCustomerEmpty,
          });
          // router.push("/onboarding");
        } else if (isCustomerEmpty && !isProEmpty) {
          setUser({ type: "expert" });
          router.push("/");
        } else if (isProEmpty && !isCustomerEmpty) {
          setUser({ type: "client" });
          router.push("/");
        } else {
          setUser({ type: "expert" });
          router.push("/");
        }
      }
    } catch (err) {
      console.error("Erreur inattendue lors de la vérification:", err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour vérifier si les données sont vides ou contiennent l'erreur spécifique
  const checkIfEmpty = (data: any): boolean => {
    if (!data) return true;

    // Vérifier si c'est l'erreur spécifique
    if (data.error === "Cannot coerce the result to a single JSON object") {
      return true;
    }

    // Vérifier si c'est un tableau vide
    if (Array.isArray(data) && data.length === 0) {
      return true;
    }

    // Vérifier si la réponse a un data vide ou tableau vide
    if (data.data && Array.isArray(data.data) && data.data.length === 0) {
      return true;
    }

    // Vérifier si success est false
    if (data.success === false) {
      return true;
    }

    return false;
  };

  return {
    code,
    isCodeComplete,
    phoneNumber,
    formattedPhone,
    isLoading,
    error,
    handleCodeChange,
    handleResendCode,
    handleChangeNumber,
    handleContinue,
  };
}
