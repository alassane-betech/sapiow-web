"use client";

import {
  usePatientGetConversation,
  usePatientGetMessages,
} from "@/api/patientMessages/usePatientMessage";
import {
  useProGetConversation,
  useProGetMessages,
} from "@/api/porMessages/useProMessage";
import { withAuth } from "@/components/common/withAuth";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppSidebar } from "@/components/layout/Sidebare";
import { ConversationItem } from "@/components/messages/ConversationItem";
import { MessageInput } from "@/components/messages/MessageInput";
import { MessageItem } from "@/components/messages/MessageItem";
import { SearchBar } from "@/components/messages/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationStore } from "@/store/useConversationStore";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";
import { ArrowLeft } from "lucide-react";

function Messages() {
  const {
    selectedConversation,
    setSelectedConversation,
    selectedProfessional,
  } = useConversationStore();

  // ID du professionnel actuel (à récupérer depuis le contexte d'auth plus tard)
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const currentPatientId = currentUser?.id;
  const { user } = useUserStore();

  // Récupérer tous les messages avec profils pour la liste des conversations
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = user?.type === "expert" ? useProGetMessages() : usePatientGetMessages();

  // Récupérer les messages de la conversation sélectionnée
  const {
    data: conversationMessages,
    isLoading: conversationLoading,
    error: conversationError,
  } = user?.type === "expert"
    ? useProGetConversation(selectedConversation || "", currentProId || "")
    : usePatientGetConversation(
        selectedConversation || "",
        currentPatientId || ""
      );
  console.log(conversationMessages);
  // Extraire les conversations uniques des messages
  const conversationsData = messagesData
    ? (() => {
        const conversationsMap = new Map();

        messagesData.forEach((messageItem: any) => {
          const profileId = messageItem.profile.id;

          // Si cette conversation n'existe pas encore ou si ce message est plus récent
          if (
            !conversationsMap.has(profileId) ||
            new Date(messageItem.latest_message.created_at) >
              new Date(
                conversationsMap.get(profileId).latest_message.created_at
              )
          ) {
            conversationsMap.set(profileId, {
              profile: messageItem.profile,
              latest_message: messageItem.latest_message,
            });
          }
        });

        return Array.from(conversationsMap.values());
      })()
    : [];

  const conversationsLoading = messagesLoading;
  const conversationsError = messagesError;

  // Trouver la conversation sélectionnée ou utiliser les infos du professionnel sélectionné
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

  // Responsive : afficher la liste ou le chat sur mobile
  return (
    <div className="flex h-screen bg-white">
      <AppSidebar hideMobileNav={!!selectedConversation} />

      {/* Desktop (lg+) : sidebar + chat */}
      <div className="hidden lg:flex flex-1 flex-col container">
        <PageHeader title="Messages" className="hidden sm:flex" />
        <div className="flex-1 flex h-[83vh] mt-[22px]">
          {/* Sidebar des conversations */}
          <div className="w-80 bg-white flex flex-col mr-4">
            <SearchBar />

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversationsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exford-blue"></div>
                </div>
              ) : conversationsError ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-red-500">
                    Erreur: {conversationsError.message}
                  </p>
                </div>
              ) : conversationsData && conversationsData.length > 0 ? (
                conversationsData.map((conversation) => (
                  <ConversationItem
                    key={conversation.profile.id}
                    conversation={conversation}
                    isSelected={
                      conversation.profile.id === selectedConversation
                    }
                    onClick={() =>
                      setSelectedConversation(conversation.profile.id)
                    }
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-500">Aucune conversation trouvée</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col border border-light-blue-gray rounded-3xl h-[85vh]">
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center">
                {activeConversation && (
                  <Avatar
                    key={activeConversation.profile.id}
                    className="h-10 w-10 mr-3"
                  >
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
                  <h2 className="font-semibold text-gray-900 font-outfit text-base">
                    {activeConversation
                      ? `${activeConversation.profile.first_name} ${activeConversation.profile.last_name}`
                      : "Sélectionnez une conversation"}
                  </h2>
                  {activeConversation && (
                    <p className="text-sm text-green-600">Actif maintenant</p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {selectedConversation ? (
                <>
                  {conversationLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exford-blue"></div>
                    </div>
                  ) : conversationError ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-red-500">
                        Erreur lors du chargement des messages
                      </p>
                    </div>
                  ) : conversationMessages &&
                    conversationMessages.length > 0 ? (
                    <>
                      {/* Date Separator */}
                      <div className="flex justify-center">
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          Aujourd'hui
                        </span>
                      </div>

                      {/* Messages de la conversation */}
                      {conversationMessages
                        .sort(
                          (a: any, b: any) =>
                            new Date(a.created_at).getTime() -
                            new Date(b.created_at).getTime()
                        )
                        .map((message: any) => {
                          const isOwn = message.sender_id === currentProId;
                          const messageTime = new Date(
                            message.created_at
                          ).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          });

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
                                  ? activeConversation?.profile.avatar ||
                                    undefined
                                  : undefined,
                                hasImage: message.type === "image" || message.type === "document",
                                type: message.type,
                              }}
                            />
                          );
                        })}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">
                        Aucun message dans cette conversation
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Sélectionnez une conversation pour voir les messages
                  </p>
                </div>
              )}
            </div>

            <MessageInput receiverId={selectedConversation || undefined} />
          </div>
        </div>
      </div>

      {/* Mobile (sm/md) : liste ou chat seul */}
      <div className="flex flex-1 flex-col lg:hidden">
        {/* Pas de header sur mobile */}
        {/* Liste des conversations (si aucune sélection) */}
        {!selectedConversation && (
          <div className="flex-1 flex flex-col w-[95%] mx-auto">
            <h2 className="text-lg text-center font-semibold text-exford-blue mt-5">
              Messages
            </h2>
            <SearchBar className="sticky top-0 z-10 bg-white pt-2 pb-2" />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversationsLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exford-blue"></div>
                </div>
              ) : conversationsError ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-red-500">
                    Erreur: {conversationsError.message}
                  </p>
                </div>
              ) : conversationsData && conversationsData.length > 0 ? (
                conversationsData.map((conversation) => (
                  <ConversationItem
                    key={conversation.profile.id}
                    conversation={conversation}
                    onClick={() =>
                      setSelectedConversation(conversation.profile.id)
                    }
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-500">Aucune conversation trouvée</p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Chat mobile (si une conversation est sélectionnée) */}
        {selectedConversation && (
          <div className="flex-1 flex flex-col border border-[#F4F6F9] rounded-3xl bg-white">
            {/* Chat Header mobile sticky */}
            <div className="border-b border-gray-200 p-4 flex items-center gap-2 sticky top-0 z-10 bg-white">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-6 w-6 text-gray-900" />
              </button>
              <Avatar
                key={activeConversation?.profile.id}
                className="h-10 w-10 mr-3"
              >
                {activeConversation?.profile.avatar ? (
                  <AvatarImage src={activeConversation.profile.avatar} />
                ) : null}
                <AvatarFallback className="bg-blue-100 text-exford-blue font-semibold text-sm flex items-center justify-center">
                  {activeConversation?.profile.first_name &&
                  activeConversation?.profile.last_name
                    ? `${activeConversation.profile.first_name[0]}${activeConversation.profile.last_name[0]}`.toUpperCase()
                    : "UN"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {activeConversation
                    ? `${activeConversation.profile.first_name} ${activeConversation.profile.last_name}`
                    : "Sélectionnez une conversation"}
                </h2>
                <p className="text-sm text-green-600">Actif maintenant</p>
              </div>
            </div>
            {/* Messages Area */}
            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exford-blue"></div>
                </div>
              ) : messagesError ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">
                    Erreur lors du chargement des messages
                  </p>
                </div>
              ) : messagesData && messagesData.length > 0 ? (
                <>
                  {/* Date Separator */}
                  <div className="flex justify-center">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      Aujourd'hui
                    </span>
                  </div>
                  {/* Messages */}
                  {messagesData.map((message) => {
                    const isOwn = message.sender_id === currentProId;
                    const messageTime = new Date(
                      message.created_at
                    ).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

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
                          hasImage: message.type === "image" || message.type === "document",
                          type: message.type,
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Aucun message dans cette conversation
                  </p>
                </div>
              )}
            </div>
            <MessageInput receiverId={selectedConversation || undefined} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(Messages);
