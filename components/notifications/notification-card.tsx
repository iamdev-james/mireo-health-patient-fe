// components/notifications/notification-card.tsx

import { Notification } from "@/types/notifications"

interface NotificationCardProps {
  notification: Notification
}

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className={`bg-white py-4`}>
      <div className="space-y-2">
        <h3 className="text-base text-black">{notification.title}</h3>

        <p className="text-sm leading-relaxed font-medium text-gray-400">{notification.message}</p>
      </div>
    </div>
  )
}
