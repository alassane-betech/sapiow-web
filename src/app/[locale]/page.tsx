"use client";
import { withAuth } from "@/components/common/withAuth";
import { Header } from "@/components/layout/header/Header";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useUserStore } from "@/store/useUser";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Client from "./home/Client";
import Expert from "./home/Expert";

function Home() {
  const { user } = useUserStore();
  const router = useRouter();
  const locale = useLocale();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentUserType, setCurrentUserType] = useState(user.type);
  const [isRedirectingOAuth, setIsRedirectingOAuth] = useState(false);

  // Gérer le retour OAuth de Google Calendar (doit être le premier useEffect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("code");
    const scope = params.get("scope");

    // Si on a un code d'autorisation ET un scope Google Calendar, rediriger immédiatement
    if (authCode && scope?.includes("googleapis.com/auth/calendar")) {
      console.log(
        "🔄 Code OAuth Google Calendar détecté, redirection immédiate..."
      );
      setIsRedirectingOAuth(true);
      // Redirection immédiate sans délai
      router.replace(`/${locale}/oauth-callback${window.location.search}`);
      return;
    }
  }, [router, locale]);

  useEffect(() => {
    if (user.type !== currentUserType) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentUserType(user.type);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [user.type, currentUserType]);

  // Afficher un loader pendant la redirection OAuth
  if (isRedirectingOAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen bg-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <div className="transition-all duration-300 ease-in-out sticky top-0 z-20">
          {currentUserType === "client" ? (
            <HeaderClient />
          ) : (
            <Header isBorder={true} />
          )}
        </div>
        <div className="flex-1 px-5 relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-in-out transform ${
              isTransitioning
                ? "opacity-0 translate-y-2 scale-[0.98]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {currentUserType === "client" ? <Client /> : <Expert />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
