import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatHeaderProps {
  activeConversation: any;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

export function ChatHeader({
  activeConversation,
  showBackButton = false,
  onBackClick,
  className = "",
}: ChatHeaderProps) {
  const t = useTranslations();
  return (
    <div
      className={`border-b border-gray-200 p-4 flex items-center gap-2 ${className}`}
    >
      {showBackButton && (
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={onBackClick}
        >
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </button>
      )}

      {activeConversation && (
        <Avatar key={activeConversation.profile.id} className="h-10 w-10 mr-3">
          {activeConversation.profile.avatar ? (
            <AvatarImage src={activeConversation.profile.avatar} />
          ) : null}
          <AvatarFallback className="bg-blue-100 text-exford-blue font-semibold text-sm flex items-center justify-center">
            {activeConversation.profile.first_name &&
            activeConversation.profile.last_name
              ? `${activeConversation.profile.first_name[0]}${activeConversation.profile.last_name[0]}`.toUpperCase()
              : "UN"}
          </AvatarFallback>
        </Avatar>
      )}

      <div>
        <h2 className="font-semibold text-gray-900 font-figtree text-base">
          {activeConversation
            ? `${activeConversation.profile.first_name} ${activeConversation.profile.last_name}`
            : t("messages.selectConversation")}
        </h2>
      </div>
    </div>
  );
}
