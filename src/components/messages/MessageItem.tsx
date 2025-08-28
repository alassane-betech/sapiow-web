import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/messages";
import Image from "next/image";
import { FileText, Download, Play, Pause, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
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

          {message.type === 'audio' && (
            <div className="bg-gray-100 rounded-2xl p-3 max-w-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex-shrink-0 w-10 h-10 bg-exford-blue hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Volume2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Message audio</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-exford-blue transition-all duration-200"
                        style={{ width: `${duration > 0 && !isNaN(duration) && isFinite(duration) ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                    {duration > 0 && !isNaN(duration) && isFinite(duration) && (
                      <span>{formatTime(duration)}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <audio
                ref={audioRef}
                src={message.message}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
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
