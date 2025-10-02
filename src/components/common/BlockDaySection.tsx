import { Switch } from "@/components/common/Switch";
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
    ? "w-full flex items-center justify-between mt-6 p-4 border-t "
    : "w-full flex items-center justify-end gap-4 fixed bottom-10";

  const textContainerClasses = isMobile ? "" : "text-right";

  return (
    <div className={containerClasses}>
      <div className={textContainerClasses}>
        <h1 className="text-lg font-semibold text-charcoal-blue">
          {t("blockDaySection.title")}
        </h1>
        <p className="text-sm font-normal text-gray-500">
          {t("blockDaySection.description")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
        )}
        <Switch
          checked={isBlocked}
          onChange={onToggle}
          disabled={isLoading}
          className="data-[state=checked]:bg-[#1E293B] disabled:opacity-50"
        />
      </div>
    </div>
  );
};
