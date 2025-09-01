import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Hook pour récupérer les notifications
export const useProNotifications = (params: NotificationsParams = {}) => {
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

  return useQuery<Notification[]>({
    queryKey: ["pro-notifications", params],
    queryFn: () => apiClient.get<Notification[]>(endpoint),
  });
};

export const usePatientNotifications = (params: NotificationsParams = {}) => {
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

  return useQuery<PatientNotification[]>({
    queryKey: ["patient-notifications", params],
    queryFn: () => apiClient.get<PatientNotification[]>(endpoint),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (notificationId: string) =>
      apiClient.put(`/pro-notifications/${notificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pro-notifications"] });
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
      queryClient.invalidateQueries({ queryKey: ["patient-notifications"] });
    },
  });

  return mutation;
};
