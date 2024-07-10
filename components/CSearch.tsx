/** @format */

import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { white } from '@/helpers/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const CSearch = () => {
  return (
    <View
      style={{
        backgroundColor: white + 'bb',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 15
      }}
    >
      <TextInput placeholder="Search" style={{ flex: 1 }} />
      <TouchableOpacity>
        <View>
          <FontAwesomeIcon icon={faSearch} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CSearch
