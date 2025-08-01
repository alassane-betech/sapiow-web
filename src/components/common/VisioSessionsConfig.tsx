"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SessionDuration {
  id: string;
  duration: string;
  price: number;
  enabled: boolean;
}

interface VisioSessionsConfigProps {
  className?: string;
}

export default function VisioSessionsConfig({
  className,
}: VisioSessionsConfigProps) {
  const [sessions, setSessions] = useState<SessionDuration[]>([
    { id: "15min", duration: "15 minutes", price: 85, enabled: true },
    { id: "30min", duration: "30 minutes", price: 85, enabled: true },
    { id: "45min", duration: "45 minutes", price: 0, enabled: false },
    { id: "60min", duration: "60 minutes", price: 0, enabled: false },
  ]);

  const handlePriceChange = (id: string, newPrice: number) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, price: newPrice } : session
      )
    );
  };

  const handleToggle = (id: string, enabled: boolean) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, enabled } : session
      )
    );
  };

  const expectations = [
    "Posez trois questions ou plus",
    "Conseils pour démarrer une entreprise prospère",
    "Conseils pour obtenir vos 10 000 premiers clients",
    "Astuces de croissance et démarrage de la croissance",
  ];

  const questionExamples = [
    "Je pense à créer une entreprise. Quelles sont les prochaines choses auxquelles je devrais me concentrer ?",
    "Comment savoir si mon idée d'entreprise va fonctionner ?",
    "Comment aborder votre le croissance de ma startup ?",
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Configuration des sessions */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-white rounded-[12px] border border-light-blue-gray"
          >
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-slate-900 min-w-[100px]">
                {session.duration}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Prix</span>
                <input
                  type="number"
                  value={session.price}
                  onChange={(e) =>
                    handlePriceChange(session.id, parseInt(e.target.value) || 0)
                  }
                  disabled={!session.enabled}
                  className={`w-16 px-2 py-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    session.enabled
                      ? "border-gray-300 bg-white text-gray-900"
                      : "border-gray-200 bg-gray-50 text-gray-400"
                  }`}
                />
                <span className="text-gray-500">€</span>
              </div>
            </div>

            <Switch
              checked={session.enabled}
              onCheckedChange={(checked) => handleToggle(session.id, checked)}
              className="data-[state=checked]:bg-gray-900"
            />
          </div>
        ))}
      </div>

      {/* Section Attentes */}
      <div className="space-y-4 border border-light-blue-gray pt-4 rounded-[8px] px-4 py-2">
        <h3 className="text-xs font-normal text-slate-gray">Attentes</h3>
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
          Exemples de questions
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
