import { memo } from "react";

interface LoadingScreenProps {
  message: string;
  subtitle?: string;
}

export const LoadingScreen = memo(
  ({ message, subtitle }: LoadingScreenProps) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-snow-blue via-white to-snow-blue">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Custom spinner with brand colors */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-snow-blue"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cobalt-blue animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-r-cobalt-blue animate-spin animation-delay-150"></div>
          </div>
          
          {/* Message */}
          <h2 className="text-xl font-bold text-exford-blue mb-2">
            {message}
          </h2>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-gray-500 font-medium">
              {subtitle}
            </p>
          )}
          
          {/* Progress dots animation */}
          <div className="flex justify-center items-center mt-6 space-x-1">
            <div className="w-2 h-2 bg-cobalt-blue rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cobalt-blue rounded-full animate-pulse animation-delay-150"></div>
            <div className="w-2 h-2 bg-cobalt-blue rounded-full animate-pulse animation-delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
);

LoadingScreen.displayName = "LoadingScreen";
