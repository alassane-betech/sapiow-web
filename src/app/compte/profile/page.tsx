"use client";

import { AuthGuard } from "@/components/common/AuthGuard";
import { useUserStore } from "@/store/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AccountLayout from "../AccountLayout";

export default function Profile() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.type === "client") {
      router.replace("/compte/profile/client");
    } else if (user?.type === "expert") {
      router.replace("/compte/profile/expert");
    }
  }, [user?.type, router]);

  // Affichage de chargement pendant la redirection
  return (
    <AuthGuard>
      <AccountLayout>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600">Chargement du profil...</div>
        </div>
      </AccountLayout>
    </AuthGuard>
  );
}
