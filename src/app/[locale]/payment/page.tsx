"use client";
import { withAuth } from "@/components/common/withAuth";
import { useI18n } from "@/locales/client";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

// Bouton de paiement
function CheckoutForm() {
  const t = useI18n();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  // Récupérer l'URL de retour depuis les paramètres de recherche
  const returnUrl = searchParams.get("returnUrl") || "/details";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    // Confirmation du paiement
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
    // Note: Si le paiement réussit, Stripe redirige automatiquement vers return_url
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] mx-auto p-4 flex flex-col gap-4 cursor-pointer"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white p-2 rounded cursor-pointer"
      >
        {stripe && !loading ? t("paymentPage.pay") : t("paymentPage.loading")}
      </button>
    </form>
  );
}

// Page principale
function PaymentPage() {
  const t = useI18n();
  const { payment } = useAppointmentStore();

  if (!payment) {
    return <p>{t("paymentPage.loading")}</p>;
  }

  const stripePromise = loadStripe(payment.publishableKey);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: payment.paymentIntent, // <-- très important
        appearance: { theme: "stripe" },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default withAuth(PaymentPage);
