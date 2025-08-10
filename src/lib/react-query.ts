import { QueryClient } from '@tanstack/react-query';

// Configuration par défaut pour React Query
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Durée de validité des données (5 minutes)
      staleTime: 1000 * 60 * 5,
      // Durée de conservation en cache (10 minutes)
      gcTime: 1000 * 60 * 10,
      // Réessai automatique en cas d'échec
      retry: 3,
      // Délai progressif entre les réessais
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch en cas de refocus de la fenêtre
      refetchOnWindowFocus: false,
      // Refetch en cas de reconnexion
      refetchOnReconnect: true,
    },
    mutations: {
      // Réessai des mutations en cas d'échec
      retry: 1,
    },
  },
};

// Fonction utilitaire pour créer un QueryClient
export const createQueryClient = () => new QueryClient(queryClientConfig);

// Types utilitaires pour React Query
export type QueryKeys = {
  // Exemples de clés de requêtes
  users: ['users'];
  user: (id: number) => ['users', number];
  posts: ['posts'];
  post: (id: number) => ['posts', number];
};

// Factory pour générer des clés de requêtes consistantes
export const queryKeys: QueryKeys = {
  users: ['users'],
  user: (id: number) => ['users', id],
  posts: ['posts'],
  post: (id: number) => ['posts', id],
};

// Fonctions utilitaires pour gérer les erreurs
export const handleQueryError = (error: Error) => {
  console.error('Query Error:', error);
  // Ajoutez ici votre logique de gestion d'erreurs
  // Par exemple : toast, notification, logging, etc.
};

export const handleMutationError = (error: Error) => {
  console.error('Mutation Error:', error);
  // Ajoutez ici votre logique de gestion d'erreurs des mutations
};
