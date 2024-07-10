/** @format */

import {
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBook, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons'

import CText from '@/components/CText'
import CInput from '@/components/CInput'
import CButton from '@/components/CButton'
import { postData } from '@/helpers/WebApi'
import { NotificationContext } from '@/contexts/NotificationContext'
import { black, green } from '@/helpers/Colors'

const Login = ({ refreshLogin }: { refreshLogin: () => void }) => {
  const { addNotification, clearNotifications } =
    useContext<any>(NotificationContext)

  const [payload, setPayload] = useState<{
    username: string
    password: string
  }>({
    username: '',
    password: ''
  })

  async function attemptLogin() {
    clearNotifications()
    const { success, data, message } = await postData('auth/signin', payload)
    if (success) {
      await SecureStore.setItemAsync('token', data.authToken)
      refreshLogin()
    } else {
      setTimeout(() => {
        addNotification({
          type: 'error',
          id: moment().format('YYMMDDHHmmss'),
          message: message ?? 'Something went wrong'
        })
      }, 100)
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{ padding: 20, display: 'flex', gap: 20, height: '100%' }}
      >
        <View style={{ flex: 1 }} />
        <FontAwesomeIcon
          icon={faBook}
          size={80}
          style={{ color: black + 'bb' }}
        />
        <CText style={{ fontSize: 30 }}>Log In</CText>
        <CInput
          value={payload.username}
          onChangeText={text => setPayload({ ...payload, username: text })}
          label="Username"
        />
        <CInput
          value={payload.password}
          onChangeText={text => setPayload({ ...payload, password: text })}
          secureTextEntry
          label="Password"
        />

        <CButton
          containerStyle={{
            backgroundColor: green
          }}
          onPress={attemptLogin}
          icon={faUnlockKeyhole}
        >
          Sign In
        </CButton>
        <TouchableOpacity>
          <CText>New Here? Create an account</CText>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login
