import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CommandScreen from "../screens/CommandScreen";
import ScanScreen from "../screens/ScanScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Command" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Command" component={CommandScreen} />
    <Stack.Screen name="ScanProducts" component={ScanScreen} />
    <Stack.Screen name="Details" component={DetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;