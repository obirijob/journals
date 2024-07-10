/** @format */

import { StyleProp, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { black, white } from '@/helpers/Colors'
import CText from './CText'

const CInput = ({
  style,
  label,
  onChangeText,
  value,
  secureTextEntry
}: {
  style?: StyleProp<TextStyle>
  label?: string
  onChangeText?: (text: string) => void
  value?: string
  secureTextEntry?: boolean
}) => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  return (
    <View
      style={{
        backgroundColor: white,
        padding: 10,
        borderRadius: 15,
        shadowColor: black,
        shadowRadius: 10,
        shadowOpacity: 0.1
      }}
    >
      <CText style={{ opacity: 0.5 }}>{label ?? ''}</CText>
      <TextInput
        style={[
          {
            fontFamily: 'SpaceMono',
            fontSize: 20
          },
          style
        ]}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default CInput
