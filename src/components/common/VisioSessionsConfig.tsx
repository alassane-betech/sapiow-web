"use client";

import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/locales/client";
import { useProSessionsConfig } from "@/hooks/useProSessionsConfig";

interface VisioSessionsConfigProps {
  className?: string;
}

export default function VisioSessionsConfig({
  className,
}: VisioSessionsConfigProps) {
  const t = useI18n();
  
  const {
    sessions,
    isInitialLoading,
    error,
    isSessionUpdating,
    handlePriceChange,
    handleToggle,
    handlePriceBlur,
    handleToggleUpdate
  } = useProSessionsConfig();

  const expectations = [
    t("visioSessionsConfig.expectation1"),
    t("visioSessionsConfig.expectation2"),
    t("visioSessionsConfig.expectation3"),
    t("visioSessionsConfig.expectation4"),
  ];

  const questionExamples = [
    t("visioSessionsConfig.question1"),
    t("visioSessionsConfig.question2"),
    t("visioSessionsConfig.question3"),
  ];

  // Loading initial seulement si on n'a pas encore de données
  if (isInitialLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-8">
          <p className="text-gray-600">{t("visioSessionsConfig.loadingSessions")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{t("visioSessionsConfig.loadingError")}</p>
        </div>
      )}

      {/* Configuration des sessions */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const sessionUpdating = isSessionUpdating(session.id);
          
          return (
            <div
              key={session.id}
              className={`flex items-center justify-between p-4 bg-white rounded-[12px] border border-light-blue-gray ${
                sessionUpdating ? 'opacity-70' : ''
              } transition-opacity duration-200`}
            >
              <div className="flex items-center gap-6">
                <span className="text-lg font-bold text-slate-900 min-w-[100px]">
                  {session.duration}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{t("visioSessionsConfig.price")}</span>
                  <input
                    type="number"
                    value={session.price}
                    onChange={(e) =>
                      handlePriceChange(session.id, parseInt(e.target.value) || 0)
                    }
                    onBlur={() => handlePriceBlur(session.id)}
                    disabled={!session.enabled || sessionUpdating}
                    className={`w-16 px-2 py-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      session.enabled && !sessionUpdating
                        ? "border-gray-300 bg-white text-gray-900"
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}
                  />
                  <span className="text-gray-500">€</span>
                </div>
              </div>

              <Switch
                checked={session.enabled}
                onCheckedChange={(checked) => {
                  handleToggle(session.id, checked);
                  // Pour les sessions existantes, appeler l'API immédiatement
                  if (session.api_id) {
                    handleToggleUpdate(session.id, checked);
                  }
                }}
                disabled={sessionUpdating}
                className="data-[state=checked]:bg-gray-900"
              />
            </div>
          );
        })}
      </div>

      {/* Section Attentes */}
      <div className="space-y-4 border border-light-blue-gray pt-4 rounded-[8px] px-4 py-2">
        <h3 className="text-xs font-normal text-slate-gray">{t("visioSessionsConfig.expectations")}</h3>
        <div className="space-y-2 pl-2">
          {expectations.map((expectation, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-exford-blue rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-base text-exford-blue">{expectation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Exemples de questions */}
      <div className="space-y-4 border border-light-blue-gray pt-4 rounded-[8px] px-4 py-2">
        <h3 className="text-xs font-normal text-slate-gray">
          {t("visioSessionsConfig.questionExamples")}
        </h3>
        <div className="space-y-2 pl-2">
          {questionExamples.map((question, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-exford-blue rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-base text-exford-blue">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
