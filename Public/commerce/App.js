import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './src/navigation/AuthNavigator';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}