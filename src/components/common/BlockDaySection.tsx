import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlockDaySectionProps {
  isBlocked: boolean;
  onToggle: (checked: boolean) => void;
  isMobile?: boolean;
  isLoading?: boolean;
}

export const BlockDaySection = ({
  isBlocked,
  onToggle,
  isMobile = false,
  isLoading = false,
}: BlockDaySectionProps) => {
  const t = useTranslations();
  const containerClasses = isMobile
    ? "w-full flex items-center justify-between p-4 border-t border-gray-200"
    : "w-full flex items-center justify-between p-4 mt-4 border-t border-gray-200";

  // Debug: Log des props reçues
  console.log("🔍 [BlockDaySection] Props reçues:", {
    isBlocked,
    isLoading,
    isMobile,
  });

  const handleToggleClick = () => {
    console.log("🔘 [BlockDaySection] Click sur le switch");
    console.log("📊 [BlockDaySection] État actuel isBlocked:", isBlocked);
    console.log("⏳ [BlockDaySection] isLoading:", isLoading);
    
    if (!isLoading) {
      // On inverse l'état : si isBlocked=false, on veut bloquer (true), et vice-versa
      const newBlockedState = !isBlocked;
      console.log("✅ [BlockDaySection] Appel de onToggle avec:", newBlockedState);
      console.log("🔄 [BlockDaySection] Transition:", isBlocked ? "Débloqué → Bloqué" : "Bloqué → Débloqué");
      onToggle(newBlockedState);
    } else {
      console.log("⛔ [BlockDaySection] Toggle bloqué car isLoading = true");
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col gap-3 max-w-full mx-auto">
        <h1 className="text-base font-medium text-charcoal-blue">
          {t("blockDaySection.question")}
        </h1>
        <div className="flex items-center gap-3 border border-[#E2E8F0] rounded-[8px] p-2">
          {/* Label Bloqué */}
          <span className="text-sm text-charcoal-blue font-bold">
            {t("blockDaySection.blocked")}
          </span>

          {/* Switch personnalisé */}
          <button
            type="button"
            role="switch"
            aria-checked={!isBlocked}
            disabled={isLoading}
            onClick={handleToggleClick}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
              ${!isBlocked ? "bg-exford-blue" : "bg-gray-300"}
              ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              focus:outline-none focus:ring-2 focus:ring-exford-blue focus:ring-offset-2
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
                ${!isBlocked ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>

          {/* Label Débloqué */}
          <span className="text-sm text-exford-blue font-bold">
            {t("blockDaySection.unblocked")}
          </span>

          {/* Loader */}
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500 ml-2" />
          )}
        </div>
      </div>
    </div>
  );
};
