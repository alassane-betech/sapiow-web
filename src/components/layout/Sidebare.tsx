"use client";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";

// Menu items avec les icônes du dossier iconSidebar
const getItems = (t: any) => [
  {
    title: t("nav.home"),
    url: "/",
    icon: "/assets/iconSidebare/home.svg",
    iconActive: "/assets/iconSidebare/homeActif.svg",
  },
  {
    title: t("nav.visios"),
    url: "/visios",
    icon: "/assets/iconSidebare/record.svg",
    iconActive: "/assets/iconSidebare/recordActif.svg",
  },
  {
    title: t("nav.messages"),
    url: "/messages",
    icon: "/assets/iconSidebare/chat.svg",
    iconActive: "/assets/iconSidebare/chatActif.svg",
  },
  {
    title: t("nav.account"),
    url: "/compte/profile",
    icon: "/assets/iconSidebare/user.svg",
    iconActive: "/assets/iconSidebare/userActif.svg",
  },
];
const logo = "/assets/iconSidebare/logo.svg";

export function AppSidebar({
  className = "",
  hideMobileNav = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hideMobileNav?: boolean }) {
  const t = useI18n();
  const pathname = usePathname();
  const items = getItems(t);

  return (
    <>
      {/* Sidebar verticale (desktop) */}
      <div
        className={`h-screen bg-snow-blue border-r border-soft-ice-gray flex-col sticky left-0 top-0 z-10 hidden lg:flex ${className}`}
        {...props}
      >
        {/* Header avec logo */}
        <div className="flex-shrink-0 mx-auto mt-[20px] mb-[60px]">
          <Image src={logo} alt="logo" width={48} height={44} />
        </div>
        {/* Menu items */}
        <div className="flex-1 px-[20px]">
          <nav className="space-y-8">
            {items.map((item) => {
              // Extraire le chemin sans la locale (fr/en) pour la comparaison
              const pathWithoutLocale =
                pathname.replace(/^\/(fr|en)/, "") || "/";
              const isActive =
                item.title === t("nav.account")
                  ? pathWithoutLocale.startsWith("/compte")
                  : pathWithoutLocale === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`p-2 transition-colors rounded-full ${
                      isActive ? "bg-light-blue-gray" : ""
                    }`}
                  >
                    <Image
                      src={isActive ? item.iconActive : item.icon}
                      alt={item.title}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <span
                    className={`text-xs font-medium font-figtree ${
                      isActive ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Barre de navigation mobile (en bas) */}
      {!hideMobileNav && (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-soft-ice-gray flex justify-around items-center z-20 py-2">
          {items.map((item) => {
            // Extraire le chemin sans la locale (fr/en) pour la comparaison
            const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
            const isActive =
              item.title === t("nav.account")
                ? pathWithoutLocale.startsWith("/compte")
                : pathWithoutLocale === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <Image
                  src={isActive ? item.iconActive : item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                  className="mx-auto"
                />
                <span
                  className={`text-[13px] font-medium ${
                    isActive ? "text-slate-900" : "text-slate-400"
                  } ${isActive ? "font-bold" : ""}`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
