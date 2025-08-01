import { memo } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorScreenProps {
  error: string;
  isConnecting: boolean;
  onRetry: () => void;
}

export const ErrorScreen = memo(
  ({ error, isConnecting, onRetry }: ErrorScreenProps) => (
    <div className="flex items-center justify-center bg-gray-800 h-[calc(100vh-150px)] p-4 rounded-xl">
      <div className="max-w-md w-full">
        <Alert className="bg-white/90 backdrop-blur-sm border-red-200">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-gray-800">
            <strong>Erreur de connexion :</strong>
            <br />
            {error}
          </AlertDescription>
        </Alert>

        <div className="mt-6 text-center">
          <Button
            onClick={onRetry}
            disabled={isConnecting}
            className="bg-white text-orange-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium shadow-lg"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Reconnexion...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </>
            )}
          </Button>
        </div>

        <div className="mt-4 text-center text-white text-sm">
          <p>Vérifiez votre connexion internet et réessayez.</p>
        </div>
      </div>
    </div>
  )
);

ErrorScreen.displayName = "ErrorScreen";
