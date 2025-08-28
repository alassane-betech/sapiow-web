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
      formData.append("content", data.content);

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
        queryKey: ["messages"],
      });
    },
  });
};

// Hook pour récupérer les messages avec real-time
export const useProGetMessages = () => {
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const queryClient = useQueryClient();

  const query = useQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Message[]>(`pro-messages`);

        // L'API retourne directement l'objet expert
        return response;
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }

        throw new Error(
          error.message ||
            "Une erreur est survenue lors de la récupération de l'expert"
        );
      }
    },
  });

  // Real-time pour tous les messages du pro
  useEffect(() => {
    if (!currentProId) return;

    const channel = supabase
      .channel(`pro-messages-${currentProId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `or(sender_id.eq.${currentProId},receiver_id.eq.${currentProId})`,
        },
        (payload) => {
          console.log("Real-time pro messages update:", payload);
          // Invalider la liste des messages pour mettre à jour
          queryClient.invalidateQueries({
            queryKey: ["messages"],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, currentProId]);

  return query;
};

export const useProGetConversation = (
  patientId: string,
  currentProId: string
) => {
  const queryClient = useQueryClient();

  const query = useQuery<Message[], Error>({
    queryKey: ["conversation", patientId],
    queryFn: async () => {
      if (!patientId) return [];

      try {
        const response = await apiClient.get<Message[]>(
          `pro-messages/${patientId}`
        );

        return response;
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
    enabled: !!patientId, // Ne pas exécuter si patientId est vide
  });

  // Real-time pour les messages de cette conversation
  useEffect(() => {
    if (!patientId || !currentProId) return;

    const channel = supabase
      .channel(`pro-conversation-${currentProId}-${patientId}`)
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
            queryKey: ["messages"],
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
