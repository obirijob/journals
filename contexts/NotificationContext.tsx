/** @format */

import CText from '@/components/CText'
import { black, blue, green, red, yellow } from '@/helpers/Colors'
import { createContext, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'

export interface Notification {
  id: string
  type: 'error' | 'warning' | 'info' | 'success'
  message: string
}

export const NotificationContext = createContext<any>({})

export default function NotificationContextProvider({
  children
}: {
  children: any
}) {
  const [notifications, setNotifications] = useState<Notification[]>([
    // { id: 1, message: 'This is a normal notification', type: 'info' },
    // { id: 2, message: 'This is a normal notification', type: 'error' },
    // { id: 3, message: 'This is a normal notification', type: 'warning' },
    // { id: 4, message: 'This is a normal notification', type: 'success' }
  ])

  async function clearNotifications() {
    setNotifications([])
  }

  function addNotification(notification: Notification) {
    setNotifications(n => [...n, notification])
  }

  function removeNotification(id: string) {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, clearNotifications }}
    >
      {children}
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          zIndex: 1,
          gap: 10
        }}
      >
        {notifications.map(n => (
          <Notification
            key={`nofication_${n.id}`}
            notification={n}
            removeNotification={() => removeNotification(n.id)}
          />
        ))}
      </SafeAreaView>
    </NotificationContext.Provider>
  )
}

function Notification({
  notification,
  removeNotification
}: {
  notification: Notification
  removeNotification: () => void
}) {
  const colorMap = {
    info: blue,
    error: red,
    warning: yellow,
    success: green
  }

  return (
    <TouchableOpacity onPress={removeNotification}>
      <View
        style={{
          padding: 15,
          backgroundColor: colorMap[notification.type] + 'bb',
          borderRadius: 15,
          shadowColor: black,
          shadowRadius: 10,
          shadowOpacity: 0.5
        }}
      >
        <CText style={{ color: 'white' }}>{notification.message}</CText>
      </View>
    </TouchableOpacity>
  )
}
