"use client";

import {
  usePatientGetConversation,
  usePatientGetConversations,
} from "@/api/patientMessages/usePatientMessage";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { useConversationStore } from "@/store/useConversationStore";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { findActiveConversation } from "@/utils/messageHelpers";
import { MessagesLayout } from "./MessagesLayout";

export const MessageClientPage = () => {
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
  } = usePatientGetConversations();

  const {
    data: conversationMessages,
    isLoading: conversationLoading,
    error: conversationError,
  } = usePatientGetConversation(selectedConversation || "", currentUserId);

  const activeConversation = findActiveConversation(
    conversationsData,
    selectedConversation,
    selectedProfessional
  );

  return (
    <MessagesLayout
      header={<HeaderClient text="Messages" />}
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
