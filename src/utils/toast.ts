import toast from "react-hot-toast";

// Messages par défaut en français (fallback)
const defaultMessages = {
  // Questions
  questionSubmitted: "Question soumise avec succès !",
  questionUpdated: "Question mise à jour avec succès !",
  questionSubmitError: "Erreur lors de la soumission de la question",
  questionUpdateError: "Erreur lors de la mise à jour de la question",
  
  // Appointments
  appointmentCreated: "Rendez-vous créé avec succès !",
  appointmentConfirmed: "Rendez-vous confirmé avec succès !",
  appointmentCancelled: "Rendez-vous annulé avec succès !",
  appointmentCreateError: "Erreur lors de la création du rendez-vous",
  appointmentUpdateError: "Erreur lors de la mise à jour du rendez-vous",
  appointmentCancelError: "Erreur lors de l'annulation du rendez-vous",
  
  // Date Blocking
  dateBlocked: "Date bloquée avec succès !",
  dateBlockError: "Erreur lors du blocage de la date",
  dateUnblocked: "Date débloquée avec succès !",
  dateUnblockError: "Erreur lors du déblocage de la date",
  
  // Video Call
  callConnectionError: "Erreur lors de la connexion à l'appel vidéo",
  callTokenError: "Erreur lors de la récupération du token d'appel",
};

export const showToast = {
  success: (key: keyof typeof defaultMessages, customMessage?: string) => {
    const message = customMessage || defaultMessages[key];
    return toast.success(message);
  },
  error: (key: keyof typeof defaultMessages, customMessage?: string) => {
    const message = customMessage || defaultMessages[key];
    return toast.error(message);
  },
  // Fonctions directes pour les messages personnalisés
  successDirect: (message: string) => toast.success(message),
  errorDirect: (message: string) => toast.error(message),
  loadingDirect: (message: string) => toast.loading(message),
};
