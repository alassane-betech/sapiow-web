import {
  useMarkNotificationAsRead,
  useProNotifications,
} from "@/api/notifications/useNotification";
import { SearchBar } from "@/components/common/SearchBar";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
  title: string;
  onNotificationClick?: () => void;
  searchPlaceholder?: string;
  className?: string;
  showSearch?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onNotificationClick,
  searchPlaceholder = "Rechercher",
  className = "",
  showSearch = true,
}) => {
  const { data: notifications } = useProNotifications();
  const { mutateAsync: markNotificationAsRead } = useMarkNotificationAsRead();

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Compter les notifications non lues
  const unreadCount =
    notifications?.filter((n) => n.read_at === null).length || 0;

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    onNotificationClick?.();
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error(
        "Erreur lors du marquage de la notification comme lue:",
        error
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications =
        notifications?.filter((n) => n.read_at === null) || [];
      await Promise.all(
        unreadNotifications.map((notification) =>
          markNotificationAsRead(notification.id)
        )
      );
    } catch (error) {
      console.error(
        "Erreur lors du marquage de toutes les notifications comme lues:",
        error
      );
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    if (diffInMinutes < 1440)
      return `Il y a ${Math.floor(diffInMinutes / 60)}h`;

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div
      className={`flex justify-between items-center w-full bg-white px-4 sm:px-6 border-b-2 border-snow-blue py-3 sm:py-[23px] sticky top-0 z-20 ${className}`}
    >
      <h1 className="text-base sm:text-lg font-bold text-cobalt-blue-500 whitespace-nowrap">
        {title}
      </h1>
      <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
        {showSearch && (
          <div className="w-40 sm:w-64 md:w-80">
            <SearchBar onSearch={() => {}} placeholder={searchPlaceholder} />
          </div>
        )}

        {/* Bouton notifications avec dropdown */}
        <div className="relative" ref={notificationRef}>
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
            {/* Badge compteur */}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-0.5 pt-[1px] bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown des notifications */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <p className="text-sm text-gray-500">
                        {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications && notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read_at ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.title
                            .toLowerCase()
                            .includes("rendez-vous") ? (
                            <span className="text-lg">📅</span>
                          ) : notification.title
                              .toLowerCase()
                              .includes("message") ? (
                            <span className="text-lg">💬</span>
                          ) : (
                            <span className="text-lg">🔔</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.body}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {formatTime(notification.created_at)}
                            </span>
                            {!notification.read_at && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <span className="text-2xl mb-2 block">🔔</span>
                    <p className="text-sm">Aucune notification</p>
                  </div>
                )}
              </div>

              {notifications && notifications.length > 0 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Voir toutes les notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
