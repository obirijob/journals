/** @format */

import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { black, blue, green, white } from '@/helpers/Colors'
import CText from '@/components/CText'
import CButton from '@/components/CButton'

const JournalWidget = ({ journal }: { journal: any }) => {
  const newTitle =
    journal.title.length > 20
      ? journal.title.substring(0, 20) + '...'
      : journal.title

  const newContent =
    journal.content.length > 80
      ? journal.content.substring(0, 80) + '...'
      : journal.content
  return (
    <View
      style={{
        backgroundColor: white,
        padding: 20,
        borderRadius: 15,
        shadowColor: black,
        shadowRadius: 10
      }}
    >
      <CText
        style={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          marginBottom: 10
        }}
      >
        {newTitle}
      </CText>
      <CText style={{ marginBottom: 10 }}>{newContent}</CText>
      <View
        style={{
          backgroundColor: black + '88',
          alignSelf: 'flex-start',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5
        }}
      >
        <CText style={{ color: 'white' }}>{journal.categoryPop.name}</CText>
      </View>
    </View>
  )
}

export default JournalWidget
