import { apiClient } from "@/lib/api-client";
import { supabase } from "@/lib/supabase/client";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useQuery } from "@tanstack/react-query";

// Types pour les transactions de paiement
export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "pending" | "failed";
  created: number;
  description: string;
  receipt_url: string;
  appointment: {
    id: string;
    appointment_at: string;
    status: "confirmed" | "pending" | "cancelled" | "completed";
    pro: {
      id: string;
      first_name: string;
      last_name: string;
      job: string;
      avatar: string;
      domains: {
        name: string;
      };
    };
  };
}

export interface PaymentResponse {
  transactions: PaymentTransaction[];
}

// Interface pour les données transformées pour l'affichage
export interface TransactionDisplay {
  id: string;
  title: string;
  date: string;
  amount: string;
  expert: string;
  dateHeure: string;
  statut: "Effectué" | "En attente" | "Annulé";
  transactionId: string;
  session: string;
  receiptUrl?: string;
}

// Hook pour récupérer l'historique des paiements du patient
export const usePatientPaymentHistory = () => {
  const { currentUser } = useCurrentUserData();
  const currentPatientId = currentUser?.id;

  const query = useQuery<PaymentTransaction[], Error>({
    queryKey: ["patient-payment-history"],
    queryFn: async () => {
      if (!currentPatientId) return [];
      
      try {
        // Utiliser Supabase Functions pour récupérer l'historique des paiements
        const { data, error } = await supabase.functions.invoke("patient-payment", {
          method: "GET",
        });

        if (error) throw error;
        
        // Retourner directement le tableau de transactions
        return (data as PaymentResponse).transactions || [];
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }

        throw new Error(
          error.message ||
            "Une erreur est survenue lors de la récupération de l'historique des paiements"
        );
      }
    },
    enabled: !!currentPatientId,
  });

  return query;
};

// Fonction utilitaire pour transformer les données API en format d'affichage
export const transformTransactionForDisplay = (
  transaction: PaymentTransaction
): TransactionDisplay => {
  // Formatage du montant (conversion des centimes en euros)
  const amountInEuros = transaction.amount / 100;
  const formattedAmount = `${amountInEuros.toFixed(2)}€`;

  // Formatage de la date de création (timestamp Unix)
  const createdDate = new Date(transaction.created * 1000);
  const formattedDate = createdDate.toLocaleDateString("fr-FR");
  const formattedDateTime = createdDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Nom complet de l'expert
  const expertName = `${transaction.appointment.pro.first_name} ${transaction.appointment.pro.last_name}`.trim();

  // Mapping du statut
  const statusMapping: Record<string, "Effectué" | "En attente" | "Annulé"> = {
    succeeded: "Effectué",
    pending: "En attente",
    failed: "Annulé",
  };

  // Titre de la transaction
  const title = `Paiement consultation avec ${expertName}`;

  // Type de session basé sur la description ou le job de l'expert
  const session = transaction.appointment.pro.job || "Consultation";

  return {
    id: transaction.id,
    title,
    date: formattedDate,
    amount: formattedAmount,
    expert: expertName,
    dateHeure: formattedDateTime,
    statut: statusMapping[transaction.status] || "En attente",
    transactionId: transaction.id,
    session,
    receiptUrl: transaction.receipt_url,
  };
};

// Hook pour récupérer et transformer les données pour l'affichage
export const usePatientPaymentHistoryDisplay = () => {
  const { data: transactions, ...queryResult } = usePatientPaymentHistory();

  const transformedData = transactions?.map(transformTransactionForDisplay) || [];

  return {
    ...queryResult,
    data: transformedData,
    transactions: transformedData,
  };
};
