"use client";

import {
  useProGetConversation,
  useProGetConversations,
} from "@/api/porMessages/useProMessage";
import { Header } from "@/components/layout/header/Header";
import { useConversationStore } from "@/store/useConversationStore";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { findActiveConversation } from "@/utils/messageHelpers";
import { MessagesLayout } from "./MessagesLayout";

export const MessageProPage = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    selectedProfessional,
  } = useConversationStore();

  const { currentUser } = useCurrentUserData();
  const currentUserId = currentUser?.id || "";

  const {
    data: conversationsData = [],
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useProGetConversations();

  const {
    data: conversationMessages,
    isLoading: conversationLoading,
    error: conversationError,
  } = useProGetConversation(selectedConversation || "", currentUserId);

  const activeConversation = findActiveConversation(
    conversationsData,
    selectedConversation,
    selectedProfessional
  );

  return (
    <MessagesLayout
      header={<Header hideProfile text="Messages" isBorder />}
      selectedConversation={selectedConversation}
      setSelectedConversation={setSelectedConversation}
      conversationsData={conversationsData}
      conversationsLoading={conversationsLoading}
      conversationsError={conversationsError}
      conversationMessages={conversationMessages || null}
      conversationLoading={conversationLoading}
      conversationError={conversationError}
      activeConversation={activeConversation}
      currentUserId={currentUserId}
    />
  );
};
