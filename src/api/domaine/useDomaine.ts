import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Types
export interface Domain {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Expertise {
  id: number;
  name: string;
  domain_id: number;
  created_at?: string;
  updated_at?: string;
}

// Hook GET pour récupérer tous les domaines
export const useGetDomaines = () => {
  return useQuery<Domain[]>({
    queryKey: ["domains"],
    queryFn: () => apiClient.get<Domain[]>("domain"),
  });
};

// Hook GET pour récupérer les expertises par domaine
export const useGetExpertises = (domainId: number) => {
  return useQuery<Expertise[]>({
    queryKey: ["expertises", domainId],
    queryFn: () =>
      apiClient.get<Expertise[]>(`expertise?domain_id=${domainId}`),
    enabled: !!domainId,
  });
};
