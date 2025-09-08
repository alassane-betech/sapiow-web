"use client";

import ClientProfile from "@/components/profile/ClientProfile";
import ExpertProfile from "@/components/profile/ExpertProfile";
import { useUserStore } from "@/store/useUser";
import AccountLayout from "../AccountLayout";

export default function Profile() {
  const { user } = useUserStore();

  // Affichage de chargement pendant la redirection
  return (
    <AccountLayout>
      <div className="flex justify-center items-center py-8">
        {user?.type === "client" ? <ClientProfile /> : <ExpertProfile />}
      </div>
    </AccountLayout>
  );
}
