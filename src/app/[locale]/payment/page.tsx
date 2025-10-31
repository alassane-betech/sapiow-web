"use client";
import { useGetProExpertById } from "@/api/proExpert/useProExpert";
import { withAuth } from "@/components/common/withAuth";
import { useRouter } from "@/i18n/navigation";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

// Composant récapitulatif de commande
function OrderSummary() {
  const t = useTranslations();
  const { appointment } = useAppointmentStore();
  const router = useRouter();

  // Récupérer les données de l'expert
  const { data: expertData } = useGetProExpertById(appointment?.pro_id || "");

  // Trouver la session correspondante dans les sessions de l'expert
  const sessionData = useMemo(() => {
    if (!expertData?.sessions || !appointment?.session_id) return null;
    return expertData.sessions.find(
      (session: any) => session.id === appointment.session_id
    );
  }, [expertData, appointment]);

  const sessionPrice = sessionData?.price || 0;
  const tax = 0; // Pas de taxe pour le moment

  return (
    <div className="w-full lg:w-1/2 bg-gray-50 p-6 lg:p-8">
      {/* Bouton retour */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={20} />
        <span className="text-sm font-medium">Retour</span>
      </button>

      {/* Titre */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {t("paymentPage.orderSummary")}
      </h2>

      {/* Détails de la session */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {sessionData?.name || t("paymentPage.sessionWith")}{" "}
              {expertData?.first_name} {expertData?.last_name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t("paymentPage.quantity")} 1
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            €{sessionPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Totaux */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t("paymentPage.subtotal")}</span>
          <span className="text-gray-900 font-medium">
            €{sessionPrice.toLocaleString()}
          </span>
        </div>

        <div className="h-px bg-gray-200"></div>
        <div className="flex justify-between">
          <span className="text-base font-bold text-gray-900">
            {t("paymentPage.totalAmount")}
          </span>
          <span className="text-base font-bold text-gray-900">
            €{(sessionPrice + tax).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// Formulaire de paiement
function CheckoutForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl") || "/details";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          window.location.origin
        }/payment/success?returnUrl=${encodeURIComponent(returnUrl)}`,
      },
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      alert(`${t("paymentPage.paymentError")}: ${error.message}`);
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Link */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="font-semibold text-lg">link</span>
        </div>

        {/* Stripe Payment Element */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
            onChange={(e) => {
              setIsComplete(e.complete);
            }}
          />
        </div>

        {/* Bouton de paiement */}
        <button
          type="submit"
          disabled={!stripe || loading || !isComplete}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? t("paymentPage.loading") : t("paymentPage.pay")}
        </button>
      </form>
    </div>
  );
}

// Page principale
function PaymentPage() {
  const t = useTranslations();
  const { payment, appointment } = useAppointmentStore();

  if (!payment || !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t("paymentPage.loading")}</p>
      </div>
    );
  }

  const stripePromise = loadStripe(payment.publishableKey);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Récapitulatif de commande - Gauche */}
      <OrderSummary />

      {/* Formulaire de paiement - Droite */}
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: payment.paymentIntent,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#10b981",
            },
          },
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default withAuth(PaymentPage);
