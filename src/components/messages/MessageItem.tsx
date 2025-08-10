import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/messages";
import Image from "next/image";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
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
                ? "bg-charcoal-blue lg:bg-gray-900 text-white rounded-tr-sm lg:rounded-tl-sm"
                : "bg-gray-100 text-gray-900 rounded-tl-sm"
            }`}
          >
            <p className="text-xs font-outfit lg:text-sm">{message.message}</p>
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
  );
}
