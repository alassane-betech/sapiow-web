import { Transaction, PaymentHistoryItem, FilterOption } from "@/types/revenue";

export const filterOptions: FilterOption[] = [
  { label: "Ce mois-ci", value: "Ce mois-ci" },
  { label: "Ce trimestre", value: "Ce trimestre" },
  { label: "Personnalisé", value: "Personnalisé" },
];

export const upcomingTransactions: Transaction[] = [
  {
    id: 1,
    type: "Dernier virement",
    amount: "1 200 €",
    date: "15 avril 2025",
  },
  {
    id: 2,
    type: "Prochain virement",
    amount: "1 300 €",
    date: "15 mai 2025",
  },
];

export const paymentHistory: PaymentHistoryItem[] = [
  {
    id: 1,
    title: "60-minute Deep Dive",
    date: "12 fév. 2025, 10:39",
    amount: "120€",
    status: "Payé",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 2,
    title: "Session rapide de 30 minutes",
    date: "14 mars 2025, 10:39",
    amount: "89€",
    status: "Payé",
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 3,
    title: "Appel stratégique de 45 minutes",
    date: "20 avr. 2025, 14:00",
    amount: "75€",
    status: "En attente",
    avatar: "/assets/prof2.jpg",
  },
  {
    id: 4,
    title: "Atelier complet de 2 heures",
    date: "05 mai 2025, 09:00",
    amount: "250€",
    status: "Payé",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 5,
    title: "Consultation spécialisée de 1 heure",
    date: "10 mai 2025, 15:30",
    amount: "150€",
    status: "Payé",
    avatar: "/assets/prof1.jpg",
  },
];
