import { Appearance } from 'react-native'

export const theme = {
  ...Appearance,
  colors: {
    ...Appearance.colors,
    text: '#000000',
    primary: '#df0f1d',
    secondary: '#414757',
    error: '#f13a59',
  },
}