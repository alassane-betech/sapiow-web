import { apiClient } from "@/lib/api-client";
import { supabase } from "@/lib/supabase/client";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Types
export interface Notification {
  id: string;
  title: string;
  body: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  patient_id: string | null;
  pro_id: string;
  sent_at: string | null;
}

export interface PatientNotification {
  id: string;
  patient_id: string;
  title: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface NotificationsParams {
  limit?: number;
  offset?: number;
  read?: boolean; // Filtrer par statut lu/non lu
  type?: "message" | "appointment" | "all"; // Filtrer par type
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
}

// Hook pour récupérer les notifications pro avec real-time
export const useProNotifications = (params: NotificationsParams = {}) => {
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams();

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }
  if (params.read !== undefined) {
    queryParams.append("read", params.read.toString());
  }
  if (params.type && params.type !== "all") {
    queryParams.append("type", params.type);
  }

  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `pro-notifications?${queryString}`
    : "pro-notifications";

  const query = useQuery<Notification[]>({
    queryKey: ["pro-notifications", params],
    queryFn: () => apiClient.get<Notification[]>(endpoint),
    enabled: !!currentProId,
    // Sécurité supplémentaire: rafraîchissement périodique au cas où le temps réel ne capte pas un event
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  // Real-time pour les notifications pro (nouvelles notifications et mises à jour)
  useEffect(() => {
    if (!currentProId) return;

    const channel = supabase
      .channel("pro-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `pro_id=eq.${currentProId}`,
        },
        (payload) => {
          console.log("Real-time pro notification INSERT:", payload);
          // Invalider les notifications pour mettre à jour la liste
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              Array.isArray(queryKey) && queryKey[0] === "pro-notifications",
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `pro_id=eq.${currentProId}`,
        },
        (payload) => {
          console.log("Real-time pro notification UPDATE:", payload);
          // Invalider les notifications pour mettre à jour le statut lu
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              Array.isArray(queryKey) && queryKey[0] === "pro-notifications",
          });
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, [currentProId, queryClient]);

  return query;
};

// Hook pour récupérer les notifications patient avec real-time
export const usePatientNotifications = (params: NotificationsParams = {}) => {
  const { currentUser } = useCurrentUserData();
  const currentPatientId = currentUser?.id;
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams();

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }
  if (params.read !== undefined) {
    queryParams.append("read", params.read.toString());
  }
  if (params.type && params.type !== "all") {
    queryParams.append("type", params.type);
  }

  const queryString = queryParams.toString();
  const endpoint = queryString
    ? `patient-notifications?${queryString}`
    : "patient-notifications";

  const query = useQuery<PatientNotification[]>({
    queryKey: ["patient-notifications", params],
    queryFn: () => apiClient.get<PatientNotification[]>(endpoint),
    enabled: !!currentPatientId,
    // Sécurité supplémentaire: rafraîchissement périodique au cas où le temps réel ne capte pas un event
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  // Real-time pour les notifications patient (nouvelles notifications et mises à jour)
  useEffect(() => {
    if (!currentPatientId) return;

    const channel = supabase
      .channel("patient-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `patient_id=eq.${currentPatientId}`,
        },
        (payload) => {
          console.log("Real-time patient notification INSERT:", payload);
          // Invalider les notifications pour mettre à jour la liste
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              Array.isArray(queryKey) &&
              queryKey[0] === "patient-notifications",
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `patient_id=eq.${currentPatientId}`,
        },
        (payload) => {
          console.log("Real-time patient notification UPDATE:", payload);
          // Invalider les notifications pour mettre à jour le statut lu
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              Array.isArray(queryKey) &&
              queryKey[0] === "patient-notifications",
          });
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, [currentPatientId, queryClient]);

  return query;
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (notificationId: string) =>
      apiClient.put(`/pro-notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          Array.isArray(queryKey) && queryKey[0] === "pro-notifications",
      });
    },
  });

  return mutation;
};

export const useMarkPatientNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (notificationId: string) =>
      apiClient.put(`/patient-notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          Array.isArray(queryKey) && queryKey[0] === "patient-notifications",
      });
    },
  });

  return mutation;
};
