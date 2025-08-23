import {
  UpdateCustomerData,
  useUpdateCustomer,
} from "@/api/customer/useCustomer";
import { useCallback, useEffect, useState } from "react";

export interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  selectedDomains: number[];
}

export interface UseClientProfileUpdateProps {
  customer: any; // Type Customer de l'API
}

export const useClientProfileUpdate = ({
  customer,
}: UseClientProfileUpdateProps) => {
  // États pour les champs du formulaire
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    selectedDomains: [],
  });

  // États pour la gestion de l'interface
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  // Hook pour la mutation
  const {
    mutate: updateCustomer,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateCustomer();

  // Mise à jour des données du formulaire quand les données du client sont chargées
  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.first_name || "",
        lastName: customer.last_name || "",
        email: customer.email || "",
        selectedDomains: customer.domain_id || [],
      });
    }
  }, [customer]);

  // Gestion des changements de champs
  const handleFieldChange = useCallback(
    (field: keyof ClientFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setIsEditing(true);
    },
    []
  );

  // Gestion de la sélection des domaines
  const handleDomainToggle = useCallback((domainId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedDomains: prev.selectedDomains.includes(domainId)
        ? prev.selectedDomains.filter((id) => id !== domainId)
        : [...prev.selectedDomains, domainId],
    }));
    setIsEditing(true);
  }, []);

  // Gestion du changement d'avatar
  const handleAvatarChange = useCallback((file: File | null) => {
    setAvatar(file);
    setIsEditing(true);
  }, []);

  // Gestion de la sauvegarde
  const handleSave = useCallback(async () => {
    try {
      const updateData: UpdateCustomerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        domain_id: formData.selectedDomains,
        ...(avatar && { avatar }),
      };

      // Filtrer les champs vides pour ne pas les envoyer
      Object.keys(updateData).forEach((key) => {
        const value = updateData[key as keyof UpdateCustomerData];
        if (value === "" || value === undefined) {
          delete updateData[key as keyof UpdateCustomerData];
        }
      });

      console.log("Sauvegarde des données client:", updateData);

      updateCustomer(updateData, {
        onSuccess: () => {
          setIsEditing(false);
          setAvatar(null);
          console.log("Profil client mis à jour avec succès");
        },
        onError: (error) => {
          console.error("Erreur lors de la sauvegarde:", error);
        },
      });
    } catch (error) {
      console.error("Erreur lors de la préparation de la sauvegarde:", error);
    }
  }, [formData, avatar, updateCustomer]);

  // Gestion de la suppression du compte
  const handleDeleteAccount = useCallback(() => {
    // TODO: Implémenter la suppression du compte
    console.log("Suppression du compte client demandée");
  }, []);

  // Réinitialiser le formulaire
  const resetForm = useCallback(() => {
    if (customer) {
      setFormData({
        firstName: customer.first_name || "",
        lastName: customer.last_name || "",
        email: customer.email || "",
        selectedDomains: customer.domain_id || [],
      });
    }
    setIsEditing(false);
    setAvatar(null);
  }, [customer]);

  return {
    // États
    formData,
    isEditing,
    avatar,
    isUpdating,
    updateError,

    // Actions
    handleFieldChange,
    handleDomainToggle,
    handleAvatarChange,
    handleSave,
    handleDeleteAccount,
    resetForm,
  };
};
