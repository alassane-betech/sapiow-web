import { 
  usePatientSendMessage, 
  createSendMessageData,
  validateFile 
} from "@/api/patientMessages/usePatientMessage";
import { useProSendMessage } from "@/api/porMessages/useProMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserData } from "@/store/useCurrentUser";
import { useUserStore } from "@/store/useUser";
import { Paperclip, Send, Mic, Square, Play, Pause } from "lucide-react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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
    if ((message.trim() || selectedFile || recordedAudio) && receiverId) {
      try {
        console.log("Avant envoi:", { selectedFile, recordedAudio, message: message.trim(), receiverId });
        
        let content = selectedFile || message.trim();
        
        // Si c'est un audio enregistré, créer un File à partir du Blob
        if (recordedAudio) {
          const audioFile = new File([recordedAudio], `audio-${Date.now()}.webm`, {
            type: recordedAudio.type
          });
          content = audioFile;
        }
        
        console.log("Content à envoyer:", content);
        
        const messageData = createSendMessageData(receiverId, content);
        console.log("MessageData créé:", messageData);
        
        await sendMessageMutation.mutateAsync(messageData);
        setMessage("");
        setSelectedFile(null);
        setRecordedAudio(null);
        setAudioUrl(null);
        adjustHeight();
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      setMessage(`📎 ${file.name}`);
    } else {
      alert("Type de fichier non supporté");
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setMessage(`🖼️ ${file.name}`);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedAudio(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setMessage(`🎤 Enregistrement audio (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Démarrer le timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erreur accès microphone:', error);
      alert('Impossible d\'accéder au microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordedAudio(null);
      setAudioUrl(null);
      setRecordingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="border-t border-gray-200 py-4 sticky bottom-0 z-10 bg-white">
      <div className="flex items-center space-x-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,audio/*"
          onChange={handleFileSelect}
        />
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
              (!message.trim() && !selectedFile) || !receiverId || sendMessageMutation.isPending
            }
          >
            <Send
              className={`h-5 w-5 ${
                (message.trim() || selectedFile) ? "text-exford-blue" : "text-gray-400"
              }`}
            />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500"
          onClick={() => imageInputRef.current?.click()}
        >
          <Image
            src="/assets/icons/photo.svg"
            alt="camera"
            width={24}
            height={24}
          />
        </Button>
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageSelect}
        />
        {!isRecording ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500 hover:text-exford-blue"
            onClick={startRecording}
          >
            <Mic className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600">
                {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                onClick={stopRecording}
              >
                <Square className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-600 hover:text-gray-700 h-8 w-8 p-0"
                onClick={cancelRecording}
              >
                ✕
              </Button>
            </div>
          </div>
        )}
        
        {/* Lecteur audio pour l'aperçu */}
        {audioUrl && !isRecording && (
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
            <audio controls className="h-8">
              <source src={audioUrl} type="audio/webm" />
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
