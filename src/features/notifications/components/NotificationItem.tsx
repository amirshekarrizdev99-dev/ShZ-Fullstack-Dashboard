"use client";

import Image from "next/image";

import type { Notification } from "../types/notification.type";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  return (
    <div
      className={`flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 transition-colors hover:bg-transparent dark:border-gray-800 dark:hover:bg-transparent ${
        !notification.isread ? "bg-blue-50/40 dark:bg-blue-500/5" : ""
      }`}
    >
      {/* Avatar */}
      <span className="relative block w-10 h-10 shrink-0">
        <Image
          width={40}
          height={40}
          src={notification.userimage}
          alt={notification.username}
          className="object-cover w-10 h-10 overflow-hidden rounded-full"
        />

        <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" />
      </span>

      {/* Content */}
      <span className="flex-1 block min-w-0">
        <span className="mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-white/90">
            {notification.username}
          </span>{" "}
          <span>{notification.message}</span>{" "}
          <span className="font-medium text-gray-800 dark:text-white/90">
            {notification.project}
          </span>
        </span>

        <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
          <span>Project</span>

          <span className="w-1 h-1 bg-gray-400 rounded-full" />

          <span>{formatNotificationTime(notification.createdat as unknown as string)}</span>
        </span>
      </span>

      {/* Unread indicator */}
      {!notification.isread && (
        <span
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
}

function formatNotificationTime(createdat: string): string {
  const date = new Date(createdat);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
}
