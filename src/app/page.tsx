"use client";
import { AuthGuard } from "@/components/common/AuthGuard";
import { Header } from "@/components/layout/header/Header";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useUserStore } from "@/store/useUser";
import Client from "./home/Client";
import Expert from "./home/Expert";

export default function Home() {
  const { user } = useUserStore();
  return (
    <AuthGuard>
      <div className="flex">
        <AppSidebar />
        <div className="w-full">
          {user.type === "client" ? <HeaderClient /> : <Header />}
          <div className="w-full flex-1 container px-5">
            {user.type === "client" ? <Client /> : <Expert />}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
