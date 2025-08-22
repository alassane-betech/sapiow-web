"use client";
import { useCreatePatientAppointment } from "@/api/appointments/useAppointments";
import { Button } from "@/components/common/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { usePayStore } from "@/store/usePay";
import { usePlaningStore } from "@/store/usePlaning";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OfferSelectionProps {
  price: string;
  expertData?: any; // Données de l'expert avec ses sessions
}

export default function OfferSelection({
  price,
  expertData,
}: OfferSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<
    "session" | "subscription"
  >("session");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const { setIsPaid } = usePayStore();
  const { setIsPlaning } = usePlaningStore();
  const { setAppointmentData } = useAppointmentStore();
  const router = useRouter();
  const createAppointmentMutation = useCreatePatientAppointment();

  // Récupérer la session d'abonnement (session_type null et session_nature "subscription")
  const subscriptionSession = expertData?.sessions?.find(
    (session: any) =>
      session.session_type === null && session.session_nature === "subscription"
  );

  // Fonction pour gérer le paiement de l'abonnement
  const handleSubscriptionPayment = async () => {
    if (!subscriptionSession || !expertData?.id) {
      console.error("Données manquantes pour créer l'appointment");
      return;
    }

    setIsPaymentLoading(true);

    try {
      // Créer la date d'aujourd'hui pour l'abonnement
      const today = new Date();

      const appointmentData = {
        pro_id: expertData.id, // ID de l'expert
        session_id: subscriptionSession.id, // ID de la session d'abonnement
        appointment_at: today.toISOString(), // Date d'aujourd'hui ISO
      };

      console.log("Création de l'appointment pour l'abonnement:", appointmentData);

      const result = await createAppointmentMutation.mutateAsync(
        appointmentData,
        {
          onSuccess: (data: any) => {
            console.log("Appointment créé avec succès:", data);
            if (data?.appointment && data?.payment) {
              setAppointmentData(data.appointment, data.payment);
              // Construire l'URL de retour avec l'ID de l'expert
              const returnUrl = `/details?id=${data.appointment.pro_id}`;
              router.push(`/payment?returnUrl=${encodeURIComponent(returnUrl)}`);
            }
          },
          onError: (error) => {
            console.error(
              "Erreur lors de la création de l'appointment:",
              error
            );
            setIsPaymentLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la création de l'appointment:", error);
      setIsPaymentLoading(false);
    }
  };

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

        {/* Abonnement mensuel - Affiché seulement si une session d'abonnement existe */}
        {subscriptionSession && (
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
                      {subscriptionSession.name}
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-[#6B7280] mb-2 font-figtree">
                        Ce qui est inclus
                      </h4>
                      <div className="space-y-2">
                        {subscriptionSession.one_on_one && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Chat 1:1
                            </span>
                          </div>
                        )}
                        {subscriptionSession.video_call && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Appels vidéo 1:1
                            </span>
                          </div>
                        )}
                        {subscriptionSession.mentorship && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Accompagnement personnalisé
                            </span>
                          </div>
                        )}
                        {subscriptionSession.strategic_session && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Sessions de stratégie
                            </span>
                          </div>
                        )}
                        {subscriptionSession.exclusive_ressources && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Ressources exclusives
                            </span>
                          </div>
                        )}
                        {subscriptionSession.support && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Support
                            </span>
                          </div>
                        )}
                        {subscriptionSession.webinar && (
                          <div className="flex items-start gap-2">
                            <Image
                              src="/assets/icons/check-circle.svg"
                              alt="check-circle"
                              width={16}
                              height={16}
                            />
                            <span className="text-sm text-slate-800 font-figtree">
                              Webinaires
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xl font-bold text-exford-blue font-figtree">
                      {subscriptionSession.price} €{" "}
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
                    label={
                      isPaymentLoading ? (
                        <div className="flex items-center gap-2">
                          <LoadingSpinner size="sm" />
                          Création de l'appointment...
                        </div>
                      ) : (
                        "Choisir et payer"
                      )
                    }
                    className="w-full h-[56px] rounded-[8px] bg-cobalt-blue hover:bg-cobalt-blue/80 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubscriptionPayment}
                    disabled={isPaymentLoading}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
