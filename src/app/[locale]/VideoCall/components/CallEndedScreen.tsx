import { memo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";

interface CallEndedScreenProps {
  duration: string;
  onNewCall: () => void;
}

export const CallEndedScreen = memo(
  ({ duration, onNewCall }: CallEndedScreenProps) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-snow-blue via-white to-snow-blue">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-exford-blue mb-4">Appel terminé</h2>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2 font-medium">Durée de l'appel</p>
            <p className="text-xl font-mono font-bold text-cobalt-blue">{duration}</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Caméra et microphone désactivés</span>
            </div>
          </div>

          <Button
            onClick={onNewCall}
            className="bg-cobalt-blue text-white hover:bg-cobalt-blue/90 px-8 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105 w-full"
          >
            <Phone className="w-4 h-4 mr-2" />
            Nouvel appel
          </Button>

          <p className="text-sm text-gray-500 font-medium mt-4">
            Merci d'avoir utilisé notre service de consultation vidéo
          </p>
        </div>
      </div>
    </div>
  )
);

CallEndedScreen.displayName = "CallEndedScreen";
