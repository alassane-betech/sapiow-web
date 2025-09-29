import { Switch } from "@/components/common/Switch";
import { useI18n } from "@/locales/client";

interface BlockDaySectionProps {
  isBlocked: boolean;
  onToggle: (checked: boolean) => void;
  isMobile?: boolean;
}

export const BlockDaySection = ({
  isBlocked,
  onToggle,
  isMobile = false,
}: BlockDaySectionProps) => {
  const t = useI18n();
  const containerClasses = isMobile
    ? "w-full flex items-center justify-between mt-6 p-4 border-t "
    : "w-full flex items-center justify-end gap-4 fixed bottom-5";

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
      <Switch
        checked={isBlocked}
        onChange={onToggle}
        className="data-[state=checked]:bg-[#1E293B]"
      />
    </div>
  );
};
