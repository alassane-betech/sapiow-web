"use client";
import { useGetProExpert } from "@/api/proExpert/useProExpert";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface ShareLinkButtonProps {
  className?: string;
  linkText?: string;
}

export const ShareLinkButton = ({
  className = "",
  linkText,
}: ShareLinkButtonProps) => {
  const { data: proExpert } = useGetProExpert();
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      // Générer un lien de réservation vers la page de détails de l'expert
      const bookingLink = `${window.location.origin}/details?id=${proExpert?.id}`;

      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);

      // Reset après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(t("shareLink.copyError"), err);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`flex items-center gap-3 px-3 py-3 h-[40px] border border-light-blue-gray rounded-full transition-colors cursor-pointer ${className}`}
    >
      <span className="text-sm font-medium text-exford-blue font-figtree">
        {copied
          ? t("shareLink.copied")
          : linkText || t("shareLink.defaultText")}
      </span>
      <Image src="/assets/icons/copy.svg" alt="copy" width={20} height={20} />
    </button>
  );
};
