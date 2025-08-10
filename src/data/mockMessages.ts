import { Conversation, Message } from "@/types/messages";

// Données de base sans duplication
const baseConversations: Omit<Conversation, 'id'>[] = [
  {
    name: "John Doe",
    message: "Merci pour la session",
    time: "4h",
    avatar: "/assets/prof.jpg",
  },
  {
    name: "Melanie Finn",
    message: "Je vous enverrai le fichier dès que possible !",
    time: "4h",
    avatar: "/assets/prof1.jpg",
    active: true,
  },
  {
    name: "Jordan Lee",
    message: "La réunion est confirmée pour 10h.",
    time: "1h",
    avatar: "/assets/prof2.jpg",
  },
  {
    name: "Samantha Chen",
    message: "Veuillez examiner les documents joints.",
    time: "2j",
    avatar: "/assets/prof.jpg",
  },
  {
    name: "Alex Johnson",
    message: "Pouvons-nous reprogrammer notre appel pour demain ?",
    time: "3h",
    avatar: "/assets/prof1.jpg",
  },
];

// Générer les conversations avec des IDs uniques
export const conversations: Conversation[] = Array.from({ length: 15 }, (_, index) => ({
  ...baseConversations[index % baseConversations.length],
  id: index + 1,
  // Marquer seulement les conversations 7 et 12 comme actives
  active: index === 6 || index === 11 ? true : undefined,
}));

const baseMessages: Omit<Message, 'id'>[] = [
  {
    sender: "Melanie Finn",
    message: "Bonjour ! Nazrul, comment ça va ?",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
  },
  {
    message: "Je vais mieux merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    sender: "Melanie Finn",
    message: "Voici le document support lié à notre conversation.",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
    hasImage: true,
  },
  {
    message: "Bien merci !",
    time: "09:25 AM",
    isOwn: true,
  },
];

// Générer les messages avec des IDs uniques
export const messages: Message[] = Array.from({ length: 8 }, (_, index) => ({
  ...baseMessages[index % baseMessages.length],
  id: index + 1,
}));
