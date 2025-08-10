'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Créer une instance de QueryClient pour chaque composant
  // Cela évite les problèmes de partage d'état entre les requêtes SSR/client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Durée de validité des données en cache (5 minutes)
            staleTime: 1000 * 60 * 5,
            // Durée de conservation en cache (10 minutes)
            gcTime: 1000 * 60 * 10,
            // Réessai en cas d'échec
            retry: 3,
            // Intervalle de réessai
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools uniquement en développement */}
      <ReactQueryDevtools 
        initialIsOpen={false} 
        position="bottom"
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
}
