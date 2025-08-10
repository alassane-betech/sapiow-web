import { EmptySessionCard } from "@/components/common/EmptySessionCard";
import { SessionPreviewCard } from "@/components/common/SessionPreviewCard";
import TimeSlotsManager from "@/components/common/TimeSlotsManager";
import { mockAvailabilityEvents } from "@/data/mockAvailability";
import { SessionDetailsData } from "@/types/availability";
import { formatDateForSession, formatFullDate, formatTimeForSession } from "@/utils/dateFormat";

interface SessionDetailsPanelProps {
  selectedDate: Date | null;
  showTimeSlotsManager: boolean;
  onAddAvailability: () => void;
}

export const SessionDetailsPanel = ({ 
  selectedDate, 
  showTimeSlotsManager, 
  onAddAvailability 
}: SessionDetailsPanelProps) => {
  // Fonction pour récupérer les détails des sessions pour une date sélectionnée
  const getSessionDetails = (): SessionDetailsData | null => {
    if (!selectedDate) return null;

    const dayOfMonth = selectedDate.getDate();
    const event = mockAvailabilityEvents[dayOfMonth as keyof typeof mockAvailabilityEvents];

    if (!event || event.users.length === 0) return null;

    return {
      date: selectedDate,
      event: event,
      sessions: event.users.map((user) => ({
        id: user.id,
        clientName: user.name,
        avatar: user.avatar,
        time: user.time,
        duration: user.duration,
        description: user.description,
        type: event.type,
      })),
    };
  };

  const sessionDetails = getSessionDetails();

  return (
    <div className="w-full max-w-[349px]">
      {selectedDate ? (
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center gap-2 mb-6">
            <h3 className="text-lg text-center font-semibold text-gray-900">
              {formatFullDate(selectedDate)}
            </h3>
          </div>

          {sessionDetails && (
            <div className="space-y-3">
              {sessionDetails.sessions.map((session) => (
                <SessionPreviewCard
                  key={session.id}
                  date={formatDateForSession(sessionDetails.date)}
                  time={formatTimeForSession(session.time)}
                  visioDuration={session.duration}
                  participantName={session.clientName}
                  participantAvatar={session.avatar}
                  sessionDescription={session.description}
                  className="w-full"
                />
              ))}
            </div>
          )}

          {showTimeSlotsManager ? (
            <div className="w-full">
              <TimeSlotsManager />
            </div>
          ) : (
            <EmptySessionCard
              message={
                <>
                  Aucune session n'est <br /> prévue pour aujourd'hui.
                </>
              }
              buttonLabel="Ajouter une disponibilité"
              onAdd={onAddAvailability}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-[100vh]">
          <p className="text-slate-200 text-center text-base font-medium">
            Sélectionnez une date pour
            <br /> voir les détails.
          </p>
        </div>
      )}
    </div>
  );
};
