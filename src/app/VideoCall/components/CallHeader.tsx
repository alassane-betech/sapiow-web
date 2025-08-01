import { memo, useCallback } from "react";

interface CallHeaderProps {
  participantCount: number;
  duration: number;
}

export const CallHeader = memo(({ duration }: CallHeaderProps) => {
  const formatDuration = useCallback((durationInSec: number) => {
    // S'assurer que la durée est positive
    const safeDuration = Math.max(0, Math.floor(durationInSec));

    const hours = Math.floor(safeDuration / 3600);
    const minutes = Math.floor((safeDuration % 3600) / 60);
    const seconds = safeDuration % 60;

    // Afficher les heures seulement si > 0
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-6 duration-300">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* <Users className="w-4 h-4" /> */}
            <span className="text-sm">
              {/* {participantCount} participant{participantCount > 1 ? "s" : ""} */}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-[99px] bg-white/50 backdrop-blur-sm px-4 py-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>

          {/* Timer avec animation subtile */}
          <span className="text-lg font-mono font-semibold tracking-wider transition-all duration-200">
            {formatDuration(duration)}
          </span>
        </div>
      </div>
    </div>
  );
});

CallHeader.displayName = "CallHeader";
