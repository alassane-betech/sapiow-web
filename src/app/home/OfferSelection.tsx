"use client";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/ui/card";
import { usePayStore } from "@/store/usePay";
import { usePlaningStore } from "@/store/usePlaning";
import Image from "next/image";
import { useState } from "react";

interface OfferSelectionProps {
  price: string;
}

export default function OfferSelection({ price }: OfferSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<
    "session" | "subscription"
  >("session");

  const { setIsPaid } = usePayStore();
  const { setIsPlaning } = usePlaningStore();

  return (
    <div className="w-full">
      {/* Sessions uniques */}
      <div className="h-[70px] flex flex-col justify-center border-b border-gray-200">
        <h2 className="text-xl font-bold px-6">Choisissez une offre</h2>
      </div>

      <div className=" p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-1.5 font-figtree">
            Sessions uniques
          </h2>

          <Card
            className={`relative transition-all cursor-pointer p-0 m-0 ${
              selectedOption === "session"
                ? "ring-2 ring-pale-blue-gray border border-pale-blue-gray bg-snow-blue"
                : "ring-2 ring-frost-gray border border-frost-gray"
            }`}
            onClick={() => setSelectedOption("session")}
          >
            <CardContent className="p-3.5 m-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 font-figtree">
                    Session rapide visio
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-figtree">
                    Parfait pour des questions spécifiques
                  </p>
                  <p className="text-sm text-gray-700 mb-6 font-figtree">
                    À partir de <span className="font-semibold">{price}</span>
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setSelectedOption("session")}
                    className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    {selectedOption === "session" && (
                      <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    )}
                  </button>
                </div>
              </div>

              {selectedOption === "session" && (
                <Button
                  label="Voir les créneaux"
                  className="w-full h-[56px] rounded-[8px] bg-cobalt-blue hover:bg-cobalt-blue/80 text-white"
                  onClick={() => setIsPlaning(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Abonnement mensuel */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-1.5 font-figtree">
            Abonnement mensuel
          </h2>

          <Card
            className={`relative transition-all cursor-pointer p-0 ${
              selectedOption === "subscription"
                ? "ring-2 ring-pale-blue-gray border border-pale-blue-gray bg-snow-blue"
                : "ring-2 ring-frost-gray border border-frost-gray"
            }`}
            onClick={() => setSelectedOption("subscription")}
          >
            <CardContent className="p-3.5 m-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 font-figtree">
                    Construire et développer une entreprise prospère -
                    Conseiller fondateur 1:1
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-[#6B7280] mb-2 font-figtree">
                      Ce qui est inclus
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Chat 1:1 (Illimité)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Appels vidéo 1:1 (90 min/mois)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Vous aider à transformer votre idée de SaaS B2B en
                          100M € de chiffre d'affaires annuel
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Sessions de stratégie hebdomadaires (2 heures/mois)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Accès à des informations et rapports exclusifs de
                          l'industrie
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Image
                          src="/assets/icons/check-circle.svg"
                          alt="check-circle"
                          width={16}
                          height={16}
                        />
                        <span className="text-sm text-slate-800 font-figtree">
                          Intégration et support personnalisés
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xl font-bold text-exford-blue font-figtree">
                    1300 €{" "}
                    <span className="text-sm font-normal text-slate-800 font-figtree">
                      / Mois
                    </span>
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setSelectedOption("subscription")}
                    className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    {selectedOption === "subscription" && (
                      <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                    )}
                  </button>
                </div>
              </div>
              {selectedOption === "subscription" && (
                <Button
                  label="Choisir et payer"
                  className="w-full h-[56px] rounded-[8px] bg-cobalt-blue hover:bg-cobalt-blue/80 text-white"
                  onClick={() => setIsPaid(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
