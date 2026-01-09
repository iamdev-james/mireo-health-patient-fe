// app/notifications/page.tsx

import { UserProfileHeader } from "@/components/account/user-profile-header"
import { NotificationCard } from "@/components/notifications/notification-card"
import { Notification } from "@/types/notifications"

async function getNotifications(): Promise<Notification[]> {
  // const res = await fetch(`${process.env.API_URL}/notifications`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // })
  // return res.json()

  return [
    {
      id: "1",
      title: "Scheduled call with the doctor!",
      message:
        "The doctor has reviewed your lab results and will like to have a follow up call, please schedule a convenient time",
      timestamp: "Today",
      read: false,
    },
    {
      id: "2",
      title: "Scheduled call with the doctor!",
      message:
        "The doctor has reviewed your lab results and will like to have a follow up call, please schedule a convenient time",
      timestamp: "Today",
      read: false,
    },
    {
      id: "3",
      title: "Have a follow-up call with the doctor!",
      message:
        "The doctor has reviewed your lab results and will like to have a follow up call, please schedule a convenient time",
      timestamp: "Yesterday",
      read: true,
    },
    {
      id: "4",
      title: "Have a follow-up call with the doctor!",
      message:
        "The doctor has reviewed your lab results and will like to have a follow up call, please schedule a convenient time",
      timestamp: "Yesterday",
      read: true,
    },
  ]
}

export default async function NotificationsPage() {
  const notifications = await getNotifications()

  return (
    <div className="bg-gray-350 m-auto min-h-screen w-full max-w-2xl px-6 py-6 pb-20 sm:bg-white">
      <UserProfileHeader name={""} profileImage={undefined} title="Notifications" />

      <div className="mt-7 pb-8">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-medium text-black">No Notifications</h3>
              <p className="text-sm text-gray-400">You&apos;re all caught up!</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 overflow-hidden rounded-[14px] border border-gray-50 bg-white px-4.5">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
