import { useState } from "react";
import { useCreateProSession, SessionCreate, validateSessionData } from "@/api/sessions/useSessions";

interface UseAddSessionModalProps {
  onSuccess?: (data: SessionCreate) => void;
  onClose: () => void;
}

export const useAddSessionModal = ({ onSuccess, onClose }: UseAddSessionModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    session_type: "15m" as const,
    session_nature: "one_time" as const,
  });

  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({
    one_on_one: false,
    video_call: false,
    strategic_session: false,
    exclusive_ressources: false,
    support: false,
    mentorship: false,
    webinar: false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  
  // Hook pour créer une session
  const createSessionMutation = useCreateProSession();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (featureKey: string, checked: boolean) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [featureKey]: checked,
    }));
  };

  const handleSubmit = async () => {
    // Réinitialiser les erreurs
    setErrors([]);
    
    const sessionData: SessionCreate = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      session_nature: formData.session_nature,
      ...selectedFeatures,
      is_active: true,
    };

    // Inclure session_type seulement pour les sessions ponctuelles
    if (formData.session_nature === "one_time") {
      sessionData.session_type = formData.session_type;
    }

    // Validation des données
    const validationErrors = validateSessionData(sessionData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await createSessionMutation.mutateAsync(sessionData);
      
      console.log("Session créée avec succès:", result);
      
      if (onSuccess) {
        onSuccess(sessionData);
      }
      
      handleCancel();
    } catch (error: any) {
      console.error("Erreur lors de la création:", error);
      setErrors([error.message || "Erreur lors de la création de la session"]);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      price: "",
      session_type: "15m" as const,
      session_nature: "one_time" as const,
    });
    setSelectedFeatures({
      one_on_one: false,
      video_call: false,
      strategic_session: false,
      exclusive_ressources: false,
      support: false,
      mentorship: false,
      webinar: false,
    });
    setErrors([]);
    onClose();
  };

  const isFormValid =
    formData.name.trim() !== "" && 
    formData.price.trim() !== "" && 
    !isNaN(parseFloat(formData.price)) && 
    parseFloat(formData.price) > 0 &&
    !createSessionMutation.isPending;

  return {
    // États
    formData,
    selectedFeatures,
    errors,
    isFormValid,
    
    // États de mutation
    isPending: createSessionMutation.isPending,
    
    // Handlers
    handleInputChange,
    handleFeatureToggle,
    handleSubmit,
    handleCancel,
  };
};
