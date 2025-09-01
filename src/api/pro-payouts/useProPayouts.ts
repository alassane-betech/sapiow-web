import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Types
export interface Patient {
  last_name: string;
  first_name: string;
}

export interface Session {
  name: string;
  price: number;
  session_type: string;
  session_nature: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  pro_id: string;
  session_id: string;
  appointment_at: string;
  status: string;
  created_at: string;
  updated_at: string;
  google_calendar_event_id?: string | null;
  patients: Patient;
  sessions: Session;
}

export interface Payment {
  payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  appointment: Appointment;
}

export interface NextPayout {
  // À définir selon les données réelles des prochains payouts
  id?: string;
  amount?: number;
  currency?: string;
  arrival_date?: number;
}

export interface ProPayoutsParams {
  start_date?: string;
  end_date?: string;
}

export interface ProPayoutsResponse {
  nextPayouts: NextPayout[];
  payments: Payment[];
  total?: number;
  limit?: number;
  offset?: number;
}

// Hook GET pour récupérer les payouts du pro
export const useProPayouts = (params: ProPayoutsParams = {}) => {
  // Construction des paramètres de query
  const queryParams = new URLSearchParams();

  if (params.start_date) {
    queryParams.append("start_date", params.start_date);
  }
  if (params.end_date) {
    queryParams.append("end_date", params.end_date);
  }
  const queryString = queryParams.toString();
  const endpoint = queryString ? `pro-payouts?${queryString}` : "pro-payouts";

  return useQuery<ProPayoutsResponse>({
    queryKey: ["pro-payouts", params],
    queryFn: () => apiClient.get<ProPayoutsResponse>(endpoint),
  });
};

// Hook avec paramètres par défaut pour les payouts du pro
export const useListProPayouts = ({
  start_date,
  end_date,
}: Partial<ProPayoutsParams> = {}) => {
  return useProPayouts({
    start_date,
    end_date,
  });
};
