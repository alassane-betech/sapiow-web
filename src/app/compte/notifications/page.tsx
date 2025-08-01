"use client";

import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

// Interface pour les notifications
interface Notification {
  id: string;
  icon: string;
  label: string;
  checked: boolean;
}

const initialSmsNotifications: Notification[] = [
  {
    id: "sms-calendar",
    icon: "/assets/icons/calendar.svg",
    label: "Notifications de Rendez-vous",
    checked: true,
  },
  {
    id: "sms-chat",
    icon: "/assets/icons/chatunread.svg",
    label: "Notifications de Messagerie",
    checked: true,
  },
  {
    id: "sms-sale",
    icon: "/assets/icons/sale.svg",
    label: "Promotions & Offres spéciales",
    checked: false,
  },
  {
    id: "sms-app",
    icon: "/assets/icons/smartphone.svg",
    label: "Mises à jour de l'application",
    checked: false,
  },
];

const initialEmailNotifications: Notification[] = [
  {
    id: "email-calendar",
    icon: "/assets/icons/calendar.svg",
    label: "Notifications de Rendez-vous",
    checked: true,
  },
  {
    id: "email-chat",
    icon: "/assets/icons/chatunread.svg",
    label: "Notifications de Messagerie",
    checked: false,
  },
  {
    id: "email-sale",
    icon: "/assets/icons/sale.svg",
    label: "Promotions & Offres spéciales",
    checked: true,
  },
  {
    id: "email-app",
    icon: "/assets/icons/smartphone.svg",
    label: "Mises à jour de l'application",
    checked: true,
  },
];

export default function Notifications() {
  const [smsNotifications, setSmsNotifications] = useState<Notification[]>(
    initialSmsNotifications
  );
  const [emailNotifications, setEmailNotifications] = useState<Notification[]>(
    initialEmailNotifications
  );

  // Fonction pour mettre à jour l'état d'une notification SMS
  const handleSmsNotificationChange = (id: string, checked: boolean) => {
    setSmsNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, checked } : notif))
    );
  };

  // Fonction pour mettre à jour l'état d'une notification Email
  const handleEmailNotificationChange = (id: string, checked: boolean) => {
    setEmailNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, checked } : notif))
    );
  };

  return (
    <AccountLayout>
      <div className="w-full py-0">
        <div>
          <h2 className="text-xs font-bold text-gray-700 uppercase mb-2 font-figtree">
            Notifications par SMS
          </h2>
          <div>
            {smsNotifications.map((notif, idx) => (
              <div
                key={notif.id}
                className={`flex items-center py-4 ${
                  idx === smsNotifications.length - 1
                    ? "border-b-0"
                    : "border-b border-light-blue-gray"
                }`}
              >
                <Image
                  src={notif.icon}
                  alt={notif.label}
                  width={24}
                  height={24}
                  className="mr-4"
                />
                <span className="flex-1 text-gray-800 font-figtree text-base">
                  {notif.label}
                </span>
                <Switch
                  checked={notif.checked}
                  onCheckedChange={(checked) =>
                    handleSmsNotificationChange(notif.id, checked)
                  }
                  className="data-[state=checked]:bg-[#1E293B]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-bold text-gray-700 uppercase mb-2 font-figtree">
            Notifications par Email
          </h2>
          <div>
            {emailNotifications.map((notif, idx) => (
              <div
                key={notif.id}
                className={`flex items-center py-4 ${
                  idx === emailNotifications.length - 1
                    ? "border-b-0"
                    : "border-b border-light-blue-gray"
                }`}
              >
                <Image
                  src={notif.icon}
                  alt={notif.label}
                  width={24}
                  height={24}
                  className="mr-4"
                />
                <span className="flex-1 text-gray-800 font-figtree text-base">
                  {notif.label}
                </span>
                <Switch
                  checked={notif.checked}
                  onCheckedChange={(checked) =>
                    handleEmailNotificationChange(notif.id, checked)
                  }
                  className="data-[state=checked]:bg-[#1E293B]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
