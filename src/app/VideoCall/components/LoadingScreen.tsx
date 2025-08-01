import { memo } from "react";

interface LoadingScreenProps {
  message: string;
  subtitle?: string;
}

export const LoadingScreen = memo(
  ({ message, subtitle }: LoadingScreenProps) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl font-medium">{message}</p>
        {subtitle && <p className="text-sm opacity-75 mt-2">{subtitle}</p>}
      </div>
    </div>
  )
);

LoadingScreen.displayName = "LoadingScreen";
