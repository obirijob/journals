/** @format */

import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { beige, black, green, red, white } from '@/helpers/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import CText from '@/components/CText'
import { getData, postData } from '@/helpers/WebApi'
import { NotificationContext } from '@/contexts/NotificationContext'
import moment from 'moment'
import { useFonts } from 'expo-font'
import CButton from '@/components/CButton'

const AddJournal = ({ close }: { close: () => void }) => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  const [journal, setJournal] = useState({
    title: '',
    category: 1,
    content: ''
  })

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

  async function saveJournal() {
    const { success, data, message } = await postData('journals', journal)
    console.log(success, data, message)
    if (success) {
      addNotification({
        type: 'success',
        id: moment().format('YYMMDDHHmmss'),
        message: message ?? 'Success! Journal saved'
      })
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
        style={{ paddingHorizontal: 40, paddingVertical: 20, gap: 20 }}
      >
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
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
        </KeyboardAvoidingView>
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
            <Category
              key={`category_${c.id}`}
              category={c}
              selected={c.id == journal.category}
              onSelect={() => setJournal({ ...journal, category: c.id })}
            />
          ))}
        </View>
        <View
          style={{
            backgroundColor: white,
            padding: 30,
            marginHorizontal: -10,
            borderRadius: 15,
            gap: 20
          }}
        >
          <CText style={{ letterSpacing: 3 }}>HOW IS YOUR DAY LIKE?</CText>
          <TextInput
            style={{ fontFamily: 'SpaceMono', fontSize: 20 }}
            placeholder="Title of your Journal"
            value={journal.title}
            onChangeText={t => setJournal({ ...journal, title: t })}
          />
          <TextInput
            style={{ fontFamily: 'SpaceMono', height: 100 }}
            placeholder="Start writing..."
            multiline
            value={journal.content}
            onChangeText={t => setJournal({ ...journal, content: t })}
          />
          <CButton
            onPress={saveJournal}
            containerStyle={{ backgroundColor: green }}
          >
            Save Journal
          </CButton>
        </View>
      </SafeAreaView>
    </View>
  )
}

function Category({
  category,
  selected,
  onSelect
}: {
  category: any
  selected: boolean
  onSelect: () => void
}) {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={{
          backgroundColor: selected ? green : black + '5b',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 30,
          flexDirection: 'row',
          gap: 5
        }}
      >
        <CText style={{ color: white }}>{category.name}</CText>
        {selected && <FontAwesomeIcon icon={faCheck} color={white} />}
      </View>
    </TouchableOpacity>
  )
}

export default AddJournal
