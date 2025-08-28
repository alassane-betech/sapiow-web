import { useState, useEffect, useCallback } from 'react';
import { googleCalendar, GoogleCalendarEvent } from '@/lib/google-calendar';

export interface UseGoogleCalendarReturn {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  syncAvailabilities: (availabilities: any[]) => Promise<void>;
  checkConflicts: (startDate: Date, endDate: Date) => Promise<GoogleCalendarEvent[]>;
  refreshConnection: () => void;
}

export const useGoogleCalendar = (): UseGoogleCalendarReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier l'état de connexion au montage
  useEffect(() => {
    setIsConnected(googleCalendar.isConnected());
  }, []);

  // Écouter les changements de localStorage pour la connexion Google
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'google_calendar_connected') {
        setIsConnected(googleCalendar.isConnected());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const refreshConnection = useCallback(() => {
    setIsConnected(googleCalendar.isConnected());
  }, []);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Obtenir l'URL d'autorisation
      const authUrl = await googleCalendar.initiateConnection();
      
      // Ouvrir dans une popup ou rediriger
      const popup = window.open(
        authUrl,
        'google-calendar-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        throw new Error('Popup bloquée. Veuillez autoriser les popups et réessayer.');
      }

      // Écouter la fermeture de la popup
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          // Vérifier si la connexion a réussi
          setTimeout(() => {
            refreshConnection();
            setIsLoading(false);
          }, 1000);
        }
      }, 1000);

      // Écouter les messages de la popup pour le code d'autorisation
      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const { code } = event.data;
          
          // Finaliser la connexion
          googleCalendar.completeConnection(code).then((success) => {
            if (success) {
              setIsConnected(true);
              popup.close();
            } else {
              setError('Échec de la connexion à Google Calendar');
            }
            setIsLoading(false);
          });

          window.removeEventListener('message', messageListener);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          setError(event.data.error || 'Erreur lors de l\'authentification');
          setIsLoading(false);
          popup.close();
          window.removeEventListener('message', messageListener);
        }
      };

      window.addEventListener('message', messageListener);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
      setIsLoading(false);
    }
  }, [refreshConnection]);

  const disconnect = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await googleCalendar.disconnect();
      setIsConnected(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de déconnexion');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const syncAvailabilities = useCallback(async (availabilities: any[]) => {
    if (!isConnected) {
      throw new Error('Non connecté à Google Calendar');
    }

    setIsLoading(true);
    setError(null);

    try {
      await googleCalendar.syncAvailabilities(availabilities);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de synchronisation';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  const checkConflicts = useCallback(async (startDate: Date, endDate: Date) => {
    if (!isConnected) {
      return [];
    }

    try {
      return await googleCalendar.checkConflicts(startDate, endDate);
    } catch (err) {
      console.error('Erreur lors de la vérification des conflits:', err);
      return [];
    }
  }, [isConnected]);

  return {
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
    syncAvailabilities,
    checkConflicts,
    refreshConnection,
  };
};
