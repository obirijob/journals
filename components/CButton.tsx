/** @format */

import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import React from 'react'
import CText from './CText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const CButton = ({
  children,
  onPress,
  icon,
  textStyle,
  containerStyle
}: {
  children?: string
  onPress?: () => void
  icon?: IconProp
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            padding: 15,
            borderRadius: 30,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center'
          },
          containerStyle
        ]}
      >
        {icon && <FontAwesomeIcon icon={icon} style={{ color: 'white' }} />}
        <CText style={[{ fontWeight: 'bold', color: 'white' }, textStyle]}>
          {children ?? ''}
        </CText>
      </View>
    </TouchableOpacity>
  )
}

export default CButton
