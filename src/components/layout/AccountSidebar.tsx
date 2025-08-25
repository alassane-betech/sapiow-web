import { useExpertModeSwitch } from "@/hooks/useExpertModeSwitch";
import { supabase } from "@/lib/supabase/client";
import { useUserStore } from "@/store/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../common/Button";
import { ShareLinkButton } from "../common/ShareLinkButton";

const navItems = [
  {
    label: "Mon profil",
    icon: "/assets/icons/profile.svg",
    href: "/compte/profile",
  },
  {
    label: "Mes disponibilités",
    icon: "/assets/icons/calendar.svg",
    href: "/compte/disponibilites",
  },
  {
    label: "Historique des paiements",
    icon: "/assets/icons/card.svg",
    href: "/compte/historique-paiements",
  },
  {
    label: "Mes offres",
    icon: "/assets/icons/tag.svg",
    href: "/compte/offres",
  },
  {
    label: "Revenus",
    icon: "/assets/icons/wallet.svg",
    href: "/compte/revenus",
  },
  {
    label: "Notifications",
    icon: "/assets/icons/notif.svg",
    href: "/compte/notifications",
  },
  {
    label: "Langue",
    icon: "/assets/icons/lang.svg",
    href: "/compte/langue",
  },
  {
    label: "Besoin d'aide ?",
    icon: "/assets/icons/help.svg",
    href: "/compte/support",
  },
  {
    label: "Mentions légales",
    icon: "/assets/icons/shield.svg",
    href: "/compte/mentions-legales",
  },
  {
    label: "A propos",
    icon: "/assets/icons/info.svg",
    href: "/compte/a-propos",
  },
];

interface AccountSidebarProps {
  isMobile?: boolean;
}

export function AccountSidebar({ isMobile = false }: AccountSidebarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useUserStore();
  const { handleExpertModeSwitch, hasExpertProfile } = useExpertModeSwitch();

  const sidebarClasses = isMobile
    ? "w-full h-full flex flex-col px-4 py-4"
    : " w-[302px] h-[calc(100vh-72px)] sticky top-[72px] z-30 flex flex-col px-4 py-4 border-r border-r-light-blue-gray";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Déconnexion via Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
        return;
      }

      // Nettoyer le localStorage si nécessaire
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("selectedCountry");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");

      // Rediriger vers la page de connexion
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Filtrer les éléments de navigation selon le type d'utilisateur
  const getFilteredNavItems = () => {
    if (user.type === "client") {
      // Client : Mon profil, Historique des paiements, Notifications, Langue, Besoin d'aide ?, Mentions légales, A propos
      return navItems.filter((item) =>
        [
          "Mon profil",
          "Historique des paiements",
          "Notifications",
          "Langue",
          "Besoin d'aide ?",
          "Mentions légales",
          "A propos",
        ].includes(item.label)
      );
    } else {
      // Expert : Tous sauf Historique des paiements
      return navItems.filter(
        (item) => item.label !== "Historique des paiements"
      );
    }
  };

  const filteredNavItems = getFilteredNavItems();

  return (
    <aside className={`${sidebarClasses}`}>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto z-50 -mt-4">
        <ul className="space-y-0">
          <ShareLinkButton className="mb-5" />
          {filteredNavItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-2 py-0 mt-[3px] h-[56px] rounded-xl hover:bg-[#F7F9FB] transition group font-medium text-base text-exford-blue"
              >
                <Image src={item.icon} alt="" width={22} height={22} />
                <span className="flex-1 text-[12px] lg:text-[15px] font-medium">
                  {item.label}
                </span>
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#1E293B] opacity-60 group-hover:opacity-100"
                >
                  <path
                    d="M7 13l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!hasExpertProfile && (
        <div className="flex flex-col w-full max-w-[302px] h-[172px] bg-[#E8F2FF] rounded-[12px] p-4">
          <h2 className="text-base font-bold text-exford-blue font-figtree">
            Devenez expert
          </h2>
          <p className="text-sm text-exford-blue font-figtree font-normal">
            Devenez expert et accédez à notre plateforme pour offrir des
            consultations vidéo à votre audience.
          </p>
          <div className="flex mt-5">
            <Link
              href="/compte/devenir-expert"
              className="w-full text-sm text-charcoal-blue font-semibold font-figtree py-2 rounded-xl hover:bg-[#F7F9FB] transition"
            >
              En savoir plus
            </Link>
            <Button
              label="Devenir expert"
              className="h-10 font-bold text-base font-figtree w-full max-w-[130px]"
              onClick={handleExpertModeSwitch}
            />
          </div>
        </div>
      )}
      {/* Déconnexion sticky en bas */}
      <div
        className={`${
          isMobile ? "mt-auto" : "sticky bottom-0 left-0"
        } pt-4 pb-2 -mx-4 px-4 z-10`}
      >
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full text-center text-[#1E293B] font-bold text-[15px] py-2 rounded-xl hover:bg-[#F7F9FB] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
        </button>
      </div>
    </aside>
  );
}
