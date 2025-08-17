"use client";

import { useState, useCallback, useEffect } from "react";
import { useUpdateProExpert, useGetProExpert } from "@/api/proExpert/useProExpert";
import { useGetCustomer, useUpdateCustomer } from "@/api/customer/useCustomer";
import { useUserStore } from "@/store/useUser";

// Interface pour les paramètres de notification basée sur l'API
export interface NotificationSettings {
  appointment_notification_sms: boolean;
  appointment_notification_email: boolean;
  message_notification_sms: boolean;
  message_notification_email: boolean;
  promotions_notification_sms: boolean;
  promotions_notification_email: boolean;
}

// Interface pour une notification individuelle dans l'UI
export interface NotificationItem {
  key: keyof NotificationSettings;
  icon: string;
  label: string;
  type: 'sms' | 'email';
}

// Configuration des notifications UI mappées sur les champs API
const NOTIFICATION_CONFIG: NotificationItem[] = [
  {
    key: 'appointment_notification_sms',
    icon: '/assets/icons/calendar.svg',
    label: 'Notifications de Rendez-vous',
    type: 'sms'
  },
  {
    key: 'message_notification_sms',
    icon: '/assets/icons/chatunread.svg',
    label: 'Notifications de Messagerie',
    type: 'sms'
  },
  {
    key: 'promotions_notification_sms',
    icon: '/assets/icons/sale.svg',
    label: 'Promotions & Offres spéciales',
    type: 'sms'
  },
  {
    key: 'appointment_notification_email',
    icon: '/assets/icons/calendar.svg',
    label: 'Notifications de Rendez-vous',
    type: 'email'
  },
  {
    key: 'message_notification_email',
    icon: '/assets/icons/chatunread.svg',
    label: 'Notifications de Messagerie',
    type: 'email'
  },
  {
    key: 'promotions_notification_email',
    icon: '/assets/icons/sale.svg',
    label: 'Promotions & Offres spéciales',
    type: 'email'
  }
];

export const useNotificationSettings = () => {
  // États locaux pour les paramètres de notification
  const [settings, setSettings] = useState<NotificationSettings>({
    appointment_notification_sms: true,
    appointment_notification_email: true,
    message_notification_sms: true,
    message_notification_email: false,
    promotions_notification_sms: false,
    promotions_notification_email: true,
  });

  const [error, setError] = useState<string | null>(null);

  // Détection du type d'utilisateur
  const { user } = useUserStore();
  const isClient = user?.type === "client";
  const isExpert = user?.type === "expert";

  // Hooks conditionnels pour l'API selon le type d'utilisateur
  const { data: customerData, isLoading: isLoadingCustomer, error: fetchErrorCustomer } = useGetCustomer();
  const { data: proExpertData, isLoading: isLoadingExpert, error: fetchErrorExpert } = useGetProExpert();
  
  const updateCustomerMutation = useUpdateCustomer();
  const updateProExpertMutation = useUpdateProExpert();

  // États dérivés
  const isLoading = isClient ? isLoadingCustomer : isLoadingExpert;
  const fetchError = isClient ? fetchErrorCustomer : fetchErrorExpert;
  const userData = isClient ? customerData : proExpertData;
  const updateMutation = isClient ? updateCustomerMutation : updateProExpertMutation;

  // Charger les paramètres depuis les données récupérées
  useEffect(() => {
    if (userData) {
      setSettings({
        appointment_notification_sms: userData.appointment_notification_sms ?? true,
        appointment_notification_email: userData.appointment_notification_email ?? true,
        message_notification_sms: userData.message_notification_sms ?? true,
        message_notification_email: userData.message_notification_email ?? false,
        promotions_notification_sms: userData.promotions_notification_sms ?? false,
        promotions_notification_email: userData.promotions_notification_email ?? true,
      });
    }
  }, [userData]);

  // Gérer les erreurs de récupération
  useEffect(() => {
    if (fetchError) {
      setError('Erreur lors du chargement des paramètres de notification');
      console.error('Error loading notification settings:', fetchError);
    }
  }, [fetchError]);

  // Fonction pour mettre à jour un paramètre de notification
  const updateNotificationSetting = useCallback(async (
    key: keyof NotificationSettings, 
    value: boolean
  ) => {
    try {
      setError(null);
      
      // Mise à jour locale optimiste
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      // Appel API pour sauvegarder selon le type d'utilisateur
      await updateMutation.mutateAsync({
        [key]: value
      });

    } catch (err) {
      // Rollback en cas d'erreur
      setSettings(prev => ({
        ...prev,
        [key]: !value
      }));
      
      setError('Erreur lors de la mise à jour des paramètres');
      console.error('Error updating notification setting:', err);
    }
  }, [updateMutation]);

  // Fonctions utilitaires pour filtrer les notifications par type
  const getSmsNotifications = useCallback(() => {
    return NOTIFICATION_CONFIG
      .filter(config => config.type === 'sms')
      .map(config => ({
        id: config.key,
        icon: config.icon,
        label: config.label,
        checked: settings[config.key]
      }));
  }, [settings]);

  const getEmailNotifications = useCallback(() => {
    return NOTIFICATION_CONFIG
      .filter(config => config.type === 'email')
      .map(config => ({
        id: config.key,
        icon: config.icon,
        label: config.label,
        checked: settings[config.key]
      }));
  }, [settings]);

  // Fonction pour gérer le changement d'une notification SMS
  const handleSmsNotificationChange = useCallback((id: string, checked: boolean) => {
    const key = id as keyof NotificationSettings;
    updateNotificationSetting(key, checked);
  }, [updateNotificationSetting]);

  // Fonction pour gérer le changement d'une notification Email
  const handleEmailNotificationChange = useCallback((id: string, checked: boolean) => {
    const key = id as keyof NotificationSettings;
    updateNotificationSetting(key, checked);
  }, [updateNotificationSetting]);

  return {
    // États
    settings,
    isLoading,
    error,
    isUpdating: updateMutation.isPending,
    
    // Données pour l'UI
    smsNotifications: getSmsNotifications(),
    emailNotifications: getEmailNotifications(),
    
    // Actions
    handleSmsNotificationChange,
    handleEmailNotificationChange,
    updateNotificationSetting
  };
};
