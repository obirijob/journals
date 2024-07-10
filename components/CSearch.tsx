/** @format */

import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { white } from '@/helpers/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useFonts } from 'expo-font'

const CSearch = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })
  return (
    <View
      style={{
        backgroundColor: white + 'bb',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 15
      }}
    >
      <TextInput
        placeholder="Search"
        style={{ flex: 1, fontFamily: 'SpaceMono' }}
      />
      <TouchableOpacity>
        <View>
          <FontAwesomeIcon icon={faSearch} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CSearch
