import Image from "next/image";
import Link from "next/link";
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
    label: "Support",
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
  const sidebarClasses = isMobile
    ? "w-full h-full flex flex-col px-4 py-4"
    : "lg:w-[205px] xl:w-[302px] h-screen fixed top-[72px] lg:left-[90px] xl:left-[106px] z-30 flex flex-col px-4 py-4 border-r border-r-light-blue-gray";

  return (
    <aside className={`${sidebarClasses} -mt-[16px]`}>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0">
          <ShareLinkButton className="mb-5" />
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-2 py-0 mt-[3px] h-[56px] rounded-xl hover:bg-[#F7F9FB] transition group font-medium text-base text-exford-blue"
              >
                <Image src={item.icon} alt="" width={22} height={22} />
                <span className="flex-1 text-[12px] xl:text-[15px] font-medium">
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
      {/* Déconnexion sticky en bas */}
      <div
        className={`${
          isMobile ? "mt-auto" : "sticky bottom-0 left-0"
        } pt-4 pb-2 -mx-4 px-4 z-10`}
      >
        <button className="w-full text-center text-[#1E293B] font-bold text-[15px] py-2 rounded-xl hover:bg-[#F7F9FB] transition">
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
