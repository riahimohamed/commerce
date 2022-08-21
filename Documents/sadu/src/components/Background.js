import React from 'react'
import { ImageBackground, StyleSheet} from 'react-native';

import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '20%',
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    // alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
  },
})