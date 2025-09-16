"use client";
import { withAuth } from "@/components/common/withAuth";
import { Header } from "@/components/layout/header/Header";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useUserStore } from "@/store/useUser";
import { useEffect, useState } from "react";
import Client from "./home/Client";
import Expert from "./home/Expert";

function Home() {
  const { user } = useUserStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentUserType, setCurrentUserType] = useState(user.type);

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

  return (
    <div className="flex font-figtree">
      <AppSidebar />
      <div className="w-full">
        <div className="transition-all duration-300 ease-in-out">
          {currentUserType === "client" ? <HeaderClient /> : <Header />}
        </div>
        <div className="w-full flex-1 container px-5 relative overflow-hidden">
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
