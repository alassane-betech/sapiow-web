"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { withAuth } from "@/components/common/withAuth";
import { useCurrentLocale } from "@/locales/client";

function Reauth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useCurrentLocale();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const accountId = searchParams.get('account_id');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      setStatus('error');
      setMessage(errorDescription || 'Une erreur est survenue lors de la ré-authentification.');
    } else if (accountId) {
      setStatus('success');
      setMessage('Votre compte a été mis à jour avec succès !');
    } else {
      setStatus('error');
      setMessage('Paramètres manquants dans la réponse de ré-authentification.');
    }
  }, [searchParams]);

  const handleReturnToAccount = () => {
    router.push(`/${locale}/compte/revenus`);
  };

  const handleRetry = () => {
    router.push(`/${locale}/compte/revenus`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Traitement en cours...
              </h1>
              <p className="text-gray-600">
                Nous mettons à jour les informations de votre compte bancaire.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Mise à jour réussie !
              </h1>
              <p className="text-gray-600">
                {message}
              </p>
              <p className="text-sm text-gray-500">
                Les informations de votre compte bancaire ont été mises à jour.
              </p>
              <Button
                label="Retour à mon compte"
                onClick={handleReturnToAccount}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3"
              />
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Erreur de mise à jour
              </h1>
              <p className="text-gray-600">
                {message}
              </p>
              <p className="text-sm text-gray-500">
                Veuillez réessayer ou contacter le support si le problème persiste.
              </p>
              <div className="space-y-3">
                <Button
                  label="Réessayer"
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3"
                />
                <Button
                  label="Retour à mon compte"
                  onClick={handleReturnToAccount}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(Reauth);
