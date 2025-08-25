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
}

// Hook pour envoyer un message
export const usePatientSendMessage = (senderId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessageData>({
    mutationFn: async (data: SendMessageData) => {
      // Envoi direct via Supabase
      const { data: messageData, error } = await supabase
        .from("messages")
        .insert({
          receiver_id: data.receiverId,
          content: data.content,
          type: "text",
          sender_id: senderId,
        })
        .select()
        .single();

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
export const usePatientGetMessages = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUserData();
  const currentPatientId = currentUser?.id;

  const query = useQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Message[]>(`patient-messages`);

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

  // Real-time pour tous les messages du patient
  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `or(sender_id.eq.${currentPatientId},receiver_id.eq.${currentPatientId})`,
        },
        (payload) => {
          console.log("Real-time patient messages update:", payload);
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
  }, [queryClient, currentPatientId]);

  return query;
};

export const usePatientGetConversation = (
  proId: string,
  currentPatientId: string
) => {
  const queryClient = useQueryClient();

  const query = useQuery<Message[], Error>({
    queryKey: ["conversation", proId],
    queryFn: async () => {
      if (!proId) return [];

      try {
        const response = await apiClient.get<Message[]>(
          `patient-messages/${proId}`
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
    enabled: !!proId, // Ne pas exécuter si patientId est vide
  });

  // Real-time pour les messages de cette conversation
  useEffect(() => {
    if (!proId) return;

    const channel = supabase
      .channel(`messages`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `or(and(sender_id.eq.${currentPatientId},receiver_id.eq.${proId}),and(sender_id.eq.${proId},receiver_id.eq.${currentPatientId}))`,
        },
        (payload) => {
          console.log("Real-time message update:", payload);
          // Invalider et refetch les messages de cette conversation
          queryClient.invalidateQueries({
            queryKey: ["conversation", proId],
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
  }, [proId, queryClient, currentPatientId]);

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
