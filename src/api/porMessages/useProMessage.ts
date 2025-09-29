import { apiClient } from "@/lib/api-client";
import { supabase } from "@/lib/supabase/client";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Types pour les messages
export type MessageType = "text" | "audio" | "image" | "document";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  type: MessageType;
  content: string;
  created_at: string;
  read_at: string | null;
}

export interface PatientProfile {
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
}

export interface Conversation {
  profile: PatientProfile;
  latest_message: Message;
}

export interface SendMessageData {
  receiverId: string;
  content: string | File;
  type: MessageType;
}

// Hook pour envoyer un message
export const useProSendMessage = (senderId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessageData>({
    mutationFn: async (data: SendMessageData) => {
      // Le backend attend des FormData
      const formData = new FormData();
      
      // Gérer différents types de contenu comme dans le code de référence
      if (data.type === "audio" && data.content instanceof File) {
        formData.append("content", data.content);
      } else if (data.type === "image" && data.content instanceof File) {
        formData.append("content", data.content);
      } else if (typeof data.content === "string") {
        formData.append("content", data.content);
        formData.append("type", data.type); // Seulement pour les messages texte
      } else {
        formData.append("content", data.content);
      }

      // Utiliser l'endpoint Supabase Function comme le backend l'attend
      const { data: messageData, error } = await supabase.functions.invoke(
        `pro-messages/${data.receiverId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      return messageData as Message;
    },
    onSuccess: (data, variables) => {
      // Invalider les queries pour mettre à jour l'interface en temps réel
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.receiverId],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};

// Hook pour récupérer toutes les conversations avec real-time
export const useProGetConversations = () => {
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const queryClient = useQueryClient();

  const query = useQuery<Conversation[], Error>({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!currentProId) return [];
      
      try {
        // Utiliser Supabase Functions comme dans le code de référence
        const { data, error } = await supabase.functions.invoke("pro-messages", {
          method: "GET",
        });

        if (error) throw error;
        return data as Conversation[];
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }

        throw new Error(
          error.message ||
            "Une erreur est survenue lors de la récupération des conversations"
        );
      }
    },
    enabled: !!currentProId,
  });

  // Real-time pour tous les nouveaux messages reçus par le pro
  useEffect(() => {
    if (!currentProId) return;

    const channel = supabase
      .channel("pro-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentProId}`,
        },
        (payload) => {
          console.log("Real-time pro messages update:", payload);
          // Invalider les conversations pour mettre à jour la liste
          queryClient.invalidateQueries({
            queryKey: ["conversations"],
          });
          // Aussi invalider la conversation spécifique
          queryClient.invalidateQueries({
            queryKey: ["conversation", payload.new.sender_id],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentProId, queryClient]);

  // Obtenir les messages non lus
  const unreadMessages = query.data?.filter(
    (conversation) =>
      conversation.latest_message &&
      conversation.latest_message.receiver_id === currentProId &&
      !conversation.latest_message.read_at
  );

  return {
    ...query,
    unreadMessages,
  };
};

// Hook pour récupérer les messages d'une conversation spécifique
export const useProGetConversation = (
  patientId: string,
  currentProId: string
) => {
  const queryClient = useQueryClient();

  const query = useQuery<Message[], Error>({
    queryKey: ["conversation", patientId],
    queryFn: async () => {
      if (!patientId || !currentProId) return [];

      try {
        // Utiliser Supabase Functions comme dans le code de référence
        const { data, error } = await supabase.functions.invoke(
          `pro-messages/${patientId}?limit=10000`,
          {
            method: "GET",
          }
        );

        if (error) throw error;
        return data as Message[];
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }

        throw new Error(
          error.message ||
            "Une erreur est survenue lors de la récupération des messages"
        );
      }
    },
    enabled: !!patientId && !!currentProId,
  });

  // Real-time pour les messages de cette conversation spécifique
  useEffect(() => {
    if (!patientId || !currentProId) return;

    const channel = supabase
      .channel(`conversation-${patientId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${currentProId},receiver_id.eq.${patientId}),and(sender_id.eq.${patientId},receiver_id.eq.${currentProId}))`,
        },
        (payload) => {
          console.log("Real-time conversation update:", payload);
          // Invalider et refetch les messages de cette conversation
          queryClient.invalidateQueries({
            queryKey: ["conversation", patientId],
          });
          // Aussi invalider la liste des conversations pour mettre à jour le dernier message
          queryClient.invalidateQueries({
            queryKey: ["conversations"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [patientId, queryClient, currentProId]);

  return query;
};

// Hook pour marquer un message comme lu
export const useProMarkAsRead = () => {
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const queryClient = useQueryClient();

  return useMutation<Message, Error, string>({
    mutationFn: async (messageId: string) => {
      if (!currentProId) throw new Error("User ID is required");
      
      const { data, error } = await supabase
        .from("messages")
        .update({ read_at: new Date().toISOString() })
        .eq("id", messageId)
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    },
    onSuccess: () => {
      // Invalider les conversations pour mettre à jour les compteurs de messages non lus
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

// Validation des fichiers
export const ALLOWED_FILE_TYPES = {
  audio: ["audio/mp3", "audio/wav", "audio/m4a", "audio/aac"],
  image: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
  document: ["application/pdf"],
};

export const validateFile = (file: File): boolean => {
  const allAllowedTypes = [
    ...ALLOWED_FILE_TYPES.audio,
    ...ALLOWED_FILE_TYPES.image,
    ...ALLOWED_FILE_TYPES.document,
  ];

  return allAllowedTypes.includes(file.type);
};
