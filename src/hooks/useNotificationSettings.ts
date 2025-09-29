"use client";

import { useState, useCallback, useEffect } from "react";
import { useUpdateProExpert, useGetProExpert } from "@/api/proExpert/useProExpert";
import { useGetCustomer, useUpdateCustomer } from "@/api/customer/useCustomer";
import { useUserStore } from "@/store/useUser";
import { useI18n } from "@/locales/client";

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

// Fonction pour générer la configuration des notifications avec traductions
const getNotificationConfig = (t: any): NotificationItem[] => [
  {
    key: 'appointment_notification_sms',
    icon: '/assets/icons/calendar.svg',
    label: t('notificationSettings.appointmentNotifications'),
    type: 'sms'
  },
  {
    key: 'message_notification_sms',
    icon: '/assets/icons/chatunread.svg',
    label: t('notificationSettings.messageNotifications'),
    type: 'sms'
  },
  {
    key: 'promotions_notification_sms',
    icon: '/assets/icons/sale.svg',
    label: t('notificationSettings.promotionsNotifications'),
    type: 'sms'
  },
  {
    key: 'appointment_notification_email',
    icon: '/assets/icons/calendar.svg',
    label: t('notificationSettings.appointmentNotifications'),
    type: 'email'
  },
  {
    key: 'message_notification_email',
    icon: '/assets/icons/chatunread.svg',
    label: t('notificationSettings.messageNotifications'),
    type: 'email'
  },
  {
    key: 'promotions_notification_email',
    icon: '/assets/icons/sale.svg',
    label: t('notificationSettings.promotionsNotifications'),
    type: 'email'
  }
];

export const useNotificationSettings = () => {
  const t = useI18n();
  
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

  // Configuration des notifications avec traductions
  const NOTIFICATION_CONFIG = getNotificationConfig(t);

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
      setError(t('notificationSettings.errorLoadingSettings'));
      console.error('Error loading notification settings:', fetchError);
    }
  }, [fetchError, t]);

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
      
      setError(t('notificationSettings.errorUpdatingSettings'));
      console.error('Error updating notification setting:', err);
    }
  }, [updateMutation, t]);

  // Fonctions utilitaires pour filtrer les notifications par type
  const getSmsNotifications = useCallback(() => {
    return NOTIFICATION_CONFIG
      .filter((config: NotificationItem) => config.type === 'sms')
      .map((config: NotificationItem) => ({
        id: config.key,
        icon: config.icon,
        label: config.label,
        checked: settings[config.key]
      }));
  }, [settings, NOTIFICATION_CONFIG]);

  const getEmailNotifications = useCallback(() => {
    return NOTIFICATION_CONFIG
      .filter((config: NotificationItem) => config.type === 'email')
      .map((config: NotificationItem) => ({
        id: config.key,
        icon: config.icon,
        label: config.label,
        checked: settings[config.key]
      }));
  }, [settings, NOTIFICATION_CONFIG]);

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
