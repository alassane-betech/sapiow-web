import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

/**
 * Gère les erreurs des Supabase Edge Functions selon la documentation officielle
 * https://supabase.com/docs/guides/functions/error-handling#client-side-error-handling
 * 
 * @param error - L'erreur retournée par supabase.functions.invoke
 * @returns Un message d'erreur formaté pour l'utilisateur
 */
export async function getSupabaseFunctionErrorMessage(
  error: unknown
): Promise<string> {
  // FunctionsHttpError: La fonction s'est exécutée mais a retourné une erreur (4xx/5xx)
  if (error instanceof FunctionsHttpError) {
    try {
      const errorMessage = await error.context.json();
      // Extraire le message d'erreur du JSON retourné
      if (errorMessage?.error) {
        return errorMessage.error;
      }
      if (errorMessage?.message) {
        return errorMessage.message;
      }
      return error.message || "Une erreur est survenue lors de l'appel à la fonction";
    } catch (parseError) {
      // Si on ne peut pas parser le JSON, utiliser le message par défaut
      return error.message || "Erreur HTTP lors de l'appel à la fonction";
    }
  }

  // FunctionsRelayError: Problème réseau entre le client et Supabase
  if (error instanceof FunctionsRelayError) {
    return error.message || "Problème de connexion avec le serveur. Veuillez réessayer.";
  }

  // FunctionsFetchError: La fonction n'a pas pu être atteinte
  if (error instanceof FunctionsFetchError) {
    return error.message || "Impossible de contacter le serveur. Vérifiez votre connexion internet.";
  }

  // Erreur générique (fallback)
  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inattendue s'est produite";
}

/**
 * Version synchrone pour les cas où l'erreur est déjà parsée
 */
export function getSupabaseFunctionErrorMessageSync(error: unknown): string {
  if (error instanceof FunctionsHttpError) {
    // Pour les FunctionsHttpError, on peut accéder à error.message directement
    return error.message || "Erreur HTTP lors de l'appel à la fonction";
  }

  if (error instanceof FunctionsRelayError) {
    return error.message || "Problème de connexion avec le serveur. Veuillez réessayer.";
  }

  if (error instanceof FunctionsFetchError) {
    return error.message || "Impossible de contacter le serveur. Vérifiez votre connexion internet.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inattendue s'est produite";
}

