"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "./Button";

function base64urlEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateRandomString(length = 64) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

async function generatePKCECodes() {
  const codeVerifier = generateRandomString();
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = base64urlEncode(digest);
  return { codeVerifier, codeChallenge };
}

interface GoogleCalendarConnectButtonProps {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function GoogleCalendarConnectButton({
  isLoading = false,
  className = "",
  children,
}: GoogleCalendarConnectButtonProps) {
  const t = useTranslations("googleCalendarConnect");

  const handleConnect = async () => {
    try {
      const { codeVerifier, codeChallenge } = await generatePKCECodes();
      localStorage.setItem("code_verifier", codeVerifier);

      const clientId =
        "443622405675-sdjuhup5hrr2q0lm69i7285obsc0s1ri.apps.googleusercontent.com";
      // Le backend utilise req.headers.get('origin'), donc on envoie juste l'origin
      const redirectUri = window.location.origin;
      const scope =
        "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email";

      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        new URLSearchParams({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: "code",
          scope,
          code_challenge: codeChallenge,
          code_challenge_method: "S256",
          access_type: "offline",
          prompt: "consent",
        }).toString();

      console.log("🔗 Redirect URI envoyé à Google:", redirectUri);
      window.location.href = authUrl;
    } catch (error) {
      console.error("❌ Erreur lors de la génération PKCE:", error);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className={className}
      variant="outline"
      label={
        isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("connecting")}
          </>
        ) : (
          children || t("connectButton")
        )
      }
    />
  );
}
