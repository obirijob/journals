/** @format */

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'
import * as SecureStore from 'expo-secure-store'

import { SafeAreaView, StyleSheet, View } from 'react-native'
import Journals from '@/views/Journals'
import Login from '@/views/Login'
import { getData } from '@/helpers/WebApi'
import { UserContextProvider } from '@/contexts/UserContext'
import NotificationContextProvider from '@/contexts/NotificationContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  const [user, setUser] = useState<any>(null)
  const [refreshLogin, setRefreshLogin] = useState<boolean>(false)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    loaded && refreshUser()
  }, [refreshLogin])

  if (!loaded) {
    return null
  }

  async function refreshUser() {
    console.log('refreshing')
    const { success, message, data } = await getData('auth', {})
    console.log(data, message)
    if (success) {
      setUser(data)
    }
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#e2dfda' }]}>
      <NotificationContextProvider>
        <UserContextProvider>
          <SafeAreaView>
            {user ? (
              <View style={{ width: '100%', height: '100%', padding: 10 }}>
                <Journals />
              </View>
            ) : (
              <Login refreshLogin={() => setRefreshLogin(!refreshLogin)} />
            )}
          </SafeAreaView>
        </UserContextProvider>
      </NotificationContextProvider>
    </View>
  )
}
