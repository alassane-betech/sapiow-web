"use client";
import { AuthGuard } from "@/components/common/AuthGuard";
import { AccountSidebar } from "@/components/layout/AccountSidebar";
import { AppSidebar } from "@/components/layout/Sidebare";
import { useUserStore } from "@/store/useUser";
import Image from "next/image";
import { useState } from "react";

export default function AccountLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNotificationClick = () => {
    console.log("Notifications cliquées");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { user } = useUserStore();

  return (
    <AuthGuard>
      <div className={`flex ${className}`}>
        <AppSidebar />

        {/* Layout principal */}
        <div className="w-full flex-1">
          {/* Header desktop */}
          <div className="hidden lg:flex justify-between items-center w-full bg-white px-6 border-b border-light-blue-gray h-[72px] sticky top-0 z-20">
            <h1 className="text-lg font-bold text-cobalt-blue-500">Compte</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleNotificationClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Image
                  src="/assets/icons/notif.svg"
                  alt="notifications"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Header mobile */}
          <div className="lg:hidden flex justify-between items-center w-full bg-white px-4 py-3 border-b border-light-blue-gray sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-bold text-cobalt-blue-500">Compte</h1>
            </div>
            <button
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Image
                src="/assets/icons/notif.svg"
                alt="notifications"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Contenu principal */}
          <div className="flex">
            {/* Sidebar desktop */}
            <div className="hidden lg:block">
              <AccountSidebar userType={user.type} />
            </div>

            {/* Menu mobile overlay */}
            {isMobileMenuOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleMobileMenu}
              >
                <div
                  className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 border-b border-light-blue-gray">
                    <h2 className="text-lg font-bold text-cobalt-blue-500">
                      Menu
                    </h2>
                    <button
                      onClick={toggleMobileMenu}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <AccountSidebar isMobile={true} />
                  </div>
                </div>
              </div>
            )}

            {/* Zone de contenu */}
            <div className="container mx-auto lg:px-0 pb-20">{children}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
