"use client";

import { useGetProSessionFeatures } from "@/api/sessions/useProSessionFeatures";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface SessionFeaturesListProps {
  sessionId: string;
  variant?: "default" | "compact"; // Style variant
}

export default function SessionFeaturesList({
  sessionId,
  variant = "default",
}: SessionFeaturesListProps) {
  const t = useTranslations();
  const { data: featuresData, isLoading } = useGetProSessionFeatures(sessionId);

  // Convertir en tableau si nécessaire
  const features = featuresData
    ? Array.isArray(featuresData)
      ? featuresData
      : [featuresData]
    : [];

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500 py-4 font-figtree">
        {t("offers.loadingFeatures")}
      </div>
    );
  }

  if (features.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-4 font-figtree">
        {t("offers.noFeaturesYet")}
      </div>
    );
  }

  // Style par défaut (page Offres - expert)
  if (variant === "default") {
    return (
      <div className="space-y-3 mb-8 font-figtree">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-start gap-3">
            <div className="relative w-4 h-4 bg-[#6B7280] rounded-full mt-2 flex-shrink-0">
              <Check className="w-3 h-3 text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-base text-[#1E293B] leading-relaxed font-figtree">
              {feature.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Style compact (OfferSelection - client)
  return (
    <div className="space-y-2">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-start gap-2">
          <Image
            src="/assets/icons/check-circle.svg"
            alt="check-circle"
            width={16}
            height={16}
          />
          <span className="text-sm text-slate-800 font-figtree">
            {feature.name}
          </span>
        </div>
      ))}
    </div>
  );
}
