/** @format */

import { View, Text, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'

const CText = ({
  children,
  style
}: {
  children: any
  style?: StyleProp<TextStyle>
}) => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  return (
    <Text
      // style={style}
      style={[{ fontFamily: 'SpaceMono' }, style]}
    >
      {children}
    </Text>
  )
}

export default CText
