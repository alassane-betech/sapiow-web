"use client";

import { supabase } from "@/lib/supabase/client";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

type ConversationLike = {
  latest_message?: {
    receiver_id: string;
    read_at: string | null;
  };
};

const getQueryKey = (role: "pro" | "patient", userId?: string | null) => [
  "unread-indicator",
  role,
  userId || "unknown",
];

export const useUnreadMessagesIndicator = () => {
  const { currentUser } = useCurrentUserData();
  const currentUserId = currentUser?.id;
  const { user } = useUserStore();
  const isExpert = user?.type === "expert";
  const role: "pro" | "patient" = isExpert ? "pro" : "patient";
  const queryClient = useQueryClient();

  const fetchUnreadCount = async () => {
    if (!currentUserId) return 0;

    const endpoint = role === "pro" ? "pro-messages" : "patient-messages";
    const { data, error } = await supabase.functions.invoke(endpoint, {
      method: "GET",
    });

    if (error) {
      throw error;
    }

    const conversations = (data as ConversationLike[]) || [];

    const unreadCount = conversations.filter(
      (conversation) =>
        conversation.latest_message?.receiver_id === currentUserId &&
        !conversation.latest_message?.read_at
    ).length;

    return unreadCount;
  };

  const queryKey = useMemo(
    () => getQueryKey(role, currentUserId),
    [role, currentUserId]
  );
  const conversationsKey =
    role === "pro" ? ["pro-conversations"] : ["patient-conversations"];
  const conversationKeyPrefix =
    role === "pro" ? "pro-conversation" : "patient-conversation";

  const invalidateMessageQueries = useCallback(() => {
    console.log("[UnreadIndicator] Invalidation des queries messages :", {
      role,
      currentUserId,
    });
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: conversationsKey });
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) =>
        Array.isArray(queryKey) && queryKey[0] === conversationKeyPrefix,
    });
  }, [queryClient, queryKey, conversationsKey, conversationKeyPrefix]);

  const query = useQuery<number, Error>({
    queryKey,
    queryFn: fetchUnreadCount,
    enabled: !!currentUserId,
  });

  useEffect(() => {
    if (!currentUserId) return;

    const channelName = `unread-indicator-${role}-${currentUserId}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        invalidateMessageQueries
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        invalidateMessageQueries
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, role, invalidateMessageQueries]);

  return {
    unreadCount: query.data ?? 0,
    hasUnread: (query.data ?? 0) > 0,
    isLoading: query.isLoading,
  };
};
