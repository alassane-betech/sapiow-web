"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { AppSidebar } from "@/components/layout/Sidebare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mic, Paperclip, Search, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    message: "Merci pour la session",
    time: "4h",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 2,
    name: "Melanie Finn",
    message: "Je vous enverrai le fichier dès que possible !",
    time: "4h",
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 3,
    name: "Jordan Lee",
    message: "La réunion est confirmée pour 10h.",
    time: "1h",
    avatar: "/assets/prof2.jpg",
  },
  {
    id: 4,
    name: "Samantha Chen",
    message: "Veuillez examiner les documents joints.",
    time: "2j",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 5,
    name: "Alex Johnson",
    message: "Pouvons-nous reprogrammer notre appel pour demain ?",
    time: "3h",
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 6,
    name: "John Doe",
    message: "Merci pour la session",
    time: "4h",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 7,
    name: "Melanie Finn",
    message: "Je vous enverrai le fichier dès que possible !",
    time: "4h",
    avatar: "/assets/prof1.jpg",
    active: true,
  },
  {
    id: 8,
    name: "Jordan Lee",
    message: "La réunion est confirmée pour 10h.",
    time: "1h",
    avatar: "/assets/prof2.jpg",
  },
  {
    id: 9,
    name: "Samantha Chen",
    message: "Veuillez examiner les documents joints.",
    time: "2j",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 10,
    name: "Alex Johnson",
    message: "Pouvons-nous reprogrammer notre appel pour demain ?",
    time: "3h",
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 11,
    name: "John Doe",
    message: "Merci pour la session",
    time: "4h",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 12,
    name: "Melanie Finn",
    message: "Je vous enverrai le fichier dès que possible !",
    time: "4h",
    avatar: "/assets/prof1.jpg",
    active: true,
  },
  {
    id: 13,
    name: "Jordan Lee",
    message: "La réunion est confirmée pour 10h.",
    time: "1h",
    avatar: "/assets/prof2.jpg",
  },
  {
    id: 14,
    name: "Samantha Chen",
    message: "Veuillez examiner les documents joints.",
    time: "2j",
    avatar: "/assets/prof.jpg",
  },
  {
    id: 15,
    name: "Alex Johnson",
    message: "Pouvons-nous reprogrammer notre appel pour demain ?",
    time: "3h",
    avatar: "/assets/prof1.jpg",
  },
];

const messages = [
  {
    id: 1,
    sender: "Melanie Finn",
    message: "Bonjour ! Nazrul, comment ça va ?",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 2,
    message: "Je vais mieux merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Melanie Finn",
    message: "Voici le document support lié à notre conversation.",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
    hasImage: true,
  },
  {
    id: 4,
    message: "Bien merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    id: 1,
    sender: "Melanie Finn",
    message: "Bonjour ! Nazrul, comment ça va ?",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 2,
    message: "Je vais mieux merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Melanie Finn",
    message: "Voici le document support lié à notre conversation.",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
    hasImage: true,
  },
  {
    id: 4,
    message: "Bien merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Melanie Finn",
    message: "Bonjour ! Nazrul, comment ça va ?",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
  },
  {
    id: 6,
    message: "Je vais mieux merci !",
    time: "09:25 AM",
    isOwn: true,
  },
  {
    id: 7,
    sender: "Melanie Finn",
    message: "Voici le document support lié à notre conversation.",
    time: "09:25 AM",
    isOwn: false,
    avatar: "/assets/prof1.jpg",
    hasImage: true,
  },
  {
    id: 8,
    message: "Bien merci !",
    time: "09:25 AM",
    isOwn: true,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  // Trouver la conversation sélectionnée
  const activeConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  // Responsive : afficher la liste ou le chat sur mobile
  return (
    <div className="flex h-screen bg-white">
      <AppSidebar hideMobileNav={!!selectedConversation} />

      {/* Desktop (lg+) : sidebar + chat */}
      <div className="hidden lg:flex flex-1 flex-col">
        <PageHeader title="Messages" className="hidden sm:flex" />
        <div className="flex-1 flex h-[83vh] px-6 mt-[22px]">
          {/* Sidebar des conversations */}
          <div className="w-80 bg-white flex flex-col mr-4">
            {/* Search Header */}
            <div className="px-4 mb-5 pt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher"
                  className="pl-10 pr-10 bg-gray-50 border-none"
                />
                <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-[#e9e9e9] ${
                    conversation.id === selectedConversation
                      ? "bg-snow-blue"
                      : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col border border-light-blue-gray rounded-3xl h-[85vh]">
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={activeConversation?.avatar || "/assets/prof1.jpg"}
                  />
                  <AvatarFallback>
                    {activeConversation?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {activeConversation?.name ||
                      "Sélectionnez une conversation"}
                  </h2>
                  <p className="text-sm text-green-600">Actif maintenant</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  Aujourd'hui
                </span>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-xs lg:max-w-md ${
                      message.isOwn ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>MF</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-2">
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.isOwn
                            ? "bg-gray-900 text-white rounded-tl-sm"
                            : "bg-gray-100 text-gray-900 rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>

                      {message.hasImage && (
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md p-2 max-w-xs">
                          <Image
                            src="/assets/logo.jpg"
                            alt="Document"
                            width={200}
                            height={150}
                            className="rounded-lg"
                          />
                        </div>
                      )}

                      <div
                        className={`flex ${
                          message.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4 sticky bottom-0 z-10">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 flex rounded-[12px] px-4 bg-azure-mist h-[40px] text-granite-gray items-center">
                  <Input
                    placeholder="Votre message"
                    className="border-none bg-transparent shadow-none"
                  />
                  <button className="cursor-pointer" type="button">
                    <img
                      src="/assets/icons/files.svg"
                      alt="clip"
                      className="w-6 h-6 opacity-60"
                    />
                  </button>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Image
                    src="/assets/icons/photo.svg"
                    alt="camera"
                    width={24}
                    height={24}
                  />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Image
                    src="/assets/icons/microphone.svg"
                    alt="mic"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile (sm/md) : liste ou chat seul */}
      <div className="flex flex-1 flex-col lg:hidden">
        {/* Pas de header sur mobile */}
        {/* Liste des conversations (si aucune sélection) */}
        {!selectedConversation && (
          <div className="flex-1 flex flex-col">
            {/* Search Header sticky */}
            <div className="px-4 mb-5 sticky top-0 z-10 bg-white pt-2 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher"
                  className="pl-10 pr-10 bg-gray-50 border-none"
                />
                <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center p-4 border-b border-[#e9e9e9] cursor-pointer"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <Avatar className="h-12 w-12 mr-3 border border-[#e9e9e9]">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 truncate text-base">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Chat mobile (si une conversation est sélectionnée) */}
        {selectedConversation && (
          <div className="flex-1 flex flex-col border border-[#F4F6F9] rounded-3xl bg-white">
            {/* Chat Header mobile sticky */}
            <div className="border-b border-gray-200 p-4 flex items-center gap-2 sticky top-0 z-10 bg-white">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-6 w-6 text-gray-900" />
              </button>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={activeConversation?.avatar || "/assets/prof1.jpg"}
                />
                <AvatarFallback>
                  {activeConversation?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {activeConversation?.name || "Sélectionnez une conversation"}
                </h2>
                <p className="text-sm text-green-600">Actif maintenant</p>
              </div>
            </div>
            {/* Messages Area */}
            <div className="bg-gray-50 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  Aujourd'hui
                </span>
              </div>
              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-xs md:max-w-md ${
                      message.isOwn ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>MF</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-2">
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.isOwn
                            ? "bg-gray-900 text-white rounded-tl-sm"
                            : "bg-gray-100 text-gray-900 rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>

                      {message.hasImage && (
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md p-2 max-w-xs">
                          <Image
                            src="/assets/logo.jpg"
                            alt="Document"
                            width={200}
                            height={150}
                            className="rounded-lg"
                          />
                        </div>
                      )}

                      <div
                        className={`flex ${
                          message.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Message Input */}
            <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white z-10">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <div className="flex-1 flex rounded-[12px] px-4 bg-azure-mist h-[40px] text-granite-gray items-center">
                    <Input
                      placeholder="Votre message"
                      className="border-none bg-transparent shadow-none"
                    />
                    <button className="cursor-pointer" type="button">
                      <img
                        src="/assets/icons/files.svg"
                        alt="clip"
                        className="w-6 h-6 opacity-60"
                      />
                    </button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Image
                    src="/assets/icons/photo.svg"
                    alt="camera"
                    width={24}
                    height={24}
                  />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Image
                    src="/assets/icons/microphone.svg"
                    alt="mic"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
