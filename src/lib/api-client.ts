import { supabase } from "./supabase/client";

const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!API_URL) {
  throw new Error(
    "L'URL de l'API est manquante dans les variables d'environnement"
  );
}

export const api = {
  baseUrl: `${API_URL}/functions/v1`,
  headers: {
    "Content-Type": "application/json",
  },
};

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

/**
 * Client API centralisé avec gestion automatique de l'authentification Supabase
 */
export const apiClient = {
  /**
   * Effectue une requête GET
   */
  get: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetchApi<T>(endpoint, { ...options, method: "GET" });
  },

  /**
   * Effectue une requête POST
   */
  post: async <T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> => {
    return fetchApi<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Effectue une requête PUT
   */
  put: async <T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> => {
    return fetchApi<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Effectue une requête DELETE
   */
  delete: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetchApi<T>(endpoint, { ...options, method: "DELETE" });
  },

  /**
   * Effectue une requête avec JSON (méthode générique)
   */
  fetchJson: async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return fetchApi<T>(endpoint, options);
  },

  /**
   * Effectue une requête avec FormData (pour upload de fichiers)
   */
  fetchFormData: async <T>(
    endpoint: string,
    formData: FormData,
    options: RequestInit = {}
  ): Promise<T> => {
    return fetchApi<T>(endpoint, {
      ...options,
      method: options.method || "POST",
      body: formData,
    });
  },
};

/**
 * Fonction utilitaire pour effectuer des requêtes API avec gestion automatique de l'authentification
 */
export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    ...(session?.access_token && {
      Authorization: `Bearer ${session.access_token}`,
    }),
    ...options.headers,
  };

  const response = await fetch(`${api.baseUrl}/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.statusText}`;

    try {
      // Essayer d'extraire le message d'erreur détaillé de la réponse
      const errorData = await response.json();

      if (errorData.error) {
        // Si l'erreur a un champ "error", l'utiliser
        errorMessage = errorData.error;
      } else if (errorData.message) {
        // Sinon, utiliser le champ "message"
        errorMessage = errorData.message;
      } else if (typeof errorData === "string") {
        // Si c'est une chaîne simple
        errorMessage = errorData;
      }
    } catch (parseError) {
      // Si on ne peut pas parser la réponse JSON, garder le message par défaut
      console.warn("Impossible de parser la réponse d'erreur:", parseError);
    }

    // Créer une erreur avec le message extrait et les détails originaux
    const error = new Error(errorMessage) as ApiError;
    error.status = response.status;
    error.statusText = response.statusText;

    throw error;
  }

  // Gérer les réponses vides (204 No Content, etc.)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text() as any;
  }
};
