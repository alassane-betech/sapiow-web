"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddBankAccountModal({
  isOpen,
  onClose,
  onSuccess,
}: AddBankAccountModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    iban: "",
    bicSwift: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Ici vous pouvez ajouter la logique pour soumettre le formulaire
    console.log("Données du compte bancaire:", formData);

    // Appeler onSuccess si fourni
    if (onSuccess) {
      onSuccess();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire
    setFormData({
      firstName: "",
      lastName: "",
      iban: "",
      bicSwift: "",
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[540px] p-0 bg-white"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 pb-4 border-b border-soft-ice-gray">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-sm font-medium text-charcoal-blue">
                Ajouter un compte bancaire
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 p-6 space-y-0">
            {/* Prénom */}
            <FormField
              label="Prénom"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="h-[56px] mb-3"
            />

            {/* Nom de famille */}
            <FormField
              label="Nom de famille"
              name="lastName"
              placeholder="Nom de famille"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="h-[56px]"
            />

            {/* Message d'information */}
            <p className="text-sm text-gray-500 leading-relaxed font-normal mt-2 mb-5">
              Assurez-vous que cela correspond au nom figurant sur votre pièce
              d'identité gouvernementale.
            </p>

            {/* IBAN */}
            <div className="space-y-1">
              <FormField
                label="IBAN"
                name="iban"
                placeholder="IBAN"
                value={formData.iban}
                onChange={(e) => handleInputChange("iban", e.target.value)}
                className="h-[56px] mb-3"
              />
            </div>

            {/* Code BIC/SWIFT */}
            <div className="space-y-1">
              <FormField
                label="Code BIC/SWIFT"
                name="bicSwift"
                placeholder="Code BIC/SWIFT"
                value={formData.bicSwift}
                onChange={(e) => handleInputChange("bicSwift", e.target.value)}
                className="h-[56px]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-soft-ice-gray">
            <div className="flex gap-4">
              <Button
                label="Annuler"
                onClick={handleCancel}
                className="flex-1 py-3 text-base text-charcoal-blue bg-white shadow-none border-none h-[56px]"
              />

              <Button
                label="Ajouter"
                onClick={handleSubmit}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.iban ||
                  !formData.bicSwift
                }
                className="flex-1 py-3 text-base h-[56px]"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
