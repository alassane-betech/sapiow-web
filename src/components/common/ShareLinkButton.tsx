"use client";
import Image from "next/image";
import { useState } from "react";

interface ShareLinkButtonProps {
  className?: string;
  linkText?: string;
}

export const ShareLinkButton = ({
  className = "",
  linkText = "Partagez votre lien de réservation",
}: ShareLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      // Générer un lien de réservation (à adapter selon votre logique)
      const bookingLink = `${window.location.origin}/booking/${Date.now()}`;

      await navigator.clipboard.writeText(bookingLink);
      setCopied(true);

      // Reset après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`flex items-center gap-3 px-3 py-3 h-[40px] border border-light-blue-gray rounded-full transition-colors cursor-pointer ${className}`}
    >
      <span className="text-sm font-medium text-exford-blue font-figtree">
        {copied ? "Lien copié !" : linkText}
      </span>
      <Image src="/assets/icons/copy.svg" alt="copy" width={20} height={20} />
    </button>
  );
};
