"use client";

import { useGetCustomer } from "@/api/customer/useCustomer";
import { useGetDomaines } from "@/api/domaine/useDomaine";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { ProfilePhotoUpload } from "@/components/onboarding/ProfilePhotoUpload";
import { useClientProfileUpdate } from "@/hooks/useClientProfileUpdate";

export default function ClientProfile() {
  const { data: customer, isLoading, error } = useGetCustomer();
  const { data: domains = [] } = useGetDomaines();

  // Hook personnalisé pour gérer la mise à jour du profil
  const {
    formData,
    isEditing,
    isUpdating,
    updateError,
    handleFieldChange,
    handleDomainToggle,
    handleAvatarChange,
    handleSave,
    handleDeleteAccount,
  } = useClientProfileUpdate({ customer });

  if (isLoading) {
    return (
      <div className="w-full max-w-[702px] mx-auto mt-10 px-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-gray">Chargement du profil...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[702px] mx-auto mt-10 px-5">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">
            Erreur lors du chargement du profil : {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[702px] h-full  mx-auto mt-10 px-5">
      <div className="flex justify-center">
        <ProfilePhotoUpload
          isCompte
          onPhotoSelect={handleAvatarChange}
          currentAvatar={customer?.avatar}
        />
      </div>

      <div className="w-full max-w-[343px] mx-auto grid grid-cols-1 gap-y-4 gap-x-6">
        <FormField
          type="text"
          placeholder="Votre prénom"
          label="Votre prénom"
          value={formData.firstName}
          onChange={(e) => handleFieldChange("firstName", e.target.value)}
          className="h-[56px]"
        />
        <FormField
          type="text"
          placeholder="Votre nom"
          label="Votre nom"
          value={formData.lastName}
          onChange={(e) => handleFieldChange("lastName", e.target.value)}
          className="h-[56px]"
        />
        <FormField
          type="email"
          placeholder="Votre email"
          label="Votre email"
          value={formData.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className="h-[56px] md:col-span-2"
        />
      </div>

      <div className="mt-16 mb-6 flex flex-col-reverse md:flex-row justify-between items-end gap-y-4 gap-x-6 px-10">
        <Button
          label="Supprimer mon compte"
          className="bg-white text-exford-blue border border-[#E2E8F0] rounded-[8px] shadow-none h-[56px] max-w-[331px] w-full font-bold text-base font-figtree"
          onClick={handleDeleteAccount}
        />
        <Button
          label={isUpdating ? "Sauvegarde..." : "Enregistrer changement"}
          className="h-[56px] max-w-[331px] w-full font-bold text-base font-figtree"
          disabled={!isEditing || isUpdating}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
