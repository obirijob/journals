/** @format */

import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faBook,
  faCalendarDay,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { beige, black, green, white } from '@/helpers/Colors'
import CText from '@/components/CText'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const BottomBar = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Dimensions.get('window').width / 10
      }}
    >
      <BottomBarButton icon={faBook} text="Notes" />
      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            // borderWidth: 3,
            borderColor: beige,
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: green,
            shadowColor: beige,
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
            marginTop: -50
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ color: beige }} size={30} />
        </View>
      </TouchableOpacity>
      <BottomBarButton icon={faCalendarDay} text="Summary" />
    </View>
  )
}

function BottomBarButton({ icon, text }: { icon: IconProp; text: string }) {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
          opacity: 0.6
        }}
      >
        <FontAwesomeIcon icon={icon} size={20} />
        <CText
          style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: 2 }}
        >
          {text}
        </CText>
      </View>
    </TouchableOpacity>
  )
}

export default BottomBar
