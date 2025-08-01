"use client";

import { Button } from "@/components/common/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FormField } from "./FormField";

interface AddAccompanimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: AccompanimentData) => void;
}

interface AccompanimentData {
  title: string;
  pricePerMonth: string;
  features: string[];
}

const availableFeatures = [
  "Chat 1:1 (illimité)",
  "Appels vidéo 1:1 (90 min/mois)",
  "Sessions de stratégie hebdomadaires (2 heures/mois)",
  "Accès à des ressources exclusives en ligne",
  "Support client prioritaire 24/7",
  "Séances de mentorat individuelles (1 heure/mois)",
  "Webinaires mensuels sur des sujets d'actualité",
  "Accès à un groupe communautaire exclusif",
];

export default function AddAccompanimentModal({
  isOpen,
  onClose,
  onSuccess,
}: AddAccompanimentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    pricePerMonth: "",
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setSelectedFeatures((prev) => {
      if (checked) {
        return [...prev, feature];
      } else {
        return prev.filter((f) => f !== feature);
      }
    });
  };

  const handleSubmit = () => {
    const accompanimentData: AccompanimentData = {
      title: formData.title,
      pricePerMonth: formData.pricePerMonth,
      features: selectedFeatures,
    };

    console.log("Données de l'accompagnement:", accompanimentData);

    if (onSuccess) {
      onSuccess(accompanimentData);
    }

    handleCancel();
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire
    setFormData({
      title: "",
      pricePerMonth: "",
    });
    setSelectedFeatures([]);
    onClose();
  };

  const isFormValid =
    formData.title.trim() !== "" && formData.pricePerMonth.trim() !== "";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[540px] p-0 bg-white border-l border-light-blue-gray"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold text-gray-900">
                Ajouter un accompagnement
              </SheetTitle>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Titre */}
            <div className="space-y-2">
              <FormField
                label="Titre"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Titre"
                className="w-full h-[56px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>

            {/* Prix/Mois */}
            <div className="space-y-2">
              <FormField
                label="Prix/Mois"
                type="number"
                id="price"
                value={formData.pricePerMonth}
                onChange={(e) =>
                  handleInputChange("pricePerMonth", e.target.value)
                }
                placeholder="Prix/Mois"
                rightIcon={
                  <Image
                    src="/assets/icons/mdi_euro.svg"
                    alt="Euro"
                    width={24}
                    height={24}
                  />
                }
                className="w-full h-[56px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>

            {/* Fonctionnalités */}
            <div className="space-y-4 border border-light-blue-gray rounded-[12px] p-4">
              <Label className="text-sm font-medium text-gray-700">
                Fonctionnalités incluses
              </Label>
              <div className="space-y-4">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Label
                      htmlFor={feature}
                      className="text-sm text-gray-700 flex-1 cursor-pointer"
                    >
                      {feature}
                    </Label>
                    <Checkbox
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onChange={(e) =>
                        handleFeatureToggle(feature, e.target.checked)
                      }
                      className="w-6 h-6 bg-white border-3 border-[#94A3B8] rounded-[8px] focus:ring-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6">
            <div className="flex gap-4">
              <Button
                label="Annuler"
                onClick={handleCancel}
                className="flex-1 py-3 bg-white text-base font-bold text-gray-700 border-gray-300 hover:bg-gray-50 h-[56px] border-none shadow-none"
              />

              <Button
                label="Ajouter"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="flex-1 py-3 text-base font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed h-[56px] border-none shadow-none"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
