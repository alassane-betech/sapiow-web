import { apiClient } from "@/lib/api-client";
import { showToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";

// Types
interface StripeAccount {
  id: string;
  object: string;
  business_profile?: any;
  capabilities?: any;
  country?: string;
  created?: number;
  default_currency?: string;
  details_submitted?: boolean;
  email?: string;
  external_accounts?: any;
  individual?: any;
  metadata?: any;
  payouts_enabled?: boolean;
  requirements?: {
    currently_due?: string[];
    errors?: any[];
    pending_verification?: string[];
  };
  settings?: any;
  type?: string;
}

interface GetBankResponse {
  account: StripeAccount;
}

interface CreateBankResponse {
  stripe_account_id: string;
  onboarding_url?: string;
}

interface UpdateBankRequest {
  external_account_token?: string;
  iban?: string;
  bic?: string;
  swift?: string;
  first_name?: string;
  last_name?: string;
  set_default_for_currency?: boolean;
}

interface UpdateBankResponse {
  external_account?: any;
  account?: StripeAccount;
  message?: string;
  onboarding_url?: string;
}

interface AccountLinkResponse {
  account_link_url: string;
}

export const useGetInfoStripeAccount = () => {
  const query = useQuery<GetBankResponse>({
    queryKey: ["bank"],
    queryFn: async () => {
      return await apiClient.get<GetBankResponse>("pro-bank-account");
    },
  });
  return query;
};

// Create/Initialize Stripe account
export const useCreateAccountStripe = () => {
  const mutation = useMutation<CreateBankResponse, Error, void>({
    mutationFn: async () => {
      return await apiClient.post<CreateBankResponse>("pro-bank-account");
    },
  });
  return mutation;
};

// Update bank account information
export const useUpdateBank = () => {
  const mutation = useMutation<UpdateBankResponse, Error, UpdateBankRequest>({
    mutationFn: async (data: UpdateBankRequest) => {
      return await apiClient.put<UpdateBankResponse>("pro-bank-account", data);
    },
    onError: (error: any) => {
      console.error("Failed to update bank account:", error);
      showToast.error("bankUpdateError", error?.message);
    },
  });
  return mutation;
};

// Generate Stripe Account Link for modification
export const useGenerateAccountLink = () => {
  const mutation = useMutation<AccountLinkResponse, Error, void>({
    mutationFn: async () => {
      return await apiClient.post<AccountLinkResponse>("pro-bank-account");
    },
  });
  return mutation;
};
