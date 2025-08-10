import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Logique pour ajuster automatiquement la hauteur
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 96; // ~4 lignes (24px par ligne)

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
            placeholder="Votre message"
            className="border-none bg-transparent shadow-none resize-none min-h-[24px] leading-6 py-2 scrollbar-hide"
            rows={1}
          />
          <button className="cursor-pointer flex-shrink-0" type="button">
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
  );
}
