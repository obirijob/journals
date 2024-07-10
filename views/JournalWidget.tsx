/** @format */

import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { black, blue, green, white } from '@/helpers/Colors'
import CText from '@/components/CText'
import CButton from '@/components/CButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const JournalWidget = ({
  journal,
  selectJournal
}: {
  journal: any
  selectJournal: (x: any) => void
}) => {
  const newTitle =
    journal.title.length > 20
      ? journal.title.substring(0, 20) + '...'
      : journal.title

  const newContent =
    journal.content.length > 80
      ? journal.content.substring(0, 80) + '...'
      : journal.content
  return (
    <TouchableOpacity onPress={() => selectJournal(journal)}>
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
        <CText style={{ marginBottom: 15 }}>{newContent}</CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
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
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              // marginBottom: -5,
              opacity: 0.5
            }}
          >
            <FontAwesomeIcon icon={faUser} size={10} />
            <CText>{journal.createdByPop.username}</CText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              // marginBottom: -5,
              opacity: 0.5
            }}
          >
            <CText>{moment(journal.createdAt).fromNow()}</CText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default JournalWidget
