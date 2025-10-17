export default {
  // Common
  hello: "Hello",
  continue: "Continue",
  cancel: "Cancel",
  accept: "Accept",
  loading: "Loading...",
  error: "Error",
  success: "Success",
  today: "Today",
  patient: "Patient",
  session: "Session",

  // Login Page
  login: {
    title: "Enter your phone number",
    subtitle: "You will receive a code to log in.",
    sendingCode: "Sending...",
    legalText: "By clicking continue, I accept the",
    termsOfService: "Terms of Use",
    and: "and the",
    privacyPolicy: "Privacy Policy",
    ofSapiow: "of Sapiow.",
  },

  // Verify Code Page
  verify: {
    title: "Enter the 6-digit code received by SMS",
    noCodeReceived: "Didn't receive the code?",
    resend: "Resend",
    sending: "Sending...",
    changeNumber: "Change number",
    verifying: "Verifying...",
  },

  // Onboarding
  onboarding: {
    checkingProfile: "Checking your profile...",
    whatDoYouWant: "What do you want to do on Sapiow?",
    lookingForExpert: "I'm looking for an expert",
    iAmExpert: "I am an expert",
    // Common
    letsGetAcquainted: "Let's get acquainted",
    next: "Next",
    confirm: "Confirm",
    registering: "Registering...",
    errorOccurred: "An error occurred during registration",
    // Personal info
    firstName: "Your first name",
    lastName: "Your last name",
    email: "Your email",
    profession: "Your profession",
    // Seeker specific
    personalizeExperience:
      "We need some information to personalize your experience.",
    preferredDomain: "Your preferred domain?",
    highlightExperts: "We will highlight the experts that interest you most.",
    // Expert specific
    createExpertAccount:
      "We need some information to create your Expert account.",
    exerciseDomain: "What domain do you practice in?",
    needDomainInfo:
      "We need to know your domain of expertise to offer you the best opportunities.",
    specialties: "Your specialties",
    chooseSpecialties: "Choose your specialties in the selected domain.",
    aboutYou: "Tell us about yourself",
    describeYourself:
      "Describe yourself in a few words so your future clients can get to know you better.",
    aboutMePlaceholder:
      "Tell us about your background, your skills and what you are passionate about in your field...",
    linkedinUrl: "LinkedIn URL (optional)",
    websiteUrl: "Website (optional)",
    profilePhoto: "Profile photo",
    addProfilePhoto:
      "Add a profile photo so your clients can easily identify you.",
    visioConfig: "Video configuration",
    configureServices: "Configure your video consultation services.",
    skipForNow: "Skip for now",
    completeProfile: "Complete my profile",
    later: "Later",
    validate: "Validate",
    skip: "Skip",
    finish: "Finish",
  },

  // Visios/Appointments
  visios: {
    upcoming: "Upcoming",
    pending: "Pending",
    history: "History",
    noUpcomingVisios: "No upcoming confirmed video calls",
    noPendingRequests: "No pending requests",
    noHistoryVisios: "No video calls in history",
    startVideo: "Start video call",
    duration: "45min",
    cancelled: "Cancelled",
    completed: "Completed",
    // Session Card
    sessionDuration: "video call of",
    viewDetails: "View details",
    viewRequest: "View request",
    calendarAlt: "calendar",
    clockAlt: "clock",
    // Session Modal
    sessionDetail: "Video call details",
    pendingRequest: "Pending request",
    requestedBy: "Requested by:",
    sessionName: "Session name:",
    questionsComments: "Questions or comments",
    close: "Close",
    refuse: "Decline",
    confirming: "Confirming...",
    cancelling: "Cancelling...",
    // Client page
    myVideoConferences: "My video conferences",
    sessionInProgress: "Session in progress",
    loadingVideoConferences: "Loading your video conferences...",
    upcomingVideo: "Upcoming video",
    nextVideos: "Next videos",
    noConfirmedUpcoming: "No confirmed upcoming video conferences",
    noOtherScheduled: "No other scheduled video conferences",
  },

  // Navigation
  nav: {
    home: "Home",
    messages: "Messages",
    visios: "Video Calls",
    favorites: "Favorites",
    account: "Account",
  },

  // Messages
  messages: {
    selectConversation: "Select a conversation",
    selectConversationToView: "Select a conversation to view messages",
    errorLoadingMessages: "Error loading messages",
    noMessagesInConversation: "No messages in this conversation",
    today: "Today",
    // Message Input
    messagePlaceholder: "Your message",
    unsupportedFileType: "Unsupported file type",
    fileAttached: "📎",
    imageAttached: "🖼️",
    photoTaken: "📷 Photo taken",
    audioRecording: "🎤 Audio recording",
    cameraAccessError: "Unable to access camera",
    microphoneAccessError: "Unable to access microphone",
    takePhoto: "Take a photo",
    takePhotoButton: "📷 Take photo",
    sendingError: "Error sending message:",
    cameraAccessErrorLog: "Camera access error:",
    microphoneAccessErrorLog: "Microphone access error:",
    // Conversations List
    conversationError: "Error:",
    noConversationsFound: "No conversations found",
  },

  // Availability Buttons
  availabilityButtons: {
    manageAvailability: "Manage my availability",
    syncCalendars: "Sync my calendars",
  },

  // Availability Sheet
  availabilitySheet: {
    title: "Manage my availability",
    availablePeriod: "Available period",
    availability: "Availability",
    availableDays: "Available days",
    startDate: "Start date",
    endDate: "End date",
    unavailable: "Unavailable",
    session: "session",
    sessions: "sessions",
    addSession: "Add session",
    to: "to",
    noPeriodDefined: "No period defined",
    // Days of the week
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    // Time periods
    oneMonth: "1 month",
    threeMonths: "3 months",
    sixMonths: "6 months",
    oneYear: "1 year",
    month: "month",
    months: "months",
    day: "day",
    days: "days",
  },

  // Time Slots Manager
  timeSlotsManager: {
    selectDatePrompt: "Select a date to manage time slots",
    saving: "Saving...",
    addAvailability: "Add availability",
    to: "to",
    selectStartTime: "Start time",
    selectEndTime: "End time",
  },

  // Block Day Section
  blockDaySection: {
    title: "Block this day?",
    description: "It is not possible to have a session on this date.",
    unblockTitle: "Unblock this day?",
    unblockDescription: "Allow bookings for this date.",
  },

  // Disponibilites Page
  disponibilites: {
    sessionDetails: "Session details",
    googleCalendarSync: "Google Calendar synchronization",
    googleCalendarDescription:
      "Connect your Google account to avoid double bookings.",
    googleCalendar: "Google Calendar",
    connected: "Connected",
    connectedSince: "Connected since",
    notConnected: "Not connected",
    connect: "Connect",
    disconnect: "Disconnect",
    syncAutomatic:
      "Synchronization is automatic! Your appointments are synced every 15 minutes.",
  },

  // Google Calendar Connect
  googleCalendarConnect: {
    connecting: "Connecting...",
    connectButton: "Connect Google Calendar",
  },

  // OAuth Callback
  oauthCallback: {
    connecting: "Connecting to Google Calendar...",
    pleaseWait: "Please wait",
    error: "Error",
    redirecting: "Redirecting to availability page...",
    missingCode: "Authorization code missing",
    connectionError: "Connection error",
    processingError: "Error processing connection",
  },

  // Synced Calendars Sheet
  syncedCalendars: {
    title: "Synced calendars",
    disconnect: "Disconnect",
    disconnecting: "Disconnecting...",
    addCalendar: "Add a calendar",
  },

  // Visio Sessions Config
  visioSessionsConfig: {
    loadingSessions: "Loading sessions...",
    loadingError: "Error loading sessions",
    price: "Price",
    expectations: "Expectations",
    questionExamples: "Question examples",
    // Expectations list
    expectation1: "Ask three or more questions",
    expectation2: "Advice for starting a successful business",
    expectation3: "Advice for getting your first 10,000 customers",
    expectation4: "Growth tips and startup scaling",
    // Question examples
    question1:
      "I'm thinking about starting a business. What are the next things I should focus on?",
    question2: "How do I know if my business idea will work?",
    question3: "How should I approach growing my startup?",
  },

  // Payment Page
  paymentPage: {
    pay: "Pay",
    loading: "Loading...",
    paymentError: "Payment error",
  },

  // Account Pages
  account: {
    profile: "My Profile",
    availability: "My Availability",
    offers: "My Offers",
    revenue: "Revenue",
    paymentHistory: "Payment History",
    notifications: "Notifications",
    language: "Language",
    support: "Need Help?",
    about: "About",
    legalMentions: "Legal Mentions",
    logout: "Logout",
    loggingOut: "Logging out...",
    switchToExpert: "Switch to Expert Mode",
    switchToClient: "Switch to Client Mode",
    becomeExpert: "Become an Expert",
    becomeExpertDescription:
      "Become an expert and access our platform to offer video consultations to your audience.",
    learnMore: "Learn More",
    becomeExpertButton: "Become Expert",
  },

  // Profile Pages
  profile: {
    loadingProfile: "Loading profile...",
    errorLoadingProfile: "Error loading profile:",
    errorUpdatingProfile: "Error updating profile:",
    // Form fields
    yourJob: "Your job",
    yourName: "Your name",
    linkedinLink: "LinkedIn link",
    website: "Website",
    expertiseDomain: "Expertise domain",
    aboutYouPlaceholder: "About you",
    // Actions
    deleteAccount: "Delete my account",
    saving: "Saving...",
    saveChanges: "Save changes",
    // Photo Upload
    deletePhoto: "Delete photo",
    uploading: "Uploading...",
    changePhoto: "Change photo",
    addPhoto: "Add photo",
    profilePhotoAlt: "Profile photo",
    userIconAlt: "User icon",
    uploadIconAlt: "Upload icon",
  },

  // Notification Settings
  notificationSettings: {
    appointmentNotifications: "Appointment Notifications",
    messageNotifications: "Message Notifications",
    promotionsNotifications: "Promotions & Special Offers",
    errorLoadingSettings: "Error loading notification settings",
    errorUpdatingSettings: "Error updating settings",
    // Page UI
    loadingSettings: "Loading settings...",
    smsNotifications: "SMS Notifications",
    emailNotifications: "Email Notifications",
  },

  // Legal Mentions
  legalMentions: {
    termsOfService: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    openSourceLicenses: "Open Source Licenses",
    termsContent:
      "These Terms of Use govern the use of the Sapiow platform, accessible via our website and mobile application. Sapiow is a platform that allows experts to register and offer their services, and clients to view the list of available experts to schedule appointments with them. By using Sapiow, you agree to comply with these Terms of Use. Sapiow reserves the right to modify these terms at any time, and users will be informed of significant changes. Continued use of the platform after modification of the Terms of Use constitutes acceptance of these changes. Experts commit to providing accurate and up-to-date information regarding their profile, skills, and availability. Clients commit to respecting scheduled appointments and canceling within a reasonable timeframe if necessary. Sapiow is not responsible for the quality of services provided by experts, but strives to maintain a community of qualified experts.",
    privacyContent:
      "This Privacy Policy describes how Sapiow collects, uses, and protects your personal data when you use our platform. We place great importance on protecting your privacy and are committed to processing your data in accordance with applicable data protection laws. The information we collect includes your name, email address, phone number, and for experts, their professional skills and availability. This data is used to facilitate connections between experts and clients, improve our services, and send you relevant notifications. We only share your data with third parties when necessary to provide our services or if required by law. You have the right to access your data, correct it, delete it, or limit its processing. For any questions regarding our privacy policy, please contact us.",
    licensesContent:
      "Sapiow uses several open source software components for its operation. We are grateful to the open source community for their remarkable work. Our application is built with Next.js under the MIT license, React under the MIT license, and uses several libraries such as TailwindCSS, React Query, and next-international for translation management. All these libraries are used in accordance with their respective licenses. The complete licenses for these software components are available in our code repository or upon request. We are committed to respecting the terms of open source licenses and contributing to the open source community when possible. If you are a developer and would like to contribute to Sapiow, please don't hesitate to contact us. We believe in the power of collaboration and knowledge sharing to create quality products.",
  },

  // About Page
  about: {
    logoAlt: "Sapiow Logo",
    copyright: "© 2025 Sapiow. All rights reserved.",
    contactUs: "Contact Us",
    visitWebsite: "Visit Website",
  },

  // Support Page
  support: {
    title: "How can we help you?",
    searchPlaceholder: "Enter your keyword",
    noResultsFound: "No results found for",
    // FAQ Data
    faq: {
      question1: "How to create an account?",
      answer1:
        "Open the Tradebase app to get started and follow the steps. Tradebase does not charge fees to create or maintain your Tradebase account.",
      question2: "How to add a payment method via this application?",
      answer2:
        "To add a payment method, go to your account settings, select 'Payment Methods' and follow the instructions to add your bank card or PayPal account.",
      question3: "Question 3",
      answer3:
        "Answer to question 3. You can add here all relevant information to help your users.",
      question4: "Question 4",
      answer4:
        "Answer to question 4. This section can contain technical details or step-by-step instructions.",
    },
  },

  // Language Page
  languagePage: {
    french: "French",
    english: "English",
    errorChangingLanguage: "Error changing language:",
    flagAlt: "Flag",
  },

  // Bank Account Section
  bankAccount: {
    title: "Your Bank Account",
    bankAlt: "Bank",
    addRib: "Add your bank details",
    add: "Add",
    modify: "Modify",
    inProgress: "In progress...",
    // Add Bank Account Modal
    addBankAccount: "Add a bank account",
    nameMatchId:
      "Make sure this matches the name on your government-issued ID.",
    iban: "IBAN",
    bicSwift: "BIC/SWIFT Code",
  },

  // Revenue Page
  revenue: {
    totalEarnings: "Total Earnings",
    // Filters
    thisMonth: "This Month",
    thisQuarter: "This Quarter",
    custom: "Custom",
    selectCustomPeriod: "Select a custom period",
    selectedPeriod: "Selected period:",
    from: "From",
    to: "to",
    // Transactions
    lastTransfer: "Last Transfer",
    nextTransfer: "Next Transfer",
    // Payment Status
    paid: "Paid",
    pending: "Pending",
    // Calendar
    calendarAlt: "Calendar",
    // Payment History
    noPaymentHistory:
      "No payment history available. Set up your payment account to start receiving revenue.",
    errorLoadingPayments: "Error loading payments",
    noPaymentsFound: "No payments found",
  },

  // Offers Page
  offers: {
    // Offer Types
    videoSessions: "Video Sessions",
    monthlyAccompaniment: "Monthly Accompaniment",
    // Features
    oneOnOne: "1:1 Individual Session",
    videoCall: "Video Call",
    strategicSession: "Strategic Session",
    exclusiveResources: "Exclusive Resources",
    support: "Client Support",
    mentorship: "Mentorship",
    webinar: "Webinar",
    // Interface
    selectOfferToSeeDetails: "Select an offer to see details",
    noOffersConfigured: "No offers configured",
    whatIsIncluded: "What's included",
    perMonth: "/ Month",
    // Actions
    delete: "Delete",
    deleting: "Deleting...",
    addOffer: "Add an offer",
    createAccompaniment: "Create accompaniment",
    // Empty States
    noMonthlyAccompaniment: "No monthly accompaniment configured yet.",
    createFirstOffer: "Create your first accompaniment offer for your clients.",
    // Default Names
    monthlyAccompanimentDefault: "Monthly Accompaniment",
    // Add/Edit Session Modal
    addSession: "Add a session",
    editSession: "Edit session",
    sessionName: "Session name",
    sessionNamePlaceholder: "Ex: Strategic consultation",
    price: "Price (€)",
    pricePlaceholder: "Ex: 120",
    euroAlt: "Euro",
    includedFeatures: "Included features",
    creating: "Creating...",
    editing: "Editing...",
    // Offer Selection
    chooseOffer: "Choose an offer",
    singleSessions: "Single sessions",
    quickVideoSession: "Quick video session",
    perfectForSpecificQuestions: "Perfect for specific questions",
    startingFrom: "Starting from",
    viewTimeSlots: "View time slots",
    monthlySubscriptions: "Monthly subscriptions",
    chooseAndPay: "Choose and pay",
    creatingAppointment: "Creating appointment...",
    // Features
    oneOnOneChat: "1:1 Chat",
    oneOnOneVideoCalls: "1:1 Video calls",
    personalizedSupport: "Personalized support",
    strategySessions: "Strategy sessions",
  },

  // Expert Details Page
  expertDetails: {
    // Error States
    errorLoadingExpert: "Error loading expert",
    expertNotFound: "Expert not found",
    // Expert Info
    about: "About",
    seeMore: "See more",
    seeLess: "See less",
    expertiseDomains: "Expertise domains",
    revenueDestination: "All revenue will be donated to",
    foundations: "760 foundations.",
    // Questions & Expectations
    questionsToAsk: "Questions to ask",
    expectations: "Expectations",
    visio15min: "15min Video",
    // Sample Questions
    question1:
      "I'm thinking of starting a business. What are the next things I should focus on?",
    question2: "How do I know if my business idea will work?",
    question3: "How do you approach growing my business?",
    question4:
      "What key metrics should I aim for at different stages to be a leading company?",
    // Expectations
    expectation1: "Ask three or more questions",
    expectation2: "Tips for starting a successful business",
    expectation3: "Tips for getting your first 10,000 customers",
    expectation4: "Growth tips and growth kickstart",
    // How it works
    howItWorks: "How it works?",
    findExpert: "Find an expert",
    findExpertDesc:
      "Discover and choose from our list of the world's most sought-after experts",
    bookOrSubscribe: "Book or subscribe",
    bookOrSubscribeDesc:
      "Book a one-time video call or choose a plan for continuous access to your expert",
    virtualConsultation: "Virtual consultation",
    virtualConsultationDesc:
      "Join the video call or chat, ask questions and get expert advice",
    // Similar Experts
    similarExperts: "Similar experts",
    seeAll: "See all",
    // FAQ
    frequentQuestions: "Frequently asked questions",
    whatIsSapiow: "What is Sapiow?",
    whatIsSapiowAnswer:
      "Sapiow is an online platform that allows you to book experts for video consultations, offering users direct access to qualified professionals in various fields.",
    benefitsQuestion: "What are the benefits of using Sapiow for users?",
    benefitsAnswer:
      "Sapiow offers direct access to qualified experts, flexible consultations, and a secure platform to get professional advice in many fields.",
    expertsTypesQuestion: "What types of experts can I book on Sapiow?",
    expertsTypesAnswer:
      "You can book experts in many fields: business, health, technology, personal development, and many other specialties.",
    qualityQuestion:
      "How does Sapiow guarantee the quality of available experts?",
    qualityAnswer:
      "All our experts are verified and selected according to strict criteria of expertise, experience and professional qualifications.",
    feesQuestion: "What are the fees associated with using Sapiow?",
    feesAnswer:
      "Rates vary by expert and type of consultation. You can choose between single sessions or monthly subscriptions.",
    // Success Page
    congratulations: "Congratulations!",
    sessionBookedSuccess: "Your session has been successfully booked!",
    addToCalendar: "Add to calendar",
  },
  // Session Detail Sheet
  sessionDetail: {
    title: "Details",
    startVideo: "Start video call",
    sendMessage: "Send message",
    askQuestion: "Ask a question",
    questionsAndAnswers: "Questions and answers",
    noQuestions: "No questions asked yet",
    noQuestionsDescription: "Ask your first question to the expert",
    writeQuestion: "Write your question...",
    send: "Send",
    cancel: "Cancel",
    questionSubmitError: "Error submitting question",
    cancelAppointment: "Cancel appointment",
    confirmCancel: "Are you sure you want to cancel this appointment?",
    cancelSuccess: "Appointment cancelled successfully",
    cancelError: "Error cancelling appointment",
    dateNotAvailable: "Date not available",
    timeNotAvailable: "Time not available",
    session: "Session",
    expert: "Expert",
    quickVideoSession: "Quick video session",
    bookSession: "Book a session",
    // Alt texts
    congratulationAlt: "Congratulations",
    magnifierAlt: "Magnifier",
    calendarAlt: "Calendar",
    videoCameraAlt: "Video camera",
    // Questions section
    dontHesitateAskQuestions:
      "Don't hesitate to ask your questions before the session",
    submitQuestionsAdvance:
      "You have the possibility to submit your questions in advance so that the expert can better prepare for you.",
    submitMyQuestions: "Submit my questions",
    typeQuestionHere: "Type your question here...",
    addAnotherQuestion: "Add another question",
    questionsOrComments: "Questions or comments",
    viewDetails: "View details",
    consultationWith: "Consultation with",
    videoConsultation: "Video consultation with",
  },

  // Dark Session Card / Upcoming Video Call
  upcomingCall: {
    now: "Now",
    inDays: "In",
    day: "day",
    days: "days",
    inHours: "In",
    hours: "h",
    inMinutes: "In",
    minutes: "min",
    calendarAlt: "Calendar",
    clockAlt: "Clock",
  },

  // Video Call
  videoCall: {
    callEnded: "Call ended",
    error: "Connection error",
    loading: "Connecting...",
    mute: "Mute",
    unmute: "Unmute",
    camera: "Camera",
    endCall: "End call",
  },

  // Categories
  categories: {
    media: "Media",
    culture: "Culture",
    business: "Business",
    maison: "Home",
    artisanat: "Crafts",
    glow: "Wellness",
    sport: "Sports",
    specializedIn: "specialized in",
  },

  // Calendar
  calendar: {
    // Default values
    defaultClient: "Client",
    defaultDuration: "30 min",
    defaultConsultation: "Consultation",
    // Days of week (array format)
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    // Days of week (individual)
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    // Months (array format)
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    // Months (individual)
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    // Status
    blocked: "Blocked",
    // Planning
    planYourVisio: "Plan your video call",
    visioDuration: "Video call duration",
    availableSlots: "Available slots",
    noSlotsAvailable: "No slots available for this day.",
    selectAnotherDate: "Please select another date.",
    complete: "Full",
    // Booking
    minutes: "minutes",
    reserving: "Booking...",
    reserve: "Book",
    reservationError: "Booking error. Please try again.",
  },

  // Payment
  payment: {
    success: "Payment successful!",
    processing: "Processing payment...",
    failed: "Payment failed",
    redirecting: "Redirecting...",
  },

  // Home Pages
  home: {
    // Expert Dashboard
    hello: "Hello",
    user: "User",
    visiosToday: "video call coming up today",
    visiosTodayPlural: "video calls coming up today",
    youHave: "You have",
    completedVisios: "Completed video calls",
    earningsSummary: "Earnings summary",
    pendingRequests: "Pending requests",
    seeAll: "See all",
    noPendingRequests: "No pending requests",
    nextVisio: "Next video call",
    noScheduledVisio: "No scheduled video calls",
    // Client Dashboard
    loadingExperts: "Loading experts...",
    errorLoadingExperts: "Error loading experts",
    unknownError: "Unknown error",
    yourNextVisio: "Your next video call",
    accelerateProject: "Accelerate your project, Book a Video Call.",
  },

  // Share Link Button
  shareLink: {
    defaultText: "Share your booking link",
    copied: "Link copied!",
    copyError: "Error copying link",
  },

  // Header
  header: {
    profileAlt: "Profile picture",
    expertMode: "Expert mode",
    notifications: "Notifications",
    unreadSingular: "unread",
    unreadPlural: "unread",
    noNotifications: "No notifications",
    seeAllNotifications: "See all notifications",
    markAsReadError: "Error marking notification as read",
    // Time formatting
    justNow: "Just now",
    minutesAgo: "",
    hoursAgo: "",
    minutes: "min ago",
    hours: "h ago",
  },

  // Header Client
  headerClient: {
    search: "Search",
    searchPlaceholder: "Search",
    searchAlt: "search",
    heartAlt: "heart",
    clientMode: "Client mode",
    becomeExpert: "Become an expert",
  },

  // Favorites Page
  favorites: {
    title: "My Favorites",
    loading: "Loading your favorites...",
    error: "Error loading favorites",
    unknownError: "Unknown error",
    noFavorites: "No professionals in favorites yet",
    noFavoritesDescription:
      "Add professionals to your favorites by clicking the heart",
  },

  // Payment History Page
  paymentHistory: {
    title: "Payment History",
    searchPlaceholder: "Amount, transaction ...",
    filterBy: "Filter by",
    allTransactions: "All transactions",
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    transactionDetails: "Transaction Details",
    backToList: "Back to list",
    amount: "Amount",
    expert: "Expert",
    session: "Session",
    dateTime: "Date and time",
    status: "Status",
    transactionId: "Transaction ID",
    noTransactions: "No transactions found",
    noTransactionsDescription:
      "Your transactions will appear here once completed",
    selectTransaction: "Select a transaction to view details",
  },

  // Phone Number Component
  phoneNumber: {
    label: "Phone number",
    placeholder: "06 06 06 06 06",
    searchCountry: "Search country...",
    noCountryFound: "No country found",
    invalidNumber: "Invalid phone number",
    required: "This field is required",
  },

  // Search Components
  search: {
    placeholder: "Search",
    searchPlaceholder: "Search",
    noResults: "No results found",
    searching: "Searching...",
  },

  // Page Header & Notifications
  pageHeader: {
    notifications: "Notifications",
    markAsRead: "Mark as read",
    markAllAsRead: "Mark all as read",
    noNotifications: "No notifications",
    seeAllNotifications: "See all notifications",
    justNow: "Just now",
    minutesAgo: "",
    hoursAgo: "",
    minutes: "min ago",
    hours: "h ago",
    notificationError: "Error marking notification as read",
  },

  // Session Details Panel
  sessionDetailsPanel: {
    noSessionToday: "No sessions are scheduled for today.",
    addAvailability: "Add availability",
    selectDateToView: "Select a date to view details.",
    client: "Client",
    consultation: "Consultation",
  },

  // Toast Messages
  toast: {
    // Questions
    questionSubmitted: "Question submitted successfully!",
    questionUpdated: "Question updated successfully!",
    questionSubmitError: "Error submitting question",
    questionUpdateError: "Error updating question",

    // Appointments
    appointmentCreated: "Appointment created successfully!",
    appointmentConfirmed: "Appointment confirmed successfully!",
    appointmentCancelled: "Appointment cancelled successfully!",
    appointmentCreateError: "Error creating appointment",
    appointmentUpdateError: "Error updating appointment",
    appointmentCancelError: "Error cancelling appointment",

    // Date Blocking
    dateBlocked: "Date blocked successfully!",
    dateBlockError: "Error blocking date",
    dateUnblocked: "Date unblocked successfully!",
    dateUnblockError: "Error unblocking date",

    // Video Call
    callConnectionError: "Error connecting to video call",
    callTokenError: "Error retrieving call token",
  },

  // Countries
  countries: {
    // Africa
    DZ: "Algeria",
    AO: "Angola",
    BJ: "Benin",
    BW: "Botswana",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cape Verde",
    CM: "Cameroon",
    CF: "Central African Republic",
    TD: "Chad",
    KM: "Comoros",
    CG: "Congo",
    CD: "Democratic Republic of the Congo",
    CI: "Ivory Coast",
    DJ: "Djibouti",
    EG: "Egypt",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    ET: "Ethiopia",
    GA: "Gabon",
    GM: "Gambia",
    GH: "Ghana",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    KE: "Kenya",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    MG: "Madagascar",
    MW: "Malawi",
    ML: "Mali",
    MR: "Mauritania",
    MU: "Mauritius",
    MA: "Morocco",
    MZ: "Mozambique",
    NA: "Namibia",
    NE: "Niger",
    NG: "Nigeria",
    RW: "Rwanda",
    ST: "Sao Tome and Principe",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SO: "Somalia",
    ZA: "South Africa",
    SS: "South Sudan",
    SD: "Sudan",
    SZ: "Eswatini",
    TZ: "Tanzania",
    TG: "Togo",
    TN: "Tunisia",
    UG: "Uganda",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    // Europe
    AD: "Andorra",
    AL: "Albania",
    AT: "Austria",
    BY: "Belarus",
    BE: "Belgium",
    BA: "Bosnia and Herzegovina",
    BG: "Bulgaria",
    HR: "Croatia",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    EE: "Estonia",
    FI: "Finland",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
    HU: "Hungary",
    IS: "Iceland",
    IE: "Ireland",
    IT: "Italy",
    LV: "Latvia",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MT: "Malta",
    MD: "Moldova",
    MC: "Monaco",
    ME: "Montenegro",
    NL: "Netherlands",
    MK: "North Macedonia",
    NO: "Norway",
    PL: "Poland",
    PT: "Portugal",
    RO: "Romania",
    RU: "Russia",
    SM: "San Marino",
    RS: "Serbia",
    SK: "Slovakia",
    SI: "Slovenia",
    ES: "Spain",
    SE: "Sweden",
    CH: "Switzerland",
    UA: "Ukraine",
    GB: "United Kingdom",
    VA: "Vatican City",
    // Asia
    AF: "Afghanistan",
    AM: "Armenia",
    AZ: "Azerbaijan",
    BH: "Bahrain",
    BD: "Bangladesh",
    BT: "Bhutan",
    BN: "Brunei",
    KH: "Cambodia",
    CN: "China",
    GE: "Georgia",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IL: "Israel",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Laos",
    LB: "Lebanon",
    MY: "Malaysia",
    MV: "Maldives",
    MN: "Mongolia",
    MM: "Myanmar",
    NP: "Nepal",
    KP: "North Korea",
    OM: "Oman",
    PK: "Pakistan",
    PS: "Palestine",
    PH: "Philippines",
    QA: "Qatar",
    SA: "Saudi Arabia",
    SG: "Singapore",
    KR: "South Korea",
    LK: "Sri Lanka",
    SY: "Syria",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TH: "Thailand",
    TL: "East Timor",
    TR: "Turkey",
    TM: "Turkmenistan",
    AE: "United Arab Emirates",
    UZ: "Uzbekistan",
    VN: "Vietnam",
    YE: "Yemen",
    // North America
    CA: "Canada",
    MX: "Mexico",
    US: "United States",
    // Central America
    BZ: "Belize",
    CR: "Costa Rica",
    SV: "El Salvador",
    GT: "Guatemala",
    HN: "Honduras",
    NI: "Nicaragua",
    PA: "Panama",
    // South America
    AR: "Argentina",
    BO: "Bolivia",
    BR: "Brazil",
    CL: "Chile",
    CO: "Colombia",
    EC: "Ecuador",
    FK: "Falkland Islands",
    GF: "French Guiana",
    GY: "Guyana",
    PY: "Paraguay",
    PE: "Peru",
    SR: "Suriname",
    UY: "Uruguay",
    VE: "Venezuela",
    // Caribbean
    AG: "Antigua and Barbuda",
    BS: "Bahamas",
    BB: "Barbados",
    CU: "Cuba",
    DM: "Dominica",
    DO: "Dominican Republic",
    GD: "Grenada",
    HT: "Haiti",
    JM: "Jamaica",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    VC: "Saint Vincent and the Grenadines",
    TT: "Trinidad and Tobago",
    // Oceania
    AU: "Australia",
    FJ: "Fiji",
    KI: "Kiribati",
    MH: "Marshall Islands",
    FM: "Micronesia",
    NR: "Nauru",
    NZ: "New Zealand",
    PW: "Palau",
    PG: "Papua New Guinea",
    WS: "Samoa",
    SB: "Solomon Islands",
    TO: "Tonga",
    TV: "Tuvalu",
    VU: "Vanuatu",
  },
} as const;
