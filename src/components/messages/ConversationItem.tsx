import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation } from "@/types/messages";
import { User } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected?: boolean;
  onClick: () => void;
}

export function ConversationItem({
  conversation,
  isSelected = false,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-[#e9e9e9] ${
        isSelected ? "bg-snow-blue" : ""
      }`}
      onClick={onClick}
    >
      <Avatar className="h-12 w-12 mr-3 border border-[#e9e9e9]">
        <AvatarImage src={conversation.avatar} />
        <AvatarFallback>
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base text-exford-blue truncate font-figtree lg:font-semibold lg:text-gray-900">
            {conversation.name}
          </h3>
          <span className="text-xs text-granite-gray lg:text-gray-500 ml-2">
            {conversation.time}
          </span>
        </div>
        <p className="text-sm text-slate-gray lg:text-gray-600 truncate font-figtree">
          {conversation.message}
        </p>
      </div>
    </div>
  );
}
