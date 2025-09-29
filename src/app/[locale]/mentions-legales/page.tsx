"use client";

import { useI18n } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Fonction pour générer les éléments de navigation avec traductions
const getNavItems = (t: any) => [
  {
    label: t("legalMentions.termsOfService"),
    href: "/#",
  },
  {
    label: t("legalMentions.privacyPolicy"),
    href: "/#",
  },
  {
    label: t("legalMentions.openSourceLicenses"),
    href: "/#",
  },
];

// Fonction pour générer les onglets avec traductions
const getTabs = (t: any) => [
  {
    id: 1,
    label: t("legalMentions.termsOfService"),
    content: t("legalMentions.termsContent"),
    href: "/#",
  },
  {
    id: 2,
    label: t("legalMentions.privacyPolicy"),
    content: t("legalMentions.privacyContent"),
    href: "/#",
  },
  {
    id: 3,
    label: t("legalMentions.openSourceLicenses"),
    content: t("legalMentions.licensesContent"),
    href: "/#",
  },
];

export default function MentionsLegales() {
  const t = useI18n();
  const [activeIdx, setActiveIdx] = useState(0);

  const navItems = getNavItems(t);
  const TABS = getTabs(t);
  const activeTab = TABS[activeIdx];

  const handleTabClick = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <div>
      <div className="container px-6 grid grid-cols-2 gap-x-6 test">
        <nav className="flex-1 overflow-y-auto mt-5">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className={`h-[56px] ${
                  index === 0 || index === 1
                    ? "border-b border-soft-ice-gray "
                    : ""
                }`}
              >
                <button
                  onClick={() => handleTabClick(index)}
                  className={`w-full flex justify-between gap-3 px-2 py-3 rounded-xl hover:bg-[#F7F9FB] cursor-pointer transition group ${
                    activeIdx === index ? "bg-snow-blue" : ""
                  }`}
                >
                  <span className="text-[15px] text-[#1E293B] font-medium">
                    {item.label}
                  </span>
                  <span>
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
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-1 mt-5">
          <div className="bg-white rounded-2xl p-8 border border-light-blue-gray max-w-2xl mx-auto relative">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold">{activeTab.label}</h2>
              <Link
                href={activeTab.href}
                className="bg-white p-2 rounded-[8px] border border-light-blue-gray"
              >
                <Image
                  src="/assets/icons/scale.svg"
                  alt="external-link"
                  width={22}
                  height={22}
                />
              </Link>
            </div>
            <div className="text-ash-gray text-base leading-relaxed">
              {activeTab.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
