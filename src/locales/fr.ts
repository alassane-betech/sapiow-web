export default {
  // Common
  hello: "Bonjour",
  continue: "Continuer",
  cancel: "Annuler",
  accept: "Accepter",
  loading: "Chargement...",
  error: "Erreur",
  success: "Succès",
  today: "Aujourd'hui",
  patient: "Patient",
  session: "Session",

  // Login Page
  login: {
    title: "Entrez votre numéro de téléphone",
    subtitle: "Vous allez recevoir un code pour vous connecter.",
    sendingCode: "Envoi en cours...",
    legalText: "En cliquant sur continuer, j'accepte les",
    termsOfService: "Conditions d'utilisation",
    and: "et la",
    privacyPolicy: "Politique de Confidentialité",
    ofSapiow: "de Sapiow.",
  },

  // Verify Code Page
  verify: {
    title: "Entrez le code a 6 chiffres reçu par SMS",
    noCodeReceived: "Vous n'avez pas reçu le code ?",
    resend: "Renvoyer",
    sending: "Envoi...",
    changeNumber: "Changer de numéro",
    verifying: "Vérification...",
  },

  // Onboarding
  onboarding: {
    checkingProfile: "Vérification de votre profil...",
    whatDoYouWant: "Que voulez-vous faire sur Sapiow ?",
    lookingForExpert: "Je cherche un expert",
    iAmExpert: "Je suis un expert",
    // Common
    letsGetAcquainted: "Faisons connaissance",
    next: "Suivant",
    confirm: "Confirmer",
    registering: "Inscription en cours...",
    errorOccurred: "Une erreur est survenue lors de l'inscription",
    // Personal info
    firstName: "Votre prénom",
    lastName: "Votre nom de famille",
    email: "Votre email",
    profession: "Votre profession",
    // Seeker specific
    personalizeExperience:
      "Nous avons besoin de quelques informations pour personnaliser votre expérience.",
    preferredDomain: "Votre domaine préféré ?",
    highlightExperts:
      "Nous allons mettre en avant les experts qui vous intéressent le plus.",
    // Expert specific
    createExpertAccount:
      "Nous avons besoin de quelques informations pour personnaliser créer votre compte Expert.",
    exerciseDomain: "Dans quelle domaine exercez vous ?",
    needDomainInfo:
      "Nous avons besoin de connaître votre domaine d'expertise pour vous proposer les meilleures opportunités.",
    specialties: "Vos spécialités",
    chooseSpecialties:
      "Choisissez vos spécialités dans le domaine sélectionné.",
    aboutYou: "Parlez-nous de vous",
    describeYourself:
      "Décrivez-vous en quelques mots pour que vos futurs clients puissent mieux vous connaître.",
    aboutMePlaceholder:
      "Parlez-nous de votre parcours, de vos compétences et de ce qui vous passionne dans votre domaine...",
    linkedinUrl: "Lien LinkedIn (optionnel)",
    websiteUrl: "Site web (optionnel)",
    profilePhoto: "Photo de profil",
    addProfilePhoto:
      "Ajoutez une photo de profil pour que vos clients puissent vous identifier facilement.",
    visioConfig: "Configuration des visios",
    configureServices: "Configurez vos services de consultation vidéo.",
    skipForNow: "Passer pour le moment",
    completeProfile: "Terminer mon profil",
    later: "Plus tard",
    validate: "Valider",
    skip: "Passer",
    finish: "Terminer",
  },

  // Visios/Appointments
  visios: {
    upcoming: "A venir",
    pending: "En attente",
    history: "Historique",
    noUpcomingVisios: "Aucune visio confirmée à venir",
    noPendingRequests: "Aucune demande en attente",
    noHistoryVisios: "Aucune visio dans l'historique",
    startVideo: "Commencer la visio",
    duration: "45mn",
    cancelled: "Annulé",
    completed: "Terminé",
    // Session Card
    sessionDuration: "visio de",
    viewDetails: "Voir détails",
    viewRequest: "Voir la demande",
    calendarAlt: "calendar",
    clockAlt: "clock",
    // Session Modal
    sessionDetail: "Détail de la visio",
    pendingRequest: "Demande en attente",
    requestedBy: "Requested by :",
    sessionName: "Session name :",
    questionsComments: "Questions ou commentaires",
    close: "Close",
    refuse: "Refuser",
    confirming: "Confirmation...",
    cancelling: "Annulation...",
    // Client page
    myVideoConferences: "Mes visioconférences",
    sessionInProgress: "Session en cours",
    loadingVideoConferences: "Chargement de vos visioconférences...",
    upcomingVideo: "Visio à venir",
    nextVideos: "Prochaines visios",
    noConfirmedUpcoming: "Aucune visioconférence confirmée à venir",
    noOtherScheduled: "Aucune autre visioconférence programmée",
  },

  // Navigation
  nav: {
    home: "Accueil",
    messages: "Messages",
    visios: "Visios",
    favorites: "Favoris",
    account: "Compte",
  },

  // Messages
  messages: {
    selectConversation: "Sélectionnez une conversation",
    selectConversationToView: "Sélectionnez une conversation pour voir les messages",
    errorLoadingMessages: "Erreur lors du chargement des messages",
    noMessagesInConversation: "Aucun message dans cette conversation",
    today: "Aujourd'hui",
    // Message Input
    messagePlaceholder: "Votre message",
    unsupportedFileType: "Type de fichier non supporté",
    fileAttached: "📎",
    imageAttached: "🖼️",
    photoTaken: "📷 Photo prise",
    audioRecording: "🎤 Enregistrement audio",
    cameraAccessError: "Impossible d'accéder à la caméra",
    microphoneAccessError: "Impossible d'accéder au microphone",
    takePhoto: "Prendre une photo",
    takePhotoButton: "📷 Prendre la photo",
    sendingError: "Erreur lors de l'envoi du message:",
    cameraAccessErrorLog: "Erreur accès caméra:",
    microphoneAccessErrorLog: "Erreur accès microphone:",
    // Conversations List
    conversationError: "Erreur:",
    noConversationsFound: "Aucune conversation trouvée",
  },

  // Availability Buttons
  availabilityButtons: {
    manageAvailability: "Gérer mes disponibilités",
    syncCalendars: "Synchroniser mes calendriers",
  },

  // Availability Sheet
  availabilitySheet: {
    title: "Gérer mes disponibilités",
    availablePeriod: "Période disponible",
    availability: "Disponibilité",
    availableDays: "Jours disponible",
    startDate: "Date début",
    endDate: "Date fin",
    unavailable: "Indisponible",
    session: "session",
    sessions: "sessions",
    addSession: "Ajouter une session",
    to: "à",
    // Days of the week
    sunday: "Dimanche",
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    // Time periods
    threeMonths: "3 mois",
  },

  // Time Slots Manager
  timeSlotsManager: {
    selectDatePrompt: "Sélectionnez une date pour gérer les créneaux horaires",
    saving: "Sauvegarde...",
    addAvailability: "Ajouter une disponibilité",
    to: "à",
  },

  // Block Day Section
  blockDaySection: {
    title: "Bloquer cette journée ?",
    description: "Il n'est pas possible d'avoir une session à cette date.",
  },

  // Disponibilites Page
  disponibilites: {
    sessionDetails: "Détails de la session",
    googleCalendarSync: "Synchronisation avec Google Agenda",
    googleCalendarDescription: "Connectez votre compte Google pour éviter les réservations en double.",
    googleCalendar: "Google Agenda",
    connected: "Connecté",
    connectedSince: "Connecté depuis le",
    notConnected: "Non connecté",
    connect: "Connecter",
    disconnect: "Déconnecter",
    syncAutomatic: "La synchronisation est automatique ! Vos rendez-vous sont synchronisés toutes les 15 minutes.",
  },

  // Visio Sessions Config
  visioSessionsConfig: {
    loadingSessions: "Chargement des sessions...",
    loadingError: "Erreur lors du chargement des sessions",
    price: "Prix",
    expectations: "Attentes",
    questionExamples: "Exemples de questions",
    // Expectations list
    expectation1: "Posez trois questions ou plus",
    expectation2: "Conseils pour démarrer une entreprise prospère",
    expectation3: "Conseils pour obtenir vos 10 000 premiers clients",
    expectation4: "Astuces de croissance et démarrage de la croissance",
    // Question examples
    question1: "Je pense à créer une entreprise. Quelles sont les prochaines choses auxquelles je devrais me concentrer ?",
    question2: "Comment savoir si mon idée d'entreprise va fonctionner ?",
    question3: "Comment aborder votre le croissance de ma startup ?",
  },

  // Payment Page
  paymentPage: {
    pay: "Payer",
    loading: "Chargement...",
    paymentError: "Erreur de paiement",
  },

  // Account Pages
  account: {
    profile: "Mon profil",
    availability: "Mes disponibilités",
    offers: "Mes offres",
    revenue: "Revenus",
    paymentHistory: "Historique des paiements",
    notifications: "Notifications",
    language: "Langue",
    support: "Besoin d'aide ?",
    about: "A propos",
    legalMentions: "Mentions légales",
    logout: "Se déconnecter",
    loggingOut: "Déconnexion...",
    switchToExpert: "Passer en mode expert",
    switchToClient: "Passer en mode client",
    becomeExpert: "Devenez expert",
    becomeExpertDescription:
      "Devenez expert et accédez à notre plateforme pour offrir des consultations vidéo à votre audience.",
    learnMore: "En savoir plus",
    becomeExpertButton: "Devenir expert",
  },

  // Profile Pages
  profile: {
    loadingProfile: "Chargement du profil...",
    errorLoadingProfile: "Erreur lors du chargement du profil :",
    errorUpdatingProfile: "Erreur lors de la mise à jour :",
    // Form fields
    yourJob: "Votre métier",
    yourName: "Votre nom",
    linkedinLink: "Lien LinkedIn",
    website: "Site web",
    expertiseDomain: "Domaine d'expertise",
    aboutYouPlaceholder: "À propos de vous",
    // Actions
    deleteAccount: "Supprimer mon compte",
    saving: "Sauvegarde...",
    saveChanges: "Enregistrer changement",
    // Photo Upload
    deletePhoto: "Supprimer la photo",
    uploading: "Upload en cours...",
    changePhoto: "Changer de photo",
    addPhoto: "Ajouter une photo",
    profilePhotoAlt: "Photo de profil",
    userIconAlt: "Icône utilisateur",
    uploadIconAlt: "Icône d'upload",
  },

  // Notification Settings
  notificationSettings: {
    appointmentNotifications: "Notifications de Rendez-vous",
    messageNotifications: "Notifications de Messagerie",
    promotionsNotifications: "Promotions & Offres spéciales",
    errorLoadingSettings: "Erreur lors du chargement des paramètres de notification",
    errorUpdatingSettings: "Erreur lors de la mise à jour des paramètres",
    // Page UI
    loadingSettings: "Chargement des paramètres...",
    smsNotifications: "Notifications par SMS",
    emailNotifications: "Notifications par Email",
  },

  // Legal Mentions
  legalMentions: {
    termsOfService: "Conditions et services",
    privacyPolicy: "Politique de confidentialité",
    openSourceLicenses: "Licences Open Source",
    termsContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    privacyContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    licensesContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
  },

  // About Page
  about: {
    logoAlt: "Logo Sapiow",
    copyright: "© 2025 Sapiow. Tous droits réservés.",
    contactUs: "Contactez-nous",
    visitWebsite: "Visitez le site web",
  },

  // Support Page
  support: {
    title: "Comment pouvons-nous vous aider ?",
    searchPlaceholder: "Entrez votre mot-clé",
    noResultsFound: "Aucun résultat trouvé pour",
    // FAQ Data
    faq: {
      question1: "Comment créer un compte ?",
      answer1: "Ouvrez l'application Tradebase pour commencer et suivez les étapes. Tradebase ne facture pas de frais pour créer ou maintenir votre compte Tradebase.",
      question2: "Comment ajouter un moyen de paiement via cette application ?",
      answer2: "Pour ajouter un moyen de paiement, rendez-vous dans les paramètres de votre compte, sélectionnez 'Moyens de paiement' et suivez les instructions pour ajouter votre carte bancaire ou compte PayPal.",
      question3: "Question 3",
      answer3: "Réponse à la question 3. Vous pouvez ajouter ici toutes les informations pertinentes pour aider vos utilisateurs.",
      question4: "Question 4",
      answer4: "Réponse à la question 4. Cette section peut contenir des détails techniques ou des instructions étape par étape.",
    },
  },

  // Language Page
  languagePage: {
    french: "Français",
    english: "Anglais",
    errorChangingLanguage: "Erreur lors du changement de langue:",
    flagAlt: "Drapeau",
  },

  // Bank Account Section
  bankAccount: {
    title: "Votre Compte bancaire",
    bankAlt: "Banque",
    addRib: "Ajoutez votre RIB",
    add: "Ajouter",
    modify: "Modifier",
    inProgress: "En cours...",
    // Add Bank Account Modal
    addBankAccount: "Ajouter un compte bancaire",
    nameMatchId: "Assurez-vous que cela correspond au nom figurant sur votre pièce d'identité gouvernementale.",
    iban: "IBAN",
    bicSwift: "Code BIC/SWIFT",
  },

  // Revenue Page
  revenue: {
    totalEarnings: "Total des gains",
    // Filters
    thisMonth: "Ce mois-ci",
    thisQuarter: "Ce trimestre", 
    custom: "Personnalisé",
    selectCustomPeriod: "Sélectionner une période personnalisée",
    selectedPeriod: "Période sélectionnée :",
    from: "Du",
    to: "au",
    // Transactions
    lastTransfer: "Dernier virement",
    nextTransfer: "Prochain virement",
    // Payment Status
    paid: "Payé",
    pending: "En attente",
    // Calendar
    calendarAlt: "Calendrier",
    // Payment History
    noPaymentHistory: "Aucun historique de paiement disponible. Configurez votre compte de paiement pour commencer à recevoir des revenus.",
    errorLoadingPayments: "Erreur lors du chargement des paiements",
    noPaymentsFound: "Aucun paiement trouvé",
  },

  // Offers Page
  offers: {
    // Offer Types
    videoSessions: "Sessions visio",
    monthlyAccompaniment: "Accompagnement mensuel",
    // Features
    oneOnOne: "Session individuelle 1:1",
    videoCall: "Appel vidéo",
    strategicSession: "Session stratégique",
    exclusiveResources: "Ressources exclusives",
    support: "Support client",
    mentorship: "Mentorat",
    webinar: "Webinaire",
    // Interface
    selectOfferToSeeDetails: "Sélectionnez une offre pour voir les détails",
    noOffersConfigured: "Aucune offre configurée",
    whatIsIncluded: "Ce qui est inclus",
    perMonth: "/ Mois",
    // Actions
    delete: "Supprimer",
    deleting: "Suppression...",
    addOffer: "Ajouter une offre",
    createAccompaniment: "Créer un accompagnement",
    // Empty States
    noMonthlyAccompaniment: "Aucun accompagnement mensuel configuré pour le moment.",
    createFirstOffer: "Créez votre première offre d'accompagnement pour vos clients.",
    // Default Names
    monthlyAccompanimentDefault: "Accompagnement mensuel",
    // Add/Edit Session Modal
    addSession: "Ajouter une session",
    editSession: "Modifier la session",
    sessionName: "Nom de la session",
    sessionNamePlaceholder: "Ex: Consultation stratégique",
    price: "Prix (€)",
    pricePlaceholder: "Ex: 120",
    euroAlt: "Euro",
    includedFeatures: "Fonctionnalités incluses",
    creating: "Création...",
    editing: "Modification...",
    // Offer Selection
    chooseOffer: "Choisissez une offre",
    singleSessions: "Sessions uniques",
    quickVideoSession: "Session rapide visio",
    perfectForSpecificQuestions: "Parfait pour des questions spécifiques",
    startingFrom: "À partir de",
    viewTimeSlots: "Voir les créneaux",
    monthlySubscriptions: "Abonnements mensuels",
    chooseAndPay: "Choisir et payer",
    creatingAppointment: "Création de l'appointment...",
    // Features
    oneOnOneChat: "Chat 1:1",
    oneOnOneVideoCalls: "Appels vidéo 1:1",
    personalizedSupport: "Accompagnement personnalisé",
    strategySessions: "Sessions de stratégie",
  },

  // Expert Details Page
  expertDetails: {
    // Error States
    errorLoadingExpert: "Erreur lors du chargement de l'expert",
    expertNotFound: "Expert introuvable",
    // Expert Info
    about: "À propos",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    expertiseDomains: "Domaines d'expertise",
    revenueDestination: "La totalité des revenus sera destinée à",
    foundations: "760 fondations.",
    // Questions & Expectations
    questionsToAsk: "Questions à poser",
    expectations: "Attentes",
    visio15min: "Visio 15mn",
    // Sample Questions
    question1: "Je pense à créer une entreprise. Quelles sont les prochaines choses sur lesquelles je devrais me concentrer ?",
    question2: "Comment savoir si mon idée d'entreprise va fonctionner ?",
    question3: "Comment aborder vous la croissance de mon entreprise ?",
    question4: "Quels indicateurs clés devrais-je viser à différentes étapes pour être une entreprise de premier plan ?",
    // Expectations
    expectation1: "Posez trois questions ou plus",
    expectation2: "Conseils pour démarrer une entreprise prospère",
    expectation3: "Conseils pour obtenir vos 10 000 premiers clients",
    expectation4: "Astuces de croissance et démarrage de la croissance",
    // How it works
    howItWorks: "Comment ça marche ?",
    findExpert: "Trouvez un expert",
    findExpertDesc: "Découvrez et choisissez parmi notre liste des experts les plus recherchés au monde",
    bookOrSubscribe: "Réservez ou abonnez-vous",
    bookOrSubscribeDesc: "Réservez un appel vidéo unique ou choisissez un plan pour accéder à votre expert de manière continue",
    virtualConsultation: "Consultation virtuelle",
    virtualConsultationDesc: "Rejoignez l'appel vidéo ou le chat, posez des questions et obtenez des conseils d'expert",
    // Similar Experts
    similarExperts: "Experts similaires",
    seeAll: "Tout voir",
    // FAQ
    frequentQuestions: "Questions fréquentes",
    whatIsSapiow: "Qu'est-ce que Sapiow ?",
    whatIsSapiowAnswer: "Sapiow est une plateforme en ligne qui permet de réserver des experts pour des consultations vidéo, offrant aux utilisateurs un accès direct à des professionnels qualifiés dans divers domaines.",
    benefitsQuestion: "Quels sont les avantages d'utiliser Sapiow pour les utilisateurs ?",
    benefitsAnswer: "Sapiow offre un accès direct à des experts qualifiés, des consultations flexibles, et une plateforme sécurisée pour obtenir des conseils professionnels dans de nombreux domaines.",
    expertsTypesQuestion: "Quels types d'experts puis-je réserver sur Sapiow ?",
    expertsTypesAnswer: "Vous pouvez réserver des experts dans de nombreux domaines : business, santé, technologie, développement personnel, et bien d'autres spécialités.",
    qualityQuestion: "Comment Sapiow garantit-elle la qualité des experts disponibles ?",
    qualityAnswer: "Tous nos experts sont vérifiés et sélectionnés selon des critères stricts d'expertise, d'expérience et de qualifications professionnelles.",
    feesQuestion: "Quels sont les frais associés à l'utilisation de Sapiow ?",
    feesAnswer: "Les tarifs varient selon l'expert et le type de consultation. Vous pouvez choisir entre des sessions uniques ou des abonnements mensuels.",
    // Success Page
    congratulations: "Félicitations !",
    sessionBookedSuccess: "Votre session a été réservée avec succès !",
    addToCalendar: "Ajouter au calendrier",
  },
  // Session Detail Sheet
  sessionDetail: {
    title: "Détails",
    startVideo: "Commencer la visio",
    sendMessage: "Envoyer un message",
    askQuestion: "Poser une question",
    questionsAndAnswers: "Questions et réponses",
    noQuestions: "Aucune question posée pour le moment",
    noQuestionsDescription: "Posez votre première question à l'expert",
    writeQuestion: "Écrivez votre question...",
    send: "Envoyer",
    cancel: "Annuler",
    questionSubmitError: "Erreur lors de la soumission de la question",
    cancelAppointment: "Annuler le rendez-vous",
    confirmCancel: "Êtes-vous sûr de vouloir annuler ce rendez-vous ?",
    cancelSuccess: "Rendez-vous annulé avec succès",
    cancelError: "Erreur lors de l'annulation du rendez-vous",
    dateNotAvailable: "Date non disponible",
    timeNotAvailable: "Heure non disponible",
    session: "Session",
    expert: "Expert",
    quickVideoSession: "Session rapide visio",
    bookSession: "Réserver une séance",
    // Alt texts
    congratulationAlt: "Félicitations",
    magnifierAlt: "Loupe",
    calendarAlt: "Calendrier",
    videoCameraAlt: "Caméra vidéo",
    // Questions section
    dontHesitateAskQuestions: "N'hésitez pas à poser vos questions avant la session",
    submitQuestionsAdvance: "Vous avez la possibilité de soumettre vos questions à l'avance afin que l'expert puisse mieux se préparer pour vous.",
    submitMyQuestions: "Soumettre mes questions",
    typeQuestionHere: "Tapez votre question ici...",
    addAnotherQuestion: "Ajoute une autre question",
    questionsOrComments: "Questions ou commentaires",
    viewDetails: "Voir détail",
  },

  // Dark Session Card / Upcoming Video Call
  upcomingCall: {
    now: "Maintenant",
    inDays: "Dans",
    day: "jour",
    days: "jours",
    inHours: "Dans",
    hours: "h",
    inMinutes: "Dans",
    minutes: "min",
    calendarAlt: "Calendrier",
    clockAlt: "Horloge",
  },

  // Video Call
  videoCall: {
    callEnded: "Appel terminé",
    error: "Erreur de connexion",
    loading: "Connexion en cours...",
    mute: "Couper le micro",
    unmute: "Activer le micro",
    camera: "Caméra",
    endCall: "Terminer l'appel",
  },

  // Categories
  categories: {
    media: "Médias",
    culture: "Culture",
    business: "Business",
    maison: "Maison",
    artisanat: "Artisanat",
    glow: "Bien-être",
    sport: "Sport",
    specializedIn: "spécialisé en",
  },

  // Calendar
  calendar: {
    // Default values
    defaultClient: "Client",
    defaultDuration: "30 min",
    defaultConsultation: "Consultation",
    // Days of week (array format)
    daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    // Days of week (individual)
    sunday: "Dim",
    monday: "Lun", 
    tuesday: "Mar",
    wednesday: "Mer",
    thursday: "Jeu",
    friday: "Ven",
    saturday: "Sam",
    // Months (array format)
    months: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    // Months (individual)
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre",
    // Planning
    planYourVisio: "Planifier votre visio",
    visioDuration: "Durée de la visio",
    availableSlots: "Créneaux disponibles",
    noSlotsAvailable: "Aucun créneau disponible pour ce jour.",
    selectAnotherDate: "Veuillez sélectionner une autre date.",
    complete: "Complet",
    // Booking
    minutes: "minutes",
    reserving: "Réservation...",
    reserve: "Réserver",
    reservationError: "Erreur lors de la réservation. Veuillez réessayer.",
  },

  // Payment
  payment: {
    success: "Paiement réussi",
    processing: "Traitement du paiement...",
    failed: "Échec du paiement",
  },

  // Home Pages
  home: {
    // Expert Dashboard
    hello: "Bonjour",
    user: "Utilisateur",
    visiosToday: "visioà venir aujourd'hui",
    visiosTodayPlural: "visios à venir aujourd'hui",
    youHave: "Vous avez",
    completedVisios: "Visios complétées",
    earningsSummary: "Résumé de gain",
    pendingRequests: "Demandes en attente",
    seeAll: "Tout voir",
    noPendingRequests: "Aucune demande en attente",
    nextVisio: "Prochaine visio",
    noScheduledVisio: "Aucune visio programmée",
    // Client Dashboard
    loadingExperts: "Chargement des experts...",
    errorLoadingExperts: "Erreur lors du chargement des experts",
    unknownError: "Erreur inconnue",
    yourNextVisio: "Votre prochaine visio",
    accelerateProject: "Accélérez votre projet, Réservez une Visio.",
  },

  // Share Link Button
  shareLink: {
    defaultText: "Partagez votre lien de réservation",
    copied: "Lien copié !",
    copyError: "Erreur lors de la copie",
  },

  // Header
  header: {
    profileAlt: "Photo de profil",
    expertMode: "Mode expert",
    notifications: "Notifications",
    unreadSingular: "non lue",
    unreadPlural: "non lues",
    noNotifications: "Aucune notification",
    seeAllNotifications: "Voir toutes les notifications",
    markAsReadError: "Erreur lors du marquage de la notification comme lue",
    // Time formatting
    justNow: "À l'instant",
    minutesAgo: "Il y a",
    hoursAgo: "Il y a",
    minutes: "min",
    hours: "h",
  },

  // Header Client
  headerClient: {
    search: "Rechercher",
    searchPlaceholder: "Rechercher",
    searchAlt: "search",
    heartAlt: "heart",
    clientMode: "Mode client",
    becomeExpert: "Devenir un expert",
  },


  // Favorites Page
  favorites: {
    title: "Mes Favoris",
    loading: "Chargement de vos favoris...",
    error: "Erreur lors du chargement des favoris",
    unknownError: "Erreur inconnue",
    noFavorites: "Aucun professionnel en favori pour le moment",
    noFavoritesDescription: "Ajoutez des professionnels à vos favoris en cliquant sur le cœur",
  },

  // Payment History Page
  paymentHistory: {
    title: "Historique des paiements",
    searchPlaceholder: "Montant, transaction ...",
    filterBy: "Filtrer par",
    allTransactions: "Toutes les transactions",
    completed: "Effectué",
    pending: "En attente",
    failed: "Échoué",
    transactionDetails: "Détails de la transaction",
    backToList: "Retour à la liste",
    amount: "Montant",
    expert: "Expert",
    session: "Session",
    dateTime: "Date et heure",
    status: "Statut",
    transactionId: "ID de transaction",
    noTransactions: "Aucune transaction trouvée",
    noTransactionsDescription: "Vos transactions apparaîtront ici une fois effectuées",
    selectTransaction: "Sélectionnez une transaction pour voir les détails",
  },

  // Phone Number Component
  phoneNumber: {
    label: "Numéro de téléphone",
    placeholder: "06 06 06 06 06",
    searchCountry: "Rechercher un pays...",
    invalidNumber: "Numéro de téléphone invalide",
    required: "Ce champ est requis",
  },

  // Search Components
  search: {
    placeholder: "Rechercher",
    searchPlaceholder: "Rechercher",
    noResults: "Aucun résultat trouvé",
    searching: "Recherche en cours...",
  },

  // Page Header & Notifications
  pageHeader: {
    notifications: "Notifications",
    markAsRead: "Marquer comme lu",
    markAllAsRead: "Tout marquer comme lu",
    noNotifications: "Aucune notification",
    seeAllNotifications: "Voir toutes les notifications",
    justNow: "À l'instant",
    minutesAgo: "Il y a",
    hoursAgo: "Il y a",
    minutes: "min",
    hours: "h",
    notificationError: "Erreur lors du marquage de la notification comme lue",
  },

  // Session Details Panel
  sessionDetailsPanel: {
    noSessionToday: "Aucune session n'est prévue pour aujourd'hui.",
    addAvailability: "Ajouter une disponibilité",
    selectDateToView: "Sélectionnez une date pour voir les détails.",
    client: "Client",
    consultation: "Consultation",
  },
} as const;
