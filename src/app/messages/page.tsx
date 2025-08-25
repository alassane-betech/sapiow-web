"use client";

import {
  useGetConversations,
  useGetMessages,
} from "@/api/porMessages/useProMessage";
import { withAuth } from "@/components/common/withAuth";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppSidebar } from "@/components/layout/Sidebare";
import { ConversationItem } from "@/components/messages/ConversationItem";
import { MessageInput } from "@/components/messages/MessageInput";
import { MessageItem } from "@/components/messages/MessageItem";
import { SearchBar } from "@/components/messages/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

function Messages() {
  const { data: conversationsData } = useGetConversations();
  console.log("conversationsData", conversationsData);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  // ID du professionnel actuel (à récupérer depuis le contexte d'auth plus tard)
  const currentProId = "311f1e9b-aefe-4e59-940e-d956002ff377";

  // Trouver la conversation sélectionnée
  const activeConversation = conversationsData?.find(
    (conv) => conv.profile.id === selectedConversation
  );

  // Récupérer les messages de la conversation active
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useGetMessages(selectedConversation || "", currentProId);

  console.log("messagesData", messagesData);

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
              {conversationsData?.map((conversation) => (
                <ConversationItem
                  key={conversation.profile.id}
                  conversation={conversation}
                  isSelected={conversation.profile.id === selectedConversation}
                  onClick={() =>
                    setSelectedConversation(conversation.profile.id)
                  }
                />
              ))}
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
                            key={message.id}
                            message={{
                              id: parseInt(message.id.slice(-8), 16),
                              message: message.content,
                              time: messageTime,
                              isOwn,
                              avatar: !isOwn
                                ? activeConversation?.profile.avatar ||
                                  undefined
                                : undefined,
                              hasImage: message.type === "image",
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
              {conversationsData?.map((conversation) => (
                <ConversationItem
                  key={conversation.profile.id}
                  conversation={conversation}
                  onClick={() =>
                    setSelectedConversation(conversation.profile.id)
                  }
                />
              ))}
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
                        key={message.id}
                        message={{
                          id: parseInt(message.id.slice(-8), 16),
                          message: message.content,
                          time: messageTime,
                          isOwn,
                          avatar: !isOwn
                            ? activeConversation?.profile.avatar || undefined
                            : undefined,
                          hasImage: message.type === "image",
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
