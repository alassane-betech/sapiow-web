"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import Image from "next/image";

export default function CompteConnecte() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const accountId = searchParams.get('account_id');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setMessage('Une erreur est survenue lors de la connexion de votre compte bancaire.');
    } else if (accountId) {
      setStatus('success');
      setMessage('Votre compte bancaire a été connecté avec succès !');
    } else {
      setStatus('error');
      setMessage('Paramètres manquants dans la réponse.');
    }
  }, [searchParams]);

  const handleReturnToAccount = () => {
    router.push('/compte/revenus');
  };

  const handleRetry = () => {
    router.push('/compte/revenus');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Vérification en cours...
              </h1>
              <p className="text-gray-600">
                Nous vérifions la connexion de votre compte bancaire.
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
                Compte bancaire connecté !
              </h1>
              <p className="text-gray-600">
                {message}
              </p>
              <p className="text-sm text-gray-500">
                Vous pouvez maintenant recevoir des paiements directement sur votre compte.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Erreur de connexion
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
