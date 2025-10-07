"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleCalendarConnect } from "@/api/google-calendar-sync/useGoogleCalendarSync";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("oauthCallback");
  const [error, setError] = useState<string | null>(null);
  const { mutate: connectGoogleCalendar, isPending } =
    useGoogleCalendarConnect();

  useEffect(() => {
    // Éviter les exécutions multiples
    let isProcessing = false;

    const handleOAuthCallback = async () => {
      if (isProcessing) return;
      isProcessing = true;

      try {
        const params = new URLSearchParams(window.location.search);
        const authorizationCode = params.get("code");
        const codeVerifier = localStorage.getItem("code_verifier");

        if (!authorizationCode) {
          console.error("❌ Code d'autorisation manquant.");
          setError(t("missingCode"));
          setTimeout(() => {
            router.replace(`/${locale}/compte/disponibilites`);
          }, 2000);
          return;
        }

        console.log("✅ Code d'autorisation reçu:", authorizationCode.substring(0, 20) + "...");
        console.log("✅ Code verifier récupéré:", codeVerifier ? "Oui" : "Non");

        connectGoogleCalendar(
          { 
            authorizationCode, 
            codeVerifier: codeVerifier || undefined
          },
          {
            onSuccess: (res) => {
              console.log("✅ Connecté avec succès :", res);
              // Nettoyer le code verifier
              localStorage.removeItem("code_verifier");
              // Rediriger immédiatement vers la page des disponibilités
              router.replace(`/${locale}/compte/disponibilites`);
            },
            onError: (err) => {
              console.error("❌ Erreur de connexion :", err);
              setError(err.message || t("connectionError"));
              setTimeout(() => {
                router.replace(`/${locale}/compte/disponibilites`);
              }, 2000);
            },
          }
        );
      } catch (err) {
        console.error("❌ Erreur lors du traitement du callback:", err);
        setError(t("processingError"));
        setTimeout(() => {
          router.replace(`/${locale}/compte/disponibilites`);
        }, 2000);
      }
    };

    handleOAuthCallback();
  }, [connectGoogleCalendar, router, locale, t]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-500 text-xl font-semibold">
              ❌ {t("error")}: {error}
            </div>
            <p className="text-gray-600">{t("redirecting")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
            <p className="text-xl font-semibold text-gray-800">
              {t("connecting")}
            </p>
            <p className="text-gray-600">{t("pleaseWait")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
