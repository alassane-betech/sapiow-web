import { usePatientSendMessage } from "@/api/patientMessages/usePatientMessage";
import { useProSendMessage } from "@/api/porMessages/useProMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";
import { Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MessageInputProps {
  receiverId?: string;
}

export function MessageInput({ receiverId }: MessageInputProps) {
  const { currentUser } = useCurrentUserData();
  const currentProId = currentUser?.id;
  const currentPatientId = currentUser?.id;
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUserStore();
  const sendMessageMutation =
    user?.type === "expert"
      ? useProSendMessage(currentProId || "")
      : usePatientSendMessage(currentPatientId || "");

  // Logique pour ajuster automatiquement la hauteur
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 96;

      if (scrollHeight <= maxHeight) {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "auto";
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Shift+Enter permet le saut de ligne naturel
  };

  const handleSendMessage = async () => {
    if (message.trim() && receiverId) {
      try {
        await sendMessageMutation.mutateAsync({
          receiverId,
          content: message.trim(),
        });
        setMessage("");
        adjustHeight();
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="border-t border-gray-200 py-4 sticky bottom-0 z-10 bg-white">
      <div className="flex items-center space-x-0">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex rounded-[12px] px-0 bg-azure-mist min-h-[40px] text-granite-gray items-center">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Votre message"
            className="border-none bg-transparent shadow-none resize-none min-h-[24px] leading-6 py-2 scrollbar-hide"
            rows={1}
          />
          {/* <button className="cursor-pointer flex-shrink-0" type="button"> */}
          {/* <Image
              src="/assets/icons/files.svg"
              alt="clip"
              width={24}
              height={24}
              className="w-6 h-6 opacity-60"
            /> */}
          {/* </button> */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
            onClick={handleSendMessage}
            disabled={
              !message.trim() || !receiverId || sendMessageMutation.isPending
            }
          >
            <Send
              className={`h-5 w-5 ${
                message.trim() ? "text-exford-blue" : "text-gray-400"
              }`}
            />
          </Button>
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
  );
}
