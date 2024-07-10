/** @format */

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const backendUrl = 'http://192.168.1.56:2000/'

export async function getData(endpoint: string, params: any) {
  try {
    const token = await SecureStore.getItemAsync('token')
    let response = await axios.get(`${backendUrl}${endpoint}`, {
      params,
      headers: { 'auth-token': token }
    })
    return { success: true, data: response.data }
  } catch (err: any) {
    return { success: false, data: err, message: err?.response?.data?.error }
  }
}

export async function postData(endpoint: string, body: any) {
  try {
    const token = await SecureStore.getItemAsync('token')
    let response = await axios.post(`${backendUrl}${endpoint}`, body, {
      headers: { 'auth-token': token }
    })
    return { success: true, data: response.data }
  } catch (err: any) {
    return { success: false, data: err, message: err?.response?.data?.error }
  }
}
