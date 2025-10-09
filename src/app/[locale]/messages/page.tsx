"use client";

import {
  usePatientGetConversation,
  usePatientGetConversations,
} from "@/api/patientMessages/usePatientMessage";
import {
  useProGetConversation,
  useProGetConversations,
} from "@/api/porMessages/useProMessage";
import { withAuth } from "@/components/common/withAuth";
import { Header } from "@/components/layout/header/Header";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { ConversationsList } from "@/components/messages/ConversationsList";
import { MessageInput } from "@/components/messages/MessageInput";
import { MessagesList } from "@/components/messages/MessagesList";
import { useConversationStore } from "@/store/useConversationStore";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";
import { findActiveConversation } from "@/utils/messageHelpers";

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

  // Récupérer toutes les conversations avec profils
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
    unreadMessages,
  } = user?.type === "expert"
    ? useProGetConversations()
    : usePatientGetConversations();

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

  // Les données sont déjà des conversations, pas besoin d'extraction
  const conversationsData = messagesData || [];

  const conversationsLoading = messagesLoading;
  const conversationsError = messagesError;

  // Trouver la conversation sélectionnée ou utiliser les infos du professionnel sélectionné
  const activeConversation = findActiveConversation(
    conversationsData,
    selectedConversation,
    selectedProfessional
  );

  // Responsive : afficher la liste ou le chat sur mobile
  return (
    <div className="flex h-screen bg-white container">
      <AppSidebar hideMobileNav={!!selectedConversation} />

      {/* Desktop (lg+) : sidebar + chat */}
      <div className="hidden lg:flex flex-1 flex-col container ">
        {user.type === "client" ? (
          <HeaderClient text="Messages" />
        ) : (
          <Header hideProfile={true} text="Messages" isBorder={true} />
        )}
        <div className="flex-1 flex h-[83vh] mt-[22px] mr-5">
          {/* Sidebar des conversations */}
          <div className="w-80 bg-white flex flex-col mr-4">
            <ConversationsList
              conversationsData={conversationsData}
              conversationsLoading={conversationsLoading}
              conversationsError={conversationsError}
              selectedConversation={selectedConversation}
              onConversationSelect={setSelectedConversation}
            />
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col border border-light-blue-gray rounded-3xl h-[85vh]">
            <ChatHeader activeConversation={activeConversation} />

            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 scrollbar-hide">
              <MessagesList
                conversationMessages={conversationMessages || null}
                conversationLoading={conversationLoading}
                conversationError={conversationError}
                currentUserId={currentProId}
                activeConversation={activeConversation}
                selectedConversation={selectedConversation}
              />
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
            <ConversationsList
              conversationsData={conversationsData}
              conversationsLoading={conversationsLoading}
              conversationsError={conversationsError}
              selectedConversation={selectedConversation}
              onConversationSelect={setSelectedConversation}
              searchBarClassName="sticky top-0 z-10 bg-white pt-2 pb-2"
            />
          </div>
        )}
        {/* Chat mobile (si une conversation est sélectionnée) */}
        {selectedConversation && (
          <div className="flex-1 flex flex-col border border-[#F4F6F9] rounded-3xl bg-white">
            <ChatHeader
              activeConversation={activeConversation}
              showBackButton={true}
              onBackClick={() => setSelectedConversation(null)}
              className="sticky top-0 z-10 bg-white"
            />

            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 scrollbar-hide">
              <MessagesList
                conversationMessages={conversationMessages || null}
                conversationLoading={conversationLoading}
                conversationError={conversationError}
                currentUserId={currentProId}
                activeConversation={activeConversation}
                selectedConversation={selectedConversation}
              />
            </div>

            <MessageInput receiverId={selectedConversation || undefined} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(Messages);
