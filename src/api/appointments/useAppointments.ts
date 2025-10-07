import { apiClient } from "@/lib/api-client";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiAppointment } from "@/utils/appointmentUtils";

export const useGetProAppointments = (professionalId: string | undefined) => {
  return useQuery({
    queryKey: ["appointments", professionalId],
    queryFn: () => apiClient.get(`pro-appointment/${professionalId}`),
    enabled: !!professionalId, // Only run query when professionalId is available
  });
};

export const useGetPatientAppointmentsById = (appointmentId: string) => {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => apiClient.get(`patient-appointment/${appointmentId}`),
    enabled: !!appointmentId,
  });
};

export interface SubmitQuestionData {
  appointmentId: string;
  question: string;
}

export interface UpdateQuestionData {
  questionId: number;
  question: string;
}

export interface AppointmentQuestion {
  id: number;
  question: string;
  created_at: string;
  updated_at: string;
  appointment_id: string;
}

export interface AppointmentCreate {
  pro_id: string;
  session_id: string;
  appointment_at: string; // ISO date-time string
}

export interface AppointmentCreateResponse {
  id: string;
  pro_id: string;
  session_id: string;
  appointment_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateAppointmentData {
  status: "confirmed" | "cancelled";
}

export interface BlockAppointmentData {
  date: string; // Format: "2025-06-12"
}

export interface BlockAppointmentResponse {
  id: number;
  pro_id: string;
  date: string;
  created_at: string;
}

export const useSubmitAppointmentQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SubmitQuestionData) => {
      return apiClient.put(`patient-appointment/${data.appointmentId}`, {
        question: data.question,
      });
    },
    onSuccess: (data, variables) => {
      // Invalider le cache pour recharger les données de l'appointment
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.appointmentId],
      });
      showToast.success("questionSubmitted");
    },
    onError: (error: any) => {
      console.error("Failed to submit question:", error);
      showToast.error("questionSubmitError", error?.message);
    },
  });
};

export const useUpdateAppointmentQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateQuestionData) => {
      return apiClient.put(`appointment-question/${data.questionId}`, {
        question: data.question,
      });
    },
    onSuccess: (_, variables) => {
      // Invalider le cache pour recharger les données
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.questionId],
      });
      showToast.success("questionUpdated");
    },
    onError: (error: any) => {
      console.error("Failed to update question:", error);
      showToast.error("questionUpdateError", error?.message);
    },
  });
};

export const useCreatePatientAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<AppointmentCreateResponse, Error, AppointmentCreate>({
    mutationFn: async (appointmentData: AppointmentCreate) => {
      return apiClient.post("patient-appointment", appointmentData);
    },
    onSuccess: (data, variables) => {
      // Invalider le cache des rendez-vous du professionnel
      queryClient.invalidateQueries({
        queryKey: ["appointments", variables.pro_id],
      });

      // Ajouter le nouvel appointment au cache si besoin
      queryClient.setQueryData(["appointment", data.id], data);
      // showToast.success("appointmentCreated");
    },
    onError: (error: any) => {
      console.error("Failed to create appointment:", error);
      showToast.error("appointmentCreateError", error?.message);
    },
  });
};

export const useUpdateProAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      updateData,
    }: {
      appointmentId: string;
      updateData: UpdateAppointmentData;
    }) => {
      return apiClient.put(`pro-appointment/${appointmentId}`, updateData);
    },
    onSuccess: (_, variables) => {
      // Invalider le cache pour recharger les données
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.appointmentId],
      });

      // Invalider aussi la liste des rendez-vous
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      const status = variables.updateData.status;
      const messageKey =
        status === "confirmed"
          ? "appointmentConfirmed"
          : "appointmentCancelled";
      showToast.success(messageKey);
    },
    onError: (error: any) => {
      console.error("Failed to update appointment:", error);
      showToast.error("appointmentUpdateError", error?.message);
    },
  });
};

export const useCancelPatientAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId: string) => {
      return apiClient.delete(`patient-appointment-cancel/${appointmentId}`);
    },
    onSuccess: (_, appointmentId) => {
      // Mettre à jour directement les données dans le cache
      // 1. Récupérer les données actuelles
      const updatePatientAppointments = (key: any) => {
        const currentData = queryClient.getQueryData<ApiAppointment[]>(key);
        if (currentData) {
          // 2. Mettre à jour le statut du rendez-vous annulé
          const updatedData = currentData.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: "cancelled" } 
              : appointment
          );
          // 3. Mettre à jour le cache avec les nouvelles données
          queryClient.setQueryData(key, updatedData);
        }
      };

      // Mettre à jour les données dans tous les caches pertinents
      updatePatientAppointments(["patient-appointments"]);
      
      // Invalider également les requêtes pour forcer un rechargement si nécessaire
      queryClient.invalidateQueries({
        queryKey: ["appointment", appointmentId],
      });

      queryClient.invalidateQueries({
        queryKey: ["patient-appointments"],
      });

      // Invalider aussi la liste des rendez-vous du patient
      queryClient.invalidateQueries({
        queryKey: ["patient-appointments", appointmentId],
      });

      // Invalider la liste générale des appointments
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      showToast.success("appointmentCancelled");
    },
    onError: (error: any) => {
      console.error("Failed to cancel patient appointment:", error);
      showToast.error("appointmentCancelError", error?.message);
    },
  });
};

export const useGetProAppointmentBlocks = () => {
  return useQuery({
    queryKey: ["pro-appointment-blocks"],
    queryFn: () => apiClient.get(`pro-appointment-block`),
  });
};

export const useCreateProAppointmentBlock = () => {
  const queryClient = useQueryClient();

  return useMutation<BlockAppointmentResponse, Error, BlockAppointmentData>({
    mutationFn: async (blockData: BlockAppointmentData) => {
      return apiClient.post("pro-appointment-block", blockData);
    },
    onSuccess: (data, variables) => {
      // Invalider le cache des blocs de rendez-vous
      queryClient.invalidateQueries({
        queryKey: ["pro-appointment-blocks"],
      });

      // Invalider aussi les rendez-vous du professionnel pour refléter les changements
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      showToast.success("dateBlocked");
    },
    onError: (error: any) => {
      console.error("Failed to create appointment block:", error);
      showToast.error("dateBlockError", error?.message);
    },
  });
};

// Interface pour la suppression d'un bloc de rendez-vous
interface DeleteBlockAppointmentData {
  date: string; // Format: "YYYY-MM-DD"
}

/**
 * Hook pour supprimer un bloc de rendez-vous pour un professionnel
 * @returns Mutation pour supprimer un bloc de rendez-vous
 */
export const useDeleteProAppointmentBlock = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, DeleteBlockAppointmentData>({
    mutationFn: async (deleteData: DeleteBlockAppointmentData) => {
      // Utilisation d'une URL avec paramètres pour la suppression
      const dateParam = encodeURIComponent(deleteData.date);
      return apiClient.delete(`pro-appointment-block?date=${dateParam}`);
    },
    onSuccess: (data, variables) => {
      // Invalider le cache des blocs de rendez-vous
      queryClient.invalidateQueries({
        queryKey: ["pro-appointment-blocks"],
      });

      // Invalider aussi les rendez-vous du professionnel pour refléter les changements
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      showToast.success("dateUnblocked");
    },
    onError: (error: any) => {
      console.error("Failed to delete appointment block:", error);
      showToast.error("dateUnblockError", error?.message);
    },
  });
};
