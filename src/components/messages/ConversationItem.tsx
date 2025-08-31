import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types pour les données API
interface ApiConversation {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    created_at: string;
    updated_at: string;
    user_id: string;
    language: string;
    stripe_customer_id: string;
    appointment_notification_sms: boolean;
    appointment_notification_email: boolean;
    message_notification_sms: boolean;
    message_notification_email: boolean;
    promotions_notification_sms: boolean;
    promotions_notification_email: boolean;
    domain_id: number | null;
    expo_push_token: string | null;
  };
  latest_message: {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
    receiver_id: string;
    type: string;
    read_at: string | null;
  };
}

interface ConversationItemProps {
  conversation: ApiConversation;
  isSelected?: boolean;
  onClick: () => void;
}

export function ConversationItem({
  conversation,
  isSelected = false,
  onClick,
}: ConversationItemProps) {
  // Transformer les données API
  const displayName = `${conversation.profile.first_name} ${conversation.profile.last_name}`;
  console.log({ conversation });

  // Gérer l'affichage du message selon son type
  const getDisplayMessage = () => {
    const messageType = conversation.latest_message.type;

    if (messageType === "document") {
      return "📄 Document";
    } else if (messageType === "image") {
      return "🖼️ Image";
    } else if (messageType === "audio") {
      return "🔊 Audio";
    } else {
      return conversation.latest_message.content;
    }
  };

  const displayMessage = getDisplayMessage();
  const displayTime = new Date(
    conversation.latest_message.created_at
  ).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-[#e9e9e9] ${
        isSelected ? "bg-snow-blue" : ""
      }`}
      onClick={onClick}
    >
      <Avatar className="h-12 w-12 mr-3 border border-[#e9e9e9]">
        {conversation.profile.avatar ? (
          <AvatarImage src={conversation.profile.avatar} />
        ) : null}
        <AvatarFallback className="bg-blue-100 text-exford-blue font-semibold text-sm flex items-center justify-center">
          {conversation.profile.first_name && conversation.profile.last_name
            ? `${conversation.profile.first_name[0]}${conversation.profile.last_name[0]}`.toUpperCase()
            : "UN"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base text-exford-blue truncate font-figtree lg:font-semibold lg:text-gray-900">
            {displayName}
          </h3>
          <span className="text-xs text-granite-gray lg:text-gray-500 ml-2">
            {displayTime}
          </span>
        </div>
        <p className="text-sm text-slate-gray lg:text-gray-600 truncate font-figtree">
          {displayMessage}
        </p>
      </div>
    </div>
  );
}
