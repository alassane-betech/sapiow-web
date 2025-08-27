import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/messages";
import Image from "next/image";
import { FileText, Download } from "lucide-react";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
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
          {/* Afficher le texte seulement pour les messages text ou sans type */}
          {(!message.type || message.type === 'text') && (
            <div
              className={`px-4 py-2 rounded-2xl ${
                message.isOwn
                  ? "bg-charcoal-blue lg:bg-gray-900 text-white rounded-tr-sm lg:rounded-tl-sm"
                  : "bg-gray-100 text-gray-900 rounded-tl-sm"
              }`}
            >
              <p className="text-xs font-outfit lg:text-sm">{message.message}</p>
            </div>
          )}

          {/* Affichage selon le type */}
          {message.type === 'image' && (
            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-2 max-w-xs">
              <Image
                src={message.message}
                alt="Image"
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}

          {message.type === 'document' && (
            <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = message.message;
                  link.download = 'document.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full"
              >
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">Document PDF</p>
                  <p className="text-xs text-gray-500">Cliquer pour télécharger</p>
                </div>
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          )}

          <div
            className={`flex ${
              message.isOwn ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
