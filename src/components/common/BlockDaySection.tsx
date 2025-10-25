import { Switch } from "@/components/ui/switch";
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

          {/* Switch */}
          <Switch
            checked={!isBlocked}
            onCheckedChange={(checked) => !isLoading && onToggle(!checked)}
            disabled={isLoading}
          />

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
