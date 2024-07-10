/** @format */

import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { getData } from '@/helpers/WebApi'
import CText from '@/components/CText'
import JournalWidget from './JournalWidget'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faSync, faUser } from '@fortawesome/free-solid-svg-icons'
import { black, green, white } from '@/helpers/Colors'
import moment from 'moment'
import { UserContext } from '@/contexts/UserContext'
import BottomBar from './BottomBar'
import CSearch from '@/components/CSearch'

const Journals = ({
  onAddJournal,
  selectJournal
}: {
  onAddJournal: () => void
  selectJournal: (x: any) => void
}) => {
  const [journals, setJournals] = useState<null | []>([])
  const [refresh, setRefresh] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchJournals()
  }, [refresh])

  async function fetchJournals() {
    const { success, data, message } = await getData('journals', {})
    if (success) {
      setJournals(data)
    } else {
      setJournals(null)
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'column',
        height: '100%',
        marginTop: 10
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CText style={{ textTransform: 'capitalize', fontSize: 30 }}>
          Hi {user.username ?? ''} 👋
        </CText>
        <TouchableOpacity onPress={() => console.log(user)}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: black + '0b',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10 }}>
        <CText style={{ fontSize: 16, marginTop: 15 }}>
          {moment().format('ddd, Do MMM, YYYY').toUpperCase()}
        </CText>
      </View>

      <View
        style={{
          marginBottom: 15,
          marginTop: 5,
          gap: 10,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 1 }}>
          <CSearch />
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              backgroundColor: black + '2b',
              borderRadius: 15
            }}
          >
            <FontAwesomeIcon
              icon={faFilter}
              style={{ color: black, marginBottom: -3 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <View
            style={{
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              backgroundColor: black + '2b',
              borderRadius: 15
            }}
          >
            <FontAwesomeIcon
              icon={faSync}
              style={{ color: black, marginBottom: -3 }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ borderRadius: 20, overflow: 'hidden' }}
        contentContainerStyle={{
          gap: 20
          // backgroundColor: 'red'
        }}
      >
        {journals?.map((journal, index) => (
          <JournalWidget
            key={index}
            journal={journal}
            selectJournal={selectJournal}
          />
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}>
        <BottomBar onAddJournal={onAddJournal} />
      </View>
    </View>
  )
}

export default Journals
