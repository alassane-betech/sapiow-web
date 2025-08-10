"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

const navItems = [
  {
    label: "Conditions et services",
    href: "/#",
  },
  {
    label: "Politique de confidentialité",
    href: "/#",
  },
  {
    label: "Licences Open Source",
    href: "/#",
  },
];

const TABS = [
  {
    id: 1,
    label: "Conditions et services",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    href: "/#",
  },
  {
    id: 2,
    label: "Politique de confidentialité",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    href: "/#",
  },
  {
    id: 3,
    label: "Licences Open Source",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,",
    href: "/#",
  },
];

export default function MentionsLegales() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTab = TABS[activeIdx];

  const handleTabClick = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <AccountLayout>
      <div className="container grid grid-cols-2 gap-x-6">
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
            <div className="text-ash-gray text-base leading-relaxed font-inter">
              {activeTab.content}
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
