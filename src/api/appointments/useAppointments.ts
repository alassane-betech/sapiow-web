import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    },
    onError: (error) => {
      console.error("Failed to create appointment:", error);
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
    },
  });
};
