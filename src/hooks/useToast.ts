import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const useToast = () => {
  const t = useTranslations();

  return {
    success: (messageKey: string, fallback?: string) => {
      const message = t(messageKey) || fallback || messageKey;
      return toast.success(message);
    },
    error: (messageKey: string, fallback?: string) => {
      const message = t(messageKey) || fallback || messageKey;
      return toast.error(message);
    },
    loading: (messageKey: string, fallback?: string) => {
      const message = t(messageKey) || fallback || messageKey;
      return toast.loading(message);
    },
    // Fonctions directes pour les messages non traduits
    successDirect: (message: string) => toast.success(message),
    errorDirect: (message: string) => toast.error(message),
    loadingDirect: (message: string) => toast.loading(message),
  };
};
