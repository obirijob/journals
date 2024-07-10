/** @format */

import { KeyboardAvoidingView, Platform, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/contexts/UserContext'
import Journals from './Journals'
import Login from './Login'
import { getData } from '@/helpers/WebApi'

const Main = () => {
  const [refreshLogin, setRefreshLogin] = useState<boolean>(false)

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    refreshUser()
  }, [refreshLogin])

  async function refreshUser() {
    const { success, data } = await getData('auth', {})
    if (success) {
      setUser(data)
    } else {
      setUser(null)
    }
  }

  return user ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={{ width: '100%', height: '100%', padding: 10 }}
    >
      <Journals />
    </KeyboardAvoidingView>
  ) : (
    <Login refreshLogin={() => setRefreshLogin(!refreshLogin)} />
  )
}

export default Main