"use client";

import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { ProfilePhotoUpload } from "@/components/onboarding/ProfilePhotoUpload";
import { Textarea } from "@/components/ui/textarea";
import { useExpertProfileUpdate } from "@/hooks/useExpertProfileUpdate";
import Image from "next/image";

export default function ExpertProfile() {
  const { data: user, isLoading, error } = useGetProExpert();

  // Hook personnalisé pour gérer la mise à jour du profil
  const {
    formData,
    isEditing,
    isUpdating,
    updateError,
    handleFieldChange,
    handleAvatarChange,
    handleSave,
    handleDeleteAccount,
  } = useExpertProfileUpdate({ user });

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

  // Affichage des erreurs de mise à jour
  const displayUpdateError = updateError ? (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <div className="text-red-600 text-sm">
        Erreur lors de la mise à jour : {updateError.message}
      </div>
    </div>
  ) : null;

  return (
    <div className="w-full max-w-[702px] mx-auto mt-10 px-5">
      {displayUpdateError}
      <div className="flex justify-center">
        <ProfilePhotoUpload
          isCompte
          onPhotoSelect={handleAvatarChange}
          currentAvatar={user?.avatar}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
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
          type="text"
          placeholder="Votre métier"
          label="Votre métier"
          value={formData.job}
          onChange={(e) => handleFieldChange("job", e.target.value)}
          className="h-[56px]"
        />
        <FormField
          type="email"
          placeholder="Votre email"
          label="Votre email"
          value={formData.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className="h-[56px]"
        />
        <FormField
          type="text"
          placeholder="Lien LinkedIn"
          label="Lien LinkedIn"
          value={formData.linkedin}
          onChange={(e) => handleFieldChange("linkedin", e.target.value)}
          className="h-[56px]"
        />
        <FormField
          type="text"
          placeholder="Site web"
          label="Site web"
          value={formData.website}
          onChange={(e) => handleFieldChange("website", e.target.value)}
          className="h-[56px]"
        />
      </div>

      <div className="mt-6">
        <FormField
          type="text"
          placeholder="Domaine d'expertise"
          label="Domaine d'expertise"
          value={formData.domainName}
          onChange={(e) => handleFieldChange("domainName", e.target.value)}
          rightIcon={
            <Image
              src="/assets/icons/pensquare.svg"
              alt="search"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          }
          className="h-[56px]"
        />
        <Textarea
          placeholder="À propos de vous"
          value={formData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          rows={6}
          className="w-full h-[190px] px-4 mt-4 font-medium text-exford-blue placeholder-slate-gray"
        />
      </div>

      <div className="mt-6 mb-6 flex flex-col-reverse md:flex-row justify-between gap-y-4 gap-x-6 px-10">
        <button
          className="bg-white text-red-500 rounded-[8px] shadow-none h-[56px] max-w-[331px] w-full font-bold text-base hover:bg-white cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Supprimer mon compte
        </button>
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
