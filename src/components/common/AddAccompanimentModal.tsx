"use client";

import { ProExpertSession } from "@/api/proExpert/useProExpert";
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
import { useI18n } from "@/locales/client";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { FormField } from "./FormField";

interface AddAccompanimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: SessionData) => void;
  editData?: ProExpertSession; // Données existantes pour la modification
  isEditMode?: boolean; // Mode édition
}

interface SessionData extends SessionCreate {
  // SessionData hérite de SessionCreate du hook API
}

// Fonction pour générer les fonctionnalités avec traductions
const getAvailableFeatures = (t: any) => [
  { key: "one_on_one", label: t("offers.oneOnOne") },
  { key: "video_call", label: t("offers.videoCall") },
  { key: "strategic_session", label: t("offers.strategicSession") },
  { key: "exclusive_ressources", label: t("offers.exclusiveResources") },
  { key: "support", label: t("offers.support") },
  { key: "mentorship", label: t("offers.mentorship") },
  { key: "webinar", label: t("offers.webinar") },
];

export default function AddAccompanimentModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
  isEditMode = false,
}: AddAccompanimentModalProps) {
  const t = useI18n();
  const availableFeatures = getAvailableFeatures(t);
  
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
  } = useAddSessionModal({ onSuccess, onClose, editData, isEditMode });

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
              <SheetTitle className="text-xl font-semibold text-gray-900 font-figtree">
                {isEditMode ? t("offers.editSession") : t("offers.addSession")}
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
                label={t("offers.sessionName")}
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={t("offers.sessionNamePlaceholder")}
                className="w-full h-[56px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>

            {/* Prix */}
            <div className="space-y-2">
              <FormField
                label={t("offers.price")}
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder={t("offers.pricePlaceholder")}
                rightIcon={
                  <Image
                    src="/assets/icons/mdi_euro.svg"
                    alt={t("offers.euroAlt")}
                    width={24}
                    height={24}
                  />
                }
                className="w-full h-[56px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              />
            </div>

            {/* Affichage des erreurs */}
            {errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg font-figtree">
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
              <Label className="text-sm font-medium text-gray-700 font-figtree">
                {t("offers.includedFeatures")}
              </Label>
              <div className="space-y-4">
                {availableFeatures.map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-center space-x-3 font-figtree"
                  >
                    <Label
                      htmlFor={feature.key}
                      className="text-sm text-gray-700 flex-1 cursor-pointer font-figtree"
                    >
                      {feature.label}
                    </Label>
                    <div
                      onClick={() =>
                        handleFeatureToggle(
                          feature.key,
                          !selectedFeatures[feature.key]
                        )
                      }
                      className={`w-6 h-6 border-3 border-[#94A3B8] rounded cursor-pointer flex items-center justify-center transition-all duration-200 ${
                        selectedFeatures[feature.key]
                          ? "bg-[#020617] border-[#020617]"
                          : "bg-white"
                      }`}
                    >
                      {selectedFeatures[feature.key] && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6">
            <div className="flex gap-4">
              <Button
                label={t("cancel")}
                onClick={handleCancel}
                className="flex-1 py-3 bg-white text-base font-bold text-gray-700 border-gray-300 hover:bg-gray-50 h-[56px] border-none shadow-none"
              />

              <Button
                label={
                  isPending
                    ? isEditMode
                      ? t("offers.editing")
                      : t("offers.creating")
                    : isEditMode
                    ? t("bankAccount.modify")
                    : t("bankAccount.add")
                }
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
