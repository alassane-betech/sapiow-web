import { memo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";

interface CallEndedScreenProps {
  duration: string;
  onNewCall: () => void;
}

export const CallEndedScreen = memo(
  ({ duration, onNewCall }: CallEndedScreenProps) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      <div className="text-center text-white max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-bold mb-4">Appel terminé</h2>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
          <p className="text-lg mb-2">Durée de l'appel</p>
          <p className="text-2xl font-mono font-bold">{duration}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-green-300">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Caméra et microphone désactivés</span>
          </div>
        </div>

        <Button
          onClick={onNewCall}
          className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Phone className="w-4 h-4 mr-2" />
          Nouvel appel
        </Button>

        <p className="text-sm opacity-75 mt-4">
          Merci d'avoir utilisé notre service de consultation vidéo
        </p>
      </div>
    </div>
  )
);

CallEndedScreen.displayName = "CallEndedScreen";
