"use client";
import { usePayStore } from "@/store/usePay";
import { useRouter, useSearchParams } from "next/navigation";
import { withAuth } from "@/components/common/withAuth";
import { useEffect } from "react";

function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsPaid } = usePayStore();
  
  useEffect(() => {
    // Marquer comme payé
    setIsPaid(true);
    
    // Récupérer l'URL de retour et rediriger
    const returnUrl = searchParams.get('returnUrl') || '/details';
    
    // Petit délai pour s'assurer que l'état est mis à jour
    setTimeout(() => {
      router.push(returnUrl);
    }, 1000);
  }, [setIsPaid, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Paiement réussi !</h1>
        <p className="text-gray-600 mt-2">Redirection en cours...</p>
      </div>
    </div>
  );
}

export default withAuth(PaymentSuccessPage);
