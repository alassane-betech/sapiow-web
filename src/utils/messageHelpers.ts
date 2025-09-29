// Utilitaires pour la gestion des messages et conversations

export function extractConversationsFromMessages(messagesData: any[]) {
  if (!messagesData) return [];

  const conversationsMap = new Map();

  messagesData.forEach((messageItem: any) => {
    const profileId = messageItem.profile.id;

    // Si cette conversation n'existe pas encore ou si ce message est plus récent
    if (
      !conversationsMap.has(profileId) ||
      new Date(messageItem.latest_message.created_at) >
        new Date(conversationsMap.get(profileId).latest_message.created_at)
    ) {
      conversationsMap.set(profileId, {
        profile: messageItem.profile,
        latest_message: messageItem.latest_message,
      });
    }
  });

  return Array.from(conversationsMap.values());
}

export function findActiveConversation(
  conversationsData: any[],
  selectedConversation: string | null,
  selectedProfessional: any
) {
  const activeConversation =
    conversationsData?.find(
      (conv) => conv.profile.id === selectedConversation
    ) ||
    (selectedProfessional
      ? {
          profile: {
            id: selectedProfessional.id,
            first_name: selectedProfessional.name.split(" ")[0],
            last_name: selectedProfessional.name.split(" ").slice(1).join(" "),
            avatar: selectedProfessional.avatar,
          },
          latest_message: null,
        }
      : null);

  return activeConversation;
}

export function formatMessageForDisplay(
  message: any,
  currentUserId: string | undefined,
  activeConversation: any
) {
  const isOwn = message.sender_id === currentUserId;
  const messageTime = new Date(message.created_at).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    id: message.id
      ? parseInt(message.id.slice(-8), 16)
      : Math.floor(Math.random() * 1000000),
    message: message.content || "",
    time: messageTime,
    isOwn,
    avatar: !isOwn
      ? activeConversation?.profile.avatar || undefined
      : undefined,
    hasImage: message.type === "image" || message.type === "document",
    type: message.type,
  };
}
