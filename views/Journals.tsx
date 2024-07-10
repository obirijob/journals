/** @format */

import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getData } from '@/helpers/WebApi'
import CText from '@/components/CText'
import JournalWidget from './JournalWidget'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { black, green } from '@/helpers/Colors'
import moment from 'moment'

const Journals = () => {
  const [journals, setJournals] = useState<null | []>([])
  const [refresh, setRefresh] = useState(false)

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
      style={{ paddingHorizontal: 10, flexDirection: 'column', height: '100%' }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <CText style={{ fontSize: 30 }}>Hello 👋</CText>
        <TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: black + '2b',
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
          {moment().format('MMM, YYYY').toUpperCase()}
        </CText>
      </View>

      <ScrollView
        style={{ borderRadius: 20, overflow: 'hidden' }}
        contentContainerStyle={{
          gap: 20
          // backgroundColor: 'red'
        }}
      >
        {journals?.map((journal, index) => (
          <JournalWidget key={index} journal={journal} />
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}></View>
    </View>
  )
}

export default Journals
