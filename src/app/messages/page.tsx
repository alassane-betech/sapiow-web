"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { AppSidebar } from "@/components/layout/Sidebare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ConversationItem } from "@/components/messages/ConversationItem";
import { MessageItem } from "@/components/messages/MessageItem";
import { SearchBar } from "@/components/messages/SearchBar";
import { MessageInput } from "@/components/messages/MessageInput";
import { conversations, messages } from "@/data/mockMessages";



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
      <div className="hidden lg:flex flex-1 flex-col container">
        <PageHeader title="Messages" className="hidden sm:flex" />
        <div className="flex-1 flex h-[83vh] mt-[22px]">
          {/* Sidebar des conversations */}
          <div className="w-80 bg-white flex flex-col mr-4">
            <SearchBar />
            
            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={conversation.id === selectedConversation}
                  onClick={() => setSelectedConversation(conversation.id)}
                />
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
                    {activeConversation?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900 font-outfit text-base">
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
                <MessageItem key={message.id} message={message} />
              ))}
            </div>

            <MessageInput />
          </div>
        </div>
      </div>

      {/* Mobile (sm/md) : liste ou chat seul */}
      <div className="flex flex-1 flex-col lg:hidden">
        {/* Pas de header sur mobile */}
        {/* Liste des conversations (si aucune sélection) */}
        {!selectedConversation && (
          <div className="flex-1 flex flex-col w-[95%] mx-auto">
            <h2 className="text-lg text-center font-semibold text-exford-blue mt-5">
              Messages
            </h2>
            <SearchBar className="sticky top-0 z-10 bg-white pt-2 pb-2" />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  onClick={() => setSelectedConversation(conversation.id)}
                />
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
                <MessageItem key={message.id} message={message} />
              ))}
            </div>
            <MessageInput />
          </div>
        )}
      </div>
    </div>
  );
}
