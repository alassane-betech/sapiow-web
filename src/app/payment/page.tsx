"use client";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { usePayStore } from "@/store/usePay";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Bouton de paiement
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsPaid } = usePayStore();

  // Récupérer l'URL de retour depuis les paramètres de recherche
  const returnUrl = searchParams.get("returnUrl") || "/details";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      alert(error.message);
    } else {
      // Si pas d'erreur, marquer comme payé et rediriger
      setIsPaid(true);
      router.push(returnUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 flex flex-col gap-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Payer
      </button>
    </form>
  );
}

// Page principale
export default function PaymentPage() {
  const { payment } = useAppointmentStore();

  if (!payment) {
    return <p>Chargement...</p>;
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
