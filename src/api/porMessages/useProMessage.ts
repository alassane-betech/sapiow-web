import { supabase } from "@/lib/supabase/client";
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
export const useSendMessage = () => {
  return useMutation<Message, Error, SendMessageData>({
    mutationFn: async (data: SendMessageData) => {
      // Envoi direct via Supabase
      const { data: messageData, error } = await supabase
        .from("messages")
        .insert({
          receiver_id: data.receiverId,
          content: data.content,
          type: "text",
          sender_id: "311f1e9b-aefe-4e59-940e-d956002ff377", // TODO: récupérer depuis le contexte auth
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return messageData as Message;
    },
  });
};

// Hook pour récupérer les messages avec real-time
export const useGetMessages = (receiverId: string, proId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<Message[], Error>({
    queryKey: ["messages", receiverId],
    queryFn: async () => {
      return [];
    },
  });

  // Subscription real-time pour les nouveaux messages
  useEffect(() => {
    if (!receiverId || !proId) return;

    const channel = supabase
      .channel(`messages:${proId}:${receiverId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id.eq.${proId}.and.receiver_id.eq.${receiverId},sender_id.eq.${receiverId}.and.receiver_id.eq.${proId}`,
        },
        (payload) => {
          console.log("Nouveau message reçu:", payload.new);

          // Mettre à jour immédiatement les messages dans le cache
          queryClient.setQueryData(
            ["messages", receiverId],
            (oldData: Message[] | undefined) => {
              if (!oldData) return [payload.new as Message];

              // Éviter les doublons
              const messageExists = oldData.some(
                (msg) => msg.id === payload.new.id
              );
              if (messageExists) return oldData;

              return [...oldData, payload.new as Message];
            }
          );

          // Mettre à jour la liste des conversations pour afficher le dernier message
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `sender_id.eq.${proId}.and.receiver_id.eq.${receiverId},sender_id.eq.${receiverId}.and.receiver_id.eq.${proId}`,
        },
        (payload) => {
          console.log("Message mis à jour:", payload.new);

          // Mettre à jour le message dans le cache
          queryClient.setQueryData(
            ["messages", receiverId],
            (oldData: Message[] | undefined) => {
              if (!oldData) return oldData;

              return oldData.map((msg) =>
                msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
              );
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [receiverId, proId, queryClient]);

  return query;
};

// Hook pour récupérer toutes les conversations avec real-time
export const useGetConversations = () => {
  const queryClient = useQueryClient();
  const currentProId = "311f1e9b-aefe-4e59-940e-d956002ff377"; // TODO: récupérer depuis le contexte auth

  const conversations = useQuery<Conversation[], Error>({
    queryKey: ["conversations"],
    queryFn: async () => {
      // Récupérer tous les messages du pro
      const { data: messageData, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${currentProId},receiver_id.eq.${currentProId}`)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      if (!messageData) return [];

      // Regrouper par partenaire de conversation et garder le dernier message
      const latestMessages = new Map<string, any>();
      messageData.forEach((msg) => {
        const partnerId =
          msg.sender_id === currentProId ? msg.receiver_id : msg.sender_id;
        if (!latestMessages.has(partnerId)) {
          latestMessages.set(partnerId, msg);
        }
      });

      // Récupérer les profils patients pour tous les partenaires
      const conversations = await Promise.all(
        Array.from(latestMessages.entries()).map(
          async ([patientId, latestMessage]) => {
            const { data: patientProfile, error: profileError } = await supabase
              .from("patients")
              .select("*")
              .eq("id", patientId)
              .maybeSingle();

            if (profileError) {
              console.error(
                `Erreur lors de la récupération du profil patient ${patientId}:`,
                profileError
              );
              return null;
            }

            if (!patientProfile) {
              console.warn(`Profil patient non trouvé pour l'ID: ${patientId}`);
              return null;
            }

            return {
              profile: patientProfile,
              latest_message: latestMessage,
            };
          }
        )
      );

      // Filtrer les conversations nulles et retourner
      return conversations.filter((conv) => conv !== null) as Conversation[];
    },
  });

  // Real-time pour les conversations
  useEffect(() => {
    const channel = supabase
      .channel("conversations-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          // Invalider les conversations quand un message change
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return conversations;
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
