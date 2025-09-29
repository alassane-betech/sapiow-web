import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, Maximize } from "lucide-react";

interface CallControlsProps {
  isMute: boolean;
  isDeviceSelectionSupported: boolean;
  isEndingCall: boolean;
  onToggleMicrophone: () => void;
  onToggleFullscreen: () => void;
  onEndCall: () => Promise<void>;
}

export const CallControlsComponent = memo(
  ({
    isMute,
    isDeviceSelectionSupported,
    isEndingCall,
    onToggleMicrophone,
    onToggleFullscreen,
    onEndCall,
  }: CallControlsProps) => (
    <>
      <div className="absolute bottom-42 left-1/2 transform -translate-x-1/2 transition-opacity duration-300">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all duration-200"
            onClick={onToggleMicrophone}
          >
            {isMute ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {isDeviceSelectionSupported && (
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all duration-200"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all duration-200"
            onClick={onToggleFullscreen}
          >
            <Maximize className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        className={`absolute bottom-42 right-6 transition-opacity duration-300 ${
          isEndingCall ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Button
          onClick={onEndCall}
          disabled={isEndingCall}
          className="bg-[#FF4343] hover:bg-red-60 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEndingCall ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Fin de l'appel...</span>
            </div>
          ) : (
            "Mettre fin à l'appel"
          )}
        </Button>
      </div>
    </>
  )
);

CallControlsComponent.displayName = "CallControlsComponent";
