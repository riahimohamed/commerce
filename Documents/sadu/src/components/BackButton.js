import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Feather } from '@expo/vector-icons';

export default function BackButton({ goBack, color='white' }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Feather name="arrow-left" size={20} color="#000" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight()+ 15,
    left: 15,

  },
})
