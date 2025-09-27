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
    termsOfService: "Terms of Service",
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
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    openSourceLicenses: "Open Source Licenses",
    termsContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    privacyContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    licensesContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
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
      answer1: "Open the Tradebase app to get started and follow the steps. Tradebase does not charge fees to create or maintain your Tradebase account.",
      question2: "How to add a payment method via this application?",
      answer2: "To add a payment method, go to your account settings, select 'Payment Methods' and follow the instructions to add your bank card or PayPal account.",
      question3: "Question 3",
      answer3: "Answer to question 3. You can add here all relevant information to help your users.",
      question4: "Question 4",
      answer4: "Answer to question 4. This section can contain technical details or step-by-step instructions.",
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
    nameMatchId: "Make sure this matches the name on your government-issued ID.",
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
    noPaymentHistory: "No payment history available. Set up your payment account to start receiving revenue.",
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
    question1: "I'm thinking of starting a business. What are the next things I should focus on?",
    question2: "How do I know if my business idea will work?",
    question3: "How do you approach growing my business?",
    question4: "What key metrics should I aim for at different stages to be a leading company?",
    // Expectations
    expectation1: "Ask three or more questions",
    expectation2: "Tips for starting a successful business",
    expectation3: "Tips for getting your first 10,000 customers",
    expectation4: "Growth tips and growth kickstart",
    // How it works
    howItWorks: "How it works?",
    findExpert: "Find an expert",
    findExpertDesc: "Discover and choose from our list of the world's most sought-after experts",
    bookOrSubscribe: "Book or subscribe",
    bookOrSubscribeDesc: "Book a one-time video call or choose a plan for continuous access to your expert",
    virtualConsultation: "Virtual consultation",
    virtualConsultationDesc: "Join the video call or chat, ask questions and get expert advice",
    // Similar Experts
    similarExperts: "Similar experts",
    seeAll: "See all",
    // FAQ
    frequentQuestions: "Frequently asked questions",
    whatIsSapiow: "What is Sapiow?",
    whatIsSapiowAnswer: "Sapiow is an online platform that allows you to book experts for video consultations, offering users direct access to qualified professionals in various fields.",
    benefitsQuestion: "What are the benefits of using Sapiow for users?",
    benefitsAnswer: "Sapiow offers direct access to qualified experts, flexible consultations, and a secure platform to get professional advice in many fields.",
    expertsTypesQuestion: "What types of experts can I book on Sapiow?",
    expertsTypesAnswer: "You can book experts in many fields: business, health, technology, personal development, and many other specialties.",
    qualityQuestion: "How does Sapiow guarantee the quality of available experts?",
    qualityAnswer: "All our experts are verified and selected according to strict criteria of expertise, experience and professional qualifications.",
    feesQuestion: "What are the fees associated with using Sapiow?",
    feesAnswer: "Rates vary by expert and type of consultation. You can choose between single sessions or monthly subscriptions.",
    // Success Page
    congratulations: "Congratulations!",
    sessionBookedSuccess: "Your session has been successfully booked!",
    addToCalendar: "Add to calendar",
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
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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
    success: "Payment successful",
    processing: "Processing payment...",
    failed: "Payment failed",
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
    noFavoritesDescription: "Add professionals to your favorites by clicking the heart",
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
    noTransactionsDescription: "Your transactions will appear here once completed",
    selectTransaction: "Select a transaction to view details",
  },

  // Phone Number Component
  phoneNumber: {
    label: "Phone number",
    placeholder: "06 06 06 06 06",
    searchCountry: "Search country...",
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
} as const;
