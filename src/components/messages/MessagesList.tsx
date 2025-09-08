import { MessageItem } from "./MessageItem";

interface MessagesListProps {
  conversationMessages: any[] | null;
  conversationLoading: boolean;
  conversationError: any;
  currentUserId: string | undefined;
  activeConversation: any;
  selectedConversation: string | null;
  className?: string;
}

export function MessagesList({
  conversationMessages,
  conversationLoading,
  conversationError,
  currentUserId,
  activeConversation,
  selectedConversation,
  className = "",
}: MessagesListProps) {
  if (!selectedConversation) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <p className="text-gray-500 font-figtree">
          Sélectionnez une conversation pour voir les messages
        </p>
      </div>
    );
  }

  if (conversationLoading) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exford-blue"></div>
      </div>
    );
  }

  if (conversationError) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <p className="text-red-500">Erreur lors du chargement des messages</p>
      </div>
    );
  }

  if (!conversationMessages || conversationMessages.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <p className="text-gray-500">Aucun message dans cette conversation</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Date Separator */}
      <div className="flex justify-center">
        {/* <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
          Aujourd'hui
        </span> */}
      </div>

      {/* Messages de la conversation */}
      {conversationMessages
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((message: any) => {
          const isOwn = message.sender_id === currentUserId;
          const messageTime = new Date(message.created_at).toLocaleTimeString(
            "fr-FR",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return (
            <MessageItem
              key={message.id || Math.random()}
              message={{
                id: message.id
                  ? parseInt(message.id.slice(-8), 16)
                  : Math.floor(Math.random() * 1000000),
                message: message.content || "",
                time: messageTime,
                isOwn,
                avatar: !isOwn
                  ? activeConversation?.profile.avatar || undefined
                  : undefined,
                hasImage:
                  message.type === "image" || message.type === "document",
                type: message.type,
              }}
            />
          );
        })}
    </div>
  );
}
