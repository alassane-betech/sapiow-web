import { usePatientMarkAsRead } from "@/api/patientMessages/usePatientMessage";
import { useProMarkAsRead } from "@/api/porMessages/useProMessage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";

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
  const displayName = `${conversation.profile.first_name} ${conversation.profile.last_name}`;

  const { user } = useUserStore();
  const { currentUser } = useCurrentUserData();
  const currentUserId = currentUser?.id;
  const isExpert = user?.type === "expert";

  const proMarkAsRead = useProMarkAsRead();
  const patientMarkAsRead = usePatientMarkAsRead();

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

  const handleClick = () => {
    // Si le dernier message est destiné à l'utilisateur courant et non lu, le marquer comme lu
    const latest = conversation.latest_message;
    const shouldMarkAsRead =
      currentUserId && latest.receiver_id === currentUserId && !latest.read_at;

    if (shouldMarkAsRead) {
      if (isExpert) {
        proMarkAsRead.mutate(latest.id);
      } else {
        patientMarkAsRead.mutate(latest.id);
      }
    }

    onClick();
  };

  const isUnread =
    currentUserId &&
    conversation.latest_message.receiver_id === currentUserId &&
    !conversation.latest_message.read_at;

  return (
    <div
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-[#e9e9e9] ${
        isSelected ? "bg-snow-blue" : ""
      }`}
      onClick={handleClick}
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
          <span className="flex items-center gap-2">
            <span className="text-xs text-granite-gray lg:text-gray-500 ml-2">
              {displayTime}
            </span>
            {isUnread && (
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D4F]" />
            )}
          </span>
        </div>
        <p className="text-sm text-slate-gray lg:text-gray-600 truncate font-figtree">
          {displayMessage}
        </p>
      </div>
    </div>
  );
}
