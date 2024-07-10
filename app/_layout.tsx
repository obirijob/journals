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
import Main from '@/views/Main'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#e2dfda' }]}>
      <NotificationContextProvider>
        <UserContextProvider>
          <SafeAreaView>
            <Main />
          </SafeAreaView>
        </UserContextProvider>
      </NotificationContextProvider>
    </View>
  )
}
