/** @format */

import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { beige, black, red, white } from '@/helpers/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import CText from '@/components/CText'
import { getData } from '@/helpers/WebApi'
import { NotificationContext } from '@/contexts/NotificationContext'
import moment from 'moment'

const AddJournal = ({ close }: { close: () => void }) => {
  const [categories, setCategories] = useState<any[]>([])

  const { addNotification } = useContext(NotificationContext)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { success, data, message } = await getData(
      'journals/categories/all',
      {}
    )
    if (success) {
      setCategories(data)
    } else {
      addNotification({
        type: 'error',
        id: moment().format('YYMMDDHHmmss'),
        message: message ?? 'Failed! Something went wrong'
      })
    }
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: -20,
        left: 0,
        right: 0,
        backgroundColor: beige
      }}
    >
      <SafeAreaView
        style={{ paddingHorizontal: 40, paddingVertical: 40, gap: 20 }}
      >
        <View>
          <TouchableOpacity
            onPress={close}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              marginLeft: -10
            }}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              size={20}
              style={{ color: red }}
            />
            <CText style={{ fontSize: 20, color: red }}>Back to Journals</CText>
          </TouchableOpacity>
        </View>
        <View>
          <CText style={{ fontSize: 20 }}>What are you journaling about?</CText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {categories.map(c => (
            <Category key={`category_${c.id}`} category={c} />
          ))}
        </View>
        <View
          style={{
            backgroundColor: white,
            padding: 20,
            marginHorizontal: -20,
            borderRadius: 15,
            gap: 20
          }}
        >
          <CText style={{ letterSpacing: 3 }}>HOW IS YOUR DAY LIKE?</CText>
          <TextInput placeholder="Title of your Journal" />
        </View>
      </SafeAreaView>
    </View>
  )
}

function Category({ category }: { category: any }) {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: black + '5b',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 30
        }}
      >
        <CText style={{ color: white }}>{category.name}</CText>
      </View>
    </TouchableOpacity>
  )
}

export default AddJournal
