/** @format */

import { View, Text } from 'react-native'
import React from 'react'

import { beige, black, blue, red, white } from '@/helpers/Colors'
import CText from '@/components/CText'
import CButton from '@/components/CButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

const ViewJournal = ({
  journal,
  close
}: {
  journal: any
  close: () => void
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        padding: 20,
        left: 20,
        top: 20,
        bottom: 20,
        right: 20,
        backgroundColor: beige,
        shadowColor: black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 5,
        borderRadius: 20,
        gap: 20
      }}
    >
      <FontAwesomeIcon icon={faNoteSticky} size={30} />
      <CText
        style={{
          fontSize: 14,
          marginBottom: -20,
          textDecorationStyle: 'solid'
        }}
      >
        Title
      </CText>
      <CText style={{ fontSize: 30 }}>{journal.title}</CText>
      <CText
        style={{
          fontSize: 14,
          marginBottom: -20,
          textDecorationStyle: 'solid'
        }}
      >
        Content
      </CText>
      <CText style={{ fontSize: 20 }}>{journal.content}</CText>
      <View
        style={{
          position: 'absolute',
          padding: 10,
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          gap: 10
        }}
      >
        <CButton containerStyle={{ backgroundColor: blue }}>Edit</CButton>
        <CButton containerStyle={{ backgroundColor: red }}>Delete</CButton>
        <View style={{ flex: 1 }} />
        <CButton onPress={close} containerStyle={{ backgroundColor: red }}>
          Close
        </CButton>
      </View>
    </View>
  )
}

export default ViewJournal
