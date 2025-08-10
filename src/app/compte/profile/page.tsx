"use client";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/common/FormField";
import { ProfilePhotoUpload } from "@/components/onboarding/ProfilePhotoUpload";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import AccountLayout from "../AccountLayout";

export default function Profile() {
  return (
    <AccountLayout>
      <div className="w-full max-w-[702px] mx-auto mt-10 px-5">
        <div className="flex justify-center">
          <ProfilePhotoUpload isCompte />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <FormField
            type="text"
            placeholder="Votre prénom"
            label="Votre prénom"
            value="test"
            onChange={() => {}}
            className="h-[56px]"
          />
          <FormField
            type="text"
            placeholder="Votre nom"
            label="Votre nom"
            value="test"
            onChange={() => {}}
            className="h-[56px]"
          />
          <FormField
            type="text"
            placeholder="Votre numéro de téléphone"
            label="Votre numéro de téléphone"
            value="+33 6 12 34 56 78"
            onChange={() => {}}
            className="h-[56px]"
          />
          <FormField
            type="text"
            placeholder="Votre email"
            label="Votre email"
            value="test"
            onChange={() => {}}
            className="h-[56px]"
          />
          <FormField
            type="text"
            placeholder="Lien de votre reseau social"
            label="Lien de votre reseau social"
            value="test"
            onChange={() => {}}
            className="h-[56px]"
          />
          <FormField
            type="text"
            placeholder="Site web"
            label="Site web"
            value=""
            onChange={() => {}}
            className="h-[56px]"
          />
        </div>
        <div className="mt-6">
          <FormField
            type="text"
            placeholder="Domaine d'expertise"
            label="Domaine d'expertise"
            value="test"
            onChange={() => {}}
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
            value="test"
            onChange={() => {}}
            rows={6}
            className="w-full h-[190px] px-4 mt-4 font-medium text-exford-blue placeholder-slate-gray"
          />
        </div>
        <div className="mt-6 mb-6 flex flex-col-reverse md:flex-row justify-between gap-y-4 gap-x-6 px-10">
          <button className="text-exford-blue h-[56px]">
            Supprimer mon compte
          </button>
          <Button
            label="Enregistrer changement"
            className="h-[56px] max-w-[331px] w-full font-bold text-base"
            disabled={true}
          />
        </div>
      </div>
    </AccountLayout>
  );
}
