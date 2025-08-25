"use client";

import { SessionCreate } from "@/api/sessions/useSessions";
import { Button } from "@/components/common/Button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAddSessionModal } from "@/hooks/useAddSessionModal";
import { X } from "lucide-react";
import Image from "next/image";
import { FormField } from "./FormField";

interface AddAccompanimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: SessionData) => void;
}

interface SessionData extends SessionCreate {
  // SessionData hérite de SessionCreate du hook API
}

const availableFeatures = [
  { key: "one_on_one", label: "Session individuelle 1:1" },
  { key: "video_call", label: "Appel vidéo" },
  { key: "strategic_session", label: "Session stratégique" },
  { key: "exclusive_ressources", label: "Ressources exclusives" },
  { key: "support", label: "Support client" },
  { key: "mentorship", label: "Mentorat" },
  { key: "webinar", label: "Webinaire" },
];

export default function AddAccompanimentModal({
  isOpen,
  onClose,
  onSuccess,
}: AddAccompanimentModalProps) {
  const {
    formData,
    selectedFeatures,
    errors,
    isFormValid,
    isPending,
    handleInputChange,
    handleFeatureToggle,
    handleSubmit,
    handleCancel,
  } = useAddSessionModal({ onSuccess, onClose });

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
                Ajouter une session
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
            {/* Nom */}
            <div className="space-y-2">
              <FormField
                label="Nom de la session"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: Consultation stratégique"
                className="w-full h-[56px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>

            {/* Prix */}
            <div className="space-y-2">
              <FormField
                label="Prix (€)"
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Ex: 120"
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

            {/* Affichage des erreurs */}
            {errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-700">
                  {errors.map((error, index) => (
                    <div key={index} className="mb-1">
                      • {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fonctionnalités */}
            <div className="space-y-4 border border-light-blue-gray rounded-[12px] p-4">
              <Label className="text-sm font-medium text-gray-700">
                Fonctionnalités incluses
              </Label>
              <div className="space-y-4">
                {availableFeatures.map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-center space-x-3"
                  >
                    <Label
                      htmlFor={feature.key}
                      className="text-sm text-gray-700 flex-1 cursor-pointer"
                    >
                      {feature.label}
                    </Label>
                    <input
                      type="checkbox"
                      id={feature.key}
                      checked={selectedFeatures[feature.key] || false}
                      onChange={(e) =>
                        handleFeatureToggle(feature.key, e.target.checked)
                      }
                      className="w-6 h-6 bg-white border-3 border-[#94A3B8] rounded-[16px] focus:ring-2"
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
                label={isPending ? "Création..." : "Ajouter"}
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`flex-1 py-3 text-base font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed h-[56px] border-none shadow-none ${
                  isPending ? "cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
