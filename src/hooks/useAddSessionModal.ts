import { ProExpertSession } from "@/api/proExpert/useProExpert";
import {
  SessionCreate,
  SessionGetResponse,
  useCreateProSession,
  useUpdateProSession,
  validateSessionData,
} from "@/api/sessions/useSessions";
import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";

interface UseAddSessionModalProps {
  onSuccess?: (data: SessionCreate) => void;
  onClose: () => void;
  editData?: ProExpertSession;
  isEditMode?: boolean;
}

export const useAddSessionModal = ({
  onSuccess,
  onClose,
  editData,
  isEditMode = false,
}: UseAddSessionModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    session_nature: "subscription" as const,
  });

  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, boolean>
  >({
    one_on_one: false,
    video_call: false,
    strategic_session: false,
    exclusive_ressources: false,
    support: false,
    mentorship: false,
    webinar: false,
  });

  const [isLoadingSessionData, setIsLoadingSessionData] = useState(false);

  // Fonction pour récupérer les données complètes de la session
  const fetchCompleteSessionData = async (sessionId: string) => {
    try {
      setIsLoadingSessionData(true);

      // L'API retourne toutes les sessions du pro, il faut trouver la bonne
      const allSessions = await apiClient.get<SessionGetResponse[]>(
        "pro-session"
      );

      // Trouver la session avec l'ID correspondant
      const targetSession = allSessions.find(
        (session) => session.id === sessionId
      );

      return targetSession || null;
    } catch (error) {
      return null;
    } finally {
      setIsLoadingSessionData(false);
    }
  };

  // Initialiser les données en mode édition
  useEffect(() => {
    const initializeEditData = async () => {
      if (isEditMode && editData) {
        // Initialiser les données de base
        setFormData({
          name: editData.name || "",
          price: editData.price?.toString() || "",
          session_nature: "subscription" as const,
        });

        // Récupérer les données complètes de la session pour les features
        if (editData.id) {
          console.log(
            "🔄 Récupération des données complètes pour la session:",
            editData.id
          );
          const completeData = await fetchCompleteSessionData(editData.id);

          if (completeData) {
            console.log("✅ Données complètes récupérées:", completeData);
            const newFeatures = {
              one_on_one: completeData.one_on_one || false,
              video_call: completeData.video_call || false,
              strategic_session: completeData.strategic_session || false,
              exclusive_ressources: completeData.exclusive_ressources || false,
              support: completeData.support || false,
              mentorship: completeData.mentorship || false,
              webinar: completeData.webinar || false,
            };
            console.log("🎯 Features à appliquer:", newFeatures);
            setSelectedFeatures(newFeatures);
          } else {
            console.log("❌ Échec de récupération des données complètes");
          }
        }
      }
    };

    initializeEditData();
  }, [isEditMode, editData]);

  const [errors, setErrors] = useState<string[]>([]);

  // Hooks pour créer et mettre à jour une session
  const createSessionMutation = useCreateProSession();
  const updateSessionMutation = useUpdateProSession();

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

    // Validation des données
    const validationErrors = validateSessionData(sessionData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let result;

      if (isEditMode && editData?.id) {
        // Mode édition - utiliser l'API de mise à jour
        result = await updateSessionMutation.mutateAsync({
          id: editData.id,
          data: {
            name: sessionData.name,
            price: sessionData.price,
            session_nature: sessionData.session_nature,
            one_on_one: sessionData.one_on_one,
            video_call: sessionData.video_call,
            strategic_session: sessionData.strategic_session,
            exclusive_ressources: sessionData.exclusive_ressources,
            support: sessionData.support,
            mentorship: sessionData.mentorship,
            webinar: sessionData.webinar,
            is_active: sessionData.is_active,
          },
        });
      } else {
        // Mode création
        result = await createSessionMutation.mutateAsync(sessionData);
      }

      console.log(
        isEditMode
          ? "Session modifiée avec succès:"
          : "Session créée avec succès:",
        result
      );

      if (onSuccess) {
        onSuccess(sessionData);
      }

      handleCancel();
    } catch (error: any) {
      console.error(
        isEditMode
          ? "Erreur lors de la modification:"
          : "Erreur lors de la création:",
        error
      );
      setErrors([
        error.message ||
          (isEditMode
            ? "Erreur lors de la modification de la session"
            : "Erreur lors de la création de la session"),
      ]);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      price: "",
      session_nature: "subscription" as const,
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

  const handleDelete = async () => {
    if (!isEditMode || !editData?.id) {
      console.error("Impossible de supprimer: pas en mode édition ou pas d'ID");
      return;
    }

    try {
      // "Supprimer" en mettant is_active à false
      await updateSessionMutation.mutateAsync({
        id: editData.id,
        data: {
          is_active: false,
        },
      });

      console.log("Session désactivée avec succès");
      
      if (onSuccess) {
        // Notifier le parent que la session a été "supprimée"
        onSuccess({
          name: formData.name,
          price: parseFloat(formData.price),
          session_nature: formData.session_nature,
          ...selectedFeatures,
          is_active: false,
        });
      }

      handleCancel();
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      setErrors([
        error.message || "Erreur lors de la suppression de la session",
      ]);
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.price.trim() !== "" &&
    !isNaN(parseFloat(formData.price)) &&
    parseFloat(formData.price) > 0 &&
    !createSessionMutation.isPending &&
    !updateSessionMutation.isPending;

  return {
    // États
    formData,
    selectedFeatures,
    errors,
    isFormValid,

    // États de mutation
    isPending:
      createSessionMutation.isPending ||
      updateSessionMutation.isPending ||
      isLoadingSessionData,

    // Handlers
    handleInputChange,
    handleFeatureToggle,
    handleSubmit,
    handleCancel,
    handleDelete,
  };
};
